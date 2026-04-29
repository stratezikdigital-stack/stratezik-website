import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'
import { SceneShell } from '../SceneShell'
import { Chessboard } from '../Chessboard'
import { CameraRig } from '../CameraRig'
import { Bishop, King, Knight, Pawn, PieceTone, Queen, Rook } from '../pieces'
import { PieceName } from '../pieces'

/**
 * A small 4x4 chess vignette per Strategy Flow step. Each step has:
 *  - a "from" square and "to" square
 *  - the active piece glides between them on a loop while the canvas is visible
 */
interface Move {
  piece: PieceName
  tone: PieceTone
  from: [number, number] // [file 0..3, rank 0..3]
  to: [number, number]
  /** Other pieces on the board for context. */
  cohort?: { piece: PieceName; tone: PieceTone; at: [number, number] }[]
}

export const MOVES: Record<number, Move> = {
  1: {
    // Opening — knight develops
    piece: 'knight',
    tone: 'ivory',
    from: [1, 0],
    to: [2, 2],
    cohort: [
      { piece: 'pawn', tone: 'ivory', at: [0, 1] },
      { piece: 'pawn', tone: 'ivory', at: [3, 1] },
      { piece: 'pawn', tone: 'onyx', at: [0, 2] },
    ],
  },
  2: {
    // Middle game — bishop diagonal
    piece: 'bishop',
    tone: 'ivory',
    from: [0, 0],
    to: [3, 3],
    cohort: [
      { piece: 'pawn', tone: 'onyx', at: [1, 2] },
      { piece: 'rook', tone: 'onyx', at: [3, 0] },
    ],
  },
  3: {
    // End game — queen swings
    piece: 'queen',
    tone: 'ivory',
    from: [1, 1],
    to: [3, 3],
    cohort: [
      { piece: 'king', tone: 'onyx', at: [2, 2] },
      { piece: 'pawn', tone: 'onyx', at: [3, 2] },
    ],
  },
  4: {
    // Checkmate — Stratezik red king claims center
    piece: 'king',
    tone: 'red',
    from: [2, 2],
    to: [2, 2],
    cohort: [
      { piece: 'rook', tone: 'ivory', at: [0, 0] },
      { piece: 'rook', tone: 'ivory', at: [3, 0] },
      { piece: 'pawn', tone: 'onyx', at: [1, 3] },
    ],
  },
}

const N = 4
const BOARD = 2.4
const TILE = BOARD / N
const HALF = BOARD / 2 - TILE / 2

function squareToWorld([f, r]: [number, number]): [number, number, number] {
  return [f * TILE - HALF, 0.06, r * TILE - HALF]
}

function MovingPiece({ move }: { move: Move }) {
  const ref = useRef<THREE.Group>(null)
  const Comp = useMemo(() => {
    switch (move.piece) {
      case 'king':
        return King
      case 'queen':
        return Queen
      case 'rook':
        return Rook
      case 'bishop':
        return Bishop
      case 'knight':
        return Knight
      default:
        return Pawn
    }
  }, [move.piece])

  const [fromX, , fromZ] = squareToWorld(move.from)
  const [toX, , toZ] = squareToWorld(move.to)

  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime % 4) / 4 // 4s loop
    // Ease in / out
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    const arc = Math.sin(t * Math.PI) * 0.25
    ref.current.position.x = THREE.MathUtils.lerp(fromX, toX, e)
    ref.current.position.z = THREE.MathUtils.lerp(fromZ, toZ, e)
    ref.current.position.y = 0.06 + arc
  })

  return (
    <group ref={ref} position={[fromX, 0.06, fromZ]}>
      <Comp tone={move.tone} />
    </group>
  )
}

interface MoveSequenceProps {
  step: 1 | 2 | 3 | 4
  className?: string
}

export default function MoveSequence({ step, className }: MoveSequenceProps) {
  const move = MOVES[step]

  return (
    <SceneShell
      aspect="1 / 1"
      camera={{ position: [0.4, 2.4, 3.6], fov: 28 }}
      shadows={false}
      alwaysRender
      className={className}
      fallback={
        <div className="text-3xl text-red-600" aria-hidden>
          {step}
        </div>
      }
    >
      <CameraRig target={[0, 0, 0]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} />
      <directionalLight position={[-3, 1, -1]} intensity={0.4} color="#ffd6c0" />

      <Float speed={0.8} floatIntensity={0.12} rotationIntensity={0.04}>
        <group rotation={[0, 0.35, 0]} position={[0, -0.1, 0]}>
          <Chessboard size={BOARD} squares={N} rim={false} />

          {move.cohort?.map((c, i) => (
            <group key={i} position={squareToWorld(c.at)}>
              {c.piece === 'king' && <King tone={c.tone} />}
              {c.piece === 'queen' && <Queen tone={c.tone} />}
              {c.piece === 'rook' && <Rook tone={c.tone} />}
              {c.piece === 'bishop' && <Bishop tone={c.tone} />}
              {c.piece === 'knight' && <Knight tone={c.tone} />}
              {c.piece === 'pawn' && <Pawn tone={c.tone} />}
            </group>
          ))}

          <MovingPiece move={move} />
        </group>
      </Float>
    </SceneShell>
  )
}
