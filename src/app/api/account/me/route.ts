import { NextResponse } from 'next/server';
import { getCurrentAccount } from '@/lib/currentAccount';
import { toPublicAccount } from '@/lib/accounts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const account = await getCurrentAccount();
  return NextResponse.json({ account: account ? toPublicAccount(account) : null });
}