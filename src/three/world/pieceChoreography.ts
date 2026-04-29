/**
 * Pure mapping from page progress 0..1 to per-piece state.
 * No three.js / React in here — easy to test, easy to tune.
 */

const TILE = 0.6
function rankZ(rank: number): number {
  return -(rank - 4.5) * TILE
}
function fileX(file: number): number {
  return (file - 4.5) * TILE
}

export interface PawnState {
  /** World-space position of the focal pawn (the visitor avatar). */
  position: [number, number, number]
  /** Hover height (small bob synced to scroll). */
  bob: number
  /** 0..1 — visibility of the pawn (becomes 0 at promotion). */
  alpha: number
  /** Label of the rank the pawn is currently on (for HUD). */
  rank: number
}

export interface ServicePieceState {
  /** Whether this service piece is currently on stage. */
  visible: boolean
  /** 0..1 fade-in. */
  alpha: number
  /** World-space position. */
  position: [number, number, number]
  /** Floats up + spins as it appears. */
  rise: number
}

export interface PromotedQueenState {
  /** Visible only at the very end of the journey. */
  alpha: number
  /** Vertical lift as it rises out of the pawn. */
  lift: number
  /** Y-axis spin while rising. */
  spin: number
}

export interface OpponentKingState {
  /** Tilt in radians; 0 standing, ~PI/2 toppled. */
  tilt: number
}

export interface AtmosphereState {
  /** Fog color (rgb 0..1). */
  fogColor: [number, number, number]
  /** Fog near plane. */
  fogNear: number
  /** Fog far plane. */
  fogFar: number
  /** Background color. */
  bg: [number, number, number]
  /** Ambient intensity. */
  ambient: number
  /** Key light intensity. */
  key: number
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x))
}
/** Re-maps [a..b] to 0..1, clamped. */
function range(x: number, a: number, b: number): number {
  return clamp01((x - a) / Math.max(0.0001, b - a))
}
function smoothstep(x: number): number {
  const t = clamp01(x)
  return t * t * (3 - 2 * t)
}
function lerpRGB(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

/** Focal pawn glides from rank 2 to rank 8 as progress sweeps 0..1. */
export function pawnAt(progress: number): PawnState {
  const rank = lerp(2, 8, smoothstep(progress))
  // Subtle side-to-side wobble as it advances (every rank steps a little)
  const file = 4.5 + Math.sin(progress * Math.PI * 2.5) * 0.18
  const bob = Math.sin(progress * Math.PI * 6) * 0.04
  // Fade out cleanly right at the promotion moment (last sliver of journey)
  const alpha = 1 - smoothstep(range(progress, 0.93, 0.97))
  return {
    position: [fileX(file), 0.06 + bob, rankZ(rank)],
    bob,
    alpha,
    rank,
  }
}

/**
 * Service pieces: one per service. Each is "summoned" beside the focal pawn
 * during a window of progress. They drift up out of the board, glow, then
 * sink back down as the next one arrives.
 */
export type ServicePieceName = 'knight' | 'bishop' | 'rook' | 'queen'

interface ServiceSchedule {
  name: ServicePieceName
  /** Progress range during which this piece is on stage. */
  start: number
  end: number
  /** Where it appears (file offset from focal pawn, fixed rank). */
  fileOffset: number
  rankOffset: number
}

export const SERVICE_SCHEDULE: ServiceSchedule[] = [
  { name: 'knight', start: 0.18, end: 0.30, fileOffset: -1.2, rankOffset: 0.6 },
  { name: 'bishop', start: 0.26, end: 0.38, fileOffset: 1.2, rankOffset: 0.6 },
  { name: 'rook',   start: 0.34, end: 0.46, fileOffset: -1.2, rankOffset: -0.6 },
  { name: 'queen',  start: 0.42, end: 0.54, fileOffset: 1.2, rankOffset: -0.6 },
]

export function servicePieceAt(progress: number, schedule: ServiceSchedule, pawnPos: [number, number, number]): ServicePieceState {
  const localT = range(progress, schedule.start, schedule.end)
  const inRange = progress >= schedule.start - 0.02 && progress <= schedule.end + 0.05
  // Two-phase fade: rise in 0..0.4, hold 0.4..0.7, fall 0.7..1
  let alpha = 0
  if (localT < 0.4) alpha = smoothstep(localT / 0.4)
  else if (localT < 0.7) alpha = 1
  else alpha = 1 - smoothstep((localT - 0.7) / 0.3)
  const rise = smoothstep(Math.min(1, localT / 0.5)) * 0.3

  return {
    visible: inRange && alpha > 0.001,
    alpha,
    position: [
      pawnPos[0] + schedule.fileOffset * TILE,
      0.06 + rise,
      pawnPos[2] + schedule.rankOffset * TILE,
    ],
    rise,
  }
}

/** Red queen rises out of the promotion square at the very end. */
export function promotedQueenAt(progress: number, pawnPos: [number, number, number]): PromotedQueenState {
  // Queen begins materializing as the pawn finishes fading and rises
  // dramatically above the board (~0.6 world units) by progress 1.0.
  const t = range(progress, 0.94, 1.0)
  const alpha = smoothstep(t)
  const lift = smoothstep(t) * 0.65
  const spin = t * Math.PI * 1.2
  void pawnPos
  return { alpha, lift, spin }
}

/** Opposing king begins to wobble near the end and topples on `resigned`. */
export function opponentKingAt(progress: number, resigned: boolean): OpponentKingState {
  if (resigned) {
    return { tilt: Math.PI / 2 - 0.05 }
  }
  // Wobble grows in intensity as the visitor's pawn closes the distance —
  // crescendo through the contact pin into the promotion moment.
  const wobble = smoothstep(range(progress, 0.82, 1.0))
  return { tilt: wobble * 0.32 }
}

/** Atmosphere lerps from morning ivory (hero) to dusk obsidian (contact). */
export function atmosphereAt(progress: number): AtmosphereState {
  const dawnFog: [number, number, number] = [0.95, 0.92, 0.86]
  const noonFog: [number, number, number] = [0.93, 0.88, 0.78]
  const duskFog: [number, number, number] = [0.20, 0.16, 0.18]

  let fogColor: [number, number, number]
  let bg: [number, number, number]
  let ambient: number
  let key: number

  if (progress < 0.5) {
    const t = progress / 0.5
    fogColor = lerpRGB(dawnFog, noonFog, t)
    bg = lerpRGB([0.97, 0.95, 0.92], [0.95, 0.92, 0.86], t)
    ambient = lerp(0.7, 0.55, t)
    key = lerp(1.4, 1.5, t)
  } else {
    const t = (progress - 0.5) / 0.5
    fogColor = lerpRGB(noonFog, duskFog, t)
    bg = lerpRGB([0.95, 0.92, 0.86], [0.08, 0.06, 0.10], t)
    ambient = lerp(0.55, 0.35, t)
    key = lerp(1.5, 1.2, t)
  }

  return {
    fogColor,
    fogNear: lerp(8, 6, progress),
    fogFar: lerp(20, 14, progress),
    bg,
    ambient,
    key,
  }
}

export const BOARD_TILE = TILE
export const fileToX = fileX
export const rankToZ = rankZ
