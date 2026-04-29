import { pawnProfile } from './profiles'
import { PieceProps } from './types'
import { usePieceMaterial } from './usePieceMaterial'

export function Pawn({ tone = 'ivory', size = 1, ...rest }: PieceProps) {
  const material = usePieceMaterial(tone)
  return (
    <group scale={size} {...rest}>
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[pawnProfile, 28]} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow material={material}>
        <sphereGeometry args={[0.18, 24, 18]} />
      </mesh>
    </group>
  )
}
