import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { findAccountById, findGuestByToken } from '@/lib/accounts';

export const GUEST_COOKIE = 'cg_guest';

export async function getCurrentAccount() {
  // 1. Google login
  const session = await auth();
  const accountId = (session?.user as { accountId?: string } | undefined)?.accountId;
  if (accountId) {
    const account = await findAccountById(accountId);
    if (account) return account;
  }

  // 2. Quick (guest) account cookie
  const token = (await cookies()).get(GUEST_COOKIE)?.value;
  if (token) return findGuestByToken(token);

  return null;
}