import * as THREE from 'three'

/**
 * Stratezik palette  -  pulled into one place so every scene stays on-brand.
 * Kept as constants (not React state) because they're consumed inside <Canvas>.
 */
export const PALETTE = {
  red: '#dc2626',
  redDeep: '#991b1b',
  redGlow: '#fb7185',
  ivory: '#f5f1e8',
  obsidian: '#0f172a',
  graphite: '#1e293b',
  marbleLight: '#ece6dc',
  marbleDark: '#1c1f26',
  gold: '#c9a14a',
} as const

/** Reusable factory: ivory marble piece (lights' side / hero copy side). */
export function ivoryMarbleMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: PALETTE.ivory,
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
    sheen: 0.4,
    sheenColor: new THREE.Color('#fff7ed'),
  })
}

/** Reusable factory: deep onyx piece (opponent / dark squares). */
export function onyxMarbleMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: PALETTE.marbleDark,
    roughness: 0.32,
    metalness: 0.18,
    clearcoat: 0.7,
    clearcoatRoughness: 0.25,
  })
}

/** Stratezik signature red metal  -  used for the hero king. */
export function redMetalMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: PALETTE.red,
    roughness: 0.22,
    metalness: 0.55,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    emissive: new THREE.Color(PALETTE.redDeep),
    emissiveIntensity: 0.18,
  })
}

/** Subtle warm gold  -  used for trim like the cross on top of the king. */
export function goldTrimMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: PALETTE.gold,
    roughness: 0.3,
    metalness: 0.85,
  })
}
