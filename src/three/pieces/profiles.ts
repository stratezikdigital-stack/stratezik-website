import * as THREE from 'three'

/**
 * Lathe profiles for each chess piece. Each entry is (radius, height).
 * The lathe revolves these around the Y axis, so x = radius from center.
 * All profiles start at y=0 (piece sits on the board) and close at the top.
 */

const v = (x: number, y: number) => new THREE.Vector2(x, y)

export const pawnProfile: THREE.Vector2[] = [
  v(0.42, 0.00),
  v(0.42, 0.05),
  v(0.34, 0.08),
  v(0.30, 0.12),
  v(0.30, 0.16),
  v(0.18, 0.22),
  v(0.16, 0.46),
  v(0.20, 0.50),
  v(0.18, 0.54),
  v(0.16, 0.56),
]

export const rookProfile: THREE.Vector2[] = [
  v(0.42, 0.00),
  v(0.42, 0.05),
  v(0.34, 0.08),
  v(0.32, 0.13),
  v(0.32, 0.17),
  v(0.24, 0.22),
  v(0.22, 0.66),
  v(0.30, 0.70),
  v(0.34, 0.74),
  v(0.34, 0.86),
  v(0.30, 0.86),
]

export const bishopProfile: THREE.Vector2[] = [
  v(0.42, 0.00),
  v(0.42, 0.05),
  v(0.34, 0.08),
  v(0.30, 0.13),
  v(0.20, 0.22),
  v(0.16, 0.45),
  v(0.18, 0.62),
  v(0.20, 0.66),
  v(0.18, 0.70),
  v(0.18, 0.74),
  v(0.20, 0.78),
  v(0.18, 0.84),
  v(0.10, 0.94),
  v(0.04, 1.00),
  v(0.0, 1.04),
]

export const queenProfile: THREE.Vector2[] = [
  v(0.46, 0.00),
  v(0.46, 0.05),
  v(0.36, 0.08),
  v(0.34, 0.13),
  v(0.22, 0.24),
  v(0.18, 0.55),
  v(0.16, 0.66),
  v(0.20, 0.70),
  v(0.18, 0.74),
  v(0.20, 0.86),
  v(0.30, 0.92),
  v(0.32, 0.96),
]

export const kingBodyProfile: THREE.Vector2[] = [
  v(0.48, 0.00),
  v(0.48, 0.05),
  v(0.38, 0.09),
  v(0.36, 0.14),
  v(0.24, 0.26),
  v(0.20, 0.60),
  v(0.18, 0.74),
  v(0.22, 0.78),
  v(0.20, 0.82),
  v(0.20, 0.92),
  v(0.32, 0.98),
  v(0.32, 1.06),
]

export const knightPedestalProfile: THREE.Vector2[] = [
  v(0.42, 0.00),
  v(0.42, 0.05),
  v(0.34, 0.08),
  v(0.32, 0.13),
  v(0.32, 0.18),
  v(0.26, 0.22),
  v(0.22, 0.30),
  v(0.30, 0.32),
  v(0.30, 0.36),
]
