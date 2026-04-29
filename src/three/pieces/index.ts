export { Pawn } from './Pawn'
export { Rook } from './Rook'
export { Bishop } from './Bishop'
export { Knight } from './Knight'
export { Queen } from './Queen'
export { King } from './King'
export type { PieceProps, PieceTone } from './types'

import { Pawn } from './Pawn'
import { Rook } from './Rook'
import { Bishop } from './Bishop'
import { Knight } from './Knight'
import { Queen } from './Queen'
import { King } from './King'

export type PieceName = 'pawn' | 'rook' | 'bishop' | 'knight' | 'queen' | 'king'

/** Lookup helper for places that pick a piece by name (e.g. ServicePieceCanvas). */
export const PIECE_COMPONENTS = {
  pawn: Pawn,
  rook: Rook,
  bishop: Bishop,
  knight: Knight,
  queen: Queen,
  king: King,
} as const
