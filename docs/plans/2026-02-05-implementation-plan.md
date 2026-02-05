# Iran Uprising Digital Memorial - Implementation Plan

**Date:** February 5, 2026
**Duration:** 16 weeks (8 milestones)
**Total Story Points:** 305

---

## Executive Summary

This plan details the full implementation of the Digital Divar memorial platform. The system honors victims of Iran's Women, Life, Freedom uprising while providing maximum anonymity and censorship resistance.

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Scope | Full 8 milestones | Complete feature set for crisis response |
| Infrastructure | Vercel + Privacy VPS | Fast CDN frontend + anonymous backend |
| Backend | Node.js + Fastify | Same ecosystem as frontend, fast dev |
| E2E Encryption | Signal Protocol | Battle-tested, forward secrecy |
| Moderation | None initially | Zero friction for grieving families |
| Tor | Day 1 .onion | Protect users inside Iran immediately |
| Mobile | PWA only | Single codebase, universal access |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                    │
├─────────────────────────────────────────────────────────────────┤
│  Iran (Tor)          │  Diaspora (Direct)  │  Tor Browser       │
│  ↓                   │  ↓                  │  ↓                 │
│  .onion address      │  iran-uprising.com  │  Auto .onion       │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   VERCEL      │    │  TOR HIDDEN   │    │   SNOWFLAKE   │
│   (Frontend)  │    │   SERVICE     │    │   BRIDGE      │
│   SvelteKit   │◄──►│   .onion      │    │   (WebRTC)    │
│   Static PWA  │    │               │    │               │
└───────────────┘    └───────┬───────┘    └───────────────┘
                             │
                    ┌────────▼────────┐
                    │  PRIVACY VPS    │
                    │  (Iceland)      │
                    ├─────────────────┤
                    │  Fastify API    │
                    │  SQLite+Cipher  │
                    │  No Logs        │
                    └─────────────────┘
```

### Infrastructure Components

**Vercel (Frontend)**
- SvelteKit static site
- Global CDN distribution
- Edge functions for Alt-Svc header
- Domain: iran-uprising.com

**Privacy VPS (Backend)**
- Provider: OrangeWebsite (Iceland) or Hetzner (Finland)
- Tor hidden service
- Fastify API server
- SQLite + SQLCipher database
- Zero logging configuration

---

## Data Models

### Memorial

```typescript
interface Memorial {
  hash: string;           // Content-addressed ID (SHA-256)
  photo_hash: string;     // Hash of image (stored separately)
  name_persian: string;   // فارسی name
  name_latin: string;     // Transliterated name
  age: number | null;     // Age at death (optional)
  date_death: string;     // Day-level only (YYYY-MM-DD)
  location: string;       // City/province only
  circumstances: string;  // Brief description
  candle_count: number;   // Incremented anonymously
  flower_count: number;   // Incremented anonymously
  created_day: string;    // Day-level timestamp only
}
```

### Encrypted Message

```typescript
interface EncryptedMessage {
  hash: string;           // Content-addressed ID
  thread_hash: string;    // Which thread this belongs to
  ciphertext: string;     // Signal Protocol encrypted blob
  timestamp_day: string;  // Day-level only
  expires_at: string;     // Auto-delete date
}
```

### Thread

```typescript
interface Thread {
  hash: string;           // Content-addressed ID
  type: 'open' | 'private' | 'memorial';
  memorial_hash?: string; // If attached to memorial
  title?: string;         // For open threads
  message_count: number;
  created_day: string;
  expires_at?: string;    // For private threads
}
```

---

## API Design

### Single Endpoint Architecture

All requests go to `POST /api` with action in body. Prevents traffic analysis.

### Request Format (Padded to 4KB)

```typescript
{
  nonce: string;      // Random 32 bytes
  action: string;     // Action name
  payload: object;    // Action-specific data
  padding: string;    // Random data to reach 4KB
}
```

### Response Format (Padded to 8KB)

```typescript
{
  success: boolean;
  data: object;
  padding: string;    // Random data to reach 8KB
}
```

### API Actions

| Action | Description | Auth |
|--------|-------------|------|
| `get_memorials` | List/paginate memorials | None |
| `get_memorial` | Single memorial by hash | None |
| `create_memorial` | Submit new memorial | PoW |
| `light_candle` | Increment candle count | None |
| `leave_flower` | Increment flower count | None |
| `search` | Search memorials | None |
| `get_threads` | List open threads | None |
| `get_thread` | Single thread with messages | None |
| `create_thread` | New thread | PoW |
| `post_message` | Add to thread | PoW |
| `flag_content` | Report abuse | None |
| `get_stats` | Aggregate statistics | None |

---

## Frontend Architecture

### Route Structure

```
src/routes/
├── +layout.svelte          # Root layout, RTL, language
├── +page.svelte            # Hero landing (Hajleh) ✅
├── wall/
│   └── +page.svelte        # Infinite scroll memorial wall
├── memorial/
│   └── [hash]/
│       └── +page.svelte    # Individual memorial (Khatm)
├── create/
│   └── +page.svelte        # Submit new memorial
├── threads/
│   ├── +page.svelte        # Open threads list
│   └── [hash]/
│       └── +page.svelte    # Thread detail + replies
├── private/
│   └── [invite]/
│       └── +page.svelte    # E2E encrypted private thread
├── settings/
│   └── +page.svelte        # Language, mode, cache, panic
└── about/
    └── +page.svelte        # Security info, how to help
