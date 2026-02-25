/**
 * AutoRouter.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Selects and renders the correct CRS signage reel based on the current time
 * and day of week. Re-evaluates at the end of every reel loop so the screen
 * transitions to the right reel automatically as time windows change.
 *
 * Schedule (from handover brief):
 * ┌─────────────────────────────┬──────────────────────┐
 * │ Time / Day                  │ Reel                 │
 * ├─────────────────────────────┼──────────────────────┤
 * │ Weekdays  07:00–15:00       │ Infrastructure Edit  │
 * │ Weekdays  15:00–18:30       │ Mostro Mode          │
 * │ Wednesday 18:30–23:30       │ Student Mode         │
 * │ Friday    18:00–22:00       │ Student Mode         │
 * │ Any day   18:00–07:00       │ Night Edition        │
 * │ Weekends  11:00–16:00       │ Mostro Mode          │
 * │ Default fallback            │ Signal Path          │
 * └─────────────────────────────┴──────────────────────┘
 *
 * Civic Greeting injection cadence (from handover brief):
 *   Daytime  → inject every 2–3 reel loops
 *   Evening  → inject once per 4 reel loops
 *   Never on Wednesday student chaos nights
 *
 * Each reel component calls onLoopComplete() when its sequence finishes one
 * full cycle. AutoRouter uses that signal to:
 *   1. Increment the loop counter
 *   2. Decide whether to inject a Civic Greeting interstitial
 *   3. Re-evaluate the schedule (time may have changed)
 *   4. Render the next reel (or Civic Greeting, then back to reel)
 */

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { ToggleSwitch } from './CRSShell'
import { C, T, Shadow } from './brand'
import SignageApp from './SignageApp'
import InfrastructureEdit from './InfrastructureEdit'
import NightEdition from './NightEdition'
import StudentMode from './StudentMode'
import MicroLoop from './MicroLoop'
import MostroMode from './MostroMode'
import CivicGreeting from './CivicGreeting'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReelId =
  | 'signal'
  | 'infra'
  | 'night'
  | 'student'
  | 'micro'
  | 'mostro'
  | 'civic'

interface ScheduleWindow {
  /** Human-readable label for debugging / status display */
  label: string
  /** The reel this window maps to */
  reel: ReelId
  /** Returns true if the current moment falls inside this window */
  matches: (day: number, t: number) => boolean
}

// ─── Schedule table ───────────────────────────────────────────────────────────
// Evaluated top-to-bottom; first match wins.
// day: 0 = Sunday … 6 = Saturday
// t:   minutes since midnight (0–1439)

const SCHEDULE: ScheduleWindow[] = [
  {
    label: 'Wednesday student evening (18:30–23:30)',
    reel: 'student',
    matches: (day, t) => day === 3 && t >= 18 * 60 + 30 && t < 23 * 60 + 30,
  },
  {
    label: 'Friday student evening (18:00–22:00)',
    reel: 'student',
    matches: (day, t) => day === 5 && t >= 18 * 60 && t < 22 * 60,
  },
  {
    label: 'Night edition (18:00–07:00, any day)',
    reel: 'night',
    matches: (_day, t) => t >= 18 * 60 || t < 7 * 60,
  },
  {
    label: 'Weekend Mostro (11:00–16:00)',
    reel: 'mostro',
    matches: (day, t) =>
      (day === 0 || day === 6) && t >= 11 * 60 && t < 16 * 60,
  },
  {
    label: 'Weekday Mostro (15:00–18:30)',
    reel: 'mostro',
    matches: (day, t) =>
      day >= 1 && day <= 5 && t >= 15 * 60 && t < 18 * 60 + 30,
  },
  {
    label: 'Weekday daytime Infrastructure Edit (07:00–15:00)',
    reel: 'infra',
    matches: (day, t) => day >= 1 && day <= 5 && t >= 7 * 60 && t < 15 * 60,
  },
  {
    label: 'Default fallback — Signal Path',
    reel: 'signal',
    matches: () => true,
  },
]

// ─── Civic Greeting injection rules ──────────────────────────────────────────

/**
 * Returns true if a Civic Greeting should be injected after this loop.
 *
 * Rules:
 *  - Never inject during Wednesday student evenings
 *  - Evening (18:00–22:30): inject once per 4 loops
 *  - Daytime (07:00–18:00): inject every 2 loops (alternating)
 *  - Otherwise (late night / early morning): inject every 3 loops
 */
function shouldInjectCivic(
  activeReel: ReelId,
  loopCount: number,
  day: number,
  t: number
): boolean {
  // Never on Wednesday student chaos nights
  if (activeReel === 'student' && day === 3) return false
  // Never inject civic inside micro loop
  if (activeReel === 'micro') return false

  const isEvening = t >= 18 * 60 && t < 22 * 60 + 30
  const isDaytime = t >= 7 * 60 && t < 18 * 60

  if (isEvening) return loopCount > 0 && loopCount % 4 === 0
  if (isDaytime) return loopCount > 0 && loopCount % 2 === 0
  return loopCount > 0 && loopCount % 3 === 0
}

// ─── Schedule resolver ────────────────────────────────────────────────────────

function resolveReel(): { reel: ReelId; label: string } {
  const now = new Date()
  const day = now.getDay()
  const t = now.getHours() * 60 + now.getMinutes()

  for (const window of SCHEDULE) {
    if (window.matches(day, t)) {
      return { reel: window.reel, label: window.label }
    }
  }
  // Should never reach here due to the catch-all, but TypeScript needs it
  return { reel: 'signal', label: 'Default fallback' }
}

