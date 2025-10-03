export function sanitizeInput(input) {
    if (typeof input !== 'string')
        return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
export function sanitizeUrl(url) {
    if (typeof url !== 'string')
        return '';
    const trimmedUrl = url.trim().toLowerCase();
    if (trimmedUrl.startsWith('javascript:') ||
        trimmedUrl.startsWith('data:') ||
        trimmedUrl.startsWith('vbscript:') ||
        trimmedUrl.startsWith('file:')) {
        return '';
    }
    return url;
}
export function setupCSP() {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https:",
        "frame-ancestors 'none'"
    ].join('; ');
    document.head.appendChild(meta);
}
export function validateFormData(data) {
    if ('__proto__' in data || 'constructor' in data || 'prototype' in data) {
        console.error('Security: Potential prototype pollution detected');
        return false;
    }
    const dataString = JSON.stringify(data);
    const maxSize = 5 * 1024 * 1024;
    if (dataString.length > maxSize) {
        console.error('Security: Form data exceeds maximum size');
        return false;
    }
    return true;
}
class RateLimiter {
    constructor() {
        this.attempts = new Map();
        this.maxAttempts = 5;
        this.windowMs = 60000;
    }
    isAllowed(key) {
        const now = Date.now();
        const attempts = this.attempts.get(key) || [];
        const recentAttempts = attempts.filter(time => now - time < this.windowMs);
        if (recentAttempts.length >= this.maxAttempts) {
            return false;
        }
        recentAttempts.push(now);
        this.attempts.set(key, recentAttempts);
        return true;
    }
    reset(key) {
        this.attempts.delete(key);
    }
}
export const rateLimiter = new RateLimiter();
//# sourceMappingURL=security.js.map