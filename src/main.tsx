import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import SignageApp from './SignageApp'
import InfrastructureEdit from './InfrastructureEdit'
import NightEdition from './NightEdition'
import StudentMode from './StudentMode'
import MicroLoop from './MicroLoop'
import MostroMode from './MostroMode'
import CivicGreeting from './CivicGreeting'
import AutoRouter from './AutoRouter'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#0E0E0E',
  text: '#E8E8E8',
  green: '#3A5C3A',
  amber: '#D4A017',
  dim: 'rgba(232,232,232,0.38)',
}

// ─── Nav overlay ─────────────────────────────────────────────────────────────
const ROUTES = [
  { path: '/signage', label: 'Signal Path',         sub: 'Main · Peak hours' },
  { path: '/infra',   label: 'Infrastructure Edit', sub: 'Daytime · Café hours' },
  { path: '/night',   label: 'Night Edition',        sub: 'Street-facing · 18:00–07:00' },
  { path: '/student', label: 'Student Mode',         sub: 'Wed & Fri evenings' },
  { path: '/micro',   label: 'Micro Loop',           sub: '3.2s interrupt · Playlist insert' },
  { path: '/mostro',  label: 'Mostro Mode',          sub: 'Truck Records audience' },
  { path: '/civic',   label: 'Civic Greeting',       sub: '8s interjection · 6 variants' },
  { path: '/auto',    label: 'Auto-Router',          sub: 'Time-based selection', highlight: true },
]

function NavOverlay({ current, onNavigate, onClose }: {
  current: string
  onNavigate: (path: string) => void
  onClose: () => void
}) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(14,14,14,0.96)',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '6vw',
      boxSizing: 'border-box',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)',
        letterSpacing: '0.22em',
        color: C.amber,
        textTransform: 'uppercase' as const,
        marginBottom: '2.5rem',
      }}>
        CRS Signage System — Select Reel
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: '640px' }}>
        {ROUTES.map(r => {
          const active = current === r.path
          return (
            <button
              key={r.path}
              onClick={() => { onNavigate(r.path); onClose() }}
              style={{
                background: active
                  ? 'rgba(212,160,23,0.06)'
                  : r.highlight
                  ? 'rgba(58,92,58,0.06)'
                  : 'transparent',
                border: `1px solid ${active ? C.amber : r.highlight ? C.green : 'rgba(58,92,58,0.3)'}`,
                padding: '0.85rem 1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.2rem',
                textAlign: 'left',
                transition: 'border-color 0.2s ease, background 0.2s ease',
              }}
            >
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                color: active ? C.amber : C.text,
                letterSpacing: '0.02em',
                minWidth: '200px',
              }}>
                {r.label}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 300,
                fontSize: 'clamp(0.6rem, 0.95vw, 0.8rem)',
                color: C.dim,
                letterSpacing: '0.08em',
              }}>
                {r.sub}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(0.55rem, 0.85vw, 0.72rem)',
                color: 'rgba(58,92,58,0.6)',
                marginLeft: 'auto',
                letterSpacing: '0.1em',
              }}>
                {r.path}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(0.55rem, 0.85vw, 0.72rem)',
        letterSpacing: '0.18em',
        color: 'rgba(232,232,232,0.2)',
        textTransform: 'uppercase' as const,
        marginTop: '2.5rem',
      }}>
        Press ESC or click outside to close
      </div>

      <div
        style={{ position: 'fixed', inset: 0, zIndex: -1 }}
        onClick={onClose}
      />
    </div>
  )
}

// ─── Persistent nav trigger ───────────────────────────────────────────────────
function NavTrigger({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="Switch reel"
      style={{
        position: 'fixed',
        top: '2vh',
        right: '2vw',
        zIndex: 150,
        background: 'none',
        border: `1px solid ${hover ? C.amber : 'rgba(58,92,58,0.35)'}`,
        color: hover ? C.amber : 'rgba(232,232,232,0.3)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(0.5rem, 0.8vw, 0.68rem)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        padding: '6px 12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      REELS ▾
    </button>
  )
}

// ─── Reel renderer (for manually-selected routes) ────────────────────────────
function renderReel(path: string): React.ReactElement {
  switch (path) {
    case '/infra':   return <InfrastructureEdit />
    case '/night':   return <NightEdition />
    case '/student': return <StudentMode />
    case '/micro':   return <MicroLoop />
    case '/mostro':  return <MostroMode />
    case '/civic':   return <CivicGreeting standalone />
    case '/auto':    return <AutoRouter />
    case '/signage':
    default:         return <SignageApp />
  }
}

// ─── Main app with client-side routing ───────────────────────────────────────
function App() {
  const [path, setPath] = useState(() => {
    const p = window.location.pathname.replace(/\/$/, '') || '/signage'
    // Normalise bare / to /signage; keep /auto as /auto (AutoRouter handles it)
    return p === '/' ? '/signage' : p
  })
  const [navOpen, setNavOpen] = useState(false)

  // ESC closes nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Sync URL bar without page reload
  const navigate = (newPath: string) => {
    window.history.pushState({}, '', newPath)
    setPath(newPath)
  }

  // Handle browser back/forward
  useEffect(() => {
    const handler = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/signage'
      setPath(p === '/' ? '/signage' : p)
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  return (
    <>
      {renderReel(path)}
      <NavTrigger onClick={() => setNavOpen(o => !o)} />
      {navOpen && (
        <NavOverlay
          current={path}
          onNavigate={navigate}
          onClose={() => setNavOpen(false)}
        />
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
