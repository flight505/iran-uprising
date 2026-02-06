# Iran Uprising Digital Memorial - Project Configuration

## Project Overview

Digital Divar (دیوار دیجیتال) is a privacy-first memorial platform for victims of Iran's Women, Life, Freedom movement. The platform prioritizes user safety with E2E encryption, Tor support, and zero logging.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | SvelteKit 2, Svelte 5 (runes) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide Svelte |
| Encryption | WebCrypto (ECDH + AES-GCM) |
| Backend | Fastify (Node.js) |
| Database | SQLite + SQLCipher |
| Testing | Vitest, Testing Library |
| Package Manager | pnpm |

## Commands

```bash
pnpm dev           # Development server
pnpm build         # Production build
pnpm check         # TypeScript validation
pnpm test          # Run tests
pnpm test:watch    # Watch mode
pnpm lint          # Lint code
pnpm format        # Format code
```

## Architecture Patterns

### Svelte 5 Runes
Use Svelte 5 runes syntax:
- `$state()` for reactive state
- `$derived()` for computed values
- `$props()` for component props
- `$effect()` for side effects

### Component Structure
```
src/lib/components/
├── memorial/       # Memorial-related components
├── messaging/      # Thread and message components
├── pwa/            # PWA utilities (UpdateNotification, InstallPrompt)
├── security/       # Security components (ProofOfWork)
└── ui/             # Shared UI components (Navigation, buttons)
```

### State Management
- `src/lib/stores/preferences.ts` - User preferences (mode, panic URL)
- `src/lib/i18n/` - Language and translations
- `src/lib/pwa/service.ts` - PWA state (updateAvailable, installable)
- `src/lib/offline/network.ts` - Network status (isOnline, isSyncing)

### API Pattern
All API requests go through single endpoint with padding:
```typescript
// src/lib/api/client.ts
POST /api { nonce, action, payload, padding }
```

## Security Considerations

### Always
- Use day-level timestamps only (`created_day`, not `created_at`)
- Pad requests to 4KB, responses to 8KB
- Never log user data or IPs
- Use content-addressed hashes for IDs

### Never
- Store precise timestamps
- Log request/response bodies
- Store IP addresses
- Use sequential IDs

## User Modes

### Inside Iran Mode
When `mode === 'inside'`:
- Show panic button in header
- Show Tor connection indicator
- Auto-enable reduced motion
- Prefer Tor connections
- Keyboard shortcut: Ctrl+Shift+Q for panic

### Outside Iran Mode
When `mode === 'outside'`:
- Standard navigation
- Full animations
- Share functionality

## i18n

Languages: Persian (fa) - RTL, English (en) - LTR

```typescript
import { t, isRTL } from '$lib/i18n';

// In component
{$t.hero.title}  // "زن، زندگی، آزادی" or "Woman, Life, Freedom"
```

## Testing

Test files: `*.test.ts` next to source files

```bash
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

Mocks available:
- `$app/environment`, `$app/stores`, `$app/navigation`
- localStorage, sessionStorage, IndexedDB
- crypto (WebCrypto), navigator, caches

## File Naming Conventions

- Components: `PascalCase.svelte`
- Routes: `+page.svelte`, `+layout.svelte`
- Stores: `camelCase.ts`
- Tests: `*.test.ts`
- Types: in same file or `types.ts`

## Environment Variables

Frontend (Vite):
- `VITE_API_URL` - Backend API endpoint
- `VITE_ONION_ADDRESS` - Tor hidden service address

Backend:
- `DATABASE_KEY` - SQLCipher encryption key
- `PORT` - Server port (default: 3000)
