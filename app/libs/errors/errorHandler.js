/**
 * Error handling utilities for eOrdonnances
 * Centralized error logging and handling
 */

/**
 * Log error to console and external service (when implemented)
 * @param {Error} error - The error object
 * @param {Object} context - Additional context about the error
 */
export function logError(error, context = {}) {
  const errorInfo = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...context,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorInfo);
  }

  // TODO: Send to external error tracking service (Sentry, etc.)
  // Example:
  // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  //   Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Handle MongoDB errors and return user-friendly messages
 * @param {Error} error - MongoDB error
 * @returns {string} User-friendly error message
 */
export function handleDatabaseError(error) {
  logError(error, { type: 'database' });

  // Connection errors
  if (
    error.name === 'MongooseError' ||
    error.name === 'MongoError' ||
    error.message.includes('connect')
  ) {
    return 'Erreur de connexion à la base de données. Veuillez réessayer plus tard.';
  }

  // Invalid ObjectId
  if (error.name === 'CastError') {
    return 'Identifiant invalide. Veuillez vérifier le lien.';
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    return 'Les données fournies sont invalides.';
  }

  // Duplicate key error
  if (error.code === 11000) {
    return 'Cette entrée existe déjà dans la base de données.';
  }

  // Generic error
  return 'Une erreur est survenue lors de l\'accès aux données.';
}

/**
 * Handle API errors
 * @param {Error} error - API error
 * @returns {Object} Error response object
 */
export function handleApiError(error) {
  logError(error, { type: 'api' });

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Une erreur est survenue';

  return {
    error: true,
    message,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };
}

/**
 * Create a custom error with status code
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Error} Custom error
 */
export function createError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

/**
 * Safely execute an async function with error handling
 * @param {Function} fn - Async function to execute
 * @param {Object} context - Context for error logging
 * @returns {Promise} Result or null on error
 */
export async function safeAsync(fn, context = {}) {
  try {
    return await fn();
  } catch (error) {
    logError(error, context);
    return null;
  }
}

/**
 * Validate MongoDB ObjectId format
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid
 */
export function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Error types for consistent error handling
 */
export const ErrorTypes = {
  DATABASE: 'database',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  NOT_FOUND: 'not_found',
  RATE_LIMIT: 'rate_limit',
  UNKNOWN: 'unknown',
};

/**
 * Get error type from error object
 * @param {Error} error - Error object
 * @returns {string} Error type
 */
export function getErrorType(error) {
  if (error.name === 'MongooseError' || error.name === 'MongoError') {
    return ErrorTypes.DATABASE;
  }
  if (error.name === 'ValidationError') {
    return ErrorTypes.VALIDATION;
  }
  if (error.name === 'CastError' || error.statusCode === 404) {
    return ErrorTypes.NOT_FOUND;
  }
  if (error.statusCode === 401) {
    return ErrorTypes.AUTHENTICATION;
  }
  if (error.statusCode === 403) {
    return ErrorTypes.AUTHORIZATION;
  }
  if (error.statusCode === 429) {
    return ErrorTypes.RATE_LIMIT;
  }
  return ErrorTypes.UNKNOWN;
}
