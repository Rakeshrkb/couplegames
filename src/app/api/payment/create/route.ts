import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { getCurrentAccount } from '@/lib/currentAccount';
import { hasActivePass, type PassPlan } from '@/lib/accounts';
import {
  PLAN_PRICES,
  USD_PLAN_PRICES,
  createOrder,
  setPhonePeOrderId,
  setDodoSessionId,
  settleOrder,
} from '@/lib/payments';
import { createPhonePePayment } from '@/lib/phonepe';
import { createDodoCheckout } from '@/lib/dodo';
import { getRegion } from '@/lib/region';

export async function POST(req: Request) {
  const account = await getCurrentAccount();
  if (!account?._id) return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const plan = body.plan as PassPlan;
  if (plan !== 'day' && plan !== 'lifetime') {
    return NextResponse.json({ error: 'INVALID_PLAN' }, { status: 400 });
  }

  if (hasActivePass(account) && account.pass.plan === 'lifetime') {
    return NextResponse.json({ error: 'ALREADY_LIFETIME' }, { status: 409 });
  }

  // Decided on the server, never taken from the browser
  const region = await getRegion();
  const provider = region === 'IN' ? 'phonepe' : 'dodo';

  const merchantOrderId = `CG${Date.now()}${randomBytes(3).toString('hex').toUpperCase()}`;
  const amountPaise = provider === 'phonepe' ? PLAN_PRICES[plan] : USD_PLAN_PRICES[plan];
  await createOrder({
    merchantOrderId,
    accountId: account._id,
    plan,
    amountPaise,
    provider,
    currency: provider === 'phonepe' ? 'INR' : 'USD',
  });

  const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';
  const returnUrl = `${siteUrl}/payment/result?order=${merchantOrderId}`;

  try {
    if (provider === 'dodo') {
      const { checkoutUrl, sessionId } = await createDodoCheckout({
        merchantOrderId,
        plan,
        returnUrl,
        email: account.email,
        name: account.name,
      });
      await setDodoSessionId(merchantOrderId, sessionId);
      return NextResponse.json({ redirectUrl: checkoutUrl });
    }

    const { redirectUrl, phonepeOrderId } = await createPhonePePayment({
      merchantOrderId,
      amountPaise,
      redirectUrl: returnUrl,
    });
    await setPhonePeOrderId(merchantOrderId, phonepeOrderId);
    return NextResponse.json({ redirectUrl });
  } catch (err) {
    console.error(`Payment create failed (${provider}):`, err);
    await settleOrder(merchantOrderId, 'FAILED');
    return NextResponse.json({ error: 'PAYMENT_START_FAILED' }, { status: 502 });
  }
}