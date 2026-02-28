/**
 * WorkshopCafe.tsx — Workshop Café signage loop (/cafe route)
 *
 * Brand colours from CRS_Workshop_Cafe_Brand_Colours_Reference.pdf:
 *   Billet Mustard   #C2A85A  — signage plates (the big yellow fascia)
 *   Vegetation Green #2E473B  — community surfaces / dominant bg
 *   Nettle Green     #4F7942  — primary brand indicator / accents
 *   Olive Nettle     #7F8F55  — borders / frames
 *   Charcoal Slate   #23272B  — background / shadow
 *   Brass Panel      #B5A642  — heritage detail
 *   Cream            #F0EDE4  — text on dark backgrounds
 *
 * Frame loop (7 frames):
 *   0. Identity      — Opening April 2026 + what we are (18s)
 *   1. Coming Soon   — April opening teaser (14s)
 *   2. Events        — Dano's Jam + community events (14s)
 *   3. Venue Hire    — Make It Your Own (12s)
 *   4. Repairs       — Instrument + AV tech (12s)
 *   5. Community     — Art, co-working, workshops (12s)
 *   6. Find Us       — Contact block (10s)
 *
 * SIZING: Tuned for 55" 1080p at ~3m viewing distance.
 */

import React, { useState, useEffect, useRef } from 'react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const WC = {
  bg:          '#23272B',
  bgDeep:      '#1A1E21',
  vegGreen:    '#2E473B',
  nettle:      '#4F7942',
  olive:       '#7F8F55',
  mustard:     '#C2A85A',
  brass:       '#B5A642',
  cream:       '#F0EDE4',
  creamDim:    'rgba(240,237,228,0.75)',
  creamMute:   'rgba(240,237,228,0.50)',
  border:      'rgba(79,121,66,0.30)',
  borderWarm:  'rgba(194,168,90,0.28)',
}

const WT = {
  display: "'Oswald', sans-serif",
  mono:    "'JetBrains Mono', monospace",
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function CafeTicker() {
  const items = [
    '◆', 'THE WORKSHOP CAFÉ', '◆', '118 Cowley Road · Oxford · OX4 1JE',
    '◆', 'Opening April 2026', '◆', 'Coffee · Repairs · Events · Art · Workspace',
    '◆', 'Home to Cowley Road Studios', '◆', 'workshopcafe.ox',
    '◆', '01865 722027', '◆',
  ]
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 52, background: WC.vegGreen, borderTop: `2px solid ${WC.mustard}`,
      overflow: 'hidden', zIndex: 20, display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', gap: '4rem', whiteSpace: 'nowrap',
        animation: 'tickerScroll 40s linear infinite',
        fontFamily: WT.mono, fontSize: 22, letterSpacing: '0.16em',
        color: WC.mustard, textTransform: 'uppercase', fontWeight: 600,
      }}>
        {items.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  )
}

// ─── Logo wordmark — matches the real mustard fascia ─────────────────────────
function WorkshopLogo({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scale = size === 'lg' ? 1.8 : size === 'md' ? 1.2 : 0.75
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', background: WC.mustard,
      border: `${Math.max(2, Math.round(3 * scale))}px solid ${WC.vegGreen}`,
      borderRadius: 3,
      padding: `${Math.round(4 * scale)}px ${Math.round(10 * scale)}px`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.5)', flexShrink: 0,
    }}>
      <span style={{
        fontFamily: WT.mono, fontSize: Math.round(8 * scale), fontWeight: 600,
        color: WC.vegGreen, letterSpacing: '0.18em', textTransform: 'uppercase',
        lineHeight: 1, opacity: 0.75,
      }}>THE</span>
      <span style={{
        fontFamily: WT.display, fontSize: Math.round(16 * scale), fontWeight: 800,
        color: WC.vegGreen, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1,
      }}>WORKSHOP CAFÉ</span>
    </div>
  )
}

// ─── Shell ────────────────────────────────────────────────────────────────────
const HEADER_H = 110
const FOOTER_H = 80

