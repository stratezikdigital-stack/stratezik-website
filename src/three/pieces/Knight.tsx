import { useMemo } from 'react'
import * as THREE from 'three'
import { knightPedestalProfile } from './profiles'
import { PieceProps } from './types'
import { usePieceMaterial } from './usePieceMaterial'

/**
 * Knight = lathe pedestal + an extruded 2D silhouette of a horse head.
 * The silhouette is intentionally stylized / low-poly so it stays crisp and on-brand.
 */
export function Knight({ tone = 'ivory', size = 1, ...rest }: PieceProps) {
  const material = usePieceMaterial(tone)

  const headGeometry = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.18, 0.0)
    s.lineTo(-0.22, 0.20)
    s.lineTo(-0.24, 0.36)
    s.lineTo(-0.18, 0.50)
    s.lineTo(-0.05, 0.58)
    s.lineTo(0.10, 0.58)
    s.lineTo(0.22, 0.50)
    s.lineTo(0.32, 0.38)
    s.lineTo(0.34, 0.28)
    s.lineTo(0.30, 0.22)
    s.lineTo(0.20, 0.24)
    s.lineTo(0.12, 0.18)
    s.lineTo(0.10, 0.10)
    s.lineTo(0.18, 0.0)
    s.lineTo(-0.18, 0.0)
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 6,
    })
    geo.translate(0, 0, -0.09)
    return geo
  }, [])

  return (
    <group scale={size} {...rest}>
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[knightPedestalProfile, 24]} />
      </mesh>
      <mesh position={[0, 0.36, 0]} castShadow material={material} geometry={headGeometry} />
    </group>
  )
}
