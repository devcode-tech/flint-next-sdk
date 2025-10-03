/**
 * Security utilities for the SDK
 */

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate URL to prevent javascript: and data: URIs
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';
  
  const trimmedUrl = url.trim().toLowerCase();
  
  // Block dangerous protocols
  if (
    trimmedUrl.startsWith('javascript:') ||
    trimmedUrl.startsWith('data:') ||
    trimmedUrl.startsWith('vbscript:') ||
    trimmedUrl.startsWith('file:')
  ) {
    return '';
  }
  
  return url;
}

// Content Security Policy helpers
export function setupCSP() {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for React
    "style-src 'self' 'unsafe-inline'", // Required for inline styles
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'"
  ].join('; ');
  
  document.head.appendChild(meta);
}

// Validate form data
export function validateFormData(data: Record<string, any>): boolean {
  // Check for prototype pollution
  if ('__proto__' in data || 'constructor' in data || 'prototype' in data) {
    console.error('Security: Potential prototype pollution detected');
    return false;
  }
  
  // Validate data size (prevent DoS)
  const dataString = JSON.stringify(data);
  const maxSize = 5 * 1024 * 1024; // 5MB limit
  
  if (dataString.length > maxSize) {
    console.error('Security: Form data exceeds maximum size');
    return false;
  }
  
  return true;
}

// Rate limiting
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 60000; // 1 minute

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }

  reset(key: string) {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();