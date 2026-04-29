import { useMemo } from 'react'
import { queenProfile } from './profiles'
import { PieceProps } from './types'
import { usePieceMaterial, useTrimMaterial } from './usePieceMaterial'

export function Queen({ tone = 'ivory', size = 1, ...rest }: PieceProps) {
  const material = usePieceMaterial(tone)
  const trim = useTrimMaterial(tone)

  /** 8 jewel positions around the crown rim. */
  const jewels = useMemo(() => {
    const ring: [number, number, number][] = []
    const r = 0.27
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      ring.push([Math.cos(a) * r, 1.02, Math.sin(a) * r])
    }
    return ring
  }, [])

  return (
    <group scale={size} {...rest}>
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[queenProfile, 28]} />
      </mesh>
      {jewels.map((p, i) => (
        <mesh key={i} position={p} castShadow material={trim}>
          <sphereGeometry args={[0.05, 14, 10]} />
        </mesh>
      ))}
      <mesh position={[0, 1.10, 0]} castShadow material={trim}>
        <sphereGeometry args={[0.08, 18, 14]} />
      </mesh>
    </group>
  )
}
