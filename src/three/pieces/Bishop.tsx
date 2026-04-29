import { bishopProfile } from './profiles'
import { PieceProps } from './types'
import { usePieceMaterial } from './usePieceMaterial'

export function Bishop({ tone = 'ivory', size = 1, ...rest }: PieceProps) {
  const material = usePieceMaterial(tone)
  return (
    <group scale={size} {...rest}>
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[bishopProfile, 28]} />
      </mesh>
      {/* tiny sphere finial */}
      <mesh position={[0, 1.10, 0]} castShadow material={material}>
        <sphereGeometry args={[0.05, 16, 12]} />
      </mesh>
    </group>
  )
}
