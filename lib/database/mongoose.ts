
/* eslint-disable no-var */
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare a specific type for the global cache instead of using `any`
declare global {
  var mongooseCache: MongooseConnection | undefined;
}

// Use `const` since `cached` is not reassigned
const cached: MongooseConnection = globalThis.mongooseCache || { conn: null, promise: null };

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL');
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'dreamflux',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
