const IS_PROD = process.env.PHONEPE_ENV === 'production';

const AUTH_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

const PG_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/pg'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) return cachedToken.value;

  const { PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, PHONEPE_CLIENT_VERSION } = process.env;
  if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET || !PHONEPE_CLIENT_VERSION) {
    throw new Error('PhonePe credentials are not set');
  }

  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: PHONEPE_CLIENT_ID,
      client_version: PHONEPE_CLIENT_VERSION,
      client_secret: PHONEPE_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`PhonePe auth failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    // expires_at is in seconds; fall back to 10 minutes if missing
    expiresAt: data.expires_at ? data.expires_at * 1000 : Date.now() + 10 * 60_000,
  };
  return cachedToken.value;
}

export async function createPhonePePayment(p: {
  merchantOrderId: string;
  amountPaise: number;
  redirectUrl: string;
}) {
  const token = await getAccessToken();
  const res = await fetch(`${PG_URL}/checkout/v2/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `O-Bearer ${token}` },
    body: JSON.stringify({
      merchantOrderId: p.merchantOrderId,
      amount: p.amountPaise,
      expireAfter: 1200, // 20 minutes to complete payment
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: 'couplegames Couples Pack',
        merchantUrls: { redirectUrl: p.redirectUrl },
      },
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`PhonePe pay failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  return { redirectUrl: data.redirectUrl as string, phonepeOrderId: data.orderId as string };
}

export async function getPhonePeOrderStatus(merchantOrderId: string) {
  const token = await getAccessToken();
  const res = await fetch(
    `${PG_URL}/checkout/v2/order/${encodeURIComponent(merchantOrderId)}/status`,
    { headers: { Authorization: `O-Bearer ${token}` }, cache: 'no-store' }
  );
  if (!res.ok) throw new Error(`PhonePe status failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  return { state: data.state as 'COMPLETED' | 'FAILED' | 'PENDING', amount: data.amount as number };
}