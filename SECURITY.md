# Security Policy

## 🔒 Security Features

Flint Form SDK implements enterprise-grade security features:

### Input Sanitization
- All user inputs are sanitized to prevent XSS attacks
- HTML entities are properly escaped
- Dangerous protocols (javascript:, data:) are blocked

### Data Validation
- Prototype pollution protection
- Maximum data size limits (5MB)
- Schema-based validation using Zod

### Rate Limiting
- Built-in rate limiting (5 attempts per minute)
- Automatic retry with exponential backoff
- Prevents DoS attacks

### Secure Defaults
- HTTPS enforcement in production
- CSP (Content Security Policy) headers
- No source maps in production
- Secure error handling (no sensitive data exposure)

### Code Integrity
- Subresource Integrity (SRI) hashes
- Minified and obfuscated output
- No eval() or Function() usage
- Strict mode enforcement

## 🛡️ Best Practices for Users

### 1. Use HTTPS
Always serve the SDK over HTTPS in production:
```html
<script src="https://your-cdn.com/flint-form.js" 
        integrity="sha384-..." 
        crossorigin="anonymous"></script>
```

### 2. Implement CSP
Add Content Security Policy headers:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://your-cdn.com">
```

### 3. Validate on Server
Always validate form data on your server:
```javascript
new FlintForm().init({
  onSubmit: async (data) => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken() // Add CSRF protection
      },
      body: JSON.stringify(data)
    });
  }
});
```

### 4. Monitor and Log
Implement monitoring for suspicious activity:
```javascript
new FlintForm().init({
  onError: (error) => {
    // Log to your monitoring service
    logToMonitoring('form-error', { error: error.message });
  }
});
```

## 🚨 Reporting Vulnerabilities

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email: security@flintform.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours.

## 📊 Security Audits

- Regular dependency audits via `npm audit`
- Automated security scanning
- Third-party penetration testing (annually)

## 🔄 Update Policy

- Security patches: Released immediately
- Minor updates: Monthly
- Major updates: Quarterly

Always keep your SDK updated to the latest version.