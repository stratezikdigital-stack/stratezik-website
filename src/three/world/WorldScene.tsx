import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { Bishop, King, Knight, Pawn, Queen, Rook } from '../pieces'
import { Chessboard } from '../Chessboard'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWorldStore } from './store'
import { sampleCamera } from './cameraPath'
import {
  atmosphereAt,
  BOARD_TILE,
  fileToX,
  opponentKingAt,
  pawnAt,
  promotedQueenAt,
  rankToZ,
  servicePieceAt,
  SERVICE_SCHEDULE,
  ServicePieceName,
} from './pieceChoreography'

const BOARD_SIZE = BOARD_TILE * 8 // 4.8

const SERVICE_COMP: Record<ServicePieceName, React.ComponentType<{ tone?: 'ivory' | 'onyx' | 'red'; size?: number }>> = {
  knight: Knight,
  bishop: Bishop,
  rook: Rook,
  queen: Queen,
}

/** Static cohort: pawns flanking the focal one, plus bystanders, plus opponent army. */
function StaticArmies() {
  // Allied pawns at rank 2, except e2 which is the focal pawn position
  const cohortPawns: [number, number][] = [
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [6, 2],
    [7, 2],
    [8, 2],
  ]
  // Allied back rank — partial, just to feel populated
  const alliedBackRank: { file: number; rank: number; piece: 'rook' | 'knight' | 'bishop' }[] = [
    { file: 1, rank: 1, piece: 'rook' },
    { file: 8, rank: 1, piece: 'rook' },
    { file: 2, rank: 1, piece: 'knight' },
    { file: 7, rank: 1, piece: 'knight' },
  ]
  // Opposing back rank
  const opponentBackRank: { file: number; rank: number; piece: 'rook' | 'knight' | 'bishop' | 'queen' }[] = [
    { file: 1, rank: 8, piece: 'rook' },
    { file: 8, rank: 8, piece: 'rook' },
    { file: 2, rank: 8, piece: 'knight' },
    { file: 7, rank: 8, piece: 'knight' },
    { file: 3, rank: 8, piece: 'bishop' },
    { file: 6, rank: 8, piece: 'bishop' },
    { file: 4, rank: 8, piece: 'queen' },
  ]
  // Opposing pawns rank 7
  const opponentPawns: [number, number][] = [
    [1, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [8, 7],
  ]

  return (
    <group>
      {cohortPawns.map(([f, r]) => (
        <group key={`cp-${f}-${r}`} position={[fileToX(f), 0.06, rankToZ(r)]}>
          <Pawn tone="ivory" />
        </group>
      ))}
      {alliedBackRank.map(({ file, rank, piece }) => (
        <group key={`ab-${file}-${rank}-${piece}`} position={[fileToX(file), 0.06, rankToZ(rank)]}>
          {piece === 'rook' && <Rook tone="ivory" />}
          {piece === 'knight' && <Knight tone="ivory" rotation={[0, file < 4 ? Math.PI / 6 : -Math.PI / 6, 0]} />}
          {piece === 'bishop' && <Bishop tone="ivory" />}
        </group>
      ))}
      {/* Stratezik red king watches over from e1 (file 5) */}
      <group position={[fileToX(5), 0.06, rankToZ(1)]}>
        <King tone="red" size={1.05} />
      </group>
      {opponentBackRank.map(({ file, rank, piece }) => (
        <group key={`ob-${file}-${rank}-${piece}`} position={[fileToX(file), 0.06, rankToZ(rank)]}>
          {piece === 'rook' && <Rook tone="onyx" />}
          {piece === 'knight' && <Knight tone="onyx" rotation={[0, file < 4 ? Math.PI / 6 : -Math.PI / 6, 0]} />}
          {piece === 'bishop' && <Bishop tone="onyx" />}
          {piece === 'queen' && <Queen tone="onyx" />}
        </group>
      ))}
      {opponentPawns.map(([f, r]) => (
        <group key={`op-${f}-${r}`} position={[fileToX(f), 0.06, rankToZ(r)]}>
          <Pawn tone="onyx" />
        </group>
      ))}
    </group>
  )
}

/** Focal pawn (the visitor avatar) — animated per-frame from store progress. */
function FocalPawn() {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return
    const progress = useWorldStore.getState().progress
    const state = pawnAt(progress)
    ref.current.position.set(state.position[0], state.position[1], state.position[2])
    // Soft rotate facing forward as it advances
    ref.current.rotation.y = progress * 0.3
    // Visibility (also handle promotion fade)
    ref.current.visible = state.alpha > 0.02
    ref.current.scale.setScalar(0.6 + state.alpha * 0.4)
  })

  return (
    <group ref={ref}>
      <Pawn tone="ivory" />
    </group>
  )
}

