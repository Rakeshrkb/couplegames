import { NextResponse } from 'next/server';
import { dodo, settleDodoPayment } from '@/lib/dodo';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // The signature is computed over the raw body, so read it as text
  const rawBody = await req.text();

  let event;
  try {
    event = dodo().webhooks.unwrap(rawBody, {
      headers: {
        'webhook-id': req.headers.get('webhook-id') ?? '',
        'webhook-signature': req.headers.get('webhook-signature') ?? '',
        'webhook-timestamp': req.headers.get('webhook-timestamp') ?? '',
      },
    });
  } catch {
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 401 });
  }

  try {
    if (event.type === 'payment.succeeded' || event.type === 'payment.failed') {
      await settleDodoPayment(event.data.payment_id);
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    // Non-2xx makes Dodo retry later (up to 8 times)
    console.error('Dodo webhook handling failed:', err);
    return NextResponse.json({ error: 'PROCESSING_FAILED' }, { status: 500 });
  }
}