import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { upsertGoogleAccount } from '@/lib/accounts';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Runs on sign-in: create/update the account in MongoDB
      if (account?.provider === 'google' && profile?.sub && profile.email) {
        const saved = await upsertGoogleAccount({
          googleId: profile.sub,
          email: profile.email,
          name: profile.name ?? null,
          image: (profile as { picture?: string }).picture ?? null,
        });
        if (saved?._id) (token as { accountId?: string }).accountId = saved._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      const accountId = (token as { accountId?: string }).accountId;
      if (accountId && session.user) {
        (session.user as { accountId?: string }).accountId = accountId;
      }
      return session;
    },
  },
});