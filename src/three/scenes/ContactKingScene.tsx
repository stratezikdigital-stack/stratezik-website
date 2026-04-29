import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, ContactShadows } from '@react-three/drei'
import { SceneShell } from '../SceneShell'
import { Chessboard } from '../Chessboard'
import { CameraRig } from '../CameraRig'
import { King, Knight, Pawn } from '../pieces'

interface ContactKingSceneProps {
  /** When true, the opposing king topples (animated resignation). */
  resigning?: boolean
  className?: string
}

function OpponentKing({ resigning }: { resigning: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const tipped = useRef(0) // 0..1 progress

  useFrame((_, dt) => {
    if (!ref.current) return
    const target = resigning ? 1 : 0
    tipped.current = THREE.MathUtils.damp(tipped.current, target, 3, dt)
    ref.current.rotation.z = tipped.current * (Math.PI / 2 - 0.05)
    ref.current.position.x = -0.55 + tipped.current * 0.55
    ref.current.position.y = 0.06 - tipped.current * 0.04
  })

  return (
    <group ref={ref} position={[-0.55, 0.06, 0.55]}>
      <King tone="onyx" />
    </group>
  )
}

function VictoriousKing() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.35
  })
  return (
    <group ref={ref} position={[0.45, 0.06, -0.45]}>
      <King tone="red" size={1.15} />
    </group>
  )
}

function SceneContent({ resigning }: { resigning: boolean }) {
  return (
    <>
      <color attach="background" args={['#fdfaf3']} />
      <CameraRig target={[0, 0.7, 0]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 3]} intensity={1.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#ffd6c0" />

      <Float speed={0.9} floatIntensity={0.12} rotationIntensity={0.04}>
        <group rotation={[0, 0.4, 0]} position={[0, 0, 0]}>
          <Chessboard size={2.2} squares={4} rim />

          <VictoriousKing />
          <OpponentKing resigning={resigning} />

          <group position={[-0.05, 0.06, 0.05]}>
            <Knight tone="ivory" rotation={[0, Math.PI / 5, 0]} />
          </group>
          <group position={[0.55, 0.06, 0.55]}>
            <Pawn tone="ivory" />
          </group>
        </group>
      </Float>

      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={6} blur={2.4} far={3.5} />
    </>
  )
}

export default function ContactKingScene({ resigning = false, className }: ContactKingSceneProps) {
  // Pre-resolve hash so reduced-motion still gets a consistent fallback
  useEffect(() => {}, [resigning])

  return (
    <SceneShell
      aspect="4 / 3"
      camera={{ position: [1.6, 2.4, 4.6], fov: 32 }}
      alwaysRender
      className={className}
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-2xl">
          <div className="text-6xl text-red-600">&#9818;</div>
        </div>
      }
    >
      <SceneContent resigning={resigning} />
    </SceneShell>
  )
}
