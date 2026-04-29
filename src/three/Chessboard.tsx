import { useMemo } from 'react'
import * as THREE from 'three'
import { GroupProps } from '@react-three/fiber'
import { PALETTE } from './materials'

interface ChessboardProps extends GroupProps {
  /** Total board edge length in world units. */
  size?: number
  /** Number of squares per edge (8 for a standard board, 4 for compact accents). */
  squares?: number
  /** Adds a subtle bevel rim around the board. */
  rim?: boolean
}

/**
 * A static 8x8 (or NxN) marble chessboard. Squares share materials so even at
 * 64 tiles we only allocate two materials and one geometry per color.
 */
export function Chessboard({ size = 4, squares = 8, rim = true, ...rest }: ChessboardProps) {
  const tileSize = size / squares
  const half = size / 2 - tileSize / 2

  const lightMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: PALETTE.marbleLight,
        roughness: 0.55,
        metalness: 0.05,
        clearcoat: 0.4,
        clearcoatRoughness: 0.5,
      }),
    []
  )

  const darkMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: PALETTE.marbleDark,
        roughness: 0.5,
        metalness: 0.15,
        clearcoat: 0.5,
        clearcoatRoughness: 0.4,
      }),
    []
  )

  const tileGeom = useMemo(
    () => new THREE.BoxGeometry(tileSize, 0.06, tileSize),
    [tileSize]
  )

  const tiles = useMemo(() => {
    const arr: { pos: [number, number, number]; isDark: boolean; key: string }[] = []
    for (let r = 0; r < squares; r++) {
      for (let c = 0; c < squares; c++) {
        arr.push({
          pos: [c * tileSize - half, 0, r * tileSize - half],
          isDark: (r + c) % 2 === 1,
          key: `${r}-${c}`,
        })
      }
    }
    return arr
  }, [squares, tileSize, half])

  return (
    <group {...rest}>
      {rim && (
        <mesh receiveShadow position={[0, -0.01, 0]}>
          <boxGeometry args={[size + 0.32, 0.10, size + 0.32]} />
          <meshPhysicalMaterial color={PALETTE.graphite} roughness={0.4} metalness={0.6} clearcoat={0.6} />
        </mesh>
      )}
      {tiles.map((t) => (
        <mesh
          key={t.key}
          position={t.pos}
          geometry={tileGeom}
          material={t.isDark ? darkMat : lightMat}
          receiveShadow
        />
      ))}
    </group>
  )
}
