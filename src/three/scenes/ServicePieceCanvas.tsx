import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'
import { SceneShell } from '../SceneShell'
import { CameraRig } from '../CameraRig'
import { PIECE_COMPONENTS, PieceName } from '../pieces'

interface ServicePieceCanvasProps {
  /** Which chess piece to render. */
  piece: PieceName
  /** True when the parent card is hovered/focused — drives the move animation. */
  active?: boolean
  /** Tiny vs. large rendering variants. */
  scale?: number
  /** Show on which tone — defaults to ivory; cards switch on hover via redOnHover. */
  tone?: 'ivory' | 'red'
  className?: string
}

/**
 * Per-piece animation choreography. Each piece has its own signature "move"
 * that plays when the card is hovered/active.
 */
function AnimatedPiece({ piece, active, tone = 'ivory' }: { piece: PieceName; active: boolean; tone: 'ivory' | 'red' }) {
  const PieceComp = PIECE_COMPONENTS[piece]
  const ref = useRef<THREE.Group>(null)
  const t = useRef(0)

  /** Pseudo-state — accumulates while active, decays when not. */
  useFrame((_, dt) => {
    if (!ref.current) return
    t.current += dt * (active ? 1 : 0.4)

    const g = ref.current
    if (piece === 'knight') {
      // L-jump: forward + up, returning to home
      const phase = (Math.sin(t.current * 1.6) + 1) / 2
      g.position.x = THREE.MathUtils.lerp(0, 0.25, phase * (active ? 1 : 0))
      g.position.y = THREE.MathUtils.lerp(0, 0.45, Math.sin(phase * Math.PI) * (active ? 1 : 0))
      g.rotation.y = THREE.MathUtils.lerp(0, 0.45, phase * (active ? 1 : 0))
    } else if (piece === 'queen') {
      // Lift + slow rotate
      g.position.y = THREE.MathUtils.damp(g.position.y, active ? 0.25 : 0, 4, dt)
      g.rotation.y += dt * (active ? 1.2 : 0.4)
    } else if (piece === 'rook') {
      // Slide left-right
      g.position.x = THREE.MathUtils.damp(g.position.x, active ? Math.sin(t.current * 2) * 0.3 : 0, 3, dt)
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, 0, 4, dt)
    } else if (piece === 'bishop') {
      // Diagonal hover-step
      g.position.x = THREE.MathUtils.damp(g.position.x, active ? Math.sin(t.current * 1.5) * 0.2 : 0, 3, dt)
      g.position.z = THREE.MathUtils.damp(g.position.z, active ? Math.cos(t.current * 1.5) * 0.2 : 0, 3, dt)
    } else if (piece === 'king') {
      // Slow regal rotation; lift on hover
      g.position.y = THREE.MathUtils.damp(g.position.y, active ? 0.18 : 0, 4, dt)
      g.rotation.y += dt * (active ? 0.9 : 0.25)
    } else if (piece === 'pawn') {
      // Tiny double-step
      const phase = (Math.sin(t.current * 2.4) + 1) / 2
      g.position.z = THREE.MathUtils.lerp(0, -0.18, phase * (active ? 1 : 0))
      g.position.y = THREE.MathUtils.lerp(0, 0.06, Math.sin(phase * Math.PI * 2) * (active ? 1 : 0))
    }
  })

  return (
    <group ref={ref}>
      <PieceComp tone={tone} />
    </group>
  )
}

export default function ServicePieceCanvas({ piece, active = false, scale = 1, tone = 'ivory', className }: ServicePieceCanvasProps) {
  const fallback = useMemo(() => glyphFor(piece), [piece])
  return (
    <SceneShell
      aspect="1 / 1"
      camera={{ position: [0, 0.85, 2.4], fov: 35 }}
      shadows={false}
      alwaysRender
      className={className}
      fallback={
        <div className="text-4xl text-red-600" aria-hidden>
          {fallback}
        </div>
      }
    >
      <CameraRig target={[0, 0.4, 0]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} />
      <directionalLight position={[-3, 1, -1]} intensity={0.4} color="#ffd6c0" />
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.15}>
        <group scale={scale} position={[0, -0.5, 0]}>
          <AnimatedPiece piece={piece} active={active} tone={tone} />
        </group>
      </Float>
    </SceneShell>
  )
}

function glyphFor(piece: PieceName): string {
  switch (piece) {
    case 'king':
      return '\u2654'
    case 'queen':
      return '\u2655'
    case 'rook':
      return '\u2656'
    case 'bishop':
      return '\u2657'
    case 'knight':
      return '\u2658'
    case 'pawn':
      return '\u2659'
  }
}
