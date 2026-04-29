import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Chessboard } from '../Chessboard'
import { SceneShell } from '../SceneShell'
import { CameraRig } from '../CameraRig'
import { Bishop, King, Knight, Pawn, Queen, Rook } from '../pieces'

/**
 * Hero stage. Camera gently parallaxes with cursor; pieces drift via Float.
 * Layout uses a chess-coordinate helper so positions read like real squares.
 */

const BOARD = 4 // world units per side
const N = 8
const TILE = BOARD / N
const HALF = BOARD / 2 - TILE / 2

/** Map "e4"-style board coords to world XZ. file a..h, rank 1..8. */
function sq(file: string, rank: number): [number, number, number] {
  const fIdx = file.charCodeAt(0) - 97 // a=0
  const rIdx = rank - 1
  return [fIdx * TILE - HALF, 0.06, rIdx * TILE - HALF]
}

function CursorParallax({ children, strength = 0.18 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const m = state.pointer
    target.current.x = m.x * strength
    target.current.y = -m.y * strength
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, target.current.x, 4, delta)
      ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, target.current.y * 0.4, 4, delta)
    }
  })

  return <group ref={ref}>{children}</group>
}

function HeroSceneContent() {
  return (
    <>
      <color attach="background" args={['#f7f4ee']} />
      <fog attach="fog" args={['#f3eee5', 8, 18]} />

      <CameraRig target={[0, 0, 0]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#ffd6c0" />

      <Environment preset="city" />

      <CursorParallax strength={0.12}>
        {/* Subtle hover for the entire scene */}
        <Float speed={1.0} floatIntensity={0.18} rotationIntensity={0.05}>
          <group rotation={[0, 0.35, 0]} position={[0, -0.2, 0]}>
            <Chessboard size={BOARD} />

            {/* Stratezik red king — focal point */}
            <group position={sq('e', 4)}>
              <King tone="red" size={1.05} />
            </group>

            {/* Allied ivory pieces (white side) */}
            <group position={sq('d', 2)}>
              <Queen tone="ivory" />
            </group>
            <group position={sq('g', 1)}>
              <Knight tone="ivory" rotation={[0, Math.PI / 6, 0]} />
            </group>
            <group position={sq('c', 1)}>
              <Bishop tone="ivory" />
            </group>
            <group position={sq('a', 1)}>
              <Rook tone="ivory" />
            </group>
            <group position={sq('e', 2)}>
              <Pawn tone="ivory" />
            </group>
            <group position={sq('f', 2)}>
              <Pawn tone="ivory" />
            </group>

            {/* Opponent onyx pieces */}
            <group position={sq('e', 7)}>
              <Pawn tone="onyx" />
            </group>
            <group position={sq('d', 7)}>
              <Pawn tone="onyx" />
            </group>
            <group position={sq('h', 8)}>
              <Rook tone="onyx" />
            </group>
            <group position={sq('b', 8)}>
              <Knight tone="onyx" rotation={[0, -Math.PI / 6, 0]} />
            </group>
          </group>
        </Float>
      </CursorParallax>

      <ContactShadows position={[0, -0.55, 0]} opacity={0.55} scale={8} blur={2.6} far={4} />
    </>
  )
}

interface HeroBoardSceneProps {
  className?: string
}

export default function HeroBoardScene({ className }: HeroBoardSceneProps) {
  return (
    <SceneShell
      aspect="1 / 1"
      camera={{ position: [0.6, 3.2, 5.4], fov: 32 }}
      className={className}
      alwaysRender
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl">
          <div className="text-7xl text-red-600 drop-shadow-sm">&#9818;</div>
        </div>
      }
    >
      <HeroSceneContent />
    </SceneShell>
  )
}
