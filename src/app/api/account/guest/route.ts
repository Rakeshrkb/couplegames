import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createGuestAccount, findGuestByToken, toPublicAccount } from '@/lib/accounts';
import { GUEST_COOKIE } from '@/lib/currentAccount';

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST() {
  const jar = await cookies();

  // Already has a quick account in this browser → reuse it
  const existing = jar.get(GUEST_COOKIE)?.value;
  if (existing) {
    const account = await findGuestByToken(existing);
    if (account) return NextResponse.json({ account: toPublicAccount(account) });
  }

  const { token, account } = await createGuestAccount();
  jar.set(GUEST_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ONE_YEAR,
  });

  return NextResponse.json({ account: toPublicAccount(account) });
}

export async function DELETE() {
  (await cookies()).delete(GUEST_COOKIE);
  return NextResponse.json({ ok: true });
}