```

### Component Library

```
src/lib/components/
├── memorial/
│   ├── MemorialCard.svelte
│   ├── MemorialDetail.svelte
│   ├── CandleButton.svelte
│   ├── FlowerButton.svelte
│   └── PhotoUpload.svelte
├── wall/
│   ├── InfiniteWall.svelte
│   └── SearchBar.svelte
├── messaging/
│   ├── ThreadList.svelte
│   ├── ThreadDetail.svelte
│   ├── MessageComposer.svelte
│   └── PrivateThread.svelte
├── ui/
│   ├── Navigation.svelte
│   ├── LanguageToggle.svelte
│   ├── PanicButton.svelte
│   ├── TorIndicator.svelte
│   └── LoadingCandle.svelte
└── security/
    ├── ProofOfWork.svelte
    └── SecurityWarning.svelte
```

---

## PWA & Offline Architecture

### Service Worker Strategy

| Content Type | Strategy | Fallback |
|--------------|----------|----------|
| App shell | Cache-first | Always available |
| CSS/JS/Fonts | Cache-first | Always available |
| Memorial data | Network-first | Cached version |
| Images | Cache-first | Placeholder |
| Thread data | Stale-while-revalidate | Cached version |

### IndexedDB Schema

```typescript
// Cached memorials
memorials: { hash, data, cached_at }

// Pending offline actions
pending_actions: { id, action, payload, created_at }

// E2E encryption keys (never leaves device)
crypto_keys: { thread_hash, key_bundle }

// User preferences
settings: { language, mode, panic_url }
```

### Offline Capabilities

| Feature | Works Offline | Notes |
|---------|---------------|-------|
| Browse cached memorials | ✅ | IndexedDB |
| Light candles | ✅ | Queued |
| Leave flowers | ✅ | Queued |
| Write messages | ✅ | Queued |
| Search cached | ✅ | Local only |
| View new content | ❌ | Requires network |
| Create memorial | ❌ | Requires PoW |

---

## Security Implementation

### Tor Hidden Service

```
# /etc/tor/torrc
HiddenServiceDir /var/lib/tor/iran-uprising/
HiddenServicePort 80 127.0.0.1:3000
HiddenServiceVersion 3
```

### Headers (Vercel Edge)

```typescript
// Alt-Svc for automatic .onion upgrade
'Alt-Svc': 'h2="[onion].onion:443"; ma=86400'
'Onion-Location': 'http://[onion].onion'

// Content Security Policy
'Content-Security-Policy': `
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  connect-src 'self' http://*.onion;
  frame-ancestors 'none';
`
```

### Signal Protocol (E2E Messaging)

```typescript
// Client-side key generation
const identityKeyPair = KeyHelper.generateIdentityKeyPair();
const preKeys = KeyHelper.generatePreKeys(0, 100);
const signedPreKey = KeyHelper.generateSignedPreKey(identityKeyPair, 0);

// Stored in IndexedDB only - never sent to server
await cryptoStore.saveIdentity(identityKeyPair);

