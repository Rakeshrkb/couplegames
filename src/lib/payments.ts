import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { PassPlan } from '@/lib/accounts';

export const PLAN_PRICES: Record<PassPlan, number> = {
  day: 2900,       // ₹29 in paise
  lifetime: 3900,  // ₹39 in paise
};

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Order {
  _id?: ObjectId;
  merchantOrderId: string;
  accountId: ObjectId;
  plan: PassPlan;
  amountPaise: number;
  status: OrderStatus;
  phonepeOrderId: string | null;
  createdAt: number;
  updatedAt: number;
}

let indexReady: Promise<unknown> | null = null;

async function ordersCollection() {
  if (!clientPromise) throw new Error('MONGODB_URI is not set');
  const client = await clientPromise;
  const col = client.db('couplegames').collection<Order>('orders');
  if (!indexReady) indexReady = col.createIndex({ merchantOrderId: 1 }, { unique: true });
  await indexReady;
  return col;
}

export async function createOrder(o: {
  merchantOrderId: string;
  accountId: ObjectId;
  plan: PassPlan;
  amountPaise: number;
}) {
  const col = await ordersCollection();
  const now = Date.now();
  await col.insertOne({ ...o, status: 'PENDING', phonepeOrderId: null, createdAt: now, updatedAt: now });
}

export async function findOrder(merchantOrderId: string) {
  const col = await ordersCollection();
  return col.findOne({ merchantOrderId });
}

export async function setPhonePeOrderId(merchantOrderId: string, phonepeOrderId: string) {
  const col = await ordersCollection();
  await col.updateOne({ merchantOrderId }, { $set: { phonepeOrderId, updatedAt: Date.now() } });
}

// Only moves PENDING → new status, so a payment can never be applied twice
export async function settleOrder(merchantOrderId: string, status: 'COMPLETED' | 'FAILED') {
  const col = await ordersCollection();
  return col.findOneAndUpdate(
    { merchantOrderId, status: 'PENDING' },
    { $set: { status, updatedAt: Date.now() } },
    { returnDocument: 'after' }
  );
}