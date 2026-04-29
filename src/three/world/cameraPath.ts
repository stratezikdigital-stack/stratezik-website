import * as THREE from 'three'

/**
 * Camera keyframes along the page-progress timeline (0..1).
 * Each keyframe has a world-space position and a look-at target.
 * Between keyframes we lerp smoothly with an ease.
 */

export interface CameraKey {
  /** Page progress at which this keyframe is reached. */
  t: number
  /** Camera position in world space. */
  pos: [number, number, number]
  /** Camera look-at target in world space. */
  target: [number, number, number]
  /** Field of view at this keyframe. */
  fov: number
}

/**
 * Board reference: we use the same coordinate convention as before.
 * The 8x8 board centre is at (0, 0, 0). +Z = white side / rank 1.
 * -Z = black side / rank 8. So a piece at rank N is at z ≈ -((N-4.5) * tile).
 *
 * Tile size used here matches WorldScene's BOARD_SIZE/8 (= 0.6).
 */
const TILE = 0.6
function rankZ(rank: number): number {
  return -(rank - 4.5) * TILE
}

/**
 * Camera arc: a half-orbit around the board.
 *
 * Hero → Services: camera on -X side, white side (+Z, focal pawn start)
 *   appears on the RIGHT of frame, opposing pieces on the LEFT — leaving
 *   the LEFT half of the viewport for the HTML headline / copy.
 *
 * Strategy Flow: camera lifts straight overhead so we briefly see the
 *   whole board.
 *
 * Portfolio → Contact: camera swings around to the +X side. Now the
 *   black side (-Z, rank 8 / promotion square) is on the RIGHT of frame
 *   while the form / contact info live on the LEFT.
 *
 * The visitor's pawn (the focal piece) travels from rank 2 to rank 8 as
 * progress goes 0..1; combined with the camera arc, the focal pawn stays
 * on the right side of the frame the entire journey. End result: a single
 * continuous shot where "your" piece is always on stage to the right.
 */
export const CAMERA_KEYS: CameraKey[] = [
  // Hero — wide elevated shot, board fills right half of frame
  { t: 0.00, pos: [-4.6, 4.8, 5.6], target: [0, 0.2, 0], fov: 36 },
  { t: 0.12, pos: [-4.4, 4.4, 5.4], target: [0, 0.2, rankZ(3.0)], fov: 36 },

  // Services — closer & lower, walking with the focal pawn
  { t: 0.28, pos: [-4.0, 2.2, 4.0], target: [0, 0.5, rankZ(3.8)], fov: 40 },
  { t: 0.42, pos: [-3.6, 1.8, 3.2], target: [0, 0.5, rankZ(4.6)], fov: 42 },

  // Strategy Flow — high overhead survey of the whole board
  { t: 0.58, pos: [0.0, 7.0, 0.4], target: [0, 0, 0], fov: 38 },

  // Portfolio — camera now on +X (other side), looking back. Promotion
  // square (rank 8, -Z) is on the right of frame.
  { t: 0.74, pos: [3.0, 3.4, 3.6], target: [0, 0.6, rankZ(6.6)], fov: 36 },

  // Contact — dramatic close-up at the promotion square
  { t: 0.92, pos: [3.4, 1.6, 1.0], target: [0, 0.9, rankZ(7.8)], fov: 42 },
  { t: 1.00, pos: [3.0, 1.8, 1.2], target: [0, 1.0, rankZ(7.8)], fov: 40 },
]

const _vA = new THREE.Vector3()
const _vB = new THREE.Vector3()
const _tA = new THREE.Vector3()
const _tB = new THREE.Vector3()

function smoothstep(x: number): number {
  return x * x * (3 - 2 * x)
}

/**
 * Sample camera state at a given progress.
 * Mutates `outPos` and `outTarget` to avoid per-frame allocation.
 */
export function sampleCamera(
  progress: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3
): { fov: number } {
  const t = Math.max(0, Math.min(1, progress))
  // Find surrounding keyframes
  let i = 0
  for (let k = 0; k < CAMERA_KEYS.length - 1; k++) {
    if (t >= CAMERA_KEYS[k].t && t <= CAMERA_KEYS[k + 1].t) {
      i = k
      break
    }
    if (k === CAMERA_KEYS.length - 2) i = k
  }
  const a = CAMERA_KEYS[i]
  const b = CAMERA_KEYS[i + 1]
  const span = Math.max(0.0001, b.t - a.t)
  const localT = smoothstep((t - a.t) / span)

  _vA.set(a.pos[0], a.pos[1], a.pos[2])
  _vB.set(b.pos[0], b.pos[1], b.pos[2])
  outPos.copy(_vA).lerp(_vB, localT)

  _tA.set(a.target[0], a.target[1], a.target[2])
  _tB.set(b.target[0], b.target[1], b.target[2])
  outTarget.copy(_tA).lerp(_tB, localT)

  const fov = a.fov + (b.fov - a.fov) * localT
  return { fov }
}
