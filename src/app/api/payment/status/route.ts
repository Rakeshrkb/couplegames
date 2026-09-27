import { NextResponse } from 'next/server';
import { getCurrentAccount } from '@/lib/currentAccount';
import { applyPassToAccount } from '@/lib/accounts';
import { findOrder, settleOrder } from '@/lib/payments';
import { getPhonePeOrderStatus } from '@/lib/phonepe';
import { dodo, settleDodoPayment } from '@/lib/dodo';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const orderId = new URL(req.url).searchParams.get('order');
  if (!orderId) return NextResponse.json({ error: 'MISSING_ORDER' }, { status: 400 });

  const account = await getCurrentAccount();
  if (!account?._id) return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 });

  const order = await findOrder(orderId);
  if (!order || !order.accountId.equals(account._id)) {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }

  // Already settled earlier (by the webhook or a previous check)
  if (order.status !== 'PENDING') {
    return NextResponse.json({ status: order.status, plan: order.plan });
  }

  try {
    // Dodo: ask Dodo about the checkout session directly. This also makes it work
    // on localhost, where Dodo's webhook can't reach you.
    if (order.provider === 'dodo') {
      if (!order.dodoSessionId) return NextResponse.json({ status: 'PENDING' });
      const session = await dodo().checkoutSessions.retrieve(order.dodoSessionId);
      if (!session.payment_id) return NextResponse.json({ status: 'PENDING' });
      const status = await settleDodoPayment(session.payment_id);
      return NextResponse.json({ status, plan: order.plan });
    }

    // PhonePe (unchanged)
    const { state, amount } = await getPhonePeOrderStatus(orderId);

    if (state === 'COMPLETED') {
      if (amount !== order.amountPaise) {
        console.error(`Amount mismatch for ${orderId}: got ${amount}, expected ${order.amountPaise}`);
        return NextResponse.json({ status: 'PENDING' });
      }
      const settled = await settleOrder(orderId, 'COMPLETED');
      if (settled) await applyPassToAccount(settled.accountId, settled.plan);
      return NextResponse.json({ status: 'COMPLETED', plan: order.plan });
    }

    if (state === 'FAILED') {
      await settleOrder(orderId, 'FAILED');
      return NextResponse.json({ status: 'FAILED' });
    }

    return NextResponse.json({ status: 'PENDING' });
  } catch (err) {
    console.error('Payment status check failed:', err);
    return NextResponse.json({ status: 'PENDING' });
  }
}