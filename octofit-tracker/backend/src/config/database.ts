import mongoose from 'mongoose';

export const DATABASE_NAME = 'octofit_db';
export const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DATABASE_NAME}`;

export async function connectToDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGODB_URI, {
    dbName: DATABASE_NAME,
  });
}