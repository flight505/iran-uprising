# Graphics Assets Design Document

**Project:** Iran Uprising Digital Memorial
**Date:** February 5, 2026
**Status:** Ready for Generation

---

## Overview

This document specifies all visual assets for the Digital Divar platform, optimized for generation with Nano Banana (Gemini 3 Pro Image / FLUX). The design prioritizes:

1. **Cultural authenticity** - Iranian mourning traditions (Hajleh, Khatm, Divar)
2. **Parallax depth** - Layered compositions for immersive scrolling
3. **Technical practicality** - Solid backgrounds for easy masking (no fake checkerboard)

### Background Removal Strategy

**Problem:** AI image generators sometimes create fake checkerboard patterns when asked for transparent backgrounds, making masking difficult.

**Solution:** Generate overlay assets on **solid high-contrast backgrounds**:
- **Bright green (#00FF00)** - For dark objects (ribbon, hair, candles)
- **Bright magenta (#FF00FF)** - For objects with green tones
- **Pure white (#FFFFFF)** - For dark silhouettes

This enables clean auto-masking in any image editor with magic wand or color key removal.

---

## Parallax Architecture

The site uses multi-layer parallax for depth and immersion:

```
LAYER 0 (Furthest - 0.1x scroll speed)
├── Night sky gradient
├── Distant Tehran cityscape silhouette
└── Fog/atmosphere

LAYER 1 (Background - 0.3x scroll speed)
├── Brick wall texture (tileable)
└── Ambient shadows

LAYER 2 (Midground - 0.6x scroll speed)
├── Red handprints
├── Graffiti text
└── Cut hair bundles

LAYER 3 (Foreground - 1.0x scroll speed)
├── Memorial photos (taped papers)
├── Tealight candles
└── Interactive elements

LAYER 4 (Closest - 1.2x scroll speed)
├── Floating particles (dust, ash)
└── Candle glow overlays
```

---

## Asset Specifications

### CATEGORY 1: Hero Images

#### 1.1 Hajleh Hero - Desktop
**Filename:** `hajleh-hero-desktop.png`
**Dimensions:** 1920×1080px
**Format:** PNG → WebP for delivery
**Background:** Full scene (no removal needed)

**Prompt:**
```
A glowing Hajleh shrine at night on a dark Tehran street. The shrine is
bulbous and lantern-shaped, draped in matte black velvet fabric. Strings
of bare incandescent bulbs wrap around it emitting light in Islam Green,
warm Amber, and deep Blood Red. Small mirrors line the interior creating
fragmented specular highlights and reflections.

Green light dominates the scene at 60 percent, amber at 25 percent, red
at 15 percent. Hard dramatic shadows cast by the bare bulbs, no soft
diffuse lighting. Colored light spills and reflects on wet cobblestones
in the foreground. Low fog and mist at ground level evokes Tehran winter
nights. The surrounding street fades into darkness, all attention on
the sacred shrine.

Photorealistic cinematic photography, 35mm lens, shallow depth of field,
night photography with long exposure feel, atmospheric and solemn,
sacred memorial aesthetic. High detail on fabric texture and light bulbs.
```

**Color Reference:**
- Islam Green: #00A651
- Amber: #FFBF00
- Blood Red: #8B0000
- Matte Black: #1A1A1A
- Night Sky: #0D0D1A

---

#### 1.2 Hajleh Hero - Mobile
**Filename:** `hajleh-hero-mobile.png`
**Dimensions:** 1080×1920px
**Format:** PNG → WebP

**Prompt:**
```
[Same as desktop prompt, add:]
Vertical composition, the Hajleh shrine fills the center of frame with
more vertical space above showing dark night sky and below showing wet
cobblestones with light reflections. Portrait orientation optimized for
mobile viewing.
```

---

#### 1.3 Hajleh Hero - 4K
**Filename:** `hajleh-hero-4k.png`
**Dimensions:** 3840×2160px
**Format:** PNG → WebP

**Prompt:** Same as desktop, generate at maximum resolution.

---

### CATEGORY 2: Parallax Wall Layers

#### 2.1 Night Sky Background (Layer 0)
**Filename:** `parallax-sky.png`
**Dimensions:** 3840×2160px
**Format:** PNG

**Prompt:**
```
Dark night sky over Tehran, deep navy blue (#0D0D1A) gradient transitioning
to slightly lighter blue (#1a1a2e) near horizon. Very subtle stars visible.
Distant silhouette of Tehran cityscape and mountains on the horizon line,
barely visible, just darker shapes against the dark sky. Low atmospheric
haze. No moon. Ominous, heavy, oppressive atmosphere. Minimal detail,
serves as deep background layer.
```

---

#### 2.2 Brick Wall Base (Layer 1)
**Filename:** `parallax-wall-base.png`
**Dimensions:** 2560×1440px (seamless tileable)
**Format:** PNG

**Prompt:**
```
Clean urban brick wall texture, weathered beige and gray bricks with
visible mortar lines. The wall is relatively clean with subtle aging -
some discoloration and minor wear but not heavily damaged or graffitied.
Even lighting with soft shadows in mortar gaps. Seamless tileable texture,
edges must match for repeating. High detail on brick surface texture.
Documentary photography style, neutral, serves as background for overlaid
memorial photos.
```

---

#### 2.3 Wall Shadow Overlay (Layer 1b)
**Filename:** `parallax-wall-shadows.png`
**Dimensions:** 2560×1440px
**Background:** Solid black (#000000), shadows in varying opacity

**Prompt:**
```
Abstract shadow patterns on a pure black background. Soft diagonal shadows
suggesting light coming from below left, as if from street-level candles.
Varying opacity from 10 to 40 percent gray. Organic shadow shapes with
soft edges. This is an overlay layer for adding depth to a brick wall.
No objects, just shadow and light patterns.
```

---

### CATEGORY 3: Wall Detail Elements (Layer 2)

#### 3.1 Red Handprint Set
**Filenames:** `handprint-01.png` through `handprint-05.png`
**Dimensions:** 400×500px each
**Background:** Solid bright green (#00FF00) for easy masking

**Prompts:**

**Handprint 01 - Clean Open Palm:**
```
A single red handprint of an open palm pressed firmly against a solid
bright green background (#00FF00). The handprint is painted in red that
gradients from bright red (#FF0000) at edges to darker dried blood red
(#8B0000) in the center. Paint texture visible with slight drips at
fingertips. Stark contrast against the green for easy background removal.
Protest art style, visceral, powerful.
```

**Handprint 02 - Smeared:**
```
A red handprint that has been smeared downward, as if the hand dragged
down the wall. On solid bright green background (#00FF00). The smear
trails from the palm downward about 6 inches. Red to dark red gradient.
Paint texture, protest art aesthetic. High contrast for masking.
```

**Handprint 03 - Fingers Spread:**
```
A red handprint with fingers spread wide apart, tense and expressive.
On solid bright green background (#00FF00). Bright red (#FF0000) to
blood red (#8B0000) gradient. Some paint splatter around the edges.
Protest art, defiant gesture. Clean edges against green background.
```

**Handprint 04 - Partial/Faded:**
```
A partial red handprint, as if made with less paint - some areas faded
or incomplete. Only three fingers and part of palm visible. On solid
bright green background (#00FF00). More blood red (#8B0000) than bright
red, suggesting older dried paint. Weathered protest art look.
```

**Handprint 05 - Double Overlap:**
```
Two red handprints overlapping each other at different angles, creating
a layered effect. On solid bright green background (#00FF00). Different
shades of red showing depth - one brighter, one darker and more dried.
Chaotic, urgent protest art aesthetic.
```

---

#### 3.2 Persian Graffiti - "Woman, Life, Freedom"
**Filename:** `graffiti-zan-zendegi-azadi.png`
**Dimensions:** 1600×400px
**Background:** Solid bright green (#00FF00)

**Prompt:**
```
Persian calligraphy graffiti text "زن، زندگی، آزادی" (Woman Life Freedom)
in red spray paint on a solid bright green background (#00FF00). Stencil
style with rough edges and spray paint overspray texture. The text reads
right to left in Persian script. Bold, urgent, protest aesthetic. Some
paint drips below letters. High contrast against green for easy masking.
Street art style, revolutionary.
```

---

#### 3.3 Cut Hair Bundle
**Filename:** `cut-hair-bundle.png`
**Dimensions:** 200×300px
**Background:** Solid bright green (#00FF00)

**Prompt:**
```
A small bundle of long dark black hair tied together with simple white
thread, freshly cut. The hair bundle is about 6 inches long, slightly
disheveled and natural looking. On a solid bright green background
(#00FF00) for easy masking. This is a symbol of Iranian women's protest -
cutting their hair in defiance. Photorealistic, soft studio lighting,
sharp focus on the hair texture. Poignant and powerful symbol.
```

---

#### 3.4 Tealight Candle Row
**Filename:** `tealight-row.png`
**Dimensions:** 800×200px
**Background:** Solid black (#000000) with glow visible

**Prompt:**
```
A row of 5 small tealight candles in aluminum holders, all lit with warm
orange flames. Arranged in a gentle curve as if placed at the base of a
memorial wall. On solid black background. Each flame has a soft warm glow
radius. The candles are at slight different heights and angles, natural
placement. Warm intimate lighting, each flame distinct. Memorial candle
vigil aesthetic.
```

---

### CATEGORY 4: Memorial Photo Elements (Layer 3)

#### 4.1 A4 Paper Frame with Tape
**Filename:** `paper-frame-tape.png`
**Dimensions:** 840×1188px (A4 proportion)
**Background:** Solid bright magenta (#FF00FF)

**Prompt:**
```
A slightly wrinkled white A4 paper sheet with yellowed scotch tape pieces
at all four corners, as if taped to a wall. The paper has subtle wrinkles
and one corner slightly peeling. The center of the paper is plain white.
On a solid bright magenta background (#FF00FF) for easy masking. The tape
is semi-transparent and yellowed with age. Documentary style, authentic
protest wall aesthetic. The paper should look like it's been posted
hastily on a street wall.
```

---

#### 4.2 Black Mourning Ribbon
**Filename:** `mourning-ribbon.png`
**Dimensions:** 512×512px
**Background:** Solid bright green (#00FF00)

**Prompt:**
```
A diagonal black satin ribbon positioned at 45 degree angle, as used on
mourning portraits in Iranian tradition. The ribbon has subtle sheen and
light gradient suggesting luxurious fabric texture. On a solid bright
green background (#00FF00) for easy masking. The ribbon is elegant,
funeral appropriate, about 2 inches wide. Clean crisp edges. Studio
product photography style, isolated object.
```

---

#### 4.3 Single Tealight Candle
**Filename:** `tealight-single.png`
**Dimensions:** 160×120px
**Background:** Solid bright green (#00FF00)

**Prompt:**
```
A single tealight candle in small aluminum holder, lit with warm orange
flame. Soft warm glow radius around the flame. On solid bright green
background (#00FF00) for easy masking. Photorealistic, intimate lighting.
The flame should feel alive, hopeful, sacred. Clean edges. This is an
interactive UI element for "lighting a candle" for the deceased.
```

---

#### 4.4 Gladiolus Flower
**Filename:** `gladiolus-single.png`
**Dimensions:** 192×384px
**Background:** Solid bright magenta (#FF00FF)

**Prompt:**
```
A single stem of white gladiolus flower, the traditional Iranian funeral
flower. Tall and elegant, multiple white blooms along the vertical stem
with green leaves. On solid bright magenta background (#FF00FF) for easy
masking. Soft natural lighting, photorealistic. The flower conveys dignity,
remembrance, and respect for the dead. Vertical orientation, clean edges
for UI compositing.
```

---

### CATEGORY 5: Memorial Table (Khatm) Scene

#### 5.1 Khatm Table - Full Scene
**Filename:** `khatm-table-full.png`
**Dimensions:** 1920×800px
**Format:** PNG (full scene, no masking needed)

**Prompt:**
```
A traditional Iranian Khatm memorial table setup viewed from slightly
elevated angle. A wooden table covered with luxurious Termeh cloth in
deep crimson (#722F37) with intricate gold (#D4AF37) paisley patterns -
the jacquard weave texture must be visible, not flat color.

Center of table: an ornate empty brass picture frame with a diagonal
black satin mourning ribbon across the top right corner. The frame is
empty, waiting for a portrait.

Flanking the frame: tall white gladiolus flowers in traditional brass
vases, 2-3 stems each side.

Foreground items: a pyramid of dates dusted with white coconut, a brass
tray with halva (brown tahini paste with decorative wave patterns pressed
into surface, garnished with green pistachio slivers), thin white taper
candles in brass holders with soft glowing flames.

Warm candlelight at 2700K color temperature, focused illumination on the
center frame, soft shadows. Rich fabric textures, gold threads catching
candlelight. Intimate, dignified, sacred Iranian mourning atmosphere.
Photorealistic with shallow depth of field, the frame is the focal point.
```

**Color Reference:**
- Termeh Crimson: #722F37
- Termeh Gold: #D4AF37
- Brass: #B5A642
- Halva Brown: #8B7355
- Candlelight: #FFE4B5

---

#### 5.2 Khatm Table - Card Background
**Filename:** `khatm-table-card.png`
**Dimensions:** 800×600px

**Prompt:** Same as full scene, tighter crop focused on the central frame and immediate surrounding items.

---

### CATEGORY 6: App Icons

#### 6.1 App Icon Master
**Filename:** `app-icon-master.png`
**Dimensions:** 1024×1024px
**Background:** Dark (#0D0D1A)

**Prompt:**
```
A simplified iconic silhouette of a Hajleh shrine (Iranian street memorial)
glowing with green light (#00A651). The shrine shape is bulbous and
lantern-like, geometric and minimal but recognizable. A soft green glow
emanates from and around the silhouette. Dark background (#0D0D1A).
Modern app icon aesthetic, clean geometric shapes, perfectly centered.
No text, no additional elements. The green glow should feel hopeful,
like a beacon in darkness. Suitable for scaling to small sizes.
```

**Derived Sizes (crop/scale from master):**
- 512×512px
- 384×384px
- 192×192px
- 152×152px
- 144×144px
- 128×128px
- 96×96px
- 72×72px

---

#### 6.2 Favicon
**Filename:** `favicon-master.png`
**Dimensions:** 64×64px
**Background:** Transparent (use solid green #00FF00 if needed for generation)

**Prompt:**
```
Minimal Hajleh shrine silhouette outline in bright green (#00A651) on
solid bright green background (#00FF00 - will be removed). Extremely
simple geometric lantern shape that reads clearly at 16x16 pixels.
Single color, no gradients, no glow effects. Clean vector-like edges.
Icon must be recognizable when very small.
```

**Derived Sizes:** 48×48, 32×32, 16×16px

---

#### 6.3 Open Graph Image - Facebook/LinkedIn
**Filename:** `og-image-facebook.png`
**Dimensions:** 1200×630px
**Background:** Full scene

**Prompt:**
```
Social media share image for Iran Uprising memorial. Left third of image:
the Hajleh shrine glowing with green, amber and red lights in darkness,
atmospheric and powerful. Right two thirds: very dark background (#0D0D1A)
with text "Iran Uprising" in clean white sans-serif font (Inter style),
and below it the Persian text "زن، زندگی، آزادی" in elegant Persian
typography. Subtle green light from the shrine spills onto and illuminates
the edges of the text. Cinematic, powerful, shareable. Digital memorial
aesthetic. The composition should work as a link preview thumbnail.
```

---

#### 6.4 Open Graph Image - Twitter
**Filename:** `og-image-twitter.png`
**Dimensions:** 1200×600px

**Prompt:** Same concept as Facebook, slightly wider crop to fit 2:1 ratio.

---

### CATEGORY 7: UI States

#### 7.1 Empty State - Waiting Wall
**Filename:** `empty-state-wall.png`
**Dimensions:** 800×600px
**Background:** Full scene

**Prompt:**
```
A section of bare brick wall in muted beige and gray tones. A single
piece of yellowed tape hangs in the center of the wall, empty, waiting
to hold a photo. One unlit tealight candle sits at the base of the wall.
Soft diffused lighting, slightly desaturated colors. The mood is
expectant, quiet, contemplative - a space waiting to hold memory.
Simple and minimal, poignant. Empty but not sad, full of potential.
```

---

#### 7.2 Empty State - No Results
**Filename:** `empty-state-no-results.png`
**Dimensions:** 400×300px
**Background:** Subtle gradient or solid

**Prompt:**
```
A corner of a bare brick wall with soft shadows. A single white gladiolus
flower laid gently at the base of the wall on the ground. No papers,
no tape, no candles - just the flower as an offering. Quiet and respectful
emptiness. Muted, desaturated colors. Gentle diffused lighting. The
absence is meaningful. Peaceful, contemplative mood.
```

---

#### 7.3 Loading Animation Frames
**Filenames:** `candle-flame-01.png` through `candle-flame-04.png`
**Dimensions:** 128×128px each
**Background:** Solid black (#000000)

**Prompt (generate 4 variations):**
```
A single white candle centered in frame with a warm orange flame, on
solid black background. The flame is captured mid-flicker. Variation
[1/2/3/4]: flame leaning [slightly left / center / slightly right /
center with larger glow]. Soft warm glow around flame. Each frame
slightly different for animation. Intimate, hopeful, sacred. Clean
isolated candle for animation sprite sheet.
```

**Post-processing:** Combine into CSS animation or Lottie file with 500ms per frame, looping.

---

### CATEGORY 8: Floating Particles (Layer 4)

#### 8.1 Dust/Ash Particles
**Filename:** `particles-dust.png`
**Dimensions:** 1920×1080px
**Background:** Solid black (#000000) - particles in white/gray

**Prompt:**
```
Floating dust and ash particles scattered across frame on solid black
background. Various sizes from tiny specks to small fragments. Some
particles slightly blurred suggesting depth of field. Organic random
distribution, not uniform. White and light gray particles. This is an
overlay layer for adding atmospheric depth. Some particles should be
brighter (closer to camera), some dimmer (further away). Ethereal,
memorial atmosphere.
```

**Usage:** Overlay with screen/add blend mode, animate with slow drift

---

#### 8.2 Candle Glow Overlay
**Filename:** `glow-overlay-warm.png`
**Dimensions:** 1920×1080px
**Background:** Solid black (#000000)

**Prompt:**
```
Soft warm light glow effects on solid black background. Multiple soft
circular warm orange glows (#FFA500) of varying sizes scattered in the
lower portion of the frame, suggesting candlelight from below. Glows
have soft feathered edges, strongest at center fading to transparent.
This is an overlay layer for adding warm candlelight ambiance. The
glows should feel like light sources just out of frame at the bottom.
```

**Usage:** Overlay with screen/add blend mode on wall sections

---

## Generation Order

### Phase 1: Hero Images (Critical Path)
1. `hajleh-hero-4k.png` - Generate at highest res first
2. `hajleh-hero-desktop.png` - Crop/regenerate from 4K
3. `hajleh-hero-mobile.png` - Vertical composition

### Phase 2: Parallax Wall System
4. `parallax-sky.png` - Background layer
5. `parallax-wall-base.png` - Tileable brick texture
6. `parallax-wall-shadows.png` - Shadow overlay

### Phase 3: Wall Detail Elements
7. `handprint-01.png` through `handprint-05.png` - Green background
8. `graffiti-zan-zendegi-azadi.png` - Green background
9. `cut-hair-bundle.png` - Green background
10. `tealight-row.png` - Black background

### Phase 4: Memorial Elements
11. `paper-frame-tape.png` - Magenta background
12. `mourning-ribbon.png` - Green background
13. `tealight-single.png` - Green background
14. `gladiolus-single.png` - Magenta background

### Phase 5: Khatm Scene
15. `khatm-table-full.png` - Full scene
16. `khatm-table-card.png` - Card crop

### Phase 6: App Icons & Social
17. `app-icon-master.png` - Scale for all sizes
18. `favicon-master.png` - Scale for all sizes
19. `og-image-facebook.png`
20. `og-image-twitter.png`

### Phase 7: UI States & Particles
21. `empty-state-wall.png`
22. `empty-state-no-results.png`
23. `candle-flame-01.png` through `candle-flame-04.png`
24. `particles-dust.png`
25. `glow-overlay-warm.png`

---

## Post-Processing Checklist

### For Green/Magenta Background Assets:
1. Open in image editor (Photoshop, GIMP, Photopea)
2. Select background color with magic wand (tolerance: 10-20)
3. Delete selection
4. Save as PNG with transparency
5. Verify edges are clean

### For Animation Frames:
1. Import all frames into sprite sheet or animation tool
2. Set frame duration (500ms recommended)
3. Export as:
   - Animated GIF (fallback)
   - CSS animation sprite sheet
   - Lottie JSON (preferred)

### For Parallax Layers:
1. Ensure consistent dimensions for layering
2. Test scroll speeds in browser
3. Optimize file sizes (WebP for delivery)

---

## Directory Structure

```
/public/images/
├── hero/
│   ├── hajleh-hero-desktop.webp
│   ├── hajleh-hero-mobile.webp
│   └── hajleh-hero-4k.webp
├── parallax/
│   ├── sky.webp
│   ├── wall-base.webp
│   ├── wall-shadows.png
│   ├── particles-dust.png
│   └── glow-overlay-warm.png
├── elements/
│   ├── handprint-01.png (through 05)
│   ├── graffiti-zan-zendegi-azadi.png
│   ├── cut-hair-bundle.png
│   ├── tealight-row.png
│   ├── tealight-single.png
│   ├── paper-frame-tape.png
│   ├── mourning-ribbon.png
│   └── gladiolus-single.png
├── khatm/
│   ├── khatm-table-full.webp
│   └── khatm-table-card.webp
├── icons/
│   ├── app-icon-512.png
│   ├── app-icon-192.png
│   ├── (all sizes...)
│   └── favicon.ico
├── social/
│   ├── og-image-facebook.png
│   └── og-image-twitter.png
├── ui/
│   ├── empty-state-wall.webp
│   ├── empty-state-no-results.webp
│   └── loading-candle.gif
└── source/
    └── (original PNGs before processing)
```

---

## Quality Checklist

Before finalizing each asset:

- [ ] Emotional impact - Does it honor the fallen?
- [ ] Cultural accuracy - Would an Iranian recognize this?
- [ ] Technical quality - High resolution, clean edges?
- [ ] Color accuracy - Matches specified hex values?
- [ ] File size - Optimized for web delivery?
- [ ] Accessibility - Sufficient contrast?
- [ ] Parallax compatibility - Correct layer dimensions?

---

*This document serves as the single source of truth for all graphics generation. Update as assets are completed.*

**Total Assets:** 25 unique generations + derived sizes
**Estimated Generation Time:** 2-3 hours with iteration
**Post-Processing Time:** 1-2 hours for masking and optimization

---

*In memory of the 34,400+ who have given their lives for freedom.*

*زن، زندگی، آزادی*
