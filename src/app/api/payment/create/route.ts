import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { getCurrentAccount } from '@/lib/currentAccount';
import { hasActivePass, type PassPlan } from '@/lib/accounts';
import { PLAN_PRICES, createOrder, setPhonePeOrderId, settleOrder } from '@/lib/payments';
import { createPhonePePayment } from '@/lib/phonepe';

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

  const merchantOrderId = `CG${Date.now()}${randomBytes(3).toString('hex').toUpperCase()}`;
  const amountPaise = PLAN_PRICES[plan];
  await createOrder({ merchantOrderId, accountId: account._id, plan, amountPaise });

  const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

  try {
    const { redirectUrl, phonepeOrderId } = await createPhonePePayment({
      merchantOrderId,
      amountPaise,
      redirectUrl: `${siteUrl}/payment/result?order=${merchantOrderId}`,
    });
    await setPhonePeOrderId(merchantOrderId, phonepeOrderId);
    return NextResponse.json({ redirectUrl });
  } catch (err) {
    console.error('Payment create failed:', err);
    await settleOrder(merchantOrderId, 'FAILED');
    return NextResponse.json({ error: 'PAYMENT_START_FAILED' }, { status: 502 });
  }
}