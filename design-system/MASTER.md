# Iran Uprising Digital Memorial - Design System

**Project:** Digital Divar (دیوار دیجیتال)
**Style:** Dark Mode Memorial / Cultural Authenticity
**Stack:** SvelteKit + Tailwind CSS

---

## Design Philosophy

This is a memorial platform, not a typical SaaS product. Every design decision must honor:
1. **The fallen** - 34,400+ lives lost deserve dignity
2. **Cultural authenticity** - Iranian mourning traditions (Hajleh, Khatm, Divar)
3. **Safety** - Users inside Iran risk their lives; accessibility ≠ optional
4. **Emotional resonance** - Solemn, hopeful, defiant

---

## Style: Dark Mode Memorial

**Based on:** Dark Mode (OLED) with cultural color accents
**Performance:** ⚡ Excellent
**Accessibility:** ✓ WCAG AAA compatible
**Complexity:** Low

### Key Characteristics
- Deep black backgrounds (#0D0D1A) for OLED efficiency
- High contrast text for readability in low-light
- Minimal glow effects (reserved for sacred elements)
- Cultural color accents (green, amber, red) used sparingly

---

## Color Palette

### Primary Colors (Cultural Significance)

| Name | Hex | RGB | Usage | Cultural Meaning |
|------|-----|-----|-------|------------------|
| Islam Green | `#00A651` | 0, 166, 81 | Primary accent, hope | Sacred color, paradise |
| Amber Glow | `#FFBF00` | 255, 191, 0 | Secondary accent, warmth | Candlelight, warmth |
| Blood Red | `#8B0000` | 139, 0, 0 | Tertiary accent, warning | Martyrdom, sacrifice |
| Spray Red | `#FF0000` | 255, 0, 0 | Protest elements | Defiance, urgency |

### Background & Surface

| Name | Hex | Usage |
|------|-----|-------|
| Night Sky | `#0D0D1A` | Primary background |
| Deep Black | `#000000` | OLED true black |
| Surface Dark | `#1A1A2E` | Cards, elevated surfaces |
| Surface Raised | `#252540` | Modals, dropdowns |

### Text Colors

| Name | Hex | Usage | Contrast Ratio |
|------|-----|-------|----------------|
| Text Primary | `#F8FAFC` | Headlines, primary text | 15.8:1 on #0D0D1A |
| Text Secondary | `#94A3B8` | Descriptions, meta | 7.2:1 on #0D0D1A |
| Text Muted | `#64748B` | Captions, timestamps | 4.6:1 on #0D0D1A |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#10B981` | Confirmations |
| Warning | `#F59E0B` | Cautions |
| Error | `#EF4444` | Errors |
| Info | `#3B82F6` | Informational |

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Cultural colors
        'islam-green': '#00A651',
        'amber-glow': '#FFBF00',
        'blood-red': '#8B0000',
        'spray-red': '#FF0000',
        // Backgrounds
        'night-sky': '#0D0D1A',
        'surface': '#1A1A2E',
        'surface-raised': '#252540',
        // Memorial items
        'termeh-red': '#722F37',
        'termeh-gold': '#D4AF37',
        'brass': '#B5A642',
        'candlelight': '#FFE4B5',
      }
    }
  }
}
```

---

## Typography

### Font Stack

**Persian/Farsi:** Vazirmatn (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black)
- RTL support built-in
- Fallback: Tahoma, Arial

**Latin/English:** Inter (Google Fonts)
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- Clean, modern, excellent readability
- Fallback: system-ui, sans-serif

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Vazirmatn:wght@300;400;500;700;900&display=swap');
```

### Tailwind Config

```javascript
fontFamily: {
  'persian': ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
  'latin': ['Inter', 'system-ui', 'sans-serif'],
}
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| Hero Title | 4rem (64px) | 2.5rem (40px) | 700 | 1.1 |
| Section Title | 2.5rem (40px) | 1.75rem (28px) | 700 | 1.2 |
| Card Title | 1.5rem (24px) | 1.25rem (20px) | 600 | 1.3 |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.6 |
| Caption | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 |
| Small | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.4 |

### RTL Considerations

```css
/* Base direction */
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Mixed content (Persian + English) */
.mixed-content {
  unicode-bidi: plaintext;
}

