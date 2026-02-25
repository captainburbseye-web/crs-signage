# CRS Signage Brand Audit — Extracted from crs-web-1.pages.dev/signage-v4

## Palette (MANDATORY)
- Background: `#0E0E0E` (rgb 14,14,14)
- Secondary bg: `#23272B` (rgb 35,39,43)
- Structural green dark: `#2E473B` (rgb 46,71,59)
- Structural green mid: `#4F7942` (rgb 79,121,66)
- Highlight brass/gold: `#C2A85A` (rgb 194,168,90)
- Text: `#E5E5E5` (rgb 229,229,229)
- NO teal, NO orange, NO bright cyan

## Typography
- Display: Oswald 700/800, uppercase, letter-spacing 0.1em–0.15em
- Body/mono: JetBrains Mono 300/400
- Title size: 3.5rem (frame-title class) — establishment frame uses 800 weight
- Subtitle: ~1.5rem
- Body text: ~1.2rem
- Contact strip: ~0.75rem–1rem JetBrains Mono

## Motion Rules
- Frame transitions: `opacity 2s ease-in-out` (2 seconds, NOT 350ms)
- Ambient drift: 120s linear infinite — translate max ±1px (barely noticeable)
- VU bars: `transition: height 0.3s ease-out` — animated but subtle
- NO scale breathing, NO sweeping bars, NO neon glow
- Max 3 parallax layers (frame-overlay, depth-layer, background)

## Mandatory Persistent Elements
1. **CRS Badge** — `.crs-logo-watermark` — bottom-left of each frame, 120×40px, opacity 0.3, background-image url to CRS wordmark webp
2. **LED Indicator** — `.led-indicator` — top-right corner, green dot, "System Active"
3. **Contact strip** — bottom of container, fixed, shows: `LIVE · OPERATIONAL · 118 COWLEY ROAD · OXFORD · OX4 1JE · [time] · CRSOXFORD.COM`
4. **VU Meters** — `.vu-meter` — on recording frames, 5 bars, gradient green→amber→brass, bottom center, opacity 0.6
5. **QR Code** — `.qr-container` — on booking frame, static white box 140×140px, label "Scan to Book", links to cowleyroadstudios.com/book
6. **Frame dot indicators** — bottom center, shows current frame position

## Frame Overlays
- Cool frames: `linear-gradient(135deg, rgba(14,14,14,0.85) 0%, rgba(46,71,59,0.3) 50%, rgba(14,14,14,0.9) 100%)`
- Warm frames: `linear-gradient(135deg, rgba(14,14,14,0.75) 0%, rgba(194,168,90,0.25) 50%, rgba(14,14,14,0.85) 100%)`
- Depth layer: radial gradients at 5% opacity, 120s ambient drift

## Background texture
- `.signage-container::before` — repeating-linear-gradient grid at 15% opacity
- `.signage-container::after` — panel texture image at 6% opacity, mix-blend-mode multiply

## Pricing (from signage-v4 content)
- Recording: £35/hr · £120 half day · £220 full day
- Rehearsal: £45/2hrs · £60/3hrs · £65/4hrs
- Control room hire: £20/hr

## Frame Content (signage-v4 8 frames)
1. Establishment — "COWLEY ROAD STUDIOS" — brass title, "Serious sound. Open doors."
2. Recording — "PROFESSIONAL RECORDING" — brass title, VU meters, pricing
3. Rehearsal — "REHEARSAL ROOMS" — green title, pricing
4. Workshop Café — "WORKSHOP CAFÉ" — warm overlay, amber treatment
5. Control Room — "CONTROL ROOM HIRE" — brass, £20/hr
6. Community — "SERIOUS SOUND. OPEN DOORS." — green, student/subsidised rates
7. Book Now — "BOOK NOW" — QR code, crsoxford.com
8. Infrastructure (drift frame) — ambient background, "OXFORD GRASSROOTS CREATIVE INFRASTRUCTURE"

## Contact Strip (bottom bar)
- Fixed position, bottom 0, full width
- Background: rgba(14,14,14,0.9) with top border 1px rgba(194,168,90,0.3)
- Left: `● LIVE · OPERATIONAL`
- Centre: `118 COWLEY ROAD · OXFORD · OX4 1JE`
- Right: `[HH:MM:SS] · CRSOXFORD.COM`
- Font: JetBrains Mono ~0.75rem, letter-spacing 0.15em, color rgba(229,229,229,0.7)