/** Service piece companions — fade in/out around the focal pawn. */
function ServicePieces() {
  const refs = useRef<(THREE.Group | null)[]>([])

  useFrame(() => {
    const progress = useWorldStore.getState().progress
    const pawnState = pawnAt(progress)
    SERVICE_SCHEDULE.forEach((s, i) => {
      const piece = servicePieceAt(progress, s, pawnState.position)
      const node = refs.current[i]
      if (!node) return
      node.visible = piece.visible
      node.position.set(piece.position[0], piece.position[1] + 0.05, piece.position[2])
      node.scale.setScalar(0.7 + piece.alpha * 0.3)
      node.rotation.y = progress * Math.PI * 1.5 + i * 0.6
    })
  })

  return (
    <group>
      {SERVICE_SCHEDULE.map((s, i) => {
        const Comp = SERVICE_COMP[s.name]
        return (
          <group key={s.name} ref={(el) => (refs.current[i] = el)} visible={false}>
            <Comp tone="ivory" />
          </group>
        )
      })}
    </group>
  )
}

/** Promoted red queen — rises out of the focal pawn at the very end. */
function PromotedQueen() {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    const node = ref.current
    if (!node) return
    const progress = useWorldStore.getState().progress
    const pawnState = pawnAt(progress)
    const queenState = promotedQueenAt(progress, pawnState.position)
    node.position.set(pawnState.position[0], 0.06 + queenState.lift, pawnState.position[2])
    node.rotation.y = queenState.spin
    node.visible = queenState.alpha > 0.02
    node.scale.setScalar(0.6 + queenState.alpha * 0.6)
  })

  return (
    <group ref={ref} visible={false}>
      <Queen tone="red" />
    </group>
  )
}

/** Opposing king at e8 wobbles + topples on resign. */
function OpponentKing() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, dt) => {
    if (!ref.current) return
    const { progress, resigned } = useWorldStore.getState()
    const target = opponentKingAt(progress, resigned).tilt
    ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, target, 3, dt)

    // Anticipation tremor — as the visitor closes in, the king's base
    // shudders almost imperceptibly. Stops once it has actually toppled.
    const wobble = Math.max(0, (progress - 0.82) / 0.18)
    const tremor = resigned ? 0 : Math.sin(state.clock.elapsedTime * 14) * 0.004 * wobble * wobble

    const targetX = resigned ? fileToX(5) + 0.4 : fileToX(5) + tremor
    const targetY = resigned ? 0.04 : 0.06
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 4, dt)
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 4, dt)
  })

  return (
    <group ref={ref} position={[fileToX(5), 0.06, rankToZ(8)]}>
      <King tone="onyx" />
    </group>
  )
}

/** Reads progress and drives the camera + global atmosphere each frame. */
function ScrollOrchestrator() {
  const { camera, scene } = useThree()
  const fog = useMemo(() => new THREE.Fog('#f3eee5', 8, 20), [])
  const _pos = useMemo(() => new THREE.Vector3(), [])
  const _target = useMemo(() => new THREE.Vector3(), [])
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const keyRef = useRef<THREE.DirectionalLight>(null)

  // Apply fog once
  useMemo(() => {
    scene.fog = fog
  }, [scene, fog])

  useFrame((_, dt) => {
    const { progress } = useWorldStore.getState()

    // Camera
    const { fov } = sampleCamera(progress, _pos, _target)
    if ((camera as THREE.PerspectiveCamera).fov !== undefined) {
      const cam = camera as THREE.PerspectiveCamera
      cam.position.lerp(_pos, Math.min(1, dt * 6))
      cam.fov += (fov - cam.fov) * Math.min(1, dt * 6)
      cam.updateProjectionMatrix()
      cam.lookAt(_target)
    }

    // Atmosphere
    const atm = atmosphereAt(progress)
    fog.color.setRGB(atm.fogColor[0], atm.fogColor[1], atm.fogColor[2])
    fog.near = atm.fogNear
    fog.far = atm.fogFar
    if (scene.background instanceof THREE.Color) {
      scene.background.setRGB(atm.bg[0], atm.bg[1], atm.bg[2])
    }
    if (ambientRef.current) ambientRef.current.intensity = atm.ambient
    if (keyRef.current) keyRef.current.intensity = atm.key
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.6} />
      <directionalLight
        ref={keyRef}
        position={[3, 5, 3]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#ffd6c0" />
    </>
  )
}

/**
 * Wraps the board + armies in a group whose scale + Y position animate
 * during the hero pinned beat (progress 0 → 0.04). Visually: the board
 * "lifts into place" while the camera dollies in.
 */
function StagedWorld() {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return
    const { progress } = useWorldStore.getState()
    // Smoothstep 0 → 1 over progress 0..0.04 (~first 30vh of hero pin)
    const t = Math.max(0, Math.min(1, progress / 0.04))
    const eased = t * t * (3 - 2 * t)
    ref.current.scale.setScalar(0.92 + eased * 0.08)
    ref.current.position.y = -0.12 * (1 - eased)
  })

  return (
    <group ref={ref}>
      <Chessboard size={BOARD_SIZE} />
      <StaticArmies />
      <FocalPawn />
      <ServicePieces />
      <PromotedQueen />
      <OpponentKing />
    </group>
  )
}

export function WorldScene() {
  const reduced = useReducedMotion()

  return (
    <>
      <color attach="background" args={['#f4ede1']} />
      <ScrollOrchestrator />
      {reduced ? (
        <StagedWorld />
      ) : (
        <Float speed={0.6} floatIntensity={0.08} rotationIntensity={0.02}>
          <StagedWorld />
        </Float>
      )}
    </>
  )
}