// ─── Reel renderer ────────────────────────────────────────────────────────────
// Reels don't yet declare onLoopComplete in their prop types, so we pass it
// via React.createElement with an explicit any cast. The 60s fallback tick
// in AutoRouter handles reels that don't call it.

type AnyComponent = React.ComponentType<Record<string, unknown>>

function renderReel(id: ReelId, onLoopComplete: () => void): React.ReactElement {
  const props = { onLoopComplete }
  let Comp: AnyComponent
  switch (id) {
    case 'infra':   Comp = InfrastructureEdit as AnyComponent; break
    case 'night':   Comp = NightEdition as AnyComponent; break
    case 'student': Comp = StudentMode as AnyComponent; break
    case 'micro':   Comp = MicroLoop as AnyComponent; break
    case 'mostro':  Comp = MostroMode as AnyComponent; break
    case 'signal':
    default:        Comp = SignageApp as AnyComponent; break
  }
  return <Comp {...props} />
}

// ─── AutoRouter component ─────────────────────────────────────────────────────

interface AutoRouterState {
  /** The currently active reel id */
  activeReel: ReelId
  /** Human-readable label of the matched schedule window */
  scheduleLabel: string
  /** How many full loops the active reel has completed */
  loopCount: number
  /** Whether we are currently showing a Civic Greeting interstitial */
  showingCivic: boolean
  /** Running count of Civic Greeting injections (passed to CivicGreeting for variant selection) */
  civicCount: number
}

export default function AutoRouter() {
  const initialResolution = resolveReel()
  const [switching, setSwitching] = useState(false)
  const [pendingReel, setPendingReel] = useState<ReelId | null>(null)

  const [state, setState] = useState<AutoRouterState>({
    activeReel: initialResolution.reel,
    scheduleLabel: initialResolution.label,
    loopCount: 0,
    showingCivic: false,
    civicCount: 0,
  })

  // Keep a ref so callbacks always see the latest state without stale closures
  const stateRef = useRef(state)
  stateRef.current = state

  // ── Fallback tick: re-evaluate schedule every 60s even if no loop signal ──
  useEffect(() => {
    const id = setInterval(() => {
      const { reel, label } = resolveReel()
      setState(prev => {
        // Only switch if the reel has actually changed and we're not mid-civic
        if (reel !== prev.activeReel && !prev.showingCivic) {
          return { ...prev, activeReel: reel, scheduleLabel: label, loopCount: 0 }
        }
        return prev
      })
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  // ── Called by each reel when it completes one full loop ───────────────────
  const handleLoopComplete = useCallback(() => {
    const prev = stateRef.current
    const now = new Date()
    const day = now.getDay()
    const t = now.getHours() * 60 + now.getMinutes()
    const newLoopCount = prev.loopCount + 1

    // Re-evaluate schedule — time may have changed since last loop
    const { reel: nextReel, label: nextLabel } = resolveReel()

    // Decide whether to inject Civic Greeting
    const inject = shouldInjectCivic(nextReel, newLoopCount, day, t)

    // If the reel is actually changing, show the toggle switch animation first
    const reelChanging = nextReel !== prev.activeReel || inject
    if (reelChanging) {
      setPendingReel(inject ? 'civic' as ReelId : nextReel)
      setSwitching(true)
      // Toggle switch takes 280ms; apply state after animation completes
      setTimeout(() => {
        if (inject) {
          setState({
            activeReel: nextReel,
            scheduleLabel: nextLabel,
            loopCount: newLoopCount,
            showingCivic: true,
            civicCount: prev.civicCount + 1,
          })
        } else {
          setState({
            activeReel: nextReel,
            scheduleLabel: nextLabel,
            loopCount: newLoopCount,
            showingCivic: false,
            civicCount: prev.civicCount,
          })
        }
        setSwitching(false)
        setPendingReel(null)
      }, 320)
    } else {
      setState({
        activeReel: nextReel,
        scheduleLabel: nextLabel,
        loopCount: newLoopCount,
        showingCivic: false,
        civicCount: prev.civicCount,
      })
    }
  }, [])

  // ── Called when the Civic Greeting interstitial finishes ──────────────────
  const handleCivicDone = useCallback(() => {
    setState(prev => ({ ...prev, showingCivic: false }))
  }, [])

  // ── Render ────────────────────────────────────────────────────────────────
  const REEL_LABELS: Record<string, string> = {
    signal: 'SIGNAL PATH',
    infra:  'INFRA EDIT',
    night:  'NIGHT EDITION',
    student:'STUDENT MODE',
    micro:  'MICRO LOOP',
    mostro: 'MOSTRO MODE',
    civic:  'CIVIC GREETING',
  }

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {/* Active reel */}
      {state.showingCivic
        ? <CivicGreeting loop={state.civicCount} onDone={handleCivicDone} standalone={false} />
        : renderReel(state.activeReel, handleLoopComplete)
      }

      {/* Toggle switch overlay — shown during reel transitions */}
      {switching && (
        <div style={{
          position: 'fixed',
          bottom: 36,
          right: 48,
          zIndex: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          background: C.metalMid,
          backgroundImage: C.metalBg,
          border: `1px solid ${C.border}`,
          boxShadow: Shadow.outsetPlate,
          borderRadius: 4,
          padding: '8px 12px',
        }}>
          <ToggleSwitch flipping={switching} />
          <span style={{
            fontFamily: T.mono,
            fontSize: 8,
            letterSpacing: '0.18em',
            color: C.textMute,
            textTransform: 'uppercase',
          }}>{pendingReel ? REEL_LABELS[pendingReel] ?? pendingReel.toUpperCase() : ''}</span>
        </div>
      )}
    </div>
  )
}
