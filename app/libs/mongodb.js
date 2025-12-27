import mongoose from "mongoose";
import { logError } from "@/app/libs/errors/errorHandler";

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

  // Validate DB_URL exists
  if (!process.env.DB_URL) {
    const error = new Error('DB_URL environment variable is not defined');
    logError(error, { context: 'connectToMongoDB', name });
    throw error;
  }

  // Create new connection only if needed
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Connection pool size
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose
      .connect(process.env.DB_URL, opts)
      .then((mongoose) => {
        console.log(`MongoDB connected from ${name}`);
        return mongoose;
      })
      .catch((error) => {
        console.error(`MongoDB connection error from ${name}:`, error.message);
        logError(error, { context: 'connectToMongoDB', name });
        cached.promise = null; // Reset on error
        
        // Throw user-friendly error
        throw new Error(
          'Impossible de se connecter à la base de données. Veuillez réessayer plus tard.'
        );
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    logError(e, { context: 'connectToMongoDB.await', name });
    throw e;
  }

  return cached.conn;
}

/**
 * Safely disconnect from MongoDB
 * Useful for cleanup in tests or scripts
 */
export async function disconnectFromMongoDB() {
  try {
    if (cached.conn) {
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
      console.log('MongoDB disconnected');
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    logError(error, { context: 'disconnectFromMongoDB' });
  }
}

/**
 * Check if MongoDB is connected
 * @returns {boolean} Connection status
 */
export function isConnected() {
  return cached.conn !== null && mongoose.connection.readyState === 1;
}

/**
 * Get connection status string
 * @returns {string} Connection status
 */
export function getConnectionStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
}