// Encryption
const session = new SessionCipher(store, recipientAddress);
const ciphertext = await session.encrypt(plaintext);
```

### Zero-Logging Server

```typescript
const server = Fastify({
  logger: false,
  disableRequestLogging: true,
  trustProxy: false
});
```

---

## Milestone Schedule

### Milestone 1: Security Foundation (Week 1-2)
**28 Story Points**

- [ ] Provision privacy VPS (Iceland/Finland) - 5 SP
- [ ] Docker containerization - 5 SP
- [ ] Tor hidden service setup - 3 SP
- [ ] Zero-logging Fastify server - 5 SP
- [ ] SQLite + SQLCipher setup - 5 SP
- [ ] HTTPS + CSP headers - 3 SP
- [ ] Alt-Svc header on Vercel - 2 SP

### Milestone 2: Core Application (Week 3-4)
**34 Story Points**

- [ ] Memorial data model + API - 3 SP
- [ ] Photo upload with black ribbon - 5 SP
- [ ] Memorial card component - 5 SP
- [ ] Service worker + offline shell - 8 SP
- [ ] PWA manifest + install prompt - 3 SP
- [ ] Persian/English i18n - 5 SP
- [ ] Responsive navigation - 5 SP

### Milestone 3: Memorial Wall (Week 5-6)
**37 Story Points**

- [ ] Infinite scroll wall view - 8 SP
- [ ] Individual memorial page (Khatm style) - 5 SP
- [ ] Light candle interaction - 5 SP
- [ ] Leave flower interaction - 3 SP
- [ ] Memorial search - 5 SP
- [ ] Memorial submission form - 8 SP
- [ ] Brick wall parallax texture - 3 SP

### Milestone 4: Messaging (Week 7-8)
**53 Story Points**

- [ ] Signal Protocol integration - 13 SP
- [ ] Message data model + API - 3 SP
- [ ] Open thread view - 5 SP
- [ ] Create thread + reply - 8 SP
- [ ] Private thread (E2E encrypted) - 8 SP
- [ ] Join via invite link - 5 SP
- [ ] Message expiration (30 days) - 3 SP
- [ ] Proof-of-work rate limiting - 8 SP

### Milestone 5: Bridge Features (Week 9-10)
**29 Story Points**

- [ ] Inside/Outside mode toggle - 2 SP
- [ ] Inside mode optimizations - 5 SP
- [ ] Outside mode features - 3 SP
- [ ] Panic button (quick exit) - 3 SP
- [ ] Request padding (4KB/8KB) - 5 SP
- [ ] Snowflake bridge integration - 8 SP
- [ ] Security warning dialogs - 3 SP

### Milestone 6: Advanced PWA (Week 11-12)
**32 Story Points**

- [ ] Background sync for messages - 5 SP
- [ ] Orbot detection (Android) - 8 SP
- [ ] Update notifications - 3 SP
- [ ] Cache management UI - 3 SP
- [ ] Content bundle export - 5 SP
- [ ] Snowflake relay volunteering - 8 SP

### Milestone 7: Polish & Testing (Week 13-14)
**53 Story Points**

- [ ] Unit test suite (80% coverage) - 8 SP
- [ ] Integration tests - 8 SP
- [ ] E2E Playwright tests - 13 SP
- [ ] Performance testing - 5 SP
- [ ] Tor compatibility testing - 5 SP
- [ ] Accessibility (WCAG 2.1 AA) - 8 SP
- [ ] Loading states + error states - 6 SP

### Milestone 8: Documentation & Launch (Week 15-16)
**39 Story Points**

- [ ] User guide (Persian) - 8 SP
- [ ] User guide (English) - 5 SP
- [ ] Security documentation - 5 SP
- [ ] Deployment guide - 3 SP
- [ ] CI/CD pipeline - 5 SP
- [ ] Backup system - 5 SP
- [ ] Privacy-preserving monitoring - 5 SP
- [ ] Domain resilience (backup domains) - 3 SP

---

## Critical Path

```
Week 1: VPS + Docker + Tor
    ↓
Week 2: Database + Zero-logging
    ↓
Week 3: Memorial model + Photo upload
    ↓
Week 4: PWA shell + Offline
    ↓
Week 5-6: Wall + Search + Submit
    ↓
Week 7-8: Signal Protocol + Messaging
    ↓
Week 9-16: Bridge, Polish, Docs
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Signal Protocol complexity | High | High | Full 2 weeks allocated |
| Tor performance | Medium | Medium | Test from day 1 |
| VPS provider issues | Low | High | Backup provider ready |
| Scope creep | Medium | Medium | Strict P0/P1 focus |
| Domain seizure | Low | High | Backup domains + .onion |

---

## Current Progress

**Completed:**
- [x] SvelteKit project initialized
- [x] Tailwind CSS v4 design system
- [x] Parallax hero section (Hajleh)
- [x] RTL support for Persian
- [x] 25 graphics assets generated
- [x] Deployed to Vercel

**Next Steps:**
1. Provision privacy VPS
2. Set up Tor hidden service
3. Create Fastify API skeleton
4. Implement memorial data model

---

*Document Hash: [To be computed]*
*Created: February 5, 2026*
*Author: Claude + Jesper*
