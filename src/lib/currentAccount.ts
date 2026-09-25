import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { findAccountById, findGuestByToken, mergeGuestIntoGoogle } from '@/lib/accounts';

export const GUEST_COOKIE = 'cg_guest';

export async function getCurrentAccount() {
  const cookieStore = await cookies();
  const guestToken = cookieStore.get(GUEST_COOKIE)?.value;

  // 1. Google login
  const session = await auth();
  const accountId = (session?.user as { accountId?: string } | undefined)?.accountId;
  if (accountId) {
    let account = await findAccountById(accountId);
    if (account) {
      // Signed in with Google while a quick account cookie exists → upgrade it
      if (guestToken && account._id) {
        await mergeGuestIntoGoogle(guestToken, account._id);
        try {
          cookieStore.delete(GUEST_COOKIE);
        } catch {
          // Cookies can't be changed here (e.g. a server component); the merge is already done
        }
        account = (await findAccountById(accountId)) ?? account;
      }
      return account;
    }
  }

  // 2. Quick (guest) account cookie
  if (guestToken) return findGuestByToken(guestToken);

  return null;
}