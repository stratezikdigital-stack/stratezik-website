import { useMemo } from 'react'
import * as THREE from 'three'
import { ivoryMarbleMaterial, onyxMarbleMaterial, redMetalMaterial, goldTrimMaterial } from '../materials'
import { PieceTone } from './types'

/** Returns a memoized material per (tone) so we don't allocate per-frame. */
export function usePieceMaterial(tone: PieceTone = 'ivory'): THREE.Material {
  return useMemo(() => {
    if (tone === 'red') return redMetalMaterial()
    if (tone === 'onyx') return onyxMarbleMaterial()
    return ivoryMarbleMaterial()
  }, [tone])
}

export function useTrimMaterial(tone: PieceTone): THREE.Material {
  return useMemo(() => {
    if (tone === 'red') return goldTrimMaterial()
    if (tone === 'onyx') {
      return new THREE.MeshStandardMaterial({ color: '#9aa0a6', roughness: 0.4, metalness: 0.6 })
    }
    return new THREE.MeshStandardMaterial({ color: '#c9a14a', roughness: 0.4, metalness: 0.7 })
  }, [tone])
}
