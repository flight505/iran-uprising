# Security Policy

## Our Commitment

Digital Divar is designed with user safety as the highest priority. We understand that users of this platform, particularly those inside Iran, may face serious risks. This document outlines the security measures we implement to protect users.

## Threat Model

### Protected Against

| Threat | Mitigation |
|--------|------------|
| Network surveillance | Tor hidden service, HTTPS, request padding |
| Traffic analysis | Uniform request/response sizes (4KB/8KB) |
| Server compromise | Zero logging, encrypted database |
| Message interception | End-to-end encryption (ECDH + AES-GCM) |
| Browser forensics | Panic button, cache clearing |
| Metadata analysis | Day-level timestamps only, no IP logging |

### Not Protected Against

- Physical access to unlocked device
- Malware on user's device
- Social engineering attacks
- Attacks on Tor network itself

## Security Features

### 1. Zero Server Logging

The backend server is configured to log nothing:

```typescript
const server = Fastify({
  logger: false,
  disableRequestLogging: true,
  trustProxy: false
});
```

- No IP addresses recorded
- No access logs
- No error logs containing user data
- No request timing information

### 2. Encrypted Database

All data at rest is encrypted using SQLCipher:

- AES-256 encryption
- PBKDF2 key derivation
- Encrypted even if server is seized

### 3. End-to-End Encryption

Private messages use WebCrypto with:

- **ECDH (P-384)** for key exchange
- **AES-GCM (256-bit)** for symmetric encryption
- **Forward secrecy** via ephemeral keys
- Keys never leave the client device

### 4. Request Padding

All API requests are padded to prevent traffic analysis:

```
Request:  4096 bytes (padded)
Response: 8192 bytes (padded)
```

This prevents observers from distinguishing between:
- Viewing a memorial vs. posting a message
- Short messages vs. long messages
- Searches vs. submissions

### 5. Tor Hidden Service

The platform is accessible via Tor at a `.onion` address:

- Hides server location
- Encrypts traffic end-to-end
- Bypasses DNS blocking
- Alt-Svc header for automatic upgrades

### 6. Content-Addressed Storage

All content uses SHA-256 hashes as identifiers:

- No sequential IDs to enumerate
- Content integrity verification
- Deduplication of identical content

### 7. Minimal Timestamps

Only day-level precision for all timestamps:

- `created_day: "2026-02-05"` (not `2026-02-05T14:32:15Z`)
- Prevents correlation attacks
- Reduces metadata leakage

### 8. Panic Button

Emergency data clearing:

- Clears localStorage and sessionStorage
- Clears IndexedDB
- Unregisters service workers
- Clears cache storage
- Redirects to safe URL (configurable)
- Keyboard shortcut: `Ctrl+Shift+Q`

### 9. Inside Iran Mode

When enabled, the app:

- Shows Tor connection indicator
- Enables panic button in header
- Auto-enables reduced motion
- Prefers Tor connections
- Minimizes visual data exposure

## Security Headers

The following headers are set on all responses:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  connect-src 'self' http://*.onion;
  frame-ancestors 'none';

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

## Reporting Vulnerabilities

If you discover a security vulnerability, please:

1. **Do not** open a public issue
2. Email security concerns to: [security contact]
3. Include detailed reproduction steps
4. Allow 90 days for remediation before disclosure

## Security Checklist for Users

### Before Using (Inside Iran)

- [ ] Use Tor Browser or Orbot
- [ ] Access via .onion address
- [ ] Enable "Inside Iran" mode in settings
- [ ] Configure panic URL to a safe site
- [ ] Memorize panic shortcut: `Ctrl+Shift+Q`

### While Using

- [ ] Don't share personal identifying information
- [ ] Use private threads for sensitive discussions
- [ ] Clear browser after each session
- [ ] Be aware of shoulder surfing

### Device Security

- [ ] Keep device locked when not in use
- [ ] Use full-disk encryption
- [ ] Keep Tor Browser updated
- [ ] Don't install unknown apps

## Limitations

### What We Cannot Protect

1. **Your identity if you share it** - Don't post identifying information
2. **Photos with EXIF data** - We strip metadata, but be careful
3. **Writing style analysis** - Your writing patterns may identify you
4. **Timing attacks** - If you always post at the same time

### What Remains Visible

1. **To server operator**: Encrypted ciphertext, timestamps (day only)
2. **To network observer**: That you're using Tor (if not using bridges)
3. **To physical observer**: That you're using a computer/phone

## Updates

This security policy is reviewed and updated regularly. Last update: February 2026.

---

**Remember**: No system is 100% secure. Practice defense in depth and operational security.