function WorkshopShell({ children, frame, total }: {
  children: React.ReactNode; frame: number; total: number
}) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  )
  useEffect(() => {
    const id = setInterval(() =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    , 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, background: WC.bgDeep, overflow: 'hidden', fontFamily: WT.mono }}>
      {/* Warm texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse at 30% 20%, ${WC.vegGreen}22 0%, transparent 55%),
                     radial-gradient(ellipse at 75% 80%, ${WC.mustard}11 0%, transparent 50%)`,
      }} />

      {/* Header — mustard fascia */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: HEADER_H,
        background: `linear-gradient(180deg, ${WC.mustard} 0%, ${WC.brass} 100%)`,
        borderBottom: `3px solid ${WC.vegGreen}`, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
      }}>
        <WorkshopLogo size="md" />
        <div style={{
          fontFamily: WT.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.28em',
          color: WC.vegGreen, textTransform: 'uppercase', opacity: 0.85, textAlign: 'center',
        }}>THE BILLET BUILDING · 118 COWLEY ROAD</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                width: i === frame ? 18 : 7, height: 7, borderRadius: 4,
                background: i === frame ? WC.vegGreen : `${WC.vegGreen}66`,
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
          <div style={{ fontFamily: WT.mono, fontSize: 18, color: WC.vegGreen, letterSpacing: '0.12em', fontWeight: 600 }}>{time}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', top: HEADER_H, bottom: FOOTER_H, left: 0, right: 0, overflow: 'hidden', zIndex: 10 }}>
        {children}
      </div>

      {/* Footer — dark green strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: FOOTER_H,
        background: WC.vegGreen, borderTop: `3px solid ${WC.mustard}`, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
      }}>
        <WorkshopLogo size="sm" />
        <div style={{ fontFamily: WT.mono, fontSize: 16, color: WC.mustard, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.85 }}>
          Coffee · Repairs · Events · Workspace
        </div>
      </div>

      <CafeTicker />
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const sectionLabel = (text: string) => (
  <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.2rem,2vw,2.8rem)', letterSpacing: '0.3em', color: WC.olive, textTransform: 'uppercase', opacity: 0.85 }}>{text}</div>
)
const divider = (
  <div style={{ width: 'clamp(200px,45vw,700px)', height: 2, background: `linear-gradient(90deg,transparent,${WC.nettle}88,transparent)` }} />
)

// ─── FRAME 0: IDENTITY ────────────────────────────────────────────────────────
function CafeIdentityFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,4vmin,5rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      <div style={{ fontFamily: WT.display, fontSize: 'clamp(4rem,9vw,11rem)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: WC.cream, textAlign: 'center', lineHeight: 0.92, textShadow: `0 0 80px ${WC.nettle}44` }}>
        Workshop<br /><span style={{ color: WC.mustard }}>Café</span>
      </div>
      <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.4rem,2.4vw,3rem)', color: WC.creamDim, letterSpacing: '0.12em', textAlign: 'center', lineHeight: 1.6, textTransform: 'uppercase' }}>
        Coffee · Repairs · Events · Community
      </div>
      {divider}
      <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.2rem,2vw,2.6rem)', color: WC.olive, letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center', opacity: 0.85 }}>
        Home to Cowley Road Studios
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: `${WC.vegGreen}33`, border: `2px solid ${WC.nettle}`, borderRadius: 6, padding: 'clamp(10px,1.5vmin,20px) clamp(20px,3vw,40px)' }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: WC.mustard, boxShadow: `0 0 12px ${WC.mustard}`, animation: 'ledPulse 2.4s ease-in-out infinite' }} />
        <span style={{ fontFamily: WT.mono, fontSize: 'clamp(1.2rem,2vw,2.6rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: WC.mustard, fontWeight: 700 }}>Opening April 2026</span>
      </div>
    </div>
  )
}

// ─── FRAME 1: COMING SOON ─────────────────────────────────────────────────────
function CafeComingSoonFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,3.5vmin,4.5rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      {sectionLabel('Something Good Is Coming')}
      <div style={{ fontFamily: WT.display, fontSize: 'clamp(3rem,7vw,9rem)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: WC.mustard, textAlign: 'center', lineHeight: 1, textShadow: `0 0 60px ${WC.mustard}33` }}>April 2026</div>
      {divider}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.8rem,1.5vw,2rem)', justifyContent: 'center', maxWidth: '85vw' }}>
        {['Specialty Coffee','Instrument Repairs','AV & Tech Services','Community Events','Flexible Workspace','Art Wall','Open Mic Nights','Workshops'].map(tag => (
          <div key={tag} style={{ fontFamily: WT.mono, fontSize: 'clamp(1rem,1.8vw,2.4rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: WC.cream, background: `${WC.vegGreen}44`, border: `1px solid ${WC.olive}`, borderTop: `2px solid ${WC.nettle}`, borderRadius: 3, padding: 'clamp(8px,1.2vmin,18px) clamp(14px,2.2vw,28px)', opacity: 0.90 }}>{tag}</div>
        ))}
      </div>
      <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.2rem,2vw,2.6rem)', color: WC.olive, letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center' }}>
        Cowley Road Studios · Recording & Rehearsal · Open Now
      </div>
    </div>
  )
}

// ─── FRAME 2: EVENTS ──────────────────────────────────────────────────────────
function CafeEventsFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,3.5vmin,4rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      {sectionLabel('Events & Community')}
      <div style={{ background: `${WC.vegGreen}33`, border: `1px solid ${WC.nettle}55`, borderLeft: `4px solid ${WC.mustard}`, borderRadius: 4, padding: 'clamp(1.5rem,3vmin,3.5rem) clamp(2rem,4vw,4.5rem)', maxWidth: '85vw', width: '100%' }}>
        <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1rem,1.6vw,2.2rem)', color: WC.mustard, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.8rem', opacity: 0.9 }}>Every Wednesday</div>
        <div style={{ fontFamily: WT.display, fontSize: 'clamp(2.5rem,5.5vw,7rem)', fontWeight: 800, color: WC.cream, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>Dano's Galactic Jam</div>
        <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.2rem,2vw,2.8rem)', color: WC.creamDim, letterSpacing: '0.08em', marginTop: '0.8rem' }}>Live Jams · DJ Sets · Bring Your Instrument · 7pm</div>
      </div>
      <div style={{ display: 'flex', gap: 'clamp(1rem,2.5vw,3rem)', maxWidth: '85vw', width: '100%' }}>
        {[{ name: 'Open Mic Night', detail: 'Monthly' }, { name: 'Textile Mending', detail: 'Community Workshop' }, { name: 'Upcycling Market', detail: 'With Remakery Oxford' }].map(ev => (
          <div key={ev.name} style={{ flex: 1, background: `${WC.vegGreen}22`, border: `1px solid ${WC.olive}44`, borderTop: `2px solid ${WC.nettle}`, borderRadius: 3, padding: 'clamp(1rem,2vmin,2.5rem)' }}>
            <div style={{ fontFamily: WT.display, fontSize: 'clamp(1.2rem,2.2vw,3rem)', fontWeight: 700, color: WC.cream, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.1 }}>{ev.name}</div>
            <div style={{ fontFamily: WT.mono, fontSize: 'clamp(0.9rem,1.5vw,2rem)', color: WC.mustard, letterSpacing: '0.12em', marginTop: '0.5rem', opacity: 0.85 }}>{ev.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FRAME 3: VENUE HIRE ──────────────────────────────────────────────────────
function CafeVenueFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,3.5vmin,4.5rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      {sectionLabel('Flexible Space for Hire')}
      <div style={{ fontFamily: WT.display, fontSize: 'clamp(3rem,7vw,9rem)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: WC.mustard, textAlign: 'center', lineHeight: 1, textShadow: `0 0 60px ${WC.mustard}33` }}>Make It<br />Your Own</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.8rem,1.5vw,2rem)', justifyContent: 'center', maxWidth: '85vw' }}>
        {['Full PA System','Projection & Screen','Lighting Rig','Up to 80 Guests','Catering Available','Performances','Workshops','Private Events','Screenings','Community Hire'].map(tag => (
          <div key={tag} style={{ fontFamily: WT.mono, fontSize: 'clamp(1rem,1.8vw,2.2rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: WC.cream, background: `${WC.vegGreen}44`, border: `1px solid ${WC.olive}`, borderTop: `2px solid ${WC.mustard}55`, borderRadius: 3, padding: 'clamp(8px,1.2vmin,16px) clamp(14px,2vw,26px)', opacity: 0.90 }}>{tag}</div>
        ))}
      </div>
      <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.4rem,2.2vw,3rem)', color: WC.mustard, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Enquire → 01865 722027</div>
    </div>
  )
}

// ─── FRAME 4: REPAIRS ─────────────────────────────────────────────────────────
function CafeRepairsFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,3.5vmin,4.5rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      {sectionLabel('We Salute the Art of Repair')}
      <div style={{ fontFamily: WT.display, fontSize: 'clamp(3rem,7vw,9rem)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: WC.cream, textAlign: 'center', lineHeight: 1 }}>
        Instrument<br /><span style={{ color: WC.mustard }}>Repairs</span>
      </div>
      <div style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,4rem)', maxWidth: '85vw', width: '100%', justifyContent: 'center' }}>
        {[
          { title: 'Instruments', items: ['Guitars','Bass','Keyboards','Brass','Strings'] },
          { title: 'AV & Tech', items: ['Amplifiers','Pedals','PA Systems','Cables','Mixers'] },
          { title: 'Precision', items: ['Setup & Intonation','Fret Dressing','Electronics','Restoration'] },
        ].map(col => (
          <div key={col.title} style={{ flex: 1, background: `${WC.vegGreen}22`, border: `1px solid ${WC.olive}44`, borderTop: `2px solid ${WC.nettle}`, borderRadius: 3, padding: 'clamp(1.2rem,2.5vmin,3rem)' }}>
            <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1rem,1.6vw,2.2rem)', color: WC.mustard, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>{col.title}</div>
            {col.items.map(item => (
              <div key={item} style={{ fontFamily: WT.mono, fontSize: 'clamp(0.9rem,1.5vw,2rem)', color: WC.creamDim, letterSpacing: '0.08em', lineHeight: 1.8 }}>{item}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1.4rem,2.2vw,3rem)', color: WC.mustard, letterSpacing: '0.14em', textTransform: 'uppercase' }}>workshopcafe.ox · 01865 722027</div>
    </div>
  )
}

// ─── FRAME 5: COMMUNITY ───────────────────────────────────────────────────────
function CafeCommunityFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,3.5vmin,4.5rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      {sectionLabel('Community & Creativity')}
      <div style={{ fontFamily: WT.display, fontSize: 'clamp(3rem,7vw,9rem)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: WC.cream, textAlign: 'center', lineHeight: 1 }}>
        Fuel Your<br /><span style={{ color: WC.mustard }}>Creativity</span>
      </div>
      <div style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,4rem)', maxWidth: '85vw', width: '100%', justifyContent: 'center' }}>
        {[
          { title: 'Sell Your Art', detail: 'Art wall available for local artists' },
          { title: 'Co-Working', detail: 'Flexible workspace & hot desks' },
          { title: 'Workshops', detail: 'Community skills & creative sessions' },
        ].map(card => (
          <div key={card.title} style={{ flex: 1, background: `${WC.vegGreen}22`, border: `1px solid ${WC.olive}44`, borderTop: `2px solid ${WC.mustard}`, borderRadius: 3, padding: 'clamp(1.5rem,3vmin,3.5rem)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontFamily: WT.display, fontSize: 'clamp(1.5rem,2.8vw,3.8rem)', fontWeight: 700, color: WC.mustard, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.1 }}>{card.title}</div>
            <div style={{ fontFamily: WT.mono, fontSize: 'clamp(1rem,1.6vw,2.2rem)', color: WC.creamDim, letterSpacing: '0.06em', lineHeight: 1.5 }}>{card.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FRAME 6: FIND US ─────────────────────────────────────────────────────────
function CafeFindUsFrame() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,3.5vmin,4rem)', padding: 'clamp(2rem,5vmin,5rem)' }}>
      <WorkshopLogo size="lg" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem,2.5vmin,2.8rem)', alignItems: 'center' }}>
        {[
          { label: 'Address', value: '118 Cowley Road · Oxford · OX4 1JE' },
          { label: 'Opening', value: 'April 2026 · Tue–Sun · 9am – 6pm' },
          { label: 'Phone',   value: '01865 722027' },
          { label: 'Web',     value: 'workshopcafe.ox' },
          { label: 'Social',  value: '@workshopcafe.ox' },
          { label: 'Studios', value: 'crsoxford.com · Recording Now' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,3.5rem)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: WT.mono, fontSize: 'clamp(1rem,1.6vw,2.2rem)', color: WC.olive, letterSpacing: '0.2em', textTransform: 'uppercase', minWidth: 110, textAlign: 'right', opacity: 0.85 }}>{row.label}</span>
            <span style={{ fontFamily: WT.mono, fontSize: 'clamp(1.4rem,2.6vw,3.5rem)', color: WC.cream, letterSpacing: '0.06em' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main app ─────────────────────────────────────────────────────────────────
const FRAMES = [
  { component: CafeIdentityFrame,   duration: 18000 },
  { component: CafeComingSoonFrame, duration: 14000 },
  { component: CafeEventsFrame,     duration: 14000 },
  { component: CafeVenueFrame,      duration: 12000 },
  { component: CafeRepairsFrame,    duration: 12000 },
  { component: CafeCommunityFrame,  duration: 12000 },
  { component: CafeFindUsFrame,     duration: 10000 },
]

export default function WorkshopCafe() {
  const [frameIdx, setFrameIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const frame = FRAMES[frameIdx]
    timerRef.current = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setFrameIdx(i => (i + 1) % FRAMES.length)
        setFading(false)
      }, 500)
    }, frame.duration)
    return () => clearTimeout(timerRef.current)
  }, [frameIdx])

  const CurrentFrame = FRAMES[frameIdx].component

  return (
    <WorkshopShell frame={frameIdx} total={FRAMES.length}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg,${WC.bgDeep} 0%,${WC.vegGreen}18 50%,${WC.bgDeep} 100%)`, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <CurrentFrame />
      </div>
    </WorkshopShell>
  )
}
