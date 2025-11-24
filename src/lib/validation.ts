/**
 * Input Validation Utilities
 * 
 * Provides secure input validation and sanitization functions
 * to prevent injection attacks and ensure data integrity.
 */

/**
 * Validates and sanitizes text input
 * @param input - The input string to validate
 * @param maxLength - Maximum allowed length (default: 10000)
 * @returns Validated and trimmed string
 * @throws Error if input exceeds maximum length
 */
export const validateTextInput = (input: string, maxLength: number = 10000): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  const trimmed = input.trim();
  
  if (trimmed.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
  }

  return trimmed;
};

/**
 * Validates numeric input within a range
 * @param value - The numeric value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Validated number
 * @throws Error if value is out of range
 */
export const validateNumberInput = (
  value: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Value must be a valid number');
  }

  if (value < min || value > max) {
    throw new Error(`Value must be between ${min} and ${max}`);
  }

  return value;
};

/**
 * Sanitizes HTML to prevent XSS attacks
 * @param input - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates URL format
 * @param url - URL to validate
 * @returns true if valid URL format
 */
export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Escapes special characters for use in RegExp
 * @param string - String to escape
 * @returns Escaped string
 */
export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Validates file size
 * @param fileSize - Size in bytes
 * @param maxSizeMB - Maximum allowed size in MB (default: 10MB)
 * @returns true if file size is within limit
 */
export const validateFileSize = (fileSize: number, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

/**
 * Validates file type
 * @param fileName - Name of the file
 * @param allowedTypes - Array of allowed file extensions
 * @returns true if file type is allowed
 */
export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

/**
 * Rate limiting helper
 * @param key - Unique identifier for the action
 * @param maxAttempts - Maximum number of attempts
 * @param windowMs - Time window in milliseconds
 * @returns true if action is allowed
 */
export const checkRateLimit = (
  key: string,
  maxAttempts: number = 10,
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const storageKey = `ratelimit_${key}`;
  
  const data = localStorage.getItem(storageKey);
  const attempts = data ? JSON.parse(data) : [];
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  recentAttempts.push(now);
  localStorage.setItem(storageKey, JSON.stringify(recentAttempts));
  
  return true;
};
