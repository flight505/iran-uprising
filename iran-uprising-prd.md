# Iran Uprising Digital Memorial
## Product Requirements Document (PRD)

**Version:** 1.0
**Domain:** www.iran-uprising.com
**Codename:** Digital Divar (دیوار دیجیتال)
**Last Updated:** February 5, 2026

---

# Chapter 1: Graphics Asset Specifications

This chapter defines all visual assets required for the Digital Memorial. Each asset includes dimensions, color specifications, and cultural context. These specifications are designed for the graphics generation plugin.

---

## 1.1 Core Visual Identity

### 1.1.1 The Hajleh (حجله) - Hero Shrine Component

**Cultural Context:** The Hajleh is a temporary street shrine for young people who died before marriage. It represents a "wedding that never was" and is immediately recognizable to Iranians as a symbol of untimely death.

**Primary Asset: Hajleh Hero Image**
- **Dimensions:** 1920x1080px (desktop hero), 1080x1920px (mobile hero), 3840x2160px (4K)
- **Format:** PNG with transparency, WebP for web delivery
- **Scene Description:** A glowing Hajleh shrine at night on a dark Tehran street. The shrine is bulbous/lantern-shaped, draped in matte black velvet, with strings of bare incandescent bulbs in Islam Green (#00A651), Amber (#FFBF00), and Blood Red (#8B0000). The interior is lined with small mirrors creating fragmented specular highlights. Colored light spills onto wet cobblestones.
- **Lighting:** Hard shadows from bare bulbs, no diffuse lighting. The green light should dominate (60%), with amber (25%) and red (15%) accents.
- **Atmosphere:** Fog/mist at ground level, suggesting Tehran winter nights.

**Secondary Asset: Hajleh Icon**
- **Dimensions:** 64x64px, 128x128px, 256x256px, 512x512px (icon set)
- **Format:** SVG (scalable), PNG fallbacks
- **Description:** Simplified silhouette of Hajleh shape with glowing green outline, mirror fragments inside represented as white sparkles.

**Color Palette - Hajleh:**
```
Islam Green (Lights):     #00A651 / RGB(0, 166, 81)
Amber Glow:               #FFBF00 / RGB(255, 191, 0)
Blood Red:                #8B0000 / RGB(139, 0, 0)
Matte Black (Velvet):     #1A1A1A / RGB(26, 26, 26)
Chrome Silver (Mirrors):  #C0C0C0 / RGB(192, 192, 192)
Night Sky:                #0D0D1A / RGB(13, 13, 26)
```

---

### 1.1.2 The Memorial Table (Khatm - ختم)

**Cultural Context:** The Khatm is the indoor memorial setup used in homes and mosques. It features specific items that are instantly recognizable: Termeh cloth, portrait with black ribbon, candles, gladiolus flowers, dates, and halva.

**Primary Asset: Memorial Table Scene**
- **Dimensions:** 1920x800px (section background), 800x600px (card background)
- **Format:** PNG, WebP
- **Scene Description:** A wooden table covered with Termeh cloth (deep crimson #722F37 with gold #D4AF37 paisley patterns). Center: a framed black-and-white portrait with diagonal black satin ribbon. Flanking: tall white gladiolus flowers in brass vases. Foreground: pyramid of dates dusted with coconut, brass tray with halva (brown paste with wave patterns and pistachio decoration). Thin white candles in brass holders, flames slightly flickering.
- **Lighting:** Warm candlelight (color temp ~2700K), focused on the portrait, soft shadows.
- **Texture Notes:** The Termeh cloth must show jacquard weave texture, not flat color. Gold threads should catch candlelight subtly.

**Secondary Asset: Black Ribbon Overlay**
- **Dimensions:** Variable (percentage-based), 45-degree diagonal
- **Format:** SVG with transparency
- **Description:** A black satin ribbon (#000000 with subtle sheen gradient) positioned diagonally across the top-right corner of any photo. Width: 8-12% of photo width.
- **Usage:** Applied programmatically to all martyr portraits.

**Secondary Asset: Individual Memorial Items (Icon Set)**
- **Dimensions:** 48x48px, 96x96px, 192x192px each
- **Items to create:**
  - Gladiolus flower (white, single stem)
  - Candle (thin, white, with flame)
  - Date (single, with coconut dust)
  - Halva tray (top-down view, with pattern)
  - Termeh pattern tile (seamless, for backgrounds)

**Color Palette - Khatm:**
```
Termeh Red (Crimson):     #722F37 / RGB(114, 47, 55)
Termeh Gold:              #D4AF37 / RGB(212, 175, 55)
Termeh Blue (Accent):     #1E3A5F / RGB(30, 58, 95)
Bone White (Flowers):     #F5F5DC / RGB(245, 245, 220)
Satin Black (Ribbon):     #000000 with 15% gloss highlight
Date Brown:               #5C4033 / RGB(92, 64, 51)
Halva Brown:              #8B7355 / RGB(139, 115, 85)
Coconut White:            #FFFAF0 / RGB(255, 250, 240)
Brass:                    #B5A642 / RGB(181, 166, 66)
Candlelight:              #FFE4B5 / RGB(255, 228, 181)
```

---

### 1.1.3 The Protest Wall (Divar - دیوار)

**Cultural Context:** The "Divar" represents the raw, urgent aesthetic of the Women, Life, Freedom uprising. Photos are taped to brick walls with cheap tape, accompanied by red handprints, cut hair, and spray-painted slogans. This is gritty, impermanent, and defiant.

**Primary Asset: Protest Wall Background**
- **Dimensions:** 2560x1440px (seamless tileable), 1920x1080px (hero variant)
- **Format:** PNG (high quality), WebP (delivery)
- **Scene Description:** An urban brick wall (beige/gray tones) with visible mortar. Multiple A4 paper printouts taped at various angles with yellowing scotch tape. Some papers are slightly wrinkled or have peeling corners. Red spray paint handprints scattered across the surface. Persian calligraphy graffiti reading "زن، زندگی، آزادی" (Woman, Life, Freedom) stenciled in red. Small tealight candles at the base of the wall, casting upward shadows. Strands of dark hair taped next to some photos.
- **Lighting:** Harsh, from below (tealights) creating dramatic upward shadows. Some ambient streetlight from above-left.
- **Texture:** High-frequency brick texture, visible tape adhesive marks, spray paint overspray.

**Secondary Asset: A4 Paper Frame**
- **Dimensions:** 210x297mm aspect ratio (A4), rendered at 420x594px, 630x891px, 840x1188px
- **Format:** PNG with transparency
- **Description:** A slightly wrinkled white paper with subtle shadow, tape pieces at corners (yellowed, semi-transparent). The center is transparent for photo insertion.

**Secondary Asset: Red Handprint**
- **Dimensions:** 200x250px (variable, multiple versions)
- **Format:** PNG with transparency
- **Variations:** 5 different handprints at different angles, some smeared, some crisp
- **Color:** Blood Red (#8B0000) to Spray Red (#FF0000) gradient

**Secondary Asset: Cut Hair Bundle**
- **Dimensions:** 100x150px
- **Format:** PNG with transparency
- **Description:** A small bundle of dark hair tied with a simple thread, as if freshly cut. Multiple variations.

**Secondary Asset: Tealight Candle**
- **Dimensions:** 40x30px, 80x60px
- **Format:** PNG with transparency, animated GIF (flickering flame)
- **Description:** Small aluminum tealight holder with warm flame, slight glow radius.

**Color Palette - Divar:**
```
Brick Beige:              #C4A484 / RGB(196, 164, 132)
Brick Gray:               #8B8682 / RGB(139, 134, 130)
Mortar Gray:              #A9A9A9 / RGB(169, 169, 169)
Paper White:              #FAFAFA / RGB(250, 250, 250)
Tape Yellow:              #F0E68C / RGB(240, 230, 140) at 70% opacity
Spray Red:                #FF0000 / RGB(255, 0, 0)
Blood Red (Dried):        #8B0000 / RGB(139, 0, 0)
Hair Black:               #1C1C1C / RGB(28, 28, 28)
Tealight Glow:            #FFA500 / RGB(255, 165, 0) with radial gradient
```

---

### 1.1.4 Persian Typography

**Primary Typeface:** Vazirmatn (وزیرمتن)
- **Usage:** All Persian/Farsi text
- **Weights Required:** Light (300), Regular (400), Medium (500), Bold (700), Black (900)
- **Source:** Open source, Google Fonts compatible
- **Fallback:** Tahoma, Arial

**Secondary Typeface (Latin):** Inter
- **Usage:** All English text, UI elements
- **Weights Required:** Regular (400), Medium (500), Semi-Bold (600), Bold (700)

**Calligraphy Assets (Pre-rendered)**

**Asset: "زن، زندگی، آزادی" (Woman, Life, Freedom)**
- **Dimensions:** 800x200px, 1600x400px
- **Format:** SVG (primary), PNG fallback
- **Style:** Spray-paint stencil aesthetic, rough edges
- **Color:** Spray Red (#FF0000) with overspray texture

**Asset: "یاد باد" (Remember / In Memory)**
- **Dimensions:** 400x150px, 800x300px
- **Format:** SVG, PNG
- **Style:** Traditional Nastaliq calligraphy
- **Color:** Satin Black (#000000)

**Asset: "برای آزادی" (For Freedom)**
- **Dimensions:** 600x200px, 1200x400px
- **Format:** SVG, PNG
- **Style:** Bold Naskh script
- **Color:** Islam Green (#00A651)

---

### 1.1.5 UI Component Graphics

**Navigation Icons (Set of 12)**
- **Dimensions:** 24x24px, 32x32px, 48x48px (touch targets)
- **Format:** SVG
- **Style:** Line icons, 2px stroke, rounded caps
- **Icons Required:**
  1. Home (Hajleh silhouette)
  2. Memorial Wall (brick pattern)
  3. Messages (speech bubble with Persian dot)
  4. Search (magnifying glass)
  5. Add Memorial (plus with candle)
  6. Share (three connected dots)
  7. Download/Install PWA (arrow into box)
  8. Security/Tor (onion layers)
  9. Language Toggle (globe with ف/A)
  10. Settings (gear)
  11. Help (question mark in circle)
  12. Exit/Close (X)

**Loading Animation: Candle Flicker**
- **Dimensions:** 64x64px
- **Format:** Animated SVG or Lottie JSON
- **Description:** A single candle flame flickering, loops seamlessly
- **Duration:** 2 seconds

**Empty State Illustration: Waiting Wall**
- **Dimensions:** 400x300px
- **Format:** SVG
- **Description:** A blank brick wall with a single piece of tape, waiting for the first photo. Soft, muted colors.

---

### 1.1.6 Favicon and App Icons

**Favicon Set:**
- 16x16px (favicon.ico)
- 32x32px (favicon-32.png)
- 48x48px (favicon-48.png)
- **Design:** Simplified Hajleh silhouette in Islam Green on transparent background

**PWA App Icons:**
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px
- 384x384px
- 512x512px
- **Design:** Hajleh silhouette with green glow, dark background (#0D0D1A)
- **Maskable Version:** Same design with safe zone padding for adaptive icons

**Apple Touch Icon:**
- 180x180px
- **Design:** Same as PWA icon, optimized for iOS rounded corners

**Open Graph / Social Share Image:**
- 1200x630px (Facebook, LinkedIn)
- 1200x600px (Twitter)
- **Design:** Hajleh hero image with "Iran Uprising" text overlay and "زن، زندگی، آزادی" calligraphy

---

### 1.1.7 Responsive Breakpoints Reference

All graphics should be optimized for these breakpoints:
- **Mobile:** 320px - 480px (1x, 2x, 3x density)
- **Tablet:** 481px - 768px (1x, 2x density)
- **Desktop:** 769px - 1920px (1x, 2x density)
- **4K/Retina:** 1921px+ (1x, 2x density)

---

# Chapter 2: Product Overview

## 2.1 Vision Statement

The Digital Divar is a secure, anonymous memorial and communication platform connecting Iranians inside the country with the global diaspora. It serves as both a sacred space to honor those killed in the Women, Life, Freedom uprising and a resilient communication channel that cannot be silenced by authoritarian censorship.

Like a digital version of the physical walls where Iranians have posted photos of the fallen, this platform transforms an act of mourning into an act of resistance.

## 2.2 Core Principles

1. **Maximum Anonymity:** No user accounts, no tracking, no data retention. The platform cannot betray its users because it knows nothing about them.

2. **Censorship Resistance:** Accessible through multiple channels including Tor, with a Progressive Web App that works offline and can be shared peer-to-peer.

3. **Cultural Authenticity:** Every visual element, interaction, and metaphor is rooted in genuine Iranian mourning traditions, not Western design patterns.

4. **Bridge Not Wall:** The platform connects those inside Iran with the diaspora, enabling two-way communication, not just one-way broadcasting.

5. **Dignity in Memory:** Every person memorialized is treated with the respect of a traditional Khatm, not reduced to a statistic.

## 2.3 Target Users

**Primary: Iranians Inside Iran**
- Accessing through VPN, Tor, or during internet "windows"
- High risk users who need maximum anonymity
- May have limited bandwidth, unreliable connections
- Need offline capability for when internet is cut

**Primary: Iranian Diaspora**
- Exiles, refugees, second-generation Iranians worldwide
- Want to stay connected to events inside Iran
- Want to honor family/friends who have been killed
- Can serve as relay nodes and content moderators

**Secondary: International Allies**
- Journalists, researchers, human rights organizations
- Need verifiable, timestamped records
- May help with translation, amplification

## 2.4 Success Metrics

- **Accessibility:** 95%+ uptime, <3s load time on 3G, 100% Tor compatibility
- **Anonymity:** Zero identifiable user data stored, pass security audit
- **Adoption:** Organic sharing within Iranian networks (measured by unique Tor circuit connections)
- **Content:** Quality of memorials (community-verified, culturally appropriate)
- **Resilience:** Survive targeted DDoS, domain seizure, takedown attempts

---

# Chapter 3: Security Architecture (Maximum Anonymity)

## 3.1 Threat Model

**Adversaries:**
1. **Iranian Government (Primary):** Nation-state capabilities, deep packet inspection, ISP-level blocking, infiltration attempts
2. **Hacktivists (Aligned with regime):** DDoS attacks, defacement attempts
3. **Data Harvesters:** Attempting to identify and persecute users or their families inside Iran

**Assets to Protect:**
1. User identities (anonymous posting)
2. User locations (especially inside Iran)
3. Communication content (messages between users)
4. Memorial data (photos, stories of the fallen)
5. Platform availability (cannot be taken down)

**Security Guarantees:**
- The platform operator (us) cannot identify users even if compelled
- The platform cannot be used to trace messages back to senders
- The platform survives domain seizure, server seizure, or operator arrest

## 3.2 Technical Security Layers

### Layer 1: Network Anonymity

**Tor Hidden Service (.onion)**
- Primary access method for users inside Iran
- Provides end-to-end encryption and IP hiding
- .onion address is the canonical address, clearnet is a convenience mirror

**Clearnet with Tor-Friendly Headers**
- Standard HTTPS site at www.iran-uprising.com
- No JavaScript required for core functionality (works in Tor Browser safest mode)
- No third-party resources loaded (fonts, analytics, CDNs)
- Alt-Svc header advertises .onion address

**Snowflake/WebRTC Bridge Integration**
- For users who cannot access Tor directly
- Browser-based Tor bridge using WebRTC
- Diaspora users can volunteer as bridge nodes

### Layer 2: Progressive Web App (PWA) with Offline Capability

**The "Download Button" Concept**

When users visit the site, they see a prominent "Install" button in the browser URL bar (this is the native PWA install prompt). Clicking it:

1. Installs the PWA to their device (works on Android, iOS, Windows, macOS, Linux)
2. The PWA contains the full application shell and can work offline
3. When online, it syncs through Tor-friendly endpoints
4. The PWA can be shared as an APK/IPA file peer-to-peer (sideloading)

**What the PWA Cannot Do (Clarification):**
- The PWA itself cannot bundle a full Tor client (this would require native code)
- Instead, the PWA is designed to work optimally WITH Tor Browser or Orbot
- For Android, we provide integration with Orbot (Tor proxy app) via localhost SOCKS proxy
- For desktop, we detect Tor Browser and optimize accordingly

**What We CAN Provide:**
1. PWA that works in any browser (optimized for Tor Browser)
2. Android APK that includes Tor integration (using tor-android library) - separate download
3. Guidance and one-click Tor Browser installation links
4. Snowflake bridge option for browser-based Tor access

### Layer 3: Zero-Knowledge Architecture

**No User Accounts**
- No registration, no login, no passwords
- Users identified only by cryptographic ephemeral tokens
- Tokens are device-local, never transmitted, never stored server-side

**No Logs Policy**
- No access logs (not even anonymized)
- No error logs containing user data
- Server runs with minimal logging (systemd journal disabled for app)

**Content Addressing**
- All content addressed by cryptographic hash (like IPFS)
- No sequential IDs that reveal posting order or volume
- Cannot correlate posts by metadata

**End-to-End Encryption for Messages**
- Messages encrypted client-side using Signal Protocol (libsignal)
- Server stores only encrypted blobs
- Key exchange happens through QR codes or shared links (out of band)

### Layer 4: Infrastructure Resilience

**Multi-Region Deployment**
- Servers in privacy-friendly jurisdictions (Iceland, Switzerland, Netherlands)
- No single point of failure
- Automatic failover

**Domain Resilience**
- Multiple backup domains registered
- .onion address is permanent and unseizable
- DNS over HTTPS/Tor to prevent DNS-based blocking

**Content Distribution**
- Static assets on IPFS for censorship resistance
- Memorial data can be exported and re-imported (platform survives destruction)

**DDoS Protection**
- Tor hidden service is inherently DDoS-resistant
- Clearnet fronted by privacy-respecting CDN (Njalla, OrangeWebsite)
- No Cloudflare (they can see traffic)

## 3.3 Data Architecture

**What We Store (Server-Side):**
- Encrypted message blobs (E2E encrypted, we cannot read)
- Memorial content (photos, names, stories) - public, intentionally so
- Moderation flags (hash-based, no user association)

**What We NEVER Store:**
- IP addresses
- User agents
- Timestamps with precision (only day-level for memorials)
- Any form of user identifier
- Cookies or session data

**Data Retention:**
- Messages: Ephemeral (auto-delete after 30 days unless recipient saves)
- Memorials: Permanent (the point is to remember)
- Everything else: Not stored

## 3.4 Addressing the "Tor Download Button" Question

Jesper asked if we can have a download button that implements Tor routing. Here is the nuanced answer:

**Option A: PWA + Orbot Integration (Android)**
- User installs PWA
- PWA detects if Orbot (Tor for Android) is installed
- If not, prompts to install Orbot with one-tap link
- Once Orbot is running, PWA routes through localhost:9050
- This gives real Tor protection with a smooth UX

**Option B: Standalone Android App with Embedded Tor**
- Separate APK download (not PWA)
- Uses tor-android library to embed Tor client
- True Tor routing without separate app
- Downside: Larger download (~30MB), sideloading required

**Option C: Browser-Based Snowflake Bridge**
- No download required
- User clicks "Enable Secure Connection"
- WebRTC-based Tor bridge runs in browser
- Provides Tor-like protection without installing anything
- Less secure than real Tor but better than nothing

**Recommendation:** Implement all three options, present them based on user's platform and threat level. High-risk users get Option B recommendation. Casual diaspora users get Option A or C.

---

# Chapter 4: Feature Specifications

## 4.1 The Memorial Wall (دیوار یادبود)

The primary view of the application. A virtual wall where photos of the fallen are displayed in the Divar aesthetic.

**Display Modes:**
1. **Infinite Scroll Wall:** Continuous vertical scroll, photos appear as if taped to a brick wall
2. **Individual Memorial View:** Full Khatm-style memorial for one person
3. **Candle Vigil Mode:** Dimmed view with only photos and candles, no UI

**Memorial Components:**
- Photo (with automatic black ribbon overlay)
- Name (Persian and Latin transliteration)
- Age at death
- Date of death (Persian and Gregorian calendars)
- Location (city/province only, no precise location)
- Circumstances (brief, e.g., "Shot during protest in Zahedan")
- Optional: Voice clip, written tribute, QR code for E2E contact

**Interactions:**
- Light a virtual candle (appears as tealight at base of photo)
- Leave a flower (gladiolus appears)
- Share (generates privacy-preserving link)
- Report (for inappropriate content, hash-based)

## 4.2 The Message Board (تخته پیام)

Anonymous, encrypted communication between users.

**Thread Types:**
1. **Open Threads:** Visible to all, like a public bulletin board
2. **Private Threads:** E2E encrypted, invite-only via shared link/QR
3. **Memorial Threads:** Attached to a specific person's memorial

**Message Features:**
- Text only (no images in messages - prevents CSAM, reduces bandwidth)
- Maximum 500 characters (encourages brevity)
- Auto-expire after 30 days (configurable to 7 days for high-risk)
- No threading/replies (keeps it simple, prevents de-anonymization through conversation patterns)

**Moderation:**
- Community flagging (hash-based, no user tracking)
- Diaspora volunteer moderators (verified out-of-band)
- AI content filter for obvious spam/abuse (runs client-side, no data sent to servers)

## 4.3 The Bridge (پل)

Features specifically for connecting inside Iran with diaspora.

**"I'm Inside" / "I'm Outside" Mode:**
- Self-declared (not verified, not stored)
- Changes UI to optimize for context
- Inside: Minimal data, offline-first, Tor-enforced
- Outside: More features, can volunteer as relay

**Relay System:**
- Diaspora users can run relay nodes (Snowflake-style)
- Increases bandwidth and accessibility for those inside
- One-click setup, runs in background tab

**Content Sync:**
- Memorials can be exported as encrypted bundles
- Diaspora users can carry bundles across air gaps
- Supports USB dead drops and Bluetooth sharing

## 4.4 Installation & Onboarding

**First Visit Flow:**
1. Detect connection type (Tor, VPN, direct)
2. If direct from Iran IP range: Warn, suggest Tor, do not proceed without confirmation
3. Language selection (Persian default, English, Kurdish, Balochi, Arabic)
4. Brief security primer (1-2 screens, skippable)
5. PWA install prompt

**Install Options Presented:**
1. "Add to Home Screen" (PWA - all platforms)
2. "Download Secure App" (Android APK with Tor - advanced)
3. "Install Tor Browser" (links to official Tor Project)
4. "Continue in Browser" (no install)

---

# Chapter 5: Technical Implementation

## 5.1 Technology Stack

**Frontend:**
- Framework: SvelteKit (small bundle, excellent SSR, progressive enhancement)
- Styling: Tailwind CSS (utility-first, purged for minimal size)
- PWA: Workbox (service worker generation)
- Encryption: libsignal-protocol-javascript (E2E messaging)
- i18n: Paraglide (compile-time, small footprint)

**Backend:**
- Runtime: Node.js with Fastify (or Rust with Axum for maximum security)
- Database: SQLite (simple, no network exposure) with SQLCipher (encryption at rest)
- Search: MeiliSearch (self-hosted, privacy-respecting)
- Queue: BullMQ with Redis (for async tasks)

**Infrastructure:**
- Hosting: Self-managed VPS on privacy-respecting providers
- Tor: tor hidden service configuration
- CDN: None for dynamic content; IPFS for static assets
- DNS: Njalla (privacy-focused registrar)

**Android App (Optional):**
- Framework: React Native or Capacitor
- Tor: tor-android library integration
- Distribution: APK direct download, F-Droid (if accepted)

## 5.2 Offline Architecture

**Service Worker Strategy:**
- Cache-first for all static assets
- Network-first for memorial data, falling back to cache
- Background sync for messages when connection restored

**IndexedDB Storage:**
- All viewed memorials cached locally
- Draft messages stored encrypted locally
- Encryption keys in WebCrypto API (non-exportable)

**Offline Capabilities:**
- Browse all previously-viewed memorials
- Write messages (queued for sending)
- Light candles (synced later)
- Cannot: Create new memorials, see new content

## 5.3 API Design

**Principles:**
- No REST, no GraphQL (too identifiable)
- Simple RPC over HTTP POST to single endpoint
- All requests same size (padded) to prevent traffic analysis
- All responses same size (padded)

**Endpoints:**
- `POST /api` - Single endpoint, action specified in encrypted body
- `.onion/api` - Same, over Tor

**Request Format:**
```
{
  "nonce": "random-32-bytes",
  "payload": "encrypted-action-and-data",
  "padding": "random-to-fixed-size"
}
```

## 5.4 Build & Deployment

**CI/CD:**
- GitHub Actions (or self-hosted Gitea + Drone for maximum privacy)
- Reproducible builds (deterministic, verifiable)
- Signed releases

**Deployment:**
- Ansible playbooks for server setup
- Docker containers for isolation
- Automated Tor hidden service setup

---

# Chapter 6: User Stories

## Epic 1: Security Infrastructure (SEC)

### SEC-001: Tor Hidden Service Setup
**As a** user inside Iran
**I want** to access the site via .onion address
**So that** my connection is anonymous and cannot be blocked by DPI

**Acceptance Criteria:**
- .onion address is generated and stable
- Site fully functional over Tor
- No JavaScript required for core features
- Load time under 5 seconds on Tor

**Verification Command:**
```bash
# Test .onion accessibility
torsocks curl -I http://[onion-address].onion
# Verify no JS required
torsocks curl http://[onion-address].onion | grep -c "<noscript>"
# Load time test
time torsocks curl -o /dev/null http://[onion-address].onion
```

**Dependencies:** None (foundational)
**Story Points:** 8
**Priority:** P0 (Critical)

---

### SEC-002: Zero-Logging Server Configuration
**As a** platform operator
**I want** servers configured to store no identifying information
**So that** we cannot betray users even if compelled

**Acceptance Criteria:**
- Nginx/Fastify configured with no access logs
- systemd journal disabled for application
- No IP addresses stored anywhere
- Audit passes with `grep -r` for IP patterns

**Verification Command:**
```bash
# Check no access logs
ls -la /var/log/nginx/
# Verify no IPs in any logs
grep -rE "([0-9]{1,3}\.){3}[0-9]{1,3}" /var/log/ | wc -l
# Should return 0 or only localhost
```

**Dependencies:** SEC-001
**Story Points:** 5
**Priority:** P0

---

### SEC-003: HTTPS with Privacy-Respecting Certificate
**As a** user
**I want** HTTPS encryption on the clearnet site
**So that** my ISP cannot see page content

**Acceptance Criteria:**
- Let's Encrypt certificate installed
- HSTS enabled with long max-age
- No certificate transparency log opt-out issues
- TLS 1.3 only

**Verification Command:**
```bash
# Test HTTPS
curl -I https://www.iran-uprising.com
# Check TLS version
nmap --script ssl-enum-ciphers -p 443 iran-uprising.com
# Verify HSTS
curl -sI https://www.iran-uprising.com | grep -i strict
```

**Dependencies:** SEC-001
**Story Points:** 3
**Priority:** P0

---

### SEC-004: Content Security Policy Implementation
**As a** user
**I want** strict CSP headers preventing third-party resource loading
**So that** no external parties can track me

**Acceptance Criteria:**
- CSP header blocks all external resources
- No inline scripts (or strict nonce-based)
- No external fonts, images, or scripts
- Passes CSP evaluator tools

**Verification Command:**
```bash
# Check CSP header
curl -sI https://www.iran-uprising.com | grep -i content-security
# Should show restrictive policy
# Test with securityheaders.com
```

**Dependencies:** SEC-003
**Story Points:** 3
**Priority:** P0

---

### SEC-005: Alt-Svc Header for Onion Discovery
**As a** user with Tor Browser
**I want** automatic redirect to .onion when available
**So that** I get maximum security without manual configuration

**Acceptance Criteria:**
- Alt-Svc header advertises .onion address
- Tor Browser automatically switches to onion
- No user action required
- Fallback to clearnet if onion unavailable

**Verification Command:**
```bash
# Check Alt-Svc header
curl -sI https://www.iran-uprising.com | grep -i alt-svc
# Should contain onion address
```

**Dependencies:** SEC-001, SEC-003
**Story Points:** 2
**Priority:** P1

---

### SEC-006: Request Padding for Traffic Analysis Prevention
**As a** user
**I want** all API requests to be same size
**So that** observers cannot infer what I'm doing from packet sizes

**Acceptance Criteria:**
- All POST requests padded to 4KB
- All responses padded to 8KB
- Padding is random data, not zeros
- No correlation possible between request size and action

**Verification Command:**
```bash
# Test request sizes
for i in {1..10}; do
  curl -s -X POST -d '{"action":"test"}' https://www.iran-uprising.com/api | wc -c
done
# All should return same number
```

**Dependencies:** SEC-001
**Story Points:** 5
**Priority:** P1

---

### SEC-007: Rate Limiting Without User Tracking
**As a** platform operator
**I want** to prevent abuse without tracking users
**So that** we maintain both security and anonymity

**Acceptance Criteria:**
- Rate limiting based on proof-of-work (hashcash-style)
- No IP-based rate limiting
- No session-based rate limiting
- Abuse prevention effective without tracking

**Verification Command:**
```bash
# Test rate limiting
for i in {1..100}; do
  curl -s -X POST https://www.iran-uprising.com/api -d '{}' &
done
# Should require proof-of-work after threshold
```

**Dependencies:** SEC-001
**Story Points:** 8
**Priority:** P1

---

### SEC-008: Database Encryption at Rest
**As a** platform operator
**I want** all stored data encrypted
**So that** server seizure does not expose content

**Acceptance Criteria:**
- SQLite database encrypted with SQLCipher
- Encryption key derived from hardware security module or secure enclave
- Key not stored on disk
- Database unreadable without running application

**Verification Command:**
```bash
# Attempt to read database directly
sqlite3 /var/lib/app/data.db ".tables"
# Should fail with "not a database" or encryption error
```

**Dependencies:** SEC-001
**Story Points:** 5
**Priority:** P0

---

### SEC-009: Memory-Safe Request Handling
**As a** security auditor
**I want** memory-safe handling of all user input
**So that** buffer overflows and injection attacks are impossible

**Acceptance Criteria:**
- All user input sanitized
- No raw SQL queries (parameterized only)
- No eval() or equivalent
- Memory-safe language or thorough bounds checking

**Verification Command:**
```bash
# Run security scanner
npm audit
# Run SAST tool
semgrep --config=p/security-audit src/
```

**Dependencies:** None
**Story Points:** 5
**Priority:** P0

---

### SEC-010: E2E Encryption for Private Messages
**As a** user
**I want** my private messages encrypted so only the recipient can read them
**So that** the platform operator cannot read my communications

**Acceptance Criteria:**
- Signal Protocol implemented for key exchange
- Messages encrypted client-side before transmission
- Server stores only encrypted blobs
- Forward secrecy maintained

**Verification Command:**
```bash
# Verify encryption in transit
# Capture message creation and verify payload is encrypted
curl -X POST https://www.iran-uprising.com/api \
  -d '{"action":"send_message","content":"test"}' \
  -H "Content-Type: application/json" | jq .
# Content should be base64 encrypted blob, not plaintext
```

**Dependencies:** SEC-001, SEC-008
**Story Points:** 13
**Priority:** P0

---

### SEC-011: Snowflake Bridge Integration
**As a** user who cannot access Tor directly
**I want** browser-based Tor bridge functionality
**So that** I can connect anonymously without installing software

**Acceptance Criteria:**
- Snowflake WebRTC bridge embedded
- One-click activation
- Visual indicator when bridge is active
- Fallback instructions if WebRTC blocked

**Verification Command:**
```bash
# Test Snowflake endpoint
curl -I https://www.iran-uprising.com/snowflake
# Verify WebRTC signaling
```

**Dependencies:** SEC-001, SEC-003
**Story Points:** 8
**Priority:** P1

---

### SEC-012: Reproducible Builds
**As a** security auditor
**I want** to verify the deployed code matches the source
**So that** backdoors cannot be inserted during build

**Acceptance Criteria:**
- Build process is deterministic
- Same source produces identical binary
- Build instructions public
- Hash of build published with each release

**Verification Command:**
```bash
# Clone and build
git clone https://github.com/[repo]
cd [repo]
npm ci && npm run build
# Compare hash
sha256sum dist/* > local-hashes.txt
diff local-hashes.txt published-hashes.txt
```

**Dependencies:** None
**Story Points:** 5
**Priority:** P1

---

### SEC-013: Security Audit Trail (Anonymous)
**As a** platform operator
**I want** to detect attacks without logging user data
**So that** we can respond to threats while maintaining anonymity

**Acceptance Criteria:**
- Aggregate metrics only (requests per minute, not per user)
- Attack patterns detected by anomaly, not tracking
- No individual request logs
- Alerts for unusual patterns

**Verification Command:**
```bash
# Check metrics endpoint (internal only)
curl http://localhost:9090/metrics | grep -v "ip\|user"
# Should show aggregates only
```

**Dependencies:** SEC-002
**Story Points:** 5
**Priority:** P2

---

### SEC-014: Key Rotation System
**As a** platform operator
**I want** automatic rotation of encryption keys
**So that** compromise of one key doesn't expose all data

**Acceptance Criteria:**
- Database key rotates monthly
- TLS certificates auto-renew
- Old keys securely deleted
- No service interruption during rotation

**Verification Command:**
```bash
# Check certificate expiry
echo | openssl s_client -connect iran-uprising.com:443 2>/dev/null | openssl x509 -noout -dates
# Verify key age in application
```

**Dependencies:** SEC-003, SEC-008
**Story Points:** 5
**Priority:** P2

---

### SEC-015: Panic Button / Quick Exit
**As a** user under surveillance
**I want** a quick way to hide what I'm viewing
**So that** I can protect myself if someone approaches

**Acceptance Criteria:**
- Triple-tap or keyboard shortcut (Esc-Esc-Esc) triggers panic
- Screen immediately shows innocent content (weather/news)
- Browser history entry replaced
- Works offline

**Verification Command:**
```bash
# Manual test in browser
# Press Escape 3 times rapidly
# Verify screen change and history replacement
```

**Dependencies:** PWA-001
**Story Points:** 3
**Priority:** P1

---

## Epic 2: Progressive Web App (PWA)

### PWA-001: Service Worker with Offline Support
**As a** user with intermittent connectivity
**I want** the app to work offline
**So that** I can view content during internet blackouts

**Acceptance Criteria:**
- Service worker caches app shell
- Previously viewed memorials available offline
- Graceful degradation when offline
- Clear offline indicator

**Verification Command:**
```bash
# Test service worker registration
# In browser DevTools > Application > Service Workers
# Verify registered and active

# Test offline mode
# DevTools > Network > Offline
# Verify app shell loads
```

**Dependencies:** None
**Story Points:** 8
**Priority:** P0

---

### PWA-002: App Manifest for Installation
**As a** user
**I want** to install the app to my home screen
**So that** I can access it like a native app

**Acceptance Criteria:**
- manifest.json with all required fields
- Icons for all sizes (72px to 512px)
- Theme color matches brand (#00A651)
- Standalone display mode
- Install prompt appears

**Verification Command:**
```bash
# Validate manifest
curl https://www.iran-uprising.com/manifest.json | jq .
# Check required fields: name, icons, start_url, display
# Use Lighthouse PWA audit
```

**Dependencies:** None
**Story Points:** 3
**Priority:** P0

---

### PWA-003: Background Sync for Messages
**As a** user
**I want** messages I write offline to send when I reconnect
**So that** I don't lose my writing during blackouts

**Acceptance Criteria:**
- Messages queued in IndexedDB when offline
- Background sync triggered on reconnection
- User notified when messages sent
- Retry logic for failures

**Verification Command:**
```bash
# Test background sync
# 1. Go offline
# 2. Write message
# 3. Go online
# 4. Verify message sent (check network tab)
```

**Dependencies:** PWA-001, SEC-010
**Story Points:** 5
**Priority:** P1

---

### PWA-004: Push Notifications (Optional, Privacy-Preserving)
**As a** diaspora user
**I want** optional notifications for memorial activity
**So that** I know when someone lights a candle for my loved one

**Acceptance Criteria:**
- Push notifications opt-in only
- Uses anonymous push service (not Firebase)
- No user identifier in push payload
- Works with PWA install

**Verification Command:**
```bash
# Test push endpoint
curl -X POST https://www.iran-uprising.com/push/subscribe \
  -d '{"endpoint":"test","keys":{"p256dh":"x","auth":"y"}}'
# Verify anonymous subscription
```

**Dependencies:** PWA-001, PWA-002
**Story Points:** 8
**Priority:** P3

---

### PWA-005: Share Target API
**As a** user
**I want** to share photos to the memorial directly from my gallery
**So that** adding memorials is seamless

**Acceptance Criteria:**
- PWA registered as share target
- Accepts images from share sheet
- Pre-fills memorial creation form
- Works on Android and supported browsers

**Verification Command:**
```bash
# Verify share_target in manifest
curl https://www.iran-uprising.com/manifest.json | jq .share_target
# Manual test: Share image from gallery, verify app opens
```

**Dependencies:** PWA-002
**Story Points:** 3
**Priority:** P2

---

### PWA-006: Orbot Integration (Android)
**As an** Android user inside Iran
**I want** the PWA to use Tor through Orbot
**So that** I get real Tor protection without complex setup

**Acceptance Criteria:**
- Detect if Orbot is running
- Route requests through localhost:9050
- Prompt to install Orbot if not detected
- Visual indicator when Tor is active

**Verification Command:**
```bash
# Test Orbot detection
# On Android with Orbot installed:
# 1. Open PWA
# 2. Verify Tor indicator shows
# 3. Check network routes through Tor (whatismyip.com via app)
```

**Dependencies:** PWA-001, SEC-001
**Story Points:** 8
**Priority:** P1

---

### PWA-007: APK Export with Embedded Tor
**As a** high-risk user
**I want** a standalone Android app with Tor built-in
**So that** I don't need to install multiple apps

**Acceptance Criteria:**
- APK generated from PWA + tor-android
- Self-contained Tor client
- Signature verification available
- Size under 40MB

**Verification Command:**
```bash
# Build APK
./gradlew assembleRelease
# Verify Tor library included
unzip -l app-release.apk | grep tor
# Test Tor connectivity
adb install app-release.apk
# Verify Tor bootstrap in logs
```

**Dependencies:** PWA-001, SEC-001
**Story Points:** 13
**Priority:** P2

---

### PWA-008: Cache Management UI
**As a** user
**I want** to see and clear what's cached on my device
**So that** I can manage my storage and security

**Acceptance Criteria:**
- Settings page shows cache size
- Option to clear all cached data
- Confirmation before clearing
- Secure wipe (overwrite, not just delete)

**Verification Command:**
```bash
# Manual test in app:
# 1. Go to Settings
# 2. Verify cache size shown
# 3. Clear cache
# 4. Verify IndexedDB and Cache Storage empty
```

**Dependencies:** PWA-001
**Story Points:** 3
**Priority:** P2

---

### PWA-009: Update Notification and Control
**As a** user
**I want** to know when app updates are available
**So that** I can stay secure with latest version

**Acceptance Criteria:**
- Service worker checks for updates
- Non-intrusive notification when update available
- User can defer or apply update
- Version number visible in settings

**Verification Command:**
```bash
# Test update flow:
# 1. Deploy new version
# 2. Open installed PWA
# 3. Verify update notification appears
# 4. Apply update
# 5. Verify new version in settings
```

**Dependencies:** PWA-001, PWA-002
**Story Points:** 3
**Priority:** P1

---

### PWA-010: Peer-to-Peer PWA Sharing
**As a** user inside Iran
**I want** to share the app via Bluetooth/USB
**So that** others can install without internet

**Acceptance Criteria:**
- Export PWA as shareable bundle
- Bundle includes service worker and cached content
- Import mechanism for received bundles
- Verification of bundle integrity

**Verification Command:**
```bash
# Test export:
# 1. In app, go to Settings > Share App
# 2. Export to file
# 3. Transfer to another device
# 4. Import and verify app works
```

**Dependencies:** PWA-001, PWA-007
**Story Points:** 13
**Priority:** P2

---

## Epic 3: Memorial Wall Features (MEM)

### MEM-001: Memorial Data Model
**As a** developer
**I want** a well-defined schema for memorials
**So that** data is consistent and queryable

**Acceptance Criteria:**
- Schema defined with all fields
- Fields: photo, name_persian, name_latin, age, date_death, location, circumstances
- Optional fields: voice_clip, tributes, qr_code
- Validation rules enforced

**Verification Command:**
```bash
# Validate schema
npx ajv validate -s memorial-schema.json -d test-memorial.json
# Test invalid data rejected
echo '{"name":"test"}' | npx ajv validate -s memorial-schema.json
# Should fail (missing required fields)
```

**Dependencies:** SEC-008
**Story Points:** 3
**Priority:** P0

---

### MEM-002: Photo Upload with Black Ribbon
**As a** user creating a memorial
**I want** the black ribbon automatically added to photos
**So that** the mourning tradition is honored

**Acceptance Criteria:**
- Photo upload accepts JPEG, PNG, WebP
- Client-side resizing to max 1200px
- Black ribbon overlay applied automatically
- Preview before submission

**Verification Command:**
```bash
# Test image processing
# Upload test image
# Verify output has black ribbon at 45 degrees top-right
# Verify image size <= 1200px width
```

**Dependencies:** MEM-001
**Story Points:** 5
**Priority:** P0

---

### MEM-003: Memorial Card Component
**As a** visitor to the wall
**I want** each memorial displayed as a beautiful card
**So that** each person is honored with dignity

**Acceptance Criteria:**
- Card shows photo with ribbon
- Name in Persian (large) and Latin (small)
- Age and date displayed
- Candle count visible
- Responsive design (works on all screens)

**Verification Command:**
```bash
# Visual regression test
npx playwright test memorial-card.spec.ts
# Verify renders correctly at 320px, 768px, 1920px widths
```

**Dependencies:** MEM-001, MEM-002
**Story Points:** 5
**Priority:** P0

---

### MEM-004: Infinite Scroll Wall View
**As a** visitor
**I want** to scroll through memorials continuously
**So that** I can browse without pagination

**Acceptance Criteria:**
- Virtual scrolling for performance
- Brick wall background texture
- Cards positioned as if taped to wall
- Smooth loading of new cards
- No layout shift during load

**Verification Command:**
```bash
# Performance test
npx lighthouse https://www.iran-uprising.com --only-categories=performance
# Scroll test
npx playwright test wall-scroll.spec.ts
# Verify smooth scrolling, no jank
```

**Dependencies:** MEM-003
**Story Points:** 8
**Priority:** P0

---

### MEM-005: Individual Memorial Page
**As a** visitor
**I want** a dedicated page for each person
**So that** I can see their full story and pay respects

**Acceptance Criteria:**
- Full Khatm-style layout
- Large photo with ribbon
- Full biography/circumstances
- Candle lighting prominent
- Related memorials (same city, same date)

**Verification Command:**
```bash
# Test individual page
curl https://www.iran-uprising.com/memorial/[hash]
# Verify all components render
npx playwright test memorial-detail.spec.ts
```

**Dependencies:** MEM-003
**Story Points:** 5
**Priority:** P0

---

### MEM-006: Light a Candle Interaction
**As a** visitor
**I want** to light a virtual candle for someone
**So that** I can show my respect and solidarity

**Acceptance Criteria:**
- One-tap candle lighting
- Animated candle appears at base of photo
- Candle count increments
- Haptic feedback on mobile
- Works offline (syncs later)

**Verification Command:**
```bash
# Test candle API
curl -X POST https://www.iran-uprising.com/api \
  -d '{"action":"light_candle","memorial_hash":"xxx"}' \
  -H "Content-Type: application/json"
# Verify count incremented
# Test offline: light candle offline, verify syncs
```

**Dependencies:** MEM-003, PWA-001
**Story Points:** 5
**Priority:** P1

---

### MEM-007: Leave a Flower Interaction
**As a** visitor
**I want** to leave a virtual flower
**So that** I can honor Iranian funeral tradition

**Acceptance Criteria:**
- One-tap flower leaving
- Gladiolus icon appears
- Subtle animation
- Different from candle (separate count)

**Verification Command:**
```bash
# Test flower API
curl -X POST https://www.iran-uprising.com/api \
  -d '{"action":"leave_flower","memorial_hash":"xxx"}' \
  -H "Content-Type: application/json"
# Verify flower appears in UI
```

**Dependencies:** MEM-003
**Story Points:** 3
**Priority:** P2

---

### MEM-008: Memorial Search
**As a** visitor
**I want** to search for a specific person
**So that** I can find my loved one quickly

**Acceptance Criteria:**
- Search by name (Persian and Latin)
- Search by location
- Search by date range
- Fuzzy matching for typos
- No search history stored

**Verification Command:**
```bash
# Test search
curl "https://www.iran-uprising.com/api" \
  -d '{"action":"search","query":"مهسا"}' \
  -H "Content-Type: application/json"
# Verify results returned
# Verify no search logged
```

**Dependencies:** MEM-001
**Story Points:** 5
**Priority:** P1

---

### MEM-009: Memorial Submission Form
**As a** user
**I want** to submit a new memorial
**So that** I can honor someone who was killed

**Acceptance Criteria:**
- Form for all memorial fields
- Photo upload with preview
- Persian/Latin name input with transliteration helper
- Calendar picker (Persian and Gregorian)
- Moderation queue (not immediately public)

**Verification Command:**
```bash
# Test submission
npx playwright test memorial-submit.spec.ts
# Verify submission enters moderation queue
# Verify validation errors shown
```

**Dependencies:** MEM-001, MEM-002
**Story Points:** 8
**Priority:** P1

---

### MEM-010: Memorial Moderation Queue
**As a** moderator
**I want** to review submitted memorials
**So that** we maintain quality and prevent abuse

**Acceptance Criteria:**
- Queue shows pending submissions
- Approve/reject actions
- Rejection requires reason
- Approved memorials go live
- Moderator anonymity preserved

**Verification Command:**
```bash
# Test moderation flow
# 1. Submit memorial
# 2. Log in as moderator
# 3. View queue
# 4. Approve memorial
# 5. Verify appears on public wall
```

**Dependencies:** MEM-009
**Story Points:** 5
**Priority:** P1

---

### MEM-011: Candle Vigil Mode
**As a** visitor
**I want** a contemplative mode with just photos and candles
**So that** I can mourn in peace

**Acceptance Criteria:**
- UI elements hidden except close button
- Photos displayed larger
- Candle animations more prominent
- Soft ambient sound (optional)
- Auto-advances through memorials slowly

**Verification Command:**
```bash
# Test vigil mode
npx playwright test vigil-mode.spec.ts
# Verify UI hidden
# Verify photos display in sequence
```

**Dependencies:** MEM-003, MEM-006
**Story Points:** 5
**Priority:** P2

---

### MEM-012: Share Memorial with Privacy
**As a** visitor
**I want** to share a memorial without revealing my identity
**So that** I can spread awareness safely

**Acceptance Criteria:**
- Generate shareable link
- Link contains no user tracking
- Preview generates OG image server-side
- Copy to clipboard with one tap
- Share sheet integration

**Verification Command:**
```bash
# Test share link
curl https://www.iran-uprising.com/m/[hash]
# Verify OG tags present
# Verify no tracking parameters
```

**Dependencies:** MEM-005
**Story Points:** 3
**Priority:** P1

---

### MEM-013: Memorial QR Code for E2E Contact
**As a** family member
**I want** to attach a QR code to a memorial
**So that** people can contact me securely about my loved one

**Acceptance Criteria:**
- Optional QR code attachment
- QR encodes Signal/Session contact or E2E key
- QR generated client-side
- No contact info stored on server

**Verification Command:**
```bash
# Test QR generation
# 1. In memorial form, add contact
# 2. Verify QR renders
# 3. Scan QR, verify opens contact method
```

**Dependencies:** MEM-009, SEC-010
**Story Points:** 5
**Priority:** P2

---

### MEM-014: Memorial Statistics (Aggregate Only)
**As a** visitor
**I want** to see aggregate statistics
**So that** I understand the scale of loss

**Acceptance Criteria:**
- Total memorials count
- Breakdown by city/province
- Breakdown by month
- Age distribution
- No individual tracking

**Verification Command:**
```bash
# Test stats endpoint
curl https://www.iran-uprising.com/api \
  -d '{"action":"stats"}' \
  -H "Content-Type: application/json"
# Verify aggregate numbers returned
# Verify no individual data
```

**Dependencies:** MEM-001
**Story Points:** 3
**Priority:** P2

---

### MEM-015: Memorial Data Export
**As a** archivist
**I want** to export all memorials
**So that** the data survives platform destruction

**Acceptance Criteria:**
- Export as JSON bundle
- Includes all photos (base64 or hash-linked)
- Export can be re-imported
- Cryptographic verification of integrity

**Verification Command:**
```bash
# Test export
curl https://www.iran-uprising.com/api \
  -d '{"action":"export_all"}' \
  -H "Content-Type: application/json" > export.json
# Verify JSON valid
# Test import on fresh instance
```

**Dependencies:** MEM-001
**Story Points:** 5
**Priority:** P1

---

## Epic 4: Messaging Features (MSG)

### MSG-001: Message Data Model
**As a** developer
**I want** a well-defined schema for messages
**So that** E2E encryption works correctly

**Acceptance Criteria:**
- Schema: encrypted_content, thread_hash, timestamp_day, expiry
- No sender/recipient fields (derived from encryption)
- Validation rules enforced
- Maximum message size defined

**Verification Command:**
```bash
# Validate schema
npx ajv validate -s message-schema.json -d test-message.json
```

**Dependencies:** SEC-010
**Story Points:** 3
**Priority:** P0

---

### MSG-002: Open Thread View
**As a** visitor
**I want** to see public message threads
**So that** I can follow discussions

**Acceptance Criteria:**
- Threads displayed in reverse chronological order
- No sender identification
- Thread topic/title visible
- Reply count shown

**Verification Command:**
```bash
# Test thread listing
curl https://www.iran-uprising.com/api \
  -d '{"action":"list_threads","type":"open"}' \
  -H "Content-Type: application/json"
# Verify threads returned
```

**Dependencies:** MSG-001
**Story Points:** 5
**Priority:** P1

---

### MSG-003: Create Open Thread
**As a** user
**I want** to start a public discussion
**So that** I can connect with others

**Acceptance Criteria:**
- Form for thread title and first message
- No account required
- Proof-of-work for spam prevention
- Thread appears in listing after creation

**Verification Command:**
```bash
# Test thread creation
curl -X POST https://www.iran-uprising.com/api \
  -d '{"action":"create_thread","title":"Test","content":"Hello","pow":"..."}' \
  -H "Content-Type: application/json"
# Verify thread created
```

**Dependencies:** MSG-001, SEC-007
**Story Points:** 5
**Priority:** P1

---

### MSG-004: Reply to Thread
**As a** user
**I want** to reply to a discussion
**So that** I can participate

**Acceptance Criteria:**
- Reply form on thread page
- Text only, 500 character limit
- Proof-of-work required
- Reply appears immediately

**Verification Command:**
```bash
# Test reply
curl -X POST https://www.iran-uprising.com/api \
  -d '{"action":"reply","thread_hash":"xxx","content":"Reply","pow":"..."}' \
  -H "Content-Type: application/json"
# Verify reply added
```

**Dependencies:** MSG-002, SEC-007
**Story Points:** 3
**Priority:** P1

---

### MSG-005: Private Thread Creation
**As a** user
**I want** to create an encrypted private thread
**So that** I can communicate securely with specific people

**Acceptance Criteria:**
- Generate new thread with E2E keys
- Shareable invite link/QR code
- Only participants can decrypt
- Server stores only encrypted blobs

**Verification Command:**
```bash
# Test private thread
# 1. Create thread, get invite link
# 2. Open invite on another device
# 3. Send message from device 1
# 4. Verify readable on device 2
# 5. Verify unreadable on server
```

**Dependencies:** MSG-001, SEC-010
**Story Points:** 8
**Priority:** P1

---

### MSG-006: Join Private Thread via Link
**As a** user
**I want** to join a private thread using a shared link
**So that** I can communicate with the inviter

**Acceptance Criteria:**
- Link contains key material (not sent to server)
- Key exchange completed on join
- Thread content decryptable after join
- No account required

**Verification Command:**
```bash
# Test joining
# 1. Generate invite link
# 2. Open on new device
# 3. Verify key exchange
# 4. Verify can read/write messages
```

**Dependencies:** MSG-005
**Story Points:** 5
**Priority:** P1

---

### MSG-007: Message Expiration
**As a** user
**I want** messages to auto-delete after a period
**So that** my communications don't persist forever

**Acceptance Criteria:**
- Default expiry: 30 days
- Configurable: 7 days, 30 days, never
- Expiry enforced server-side and client-side
- No recoverable trace after expiry

**Verification Command:**
```bash
# Test expiration
# 1. Create message with 7-day expiry
# 2. Fast-forward time (test env)
# 3. Verify message deleted
# 4. Verify no trace in database
```

**Dependencies:** MSG-001
**Story Points:** 3
**Priority:** P1

---

### MSG-008: Memorial Thread (Attached to Person)
**As a** visitor
**I want** to discuss a specific person's life
**So that** I can share memories with others who knew them

**Acceptance Criteria:**
- Thread automatically attached to memorial
- Visible on memorial detail page
- Same privacy options as regular threads
- Links back to memorial

**Verification Command:**
```bash
# Test memorial thread
curl https://www.iran-uprising.com/api \
  -d '{"action":"create_thread","memorial_hash":"xxx","content":"I knew them..."}' \
  -H "Content-Type: application/json"
# Verify thread linked to memorial
```

**Dependencies:** MSG-002, MEM-005
**Story Points:** 3
**Priority:** P2

---

### MSG-009: Content Flagging (Anonymous)
**As a** user
**I want** to flag inappropriate content
**So that** the community stays safe

**Acceptance Criteria:**
- Flag button on all content
- No user tracking for flags
- Threshold-based review trigger
- Flag reasons: spam, abuse, misinformation

**Verification Command:**
```bash
# Test flagging
curl -X POST https://www.iran-uprising.com/api \
  -d '{"action":"flag","content_hash":"xxx","reason":"spam"}' \
  -H "Content-Type: application/json"
# Verify flag recorded
# Verify flagger not tracked
```

**Dependencies:** MSG-002, SEC-013
**Story Points:** 3
**Priority:** P1

---

### MSG-010: Message Sync Across Devices
**As a** user with multiple devices
**I want** my private threads to sync
**So that** I can continue conversations anywhere

**Acceptance Criteria:**
- Export/import key mechanism
- QR code key transfer
- Messages sync after key import
- No account required

**Verification Command:**
```bash
# Test sync
# 1. On device 1: export key as QR
# 2. On device 2: scan QR
# 3. Verify threads appear on device 2
# 4. Send message from device 2
# 5. Verify appears on device 1
```

**Dependencies:** MSG-005, PWA-003
**Story Points:** 8
**Priority:** P2

---

## Epic 5: Bridge Features (BRG)

### BRG-001: Inside/Outside Mode Toggle
**As a** user
**I want** to indicate if I'm inside or outside Iran
**So that** the app optimizes for my situation

**Acceptance Criteria:**
- Toggle in settings
- Not stored on server
- Persists locally
- Changes UI/UX appropriately

**Verification Command:**
```bash
# Test toggle
# 1. Set "Inside Iran"
# 2. Verify Tor-enforced
# 3. Set "Outside Iran"
# 4. Verify relay options appear
```

**Dependencies:** PWA-001
**Story Points:** 2
**Priority:** P1

---

### BRG-002: Inside Mode Optimizations
**As a** user inside Iran
**I want** the app optimized for safety and low bandwidth
**So that** I stay safe and connected

**Acceptance Criteria:**
- Tor connection required (warns if not)
- Reduced image quality option
- More aggressive caching
- Quick exit always visible
- Minimal data transmission

**Verification Command:**
```bash
# Test inside mode
# 1. Enable inside mode
# 2. Verify Tor warning if not connected
# 3. Verify reduced images loaded
# 4. Verify quick exit button present
```

**Dependencies:** BRG-001, SEC-001, SEC-015
**Story Points:** 5
**Priority:** P1

---

### BRG-003: Outside Mode Features
**As a** diaspora user
**I want** access to helper features
**So that** I can support those inside

**Acceptance Criteria:**
- Relay node option visible
- Full-quality images
- Moderation volunteer option
- Content export tools

**Verification Command:**
```bash
# Test outside mode
# 1. Enable outside mode
# 2. Verify relay option appears
# 3. Verify full images load
# 4. Verify export tools available
```

**Dependencies:** BRG-001
**Story Points:** 3
**Priority:** P1

---

### BRG-004: Snowflake Relay Volunteering
**As a** diaspora user
**I want** to volunteer as a Tor relay
**So that** I help those inside Iran connect

**Acceptance Criteria:**
- One-click relay activation
- Runs in background tab
- Bandwidth usage shown
- Impact statistics displayed

**Verification Command:**
```bash
# Test relay
# 1. Enable relay mode
# 2. Verify WebRTC connection established
# 3. Verify bandwidth counter increases
# 4. Verify stats show connections helped
```

**Dependencies:** BRG-003, SEC-011
**Story Points:** 8
**Priority:** P2

---

### BRG-005: Content Bundle Export
**As a** diaspora user
**I want** to export content as a bundle
**So that** I can carry it across air gaps

**Acceptance Criteria:**
- Export selected memorials to encrypted bundle
- Bundle includes images and metadata
- Integrity verification included
- Import mechanism on other instance

**Verification Command:**
```bash
# Test export
# 1. Select memorials
# 2. Export bundle
# 3. Verify file created
# 4. Transfer to other device
# 5. Import and verify content
```

**Dependencies:** MEM-015, BRG-003
**Story Points:** 5
**Priority:** P2

---

### BRG-006: Bluetooth/Local Share
**As a** user
**I want** to share content via Bluetooth or local network
**So that** I can distribute without internet

**Acceptance Criteria:**
- Web Bluetooth API integration
- Local network discovery (mDNS)
- Content transfer between devices
- Works without internet

**Verification Command:**
```bash
# Test local share
# 1. Enable share mode on device 1
# 2. Discover from device 2
# 3. Transfer content
# 4. Verify content received
```

**Dependencies:** BRG-005, PWA-010
**Story Points:** 13
**Priority:** P3

---

## Epic 6: UI/UX Design (UXD)

### UXD-001: Hajleh Hero Section
**As a** visitor
**I want** to see the Hajleh hero image on landing
**So that** I immediately understand the cultural context

**Acceptance Criteria:**
- Full-width hero with Hajleh image
- Responsive (different crops for mobile)
- Loads fast (progressive JPEG or WebP)
- Animated subtle glow effect

**Verification Command:**
```bash
# Test hero
curl https://www.iran-uprising.com/ | grep "hero"
# Verify image loads
# Lighthouse: check LCP < 2.5s
```

**Dependencies:** Graphics assets
**Story Points:** 3
**Priority:** P0

---

### UXD-002: Persian/English Language Toggle
**As a** visitor
**I want** to switch between Persian and English
**So that** I can use my preferred language

**Acceptance Criteria:**
- Toggle visible in header
- Persian is default
- RTL layout for Persian
- Instant switch (no reload)

**Verification Command:**
```bash
# Test language toggle
npx playwright test language-toggle.spec.ts
# Verify RTL layout when Persian selected
# Verify no flash of wrong direction
```

**Dependencies:** None
**Story Points:** 5
**Priority:** P0

---

### UXD-003: Responsive Navigation
**As a** user on any device
**I want** easy navigation
**So that** I can use the app anywhere

**Acceptance Criteria:**
- Desktop: horizontal nav bar
- Mobile: bottom tab bar (thumb-friendly)
- Hamburger menu for secondary items
- Active state indicators

**Verification Command:**
```bash
# Test navigation
npx playwright test navigation.spec.ts
# Test at 320px, 768px, 1920px
```

**Dependencies:** None
**Story Points:** 5
**Priority:** P0

---

### UXD-004: Brick Wall Background Texture
**As a** visitor
**I want** the wall background to look like real brick
**So that** the Divar aesthetic is authentic

**Acceptance Criteria:**
- Seamless tileable texture
- Performance optimized (WebP, compressed)
- Parallax scroll effect (optional, GPU-accelerated)
- Fallback solid color for low-end devices

**Verification Command:**
```bash
# Test texture
# Verify seamless tiling
# Lighthouse: check performance score
# Test parallax on mobile
```

**Dependencies:** Graphics assets
**Story Points:** 3
**Priority:** P1

---

### UXD-005: Accessibility Compliance
**As a** user with disabilities
**I want** the app to be accessible
**So that** I can use it with assistive technology

**Acceptance Criteria:**
- WCAG 2.1 AA compliance
- Screen reader compatible
- Keyboard navigable
- Color contrast ratios met
- Focus indicators visible

**Verification Command:**
```bash
# Test accessibility
npx axe-core https://www.iran-uprising.com
# Lighthouse accessibility audit
# Manual screen reader test
```

**Dependencies:** UXD-001, UXD-002, UXD-003
**Story Points:** 8
**Priority:** P1

---

### UXD-006: Dark Mode
**As a** user
**I want** a dark mode option
**So that** I can view in low light (also harder to see from behind)

**Acceptance Criteria:**
- System preference detection
- Manual toggle override
- Smooth transition
- All components styled correctly

**Verification Command:**
```bash
# Test dark mode
npx playwright test dark-mode.spec.ts
# Verify system preference respected
# Verify manual toggle works
```

**Dependencies:** UXD-001, UXD-002, UXD-003
**Story Points:** 5
**Priority:** P2

---

### UXD-007: Loading States
**As a** user
**I want** elegant loading states
**So that** I know the app is working

**Acceptance Criteria:**
- Candle flicker loading animation
- Skeleton screens for content
- No layout shift after load
- Timeout message if load fails

**Verification Command:**
```bash
# Test loading
npx playwright test loading-states.spec.ts
# Throttle network to 3G
# Verify skeleton shown
# Verify no CLS
```

**Dependencies:** Graphics assets (loading animation)
**Story Points:** 3
**Priority:** P1

---

### UXD-008: Error States
**As a** user
**I want** clear error messages
**So that** I know what went wrong and what to do

**Acceptance Criteria:**
- Error illustrations (Divar aesthetic)
- Clear error messages in both languages
- Retry action where applicable
- Offline-specific errors handled

**Verification Command:**
```bash
# Test errors
# Trigger various errors
# Verify messages clear and actionable
```

**Dependencies:** UXD-002
**Story Points:** 3
**Priority:** P1

---

### UXD-009: Onboarding Flow
**As a** new visitor
**I want** a brief introduction to the platform
**So that** I understand its purpose and security

**Acceptance Criteria:**
- 2-3 screen onboarding
- Skippable
- Explains purpose, security, how to help
- Only shows once (stored locally)

**Verification Command:**
```bash
# Test onboarding
npx playwright test onboarding.spec.ts
# Verify shows on first visit
# Verify does not show on second visit
# Verify skip works
```

**Dependencies:** PWA-001
**Story Points:** 3
**Priority:** P1

---

### UXD-010: Security Warning Dialogs
**As a** user
**I want** clear warnings about security risks
**So that** I can make informed decisions

**Acceptance Criteria:**
- Warning when accessing without Tor from Iran IP
- Warning before sharing personal information
- Clear visual distinction (not just text)
- Cannot be accidentally dismissed

**Verification Command:**
```bash
# Test warnings
# Simulate Iran IP
# Verify warning appears
# Verify requires explicit acknowledgment
```

**Dependencies:** SEC-001, BRG-001
**Story Points:** 3
**Priority:** P0

---

## Epic 7: Infrastructure (INF)

### INF-001: VPS Provisioning
**As a** platform operator
**I want** servers in privacy-friendly jurisdictions
**So that** the platform is resistant to takedown

**Acceptance Criteria:**
- Servers in Iceland, Switzerland, or Netherlands
- No identifying information in registration
- Cryptocurrency payment option
- Ansible playbook for provisioning

**Verification Command:**
```bash
# Test server
ssh root@server "uname -a"
# Verify jurisdiction
curl https://ipinfo.io/$(dig +short server.iran-uprising.com)
```

**Dependencies:** None
**Story Points:** 5
**Priority:** P0

---

### INF-002: Docker Containerization
**As a** developer
**I want** the application containerized
**So that** deployment is consistent and isolated

**Acceptance Criteria:**
- Dockerfile for each service
- docker-compose for local dev
- Production-ready images
- Non-root user in container

**Verification Command:**
```bash
# Test containers
docker-compose up -d
curl http://localhost:3000
# Verify app runs
docker exec app whoami
# Should not be root
```

**Dependencies:** None
**Story Points:** 5
**Priority:** P0

---

### INF-003: Tor Hidden Service Configuration
**As a** platform operator
**I want** Tor hidden service configured
**So that** users can access via .onion

**Acceptance Criteria:**
- Tor installed and configured
- Persistent .onion address generated
- Reverse proxy configured
- Service auto-starts

**Verification Command:**
```bash
# Test onion
torsocks curl http://[onion].onion
# Verify response
# Check tor service status
systemctl status tor
```

**Dependencies:** INF-001
**Story Points:** 3
**Priority:** P0

---

### INF-004: CI/CD Pipeline
**As a** developer
**I want** automated testing and deployment
**So that** releases are fast and reliable

**Acceptance Criteria:**
- GitHub Actions (or self-hosted)
- Runs tests on PR
- Deploys to staging on merge
- Manual production deploy trigger

**Verification Command:**
```bash
# Test pipeline
git push origin feature-branch
# Verify tests run
# Verify staging deployed after merge
```

**Dependencies:** INF-002
**Story Points:** 5
**Priority:** P1

---

### INF-005: Backup System
**As a** platform operator
**I want** automated encrypted backups
**So that** we can recover from disasters

**Acceptance Criteria:**
- Daily backups of database
- Encrypted before upload
- Stored in multiple locations
- Tested restore procedure

**Verification Command:**
```bash
# Test backup
./scripts/backup.sh
# Verify backup created
# Test restore
./scripts/restore.sh backup-2026-02-05.enc
# Verify data restored
```

**Dependencies:** INF-001, SEC-008
**Story Points:** 5
**Priority:** P1

---

### INF-006: Monitoring (Privacy-Preserving)
**As a** platform operator
**I want** to monitor system health
**So that** I can respond to issues quickly

**Acceptance Criteria:**
- Uptime monitoring (external service)
- Resource usage alerts
- No user data in metrics
- Alert channels configured

**Verification Command:**
```bash
# Test monitoring
curl http://localhost:9090/metrics
# Verify no PII in output
# Trigger alert (high CPU)
# Verify notification received
```

**Dependencies:** INF-001, SEC-013
**Story Points:** 5
**Priority:** P1

---

### INF-007: CDN Configuration (Privacy-Respecting)
**As a** user
**I want** fast asset delivery
**So that** the site loads quickly

**Acceptance Criteria:**
- Privacy-respecting CDN (not Cloudflare)
- Static assets cached at edge
- No logging of user requests
- IPFS fallback for censored regions

**Verification Command:**
```bash
# Test CDN
curl -I https://www.iran-uprising.com/static/hero.webp
# Check cache headers
# Verify CDN provider
```

**Dependencies:** INF-001
**Story Points:** 5
**Priority:** P2

---

### INF-008: DDoS Mitigation
**As a** platform operator
**I want** protection against DDoS attacks
**So that** the platform stays online

**Acceptance Criteria:**
- Rate limiting at edge
- Tor inherent protection leveraged
- Automatic scaling if possible
- Incident response playbook

**Verification Command:**
```bash
# Test rate limiting
for i in {1..1000}; do curl -s https://www.iran-uprising.com/ &; done
# Verify rate limit kicks in
# Test from Tor
# Verify still accessible
```

**Dependencies:** INF-001, SEC-007
**Story Points:** 8
**Priority:** P1

---

### INF-009: Domain Resilience
**As a** platform operator
**I want** backup domains ready
**So that** we survive domain seizure

**Acceptance Criteria:**
- Multiple backup domains registered
- DNS configuration documented
- Instant switchover procedure
- Users notified of backup addresses

**Verification Command:**
```bash
# Verify domains
dig iran-uprising.com
dig iran-uprising.net
# Verify both resolve
# Test switchover procedure (staging)
```

**Dependencies:** None
**Story Points:** 3
**Priority:** P1

---

### INF-010: IPFS Deployment
**As a** platform operator
**I want** static content on IPFS
**So that** content survives even if servers go down

**Acceptance Criteria:**
- Static site exported to IPFS
- Content hash published
- IPNS for human-readable address
- Pinned on multiple nodes

**Verification Command:**
```bash
# Test IPFS
ipfs get /ipns/iran-uprising.eth
# Verify content matches
# Check pinning status
```

**Dependencies:** INF-002
**Story Points:** 8
**Priority:** P2

---

## Epic 8: Testing (TST)

### TST-001: Unit Test Suite
**As a** developer
**I want** comprehensive unit tests
**So that** I can refactor with confidence

**Acceptance Criteria:**
- >80% code coverage
- All utility functions tested
- Crypto functions extensively tested
- Fast execution (<30s)

**Verification Command:**
```bash
npm test
# Verify >80% coverage
npm run test:coverage
```

**Dependencies:** None
**Story Points:** 8
**Priority:** P1

---

### TST-002: Integration Test Suite
**As a** developer
**I want** integration tests for API
**So that** I know endpoints work together

**Acceptance Criteria:**
- All API actions tested
- Database interactions tested
- Encryption/decryption roundtrip tested
- Can run against staging

**Verification Command:**
```bash
npm run test:integration
# Verify all tests pass
```

**Dependencies:** TST-001
**Story Points:** 8
**Priority:** P1

---

### TST-003: E2E Test Suite (Playwright)
**As a** developer
**I want** end-to-end browser tests
**So that** user flows work correctly

**Acceptance Criteria:**
- Critical user journeys covered
- Runs on Chrome, Firefox, Safari
- Mobile viewport tests
- Visual regression tests

**Verification Command:**
```bash
npx playwright test
# Verify all tests pass
# Check visual regression report
```

**Dependencies:** TST-001, TST-002
**Story Points:** 13
**Priority:** P1

---

### TST-004: Security Audit Preparation
**As a** platform operator
**I want** to prepare for external security audit
**So that** we can get independent verification

**Acceptance Criteria:**
- All security claims documented
- Threat model documented
- Test environment available for auditors
- Known issues documented

**Verification Command:**
```bash
# Review documentation
cat docs/SECURITY.md
# Verify all sections complete
# Run SAST tools
npm run security:scan
```

**Dependencies:** All SEC stories
**Story Points:** 5
**Priority:** P1

---

### TST-005: Performance Testing
**As a** developer
**I want** performance benchmarks
**So that** we meet speed requirements

**Acceptance Criteria:**
- Load time <3s on 3G
- Works on Tor (<5s)
- Memory usage reasonable
- No memory leaks

**Verification Command:**
```bash
# Lighthouse test
npx lighthouse https://www.iran-uprising.com --preset=desktop
# 3G simulation
npx lighthouse https://www.iran-uprising.com --throttling-method=simulate
# Memory test
npx playwright test memory.spec.ts
```

**Dependencies:** INF-002
**Story Points:** 5
**Priority:** P1

---

### TST-006: Accessibility Testing
**As a** developer
**I want** automated accessibility tests
**So that** we maintain WCAG compliance

**Acceptance Criteria:**
- axe-core integrated
- No critical/serious violations
- Keyboard navigation tested
- Screen reader tested manually

**Verification Command:**
```bash
npx axe-core https://www.iran-uprising.com
# Verify no critical issues
```

**Dependencies:** UXD-005
**Story Points:** 3
**Priority:** P1

---

### TST-007: Tor Compatibility Testing
**As a** developer
**I want** tests that run through Tor
**So that** I know Tor users have a good experience

**Acceptance Criteria:**
- E2E tests can run through Tor
- Works in "Safest" mode (no JS)
- .onion address tested
- Load times acceptable

**Verification Command:**
```bash
# Run tests through Tor
PROXY=socks5://127.0.0.1:9050 npx playwright test tor.spec.ts
# Test no-JS mode
```

**Dependencies:** SEC-001, TST-003
**Story Points:** 5
**Priority:** P1

---

### TST-008: Offline Testing
**As a** developer
**I want** tests for offline scenarios
**So that** PWA works during blackouts

**Acceptance Criteria:**
- Service worker tested
- Offline mode tested
- Background sync tested
- Cache invalidation tested

**Verification Command:**
```bash
npx playwright test offline.spec.ts
# Verify app works offline
# Verify sync on reconnect
```

**Dependencies:** PWA-001, TST-003
**Story Points:** 5
**Priority:** P1

---

## Epic 9: Documentation (DOC)

### DOC-001: User Guide (Persian)
**As a** Persian-speaking user
**I want** documentation in my language
**So that** I can use the platform effectively

**Acceptance Criteria:**
- Complete user guide in Persian
- Screenshots with Persian UI
- Security best practices explained
- PDF downloadable for offline

**Verification Command:**
```bash
# Verify guide exists
ls docs/fa/user-guide.pdf
# Check word count (minimum 5000 words)
```

**Dependencies:** All user-facing stories
**Story Points:** 8
**Priority:** P1

---

### DOC-002: User Guide (English)
**As an** English-speaking user
**I want** documentation in English
**So that** I can help others use the platform

**Acceptance Criteria:**
- Complete user guide in English
- Screenshots with English UI
- Security best practices explained
- PDF downloadable

**Verification Command:**
```bash
# Verify guide exists
ls docs/en/user-guide.pdf
```

**Dependencies:** All user-facing stories
**Story Points:** 5
**Priority:** P1

---

### DOC-003: Security Documentation
**As a** security-conscious user
**I want** detailed security documentation
**So that** I can make informed decisions

**Acceptance Criteria:**
- Threat model documented
- Security architecture explained
- What we do and don't protect against
- Audit results published (when available)

**Verification Command:**
```bash
# Verify docs exist
ls docs/SECURITY.md
# Check completeness
```

**Dependencies:** All SEC stories
**Story Points:** 5
**Priority:** P1

---

### DOC-004: Moderator Guide
**As a** volunteer moderator
**I want** documentation for my role
**So that** I can moderate effectively and safely

**Acceptance Criteria:**
- Moderation policies documented
- Tool usage explained
- Safety guidelines for moderators
- Escalation procedures

**Verification Command:**
```bash
# Verify guide exists
ls docs/MODERATOR-GUIDE.md
```

**Dependencies:** MEM-010, MSG-009
**Story Points:** 3
**Priority:** P2

---

### DOC-005: API Documentation (Internal)
**As a** developer
**I want** API documentation
**So that** I can build features correctly

**Acceptance Criteria:**
- All endpoints documented
- Request/response formats
- Authentication (none) documented
- Error codes listed

**Verification Command:**
```bash
# Verify docs exist
ls docs/API.md
# Verify OpenAPI spec valid (if applicable)
```

**Dependencies:** All API stories
**Story Points:** 3
**Priority:** P2

---

### DOC-006: Deployment Guide
**As a** operator
**I want** deployment documentation
**So that** I can set up new instances

**Acceptance Criteria:**
- Step-by-step deployment guide
- Ansible playbooks documented
- Environment variables listed
- Troubleshooting section

**Verification Command:**
```bash
# Verify guide exists
ls docs/DEPLOYMENT.md
# Test deployment on fresh server
```

**Dependencies:** All INF stories
**Story Points:** 3
**Priority:** P1

---

---

# Chapter 7: Milestone Dependency Tree

```
MILESTONE 1: SECURITY FOUNDATION (Week 1-2)
├── SEC-001: Tor Hidden Service Setup
├── SEC-002: Zero-Logging Server Configuration
├── SEC-003: HTTPS with Privacy-Respecting Certificate
├── SEC-004: CSP Implementation
├── SEC-008: Database Encryption at Rest
├── SEC-009: Memory-Safe Request Handling
└── INF-001: VPS Provisioning
    └── INF-002: Docker Containerization
        └── INF-003: Tor Hidden Service Configuration

MILESTONE 2: CORE APPLICATION (Week 3-4)
├── Depends on: MILESTONE 1
├── PWA-001: Service Worker with Offline Support
├── PWA-002: App Manifest for Installation
├── MEM-001: Memorial Data Model
├── MEM-002: Photo Upload with Black Ribbon
├── MEM-003: Memorial Card Component
├── UXD-001: Hajleh Hero Section
├── UXD-002: Persian/English Language Toggle
└── UXD-003: Responsive Navigation

MILESTONE 3: MEMORIAL WALL (Week 5-6)
├── Depends on: MILESTONE 2
├── MEM-004: Infinite Scroll Wall View
├── MEM-005: Individual Memorial Page
├── MEM-006: Light a Candle Interaction
├── MEM-008: Memorial Search
├── MEM-009: Memorial Submission Form
├── MEM-010: Memorial Moderation Queue
└── UXD-004: Brick Wall Background Texture

MILESTONE 4: MESSAGING (Week 7-8)
├── Depends on: MILESTONE 2
├── SEC-010: E2E Encryption for Private Messages
├── MSG-001: Message Data Model
├── MSG-002: Open Thread View
├── MSG-003: Create Open Thread
├── MSG-004: Reply to Thread
├── MSG-005: Private Thread Creation
├── MSG-006: Join Private Thread via Link
├── MSG-007: Message Expiration
└── SEC-007: Rate Limiting Without User Tracking

MILESTONE 5: BRIDGE FEATURES (Week 9-10)
├── Depends on: MILESTONE 3, MILESTONE 4
├── BRG-001: Inside/Outside Mode Toggle
├── BRG-002: Inside Mode Optimizations
├── BRG-003: Outside Mode Features
├── SEC-015: Panic Button / Quick Exit
├── SEC-005: Alt-Svc Header for Onion Discovery
├── SEC-006: Request Padding
└── SEC-011: Snowflake Bridge Integration

MILESTONE 6: ADVANCED PWA (Week 11-12)
├── Depends on: MILESTONE 5
├── PWA-003: Background Sync for Messages
├── PWA-006: Orbot Integration (Android)
├── PWA-007: APK Export with Embedded Tor
├── PWA-009: Update Notification
├── BRG-004: Snowflake Relay Volunteering
└── BRG-005: Content Bundle Export

MILESTONE 7: POLISH & TESTING (Week 13-14)
├── Depends on: All previous milestones
├── TST-001: Unit Test Suite
├── TST-002: Integration Test Suite
├── TST-003: E2E Test Suite
├── TST-005: Performance Testing
├── TST-007: Tor Compatibility Testing
├── TST-008: Offline Testing
├── UXD-005: Accessibility Compliance
├── UXD-006: Dark Mode
├── UXD-007: Loading States
└── UXD-008: Error States

MILESTONE 8: DOCUMENTATION & LAUNCH (Week 15-16)
├── Depends on: MILESTONE 7
├── DOC-001: User Guide (Persian)
├── DOC-002: User Guide (English)
├── DOC-003: Security Documentation
├── DOC-006: Deployment Guide
├── SEC-012: Reproducible Builds
├── SEC-014: Key Rotation System
├── INF-004: CI/CD Pipeline
├── INF-005: Backup System
├── INF-006: Monitoring
└── TST-004: Security Audit Preparation
```

---

# Chapter 8: Verification Matrix

| Story ID | Verification Method | Automated | CI Integration |
|----------|---------------------|-----------|----------------|
| SEC-001 | torsocks curl test | Yes | Yes |
| SEC-002 | grep for IP patterns | Yes | Yes |
| SEC-003 | nmap TLS scan | Yes | Yes |
| SEC-004 | CSP header check | Yes | Yes |
| SEC-005 | Alt-Svc header check | Yes | Yes |
| SEC-006 | Request size measurement | Yes | Yes |
| SEC-007 | Proof-of-work test | Yes | Yes |
| SEC-008 | Direct database read attempt | Yes | Yes |
| SEC-009 | npm audit + semgrep | Yes | Yes |
| SEC-010 | E2E encryption roundtrip | Yes | Yes |
| SEC-011 | WebRTC bridge test | Partial | No |
| SEC-012 | Reproducible build hash | Yes | Yes |
| SEC-013 | Metrics endpoint check | Yes | Yes |
| SEC-014 | Certificate expiry check | Yes | Yes |
| SEC-015 | Manual panic button test | No | No |
| PWA-001 | Service worker registration | Yes | Yes |
| PWA-002 | Manifest validation | Yes | Yes |
| PWA-003 | Offline sync test | Yes | Yes |
| PWA-006 | Orbot integration test | Partial | No |
| PWA-007 | APK build verification | Yes | Yes |
| MEM-* | Playwright E2E tests | Yes | Yes |
| MSG-* | Playwright E2E tests | Yes | Yes |
| BRG-* | Manual + automated | Partial | Partial |
| UXD-* | Visual regression + a11y | Yes | Yes |
| INF-* | Infrastructure tests | Yes | Partial |
| TST-* | Meta-tests | Yes | Yes |
| DOC-* | Documentation linting | Yes | Yes |

---

# Chapter 9: Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Domain seized by registrar | Medium | High | Multiple backup domains, .onion as primary |
| Server compromised | Low | High | Zero-knowledge architecture, encrypted data |
| DDoS attack | High | Medium | Tor inherent protection, rate limiting |
| Iranian government infiltration | Medium | High | No user accounts, anonymous moderation |
| Content moderation failures | Medium | Medium | Community flagging, volunteer moderators |
| Low adoption | Medium | Medium | Grassroots promotion through diaspora |
| Developer burned out | Medium | High | Open source, documentation for handoff |
| Tor blocked in Iran | High | Medium | Snowflake bridges, PWA offline mode |

---

# Appendix A: Glossary

| Term | Definition |
|------|------------|
| Hajleh | Iranian street shrine for young people who died before marriage |
| Khatm | Memorial gathering/table setup for mourning |
| Divar | Wall; in context, the protest walls with photos of the fallen |
| Termeh | Traditional Persian handwoven cloth with paisley patterns |
| Gladiolus | Tall white funeral flower common in Iranian mourning |
| PWA | Progressive Web App - installable web application |
| Tor | The Onion Router - anonymity network |
| Snowflake | Browser-based Tor bridge using WebRTC |
| Orbot | Android app providing Tor proxy |
| E2E | End-to-end encryption |
| Signal Protocol | Cryptographic protocol for secure messaging |
| Proof-of-Work | Computational puzzle to prevent spam without tracking |
| .onion | Tor hidden service address |

---

# Appendix B: Technology Choices Rationale

| Choice | Alternatives Considered | Rationale |
|--------|-------------------------|-----------|
| SvelteKit | Next.js, Remix | Smallest bundle size, best SSR, progressive enhancement |
| Fastify | Express, Koa | Fastest Node.js framework, good security defaults |
| SQLite + SQLCipher | PostgreSQL, MySQL | Simplest, no network exposure, encrypted at rest |
| Signal Protocol | Matrix, custom | Battle-tested, forward secrecy, open source |
| Workbox | Custom SW | Reliable, well-tested, good caching strategies |
| Tailwind CSS | CSS Modules, Styled Components | Small output, utility-first, easy theming |

---

*End of PRD*

*Document Hash: [To be computed at release]*
*Last Review: February 5, 2026*
*Next Review: Before each milestone*
