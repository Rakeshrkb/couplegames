import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the MongoClient is not recreated on hot reloads
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);

      globalWithMongo._mongoClientPromise = client.connect()
        .then((connectedClient) => {
          console.log('✅ MongoDB connected successfully');
          return connectedClient;
        })
        .catch((error) => {
          console.error('❌ MongoDB connection failed:', error);
          throw error;
        });
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
      .then(() => {
        console.log("MongoDB connected successfully");
        return client!;
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error);
        throw error;
      });
  }
}

// Resilient memory store fallback when MONGODB_URI is not set locally
interface UserMemoryRecord {
  deviceId: string;
  freeSpinsUsed: number;
  paidUntil: number;
  createdAt: number;
}

const memoryStore: Map<string, UserMemoryRecord> = new Map();

export async function getUserRecord(deviceId: string): Promise<UserMemoryRecord> {
  if (clientPromise) {
    try {
      const cli = await clientPromise;
      const db = cli.db('couplegames');
      const user = await db.collection('users').findOne({ deviceId });
      if (user) {
        return {
          deviceId: user.deviceId,
          freeSpinsUsed: user.freeSpinsUsed || 0,
          paidUntil: user.paidUntil || 0,
          createdAt: user.createdAt || Date.now(),
        };
      }
    } catch (err) {
      console.warn('MongoDB connection error, falling back to local memory store:', err);
    }
  }

  // Fallback to memory store
  if (!memoryStore.has(deviceId)) {
    memoryStore.set(deviceId, {
      deviceId,
      freeSpinsUsed: 0,
      paidUntil: 0,
      createdAt: Date.now(),
    });
  }
  return memoryStore.get(deviceId)!;
}

export async function incrementFreeSpin(deviceId: string): Promise<UserMemoryRecord> {
  if (clientPromise) {
    try {
      const cli = await clientPromise;
      const db = cli.db('couplegames');
      const result = await db.collection('users').findOneAndUpdate(
        { deviceId },
        {
          $inc: { freeSpinsUsed: 1 },
          $setOnInsert: { paidUntil: 0, createdAt: Date.now() }
        },
        { upsert: true, returnDocument: 'after' }
      );
      if (result) {
        return {
          deviceId: result.deviceId,
          freeSpinsUsed: result.freeSpinsUsed || 0,
          paidUntil: result.paidUntil || 0,
          createdAt: result.createdAt || Date.now(),
        };
      }
    } catch (err) {
      console.warn('MongoDB update error, using memory fallback:', err);
    }
  }

  const record = await getUserRecord(deviceId);
  record.freeSpinsUsed += 1;
  memoryStore.set(deviceId, record);
  return record;
}

export async function activate24HourPass(deviceId: string): Promise<UserMemoryRecord> {
  const paidUntil = Date.now() + 24 * 60 * 60 * 1000; // 24 Hours from now

  if (clientPromise) {
    try {
      const cli = await clientPromise;
      const db = cli.db('couplegames');

      // Update User paidUntil
      await db.collection('users').updateOne(
        { deviceId },
        {
          $set: { paidUntil },
          $setOnInsert: { freeSpinsUsed: 3, createdAt: Date.now() }
        },
        { upsert: true }
      );

      // Log payment record
      await db.collection('payments').insertOne({
        deviceId,
        amount: 25,
        currency: 'INR',
        status: 'SUCCESS',
        paidAt: Date.now(),
        validUntil: paidUntil,
      });

    } catch (err) {
      console.warn('MongoDB payment update error, using memory fallback:', err);
    }
  }

  const record = await getUserRecord(deviceId);
  record.paidUntil = paidUntil;
  memoryStore.set(deviceId, record);
  return record;
}

export default clientPromise;
