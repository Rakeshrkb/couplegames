import { NextResponse } from 'next/server';
import { getCurrentAccount } from '@/lib/currentAccount';
import { applyPassToAccount } from '@/lib/accounts';
import { findOrder, settleOrder } from '@/lib/payments';
import { getPhonePeOrderStatus } from '@/lib/phonepe';

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

  // Already settled earlier
  if (order.status !== 'PENDING') {
    return NextResponse.json({ status: order.status, plan: order.plan });
  }

  try {
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