/* Numbers should remain LTR */
.ltr-numbers {
  direction: ltr;
  display: inline-block;
}
```

---

## Effects & Animation

### Glow Effects (Use Sparingly)

```css
/* Candle glow - for interactive candle elements */
.candle-glow {
  box-shadow: 0 0 20px rgba(255, 191, 0, 0.3),
              0 0 40px rgba(255, 191, 0, 0.1);
}

/* Green sacred glow - for Hajleh elements */
.sacred-glow {
  box-shadow: 0 0 30px rgba(0, 166, 81, 0.2),
              0 0 60px rgba(0, 166, 81, 0.1);
}

/* Memorial card hover */
.memorial-hover:hover {
  box-shadow: 0 0 15px rgba(0, 166, 81, 0.15);
}
```

### Animation Durations

| Type | Duration | Easing | Use Case |
|------|----------|--------|----------|
| Micro-interaction | 150ms | ease-out | Buttons, toggles |
| State change | 200ms | ease-out | Hover, focus |
| Content reveal | 300ms | ease-out | Cards, modals |
| Page transition | 400ms | ease-in-out | Navigation |
| Parallax | CSS scroll | linear | Background layers |

### Reduced Motion (CRITICAL)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable parallax */
  .parallax-layer {
    transform: none !important;
  }
}
```

### Candle Flicker Animation

```css
@keyframes candle-flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  25% { opacity: 0.9; transform: scale(0.98) rotate(-1deg); }
  50% { opacity: 1; transform: scale(1.02); }
  75% { opacity: 0.95; transform: scale(0.99) rotate(1deg); }
}

.candle-flame {
  animation: candle-flicker 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .candle-flame {
    animation: none;
  }
}
```

---

## Component Patterns

### Memorial Card

```svelte
<div class="
  group
  bg-surface
  rounded-lg
  overflow-hidden
  border border-white/5
  hover:border-islam-green/30
  transition-all duration-200
  cursor-pointer
">
  <!-- Photo with ribbon -->
  <div class="relative aspect-[3/4]">
    <img src={photo} alt={name} class="object-cover w-full h-full" />
    <div class="absolute top-0 right-0 w-16 h-16">
      <img src="/elements/mourning-ribbon.png" alt="" class="w-full" />
    </div>
  </div>

  <!-- Info -->
  <div class="p-4">
    <h3 class="font-persian text-lg font-bold text-white">{namePersian}</h3>
    <p class="text-text-secondary text-sm">{nameEnglish}</p>
    <p class="text-text-muted text-xs mt-2">{age} • {location}</p>
  </div>

  <!-- Candle count -->
  <div class="flex items-center gap-2 px-4 pb-4">
    <img src="/elements/tealight-single.png" alt="" class="w-4 h-4" />
    <span class="text-amber-glow text-sm">{candleCount}</span>
  </div>
</div>
```

### Button Variants

```css
/* Primary - Green (hope, action) */
.btn-primary {
  @apply bg-islam-green text-white font-medium px-6 py-3 rounded-lg
         hover:bg-islam-green/90 transition-colors duration-150
         focus:outline-none focus:ring-2 focus:ring-islam-green/50
         cursor-pointer;
}

/* Secondary - Outlined */
.btn-secondary {
  @apply border border-white/20 text-white font-medium px-6 py-3 rounded-lg
         hover:bg-white/5 transition-colors duration-150
         focus:outline-none focus:ring-2 focus:ring-white/20
         cursor-pointer;
}

/* Danger - For destructive actions */
.btn-danger {
  @apply bg-blood-red text-white font-medium px-6 py-3 rounded-lg
         hover:bg-blood-red/90 transition-colors duration-150
         focus:outline-none focus:ring-2 focus:ring-blood-red/50
         cursor-pointer;
}

/* Ghost - Minimal */
.btn-ghost {
  @apply text-text-secondary font-medium px-4 py-2 rounded-lg
         hover:text-white hover:bg-white/5 transition-colors duration-150
         cursor-pointer;
}
```

---

## Accessibility Requirements

### Minimum Standards

