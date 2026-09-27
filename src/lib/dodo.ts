import DodoPayments from 'dodopayments';
import type { Payment } from 'dodopayments/resources/payments';
import { applyPassToAccount, type PassPlan } from '@/lib/accounts';
import { findOrder, setDodoPaymentId, settleOrder, type Order } from '@/lib/payments';

let client: DodoPayments | null = null;

// One shared client. Keys come from .env only (never NEXT_PUBLIC_)
export function dodo() {
  if (!client) {
    client = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.DODO_PAYMENTS_ENV === 'live_mode' ? 'live_mode' : 'test_mode',
      webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
    });
  }
  return client;
}

function productIdFor(plan: PassPlan) {
  const id = plan === 'lifetime' ? process.env.DODO_PRODUCT_LIFETIME : process.env.DODO_PRODUCT_DAY;
  if (!id) throw new Error(`Dodo product id for "${plan}" is not set`);
  return id;
}

export async function createDodoCheckout(p: {
  merchantOrderId: string;
  plan: PassPlan;
  returnUrl: string;
  email?: string | null;
  name?: string | null;
}) {
  const session = await dodo().checkoutSessions.create({
    product_cart: [{ product_id: productIdFor(p.plan), quantity: 1 }],
    // Quick accounts have no email, so Dodo's checkout asks for it instead
    customer: p.email ? { email: p.email, name: p.name ?? undefined } : undefined,
    return_url: p.returnUrl,
    metadata: { orderId: p.merchantOrderId },
  });
  if (!session.checkout_url) throw new Error('Dodo did not return a checkout URL');
  return { checkoutUrl: session.checkout_url, sessionId: session.session_id };
}

// A payment only counts if it came from the checkout session we created for this order,
// for our product. Currency/amount are NOT checked: with adaptive pricing Dodo charges
// the customer in their local currency (e.g. INR via UPI), but the price itself comes
// from the Dodo product, so it can't be changed by the customer.
function paymentMatchesOrder(payment: Payment, order: Order) {
  const productOk =
    payment.product_cart?.some((i) => i.product_id === productIdFor(order.plan) && i.quantity === 1) ?? false;
  const sessionOk = !order.dodoSessionId || payment.checkout_session_id === order.dodoSessionId;
  return (
    payment.status === 'succeeded' &&
    payment.metadata?.orderId === order.merchantOrderId &&
    sessionOk &&
    productOk
  );
}

// Used by both the webhook and the status check. Safe to call many times.
export async function settleDodoPayment(paymentId: string): Promise<'COMPLETED' | 'FAILED' | 'PENDING'> {
  // Always re-read the payment from Dodo's API rather than trusting the caller
  const payment = await dodo().payments.retrieve(paymentId);
  const orderId = payment.metadata?.orderId;
  if (typeof orderId !== 'string') return 'PENDING';

  const order = await findOrder(orderId);
  if (!order || order.provider !== 'dodo') return 'PENDING';
  if (order.status !== 'PENDING') return order.status;

  // A failed card attempt is reported, but the order stays PENDING: the customer can
  // retry in the same Dodo checkout, and a later success must still unlock the pass.
  if (payment.status === 'failed' || payment.status === 'cancelled') return 'FAILED';

  if (!paymentMatchesOrder(payment, order)) {
    if (payment.status === 'succeeded') {
      console.error(`Dodo payment ${paymentId} does not match order ${orderId}`);
    }
    return 'PENDING';
  }

  await setDodoPaymentId(orderId, paymentId);
  const settled = await settleOrder(orderId, 'COMPLETED');
  if (settled) await applyPassToAccount(settled.accountId, settled.plan);
  return 'COMPLETED';
}