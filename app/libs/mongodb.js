import mongoose from "mongoose";

// Connection pooling and caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToMongoDB(name) {
  // Return existing connection if available
  if (cached.conn) {
    console.log(`Using cached MongoDB connection for ${name}`);
    return cached.conn;
  }

  // Create new connection only if needed
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Connection pool size
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(process.env.DB_URL, opts)
      .then((mongoose) => {
        console.log(`MongoDB connected from ${name}`);
        return mongoose;
      })
      .catch((error) => {
        console.error(`MongoDB connection error from ${name}:`, error);
        cached.promise = null; // Reset on error
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
