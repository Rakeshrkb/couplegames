import { createHash, randomBytes } from 'crypto';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export type PassPlan = 'day' | 'lifetime';

export interface Account {
  _id?: ObjectId;
  type: 'google' | 'guest';
  googleId?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  guestTokenHash?: string;
  freeSpinsUsed: number;
  pass: { plan: PassPlan | null; expiresAt: number | null };
  createdAt: number;
  lastSeenAt: number;
}

// What the browser is allowed to see (no ids, no token hashes)
export interface PublicAccount {
  type: 'google' | 'guest';
  email: string | null;
  name: string | null;
  image: string | null;
  freeSpinsUsed: number;
  hasPass: boolean;
  plan: PassPlan | null;
  expiresAt: number | null;
}

let indexesReady: Promise<unknown> | null = null;

async function accountsCollection() {
  if (!clientPromise) throw new Error('MONGODB_URI is not set');
  const client = await clientPromise;
  const col = client.db('couplegames').collection<Account>('accounts');

  // Create indexes once per server start
  if (!indexesReady) {
    indexesReady = Promise.all([
      col.createIndex({ googleId: 1 }, { unique: true, partialFilterExpression: { type: 'google' } }),
      col.createIndex({ guestTokenHash: 1 }, { unique: true, partialFilterExpression: { type: 'guest' } }),
    ]);
  }
  await indexesReady;
  return col;
}

export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

export function hasActivePass(account: Account | null): boolean {
  if (!account?.pass?.plan) return false;
  if (account.pass.plan === 'lifetime') return true;
  return (account.pass.expiresAt ?? 0) > Date.now();
}

export function toPublicAccount(account: Account): PublicAccount {
  return {
    type: account.type,
    email: account.email ?? null,
    name: account.name ?? null,
    image: account.image ?? null,
    freeSpinsUsed: account.freeSpinsUsed ?? 0,
    hasPass: hasActivePass(account),
    plan: account.pass?.plan ?? null,
    expiresAt: account.pass?.expiresAt ?? null,
  };
}

export async function upsertGoogleAccount(p: {
  googleId: string;
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  const col = await accountsCollection();
  const now = Date.now();
  return col.findOneAndUpdate(
    { type: 'google', googleId: p.googleId },
    {
      $set: { email: p.email, name: p.name ?? null, image: p.image ?? null, lastSeenAt: now },
      $setOnInsert: { freeSpinsUsed: 0, pass: { plan: null, expiresAt: null }, createdAt: now },
    },
    { upsert: true, returnDocument: 'after' }
  );
}

export async function createGuestAccount() {
  const col = await accountsCollection();
  const token = randomBytes(32).toString('hex');
  const now = Date.now();
  const doc: Account = {
    type: 'guest',
    guestTokenHash: hashToken(token),
    freeSpinsUsed: 0,
    pass: { plan: null, expiresAt: null },
    createdAt: now,
    lastSeenAt: now,
  };
  const { insertedId } = await col.insertOne(doc);
  return { token, account: { ...doc, _id: insertedId } };
}

export async function findGuestByToken(token: string) {
  const col = await accountsCollection();
  return col.findOne({ type: 'guest', guestTokenHash: hashToken(token) });
}

export async function findAccountById(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const col = await accountsCollection();
  return col.findOne({ _id: new ObjectId(id) });
}

const DAY_MS = 24 * 60 * 60 * 1000;

// Called only after PhonePe confirms a payment
export async function applyPassToAccount(accountId: ObjectId, plan: PassPlan) {
  const col = await accountsCollection();

  if (plan === 'lifetime') {
    await col.updateOne({ _id: accountId }, { $set: { pass: { plan: 'lifetime', expiresAt: null } } });
    return;
  }

  const account = await col.findOne({ _id: accountId });
  if (account?.pass?.plan === 'lifetime') return; // never downgrade

  // If they still have time left, add 24h on top of it
  const start = Math.max(Date.now(), account?.pass?.expiresAt ?? 0);
  await col.updateOne({ _id: accountId }, { $set: { pass: { plan: 'day', expiresAt: start + DAY_MS } } });
}