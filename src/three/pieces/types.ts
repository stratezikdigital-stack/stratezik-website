import { GroupProps } from '@react-three/fiber'

export type PieceTone = 'ivory' | 'onyx' | 'red'

export interface PieceProps extends Omit<GroupProps, 'children'> {
  /** Visual treatment: white side, black side, or Stratezik signature red king. */
  tone?: PieceTone
  /** Override scale uniformly. */
  size?: number
}
