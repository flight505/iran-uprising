# Digital Divar - Iran Uprising Memorial

<div align="center">

**زن، زندگی، آزادی**
*Woman, Life, Freedom*

A secure, anonymous digital memorial for victims of Iran's Women, Life, Freedom uprising.

[Live Demo](https://iran-uprising.vercel.app) · [Report Issue](https://github.com/flight505/iran-uprising/issues)

</div>

---

## Overview

Digital Divar (دیوار دیجیتال) is a privacy-first memorial platform designed to honor those who lost their lives in Iran's Women, Life, Freedom movement. The platform prioritizes user safety with:

- **End-to-End Encryption** for private messaging
- **Tor Hidden Service** support for censorship resistance
- **Zero Server Logging** to protect user privacy
- **Offline-First PWA** for unreliable network conditions
- **Inside/Outside Iran Modes** with security-appropriate features

## Features

### Memorial Wall
- Infinite scroll gallery of victim profiles
- Persian and English language support
- Search by name or location
- Virtual candles and flowers to honor the fallen

### Secure Messaging
- Open community threads attached to memorials
- Private E2E encrypted conversations
- Message expiration after 30 days
- No metadata logging

### Privacy Features
- **Panic Button** - Instant data clearing with safe URL redirect
- **Tor Detection** - Automatic security indicator for .onion access
- **Request Padding** - All API calls padded to uniform size
- **Reduced Motion** - Less visual data to observe

### Offline Support
- Full PWA with offline memorial viewing
- Background sync for interactions
- Export/import memorial bundles
- Install to home screen

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | SvelteKit 2, Svelte 5 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide Svelte |
| Encryption | WebCrypto (ECDH + AES-GCM) |
| Backend | Fastify (Node.js) |
| Database | SQLite + SQLCipher |
| Hosting | Vercel (frontend), Privacy VPS (backend) |
| Testing | Vitest, Testing Library |

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/flight505/iran-uprising.git
cd iran-uprising

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables-1) section for details.

## Project Structure

```
iran-uprising/
├── src/
│   ├── routes/              # SvelteKit pages
│   │   ├── +page.svelte     # Hero landing (Hajleh)
│   │   ├── wall/            # Memorial wall
│   │   ├── memorial/[hash]/ # Individual memorial
│   │   ├── create/          # Submit memorial form
│   │   ├── threads/         # Discussion threads
│   │   └── settings/        # User preferences
│   ├── lib/
│   │   ├── components/      # Svelte components
│   │   ├── stores/          # State management
│   │   ├── i18n/            # Translations
│   │   ├── api/             # API client
│   │   ├── crypto/          # E2E encryption
│   │   ├── offline/         # IndexedDB & sync
│   │   └── pwa/             # PWA utilities
│   └── tests/               # Test setup & mocks
├── server/                  # Backend API (Fastify)
├── static/                  # Static assets
├── public/                  # Public images
└── docs/                    # Documentation
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm check        # TypeScript validation
pnpm lint         # Lint with Prettier & ESLint
pnpm format       # Auto-format code
pnpm test         # Run tests
pnpm test:watch   # Watch mode
pnpm test:coverage # With coverage report
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:3000` |
| `VITE_ONION_ADDRESS` | Tor hidden service address | - |
| `DATABASE_KEY` | SQLCipher encryption key | - |

## User Modes

### Outside Iran Mode
Full features for diaspora users:
- Standard navigation
- Share functionality
- All animations enabled

### Inside Iran Mode
Security-optimized for users in Iran:
- Panic button in header
- Tor connection indicator
- Reduced motion by default
- Minimal data footprint
- Quick exit keyboard shortcut (Ctrl+Shift+Q)

## Security

See [SECURITY.md](./SECURITY.md) for detailed security documentation.

Key security features:
- Zero server-side logging
- E2E encryption for private messages
- Content-addressed storage (SHA-256 hashes)
- Request/response padding to prevent traffic analysis
- Tor hidden service for censorship resistance
- CSP headers to prevent XSS

## Testing

```bash
# Run all tests
pnpm test

# Watch mode for development
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

Current coverage: 65 tests across 6 test suites.

## Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

### Backend (Privacy VPS)

See [docs/deployment.md](./docs/deployment.md) for backend deployment instructions.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

This project honors the memory of those who gave their lives for freedom in Iran.

Special thanks to:
- Human rights organizations documenting the uprising
- Security researchers who advised on privacy measures
- The Iranian diaspora community

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

<div align="center">

**یادشان گرامی**
*Their memory lives on*

</div>