- **WCAG Level:** AA (target AAA where possible)
- **Color Contrast:** 4.5:1 for normal text, 3:1 for large text
- **Touch Targets:** Minimum 44×44px
- **Focus Indicators:** Visible on all interactive elements
- **Screen Readers:** All images have alt text, ARIA labels on icon buttons

### Keyboard Navigation

```css
/* Visible focus rings */
:focus-visible {
  outline: 2px solid #00A651;
  outline-offset: 2px;
}

/* Remove outline on mouse click */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Alt Text Guidelines

| Image Type | Alt Text |
|------------|----------|
| Memorial photo | "{Name}, {age}, {location}" |
| Decorative | `alt=""` (empty) |
| Icon buttons | Use `aria-label` instead |
| Candle/Flower | "Virtual candle" / "Virtual flower" |
| Cultural imagery | Brief description of significance |

---

## Parallax Implementation

### Layer Structure

```svelte
<div class="parallax-container relative overflow-hidden">
  <!-- Layer 0: Sky (furthest) -->
  <div
    class="parallax-layer absolute inset-0"
    style="transform: translateY(calc(var(--scroll) * 0.1))"
  >
    <img src="/parallax/sky.webp" alt="" class="w-full h-full object-cover" />
  </div>

  <!-- Layer 1: Wall -->
  <div
    class="parallax-layer absolute inset-0"
    style="transform: translateY(calc(var(--scroll) * 0.3))"
  >
    <img src="/parallax/wall-base.webp" alt="" class="w-full h-full object-cover" />
  </div>

  <!-- Layer 2: Details (handprints, graffiti) -->
  <div
    class="parallax-layer absolute inset-0"
    style="transform: translateY(calc(var(--scroll) * 0.6))"
  >
    <!-- Positioned elements -->
  </div>

  <!-- Layer 3: Content (memorial cards) -->
  <div class="relative z-10">
    <!-- Main content scrolls normally (1.0x) -->
  </div>

  <!-- Layer 4: Particles (closest) -->
  <div
    class="parallax-layer absolute inset-0 pointer-events-none"
    style="transform: translateY(calc(var(--scroll) * -0.2))"
  >
    <img src="/parallax/particles-dust.png" alt="" class="w-full h-full object-cover mix-blend-screen opacity-30" />
  </div>
</div>
```

### Svelte Scroll Handler

```svelte
<script>
  let scrollY = $state(0);

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
</script>

<svelte:window bind:scrollY />

<div
  class="parallax-container"
  style:--scroll="{prefersReducedMotion ? 0 : scrollY}px"
>
  <!-- layers -->
</div>
```

---

## Anti-Patterns to Avoid

| Don't | Why | Do Instead |
|-------|-----|------------|
| Emojis as icons | Unprofessional, inconsistent | SVG icons (Lucide, Heroicons) |
| Bright colors on dark bg | Eye strain, loses solemnity | Muted accents, glow effects |
| Excessive animation | Disrespectful, accessibility issue | 1-2 subtle animations max |
| Light mode default | Doesn't match memorial mood | Dark mode default, light optional |
| Sans-serif for Persian | Poor readability | Vazirmatn or similar |
| Generic stock photos | Loses cultural authenticity | Custom cultural imagery |
| Gamification | Disrespectful to the dead | Solemn interaction patterns |

---

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent set (Lucide recommended)
- [ ] Cultural imagery is authentic and respectful
- [ ] Color palette matches specification
- [ ] Dark mode tested thoroughly

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide visual feedback
- [ ] Transitions are 150-300ms
- [ ] Focus states visible for keyboard navigation
- [ ] Touch targets minimum 44×44px

### Accessibility
- [ ] `prefers-reduced-motion` respected (parallax disabled)
- [ ] All images have appropriate alt text
- [ ] ARIA labels on icon-only buttons
- [ ] Color contrast meets WCAG AA minimum
- [ ] Keyboard navigation works throughout

### RTL Support
- [ ] Persian text displays correctly
- [ ] Layout mirrors appropriately
- [ ] Numbers remain LTR where needed
- [ ] Mixed content handles gracefully

### Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] Fonts subset for Persian characters
- [ ] Parallax uses transform (not top/left)
- [ ] Animations use GPU-accelerated properties

---

*زن، زندگی، آزادی*
*Woman, Life, Freedom*
