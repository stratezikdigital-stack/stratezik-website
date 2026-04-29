import { rookProfile } from './profiles'
import { PieceProps } from './types'
import { usePieceMaterial } from './usePieceMaterial'

const battlements: [number, number, number][] = [
  [0.28, 0.92, 0],
  [-0.28, 0.92, 0],
  [0, 0.92, 0.28],
  [0, 0.92, -0.28],
]

export function Rook({ tone = 'ivory', size = 1, ...rest }: PieceProps) {
  const material = usePieceMaterial(tone)
  return (
    <group scale={size} {...rest}>
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[rookProfile, 24]} />
      </mesh>
      {battlements.map((p, i) => (
        <mesh key={i} position={p} castShadow material={material}>
          <boxGeometry args={[0.12, 0.16, 0.12]} />
        </mesh>
      ))}
    </group>
  )
}
