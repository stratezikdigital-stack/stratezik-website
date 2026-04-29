import { kingBodyProfile } from './profiles'
import { PieceProps } from './types'
import { usePieceMaterial, useTrimMaterial } from './usePieceMaterial'

export function King({ tone = 'red', size = 1, ...rest }: PieceProps) {
  const material = usePieceMaterial(tone)
  const trim = useTrimMaterial(tone)
  return (
    <group scale={size} {...rest}>
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[kingBodyProfile, 28]} />
      </mesh>
      {/* cross — vertical bar */}
      <mesh position={[0, 1.18, 0]} castShadow material={trim}>
        <boxGeometry args={[0.05, 0.20, 0.05]} />
      </mesh>
      {/* cross — horizontal bar */}
      <mesh position={[0, 1.20, 0]} castShadow material={trim}>
        <boxGeometry args={[0.14, 0.05, 0.05]} />
      </mesh>
    </group>
  )
}
