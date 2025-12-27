/**
 * Input sanitization utilities for eOrdonnances
 * Prevents XSS, injection attacks, and ensures data cleanliness
 */

/**
 * Sanitize a string by removing dangerous characters and HTML
 * @param {string} input - String to sanitize
 * @param {Object} options - Sanitization options
 * @returns {string} Sanitized string
 */
export function sanitizeString(input, options = {}) {
  if (typeof input !== 'string') return '';
  
  const {
    allowHtml = false,
    maxLength = 10000,
    trim = true,
  } = options;

  let sanitized = input;

  // Trim whitespace if requested
  if (trim) {
    sanitized = sanitized.trim();
  }

  // Remove HTML tags unless specifically allowed
  if (!allowHtml) {
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*>/gi, '')
      .replace(/<link\b[^>]*>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ''); // Remove all remaining HTML tags
  }

  // Remove potentially dangerous characters
  sanitized = sanitized
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Control characters
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, ''); // Event handlers

  // Enforce max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize an object by sanitizing all string values
 * @param {Object} obj - Object to sanitize
 * @param {Object} options - Sanitization options
 * @returns {Object} Sanitized object
 */
export function sanitizeObject(obj, options = {}) {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value, options);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value, options);
      } else {
        sanitized[key] = value;
      }
    }
  }

  return sanitized;
}

/**
 * Sanitize disease data specifically
 * @param {Object} diseaseData - Disease data to sanitize
 * @returns {Object} Sanitized disease data
 */
export function sanitizeDiseaseData(diseaseData) {
  if (!diseaseData || typeof diseaseData !== 'object') {
    return diseaseData;
  }

  const sanitized = { ...diseaseData };

  // Sanitize disease object
  if (sanitized.disease) {
    sanitized.disease = {
      name: sanitizeString(sanitized.disease.name || '', {
        maxLength: 200,
        trim: true,
      }),
      specialty: Array.isArray(sanitized.disease.specialty)
        ? sanitized.disease.specialty.map((s) =>
            sanitizeString(s, { maxLength: 100, trim: true })
          )
        : sanitizeString(sanitized.disease.specialty || '', {
            maxLength: 100,
            trim: true,
          }),
      definition: sanitizeString(sanitized.disease.definition || '', {
        maxLength: 5000,
        trim: true,
      }),
    };
  }

  // Sanitize Dx array
  if (Array.isArray(sanitized.Dx)) {
    sanitized.Dx = sanitized.Dx.map((dx) =>
      sanitizeString(dx, { maxLength: 500, trim: true })
    ).filter(Boolean);
  }

  // Sanitize DDx
  if (sanitized.DDx && typeof sanitized.DDx === 'string') {
    sanitized.DDx = sanitizeString(sanitized.DDx, {
      maxLength: 500,
      trim: true,
    });
  }

  return sanitized;
}

/**
 * Sanitize search query
 * @param {string} query - Search query to sanitize
 * @returns {string} Sanitized query
 */
export function sanitizeSearchQuery(query) {
  if (typeof query !== 'string') return '';

  return sanitizeString(query, {
    maxLength: 200,
    trim: true,
  })
    // Remove MongoDB operators
    .replace(/\$[\w]+/g, '')
    // Remove regex special characters that could cause ReDoS
    .replace(/[()[\]{}*+?|\\]/g, '')
    // Limit consecutive characters to prevent ReDoS
    .replace(/(.)\1{10,}/g, '$1$1$1$1$1');
}

/**
 * Sanitize MongoDB query to prevent injection
 * @param {Object} query - MongoDB query object
 * @returns {Object} Sanitized query
 */
export function sanitizeMongoQuery(query) {
  if (!query || typeof query !== 'object') return {};

  const sanitized = {};

  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      // Remove keys starting with $ (MongoDB operators)
      if (key.startsWith('$')) {
        continue;
      }

      const value = query[key];

      if (typeof value === 'string') {
        sanitized[key] = sanitizeSearchQuery(value);
      } else if (typeof value === 'object' && value !== null) {
        // Recursively sanitize nested objects
        sanitized[key] = sanitizeMongoQuery(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      }
    }
  }

  return sanitized;
}

/**
 * Escape HTML entities to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') return '';

  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
}

/**
 * Validate and sanitize email address
 * @param {string} email - Email to validate and sanitize
 * @returns {string|null} Sanitized email or null if invalid
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return null;

  const sanitized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return null;
  }

  // Additional validation: max length, no dangerous characters
  if (sanitized.length > 254 || /[<>()[\]\\,;:\s"]/.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize URL to prevent javascript: and data: protocols
 * @param {string} url - URL to sanitize
 * @returns {string|null} Sanitized URL or null if invalid
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return null;

  const sanitized = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = sanitized.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return null;
    }
  }

  // Only allow http, https, and relative URLs
  if (
    !lowerUrl.startsWith('http://') &&
    !lowerUrl.startsWith('https://') &&
    !lowerUrl.startsWith('/')
  ) {
    return null;
  }

  return sanitized;
}

/**
 * Remove null bytes from input (prevents null byte injection)
 * @param {string} input - Input to clean
 * @returns {string} Cleaned input
 */
export function removeNullBytes(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/\0/g, '');
}

/**
 * Limit string length safely
 * @param {string} str - String to limit
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add if truncated
 * @returns {string} Limited string
 */
export function limitLength(str, maxLength, suffix = '...') {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}
