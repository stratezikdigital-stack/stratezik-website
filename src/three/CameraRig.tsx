import { useFrame, useThree } from '@react-three/fiber'

interface CameraRigProps {
  /** World-space point the camera should always look at. */
  target?: [number, number, number]
}

/** Drop-in helper that keeps the default camera focused on a target each frame. */
export function CameraRig({ target = [0, 0, 0] }: CameraRigProps) {
  const { camera } = useThree()
  useFrame(() => {
    camera.lookAt(target[0], target[1], target[2])
  })
  return null
}
