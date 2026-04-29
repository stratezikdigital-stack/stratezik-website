import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import { WorldScene } from './WorldScene'

interface WorldCanvasInnerProps {
  mobile: boolean
  reduced: boolean
}

export default function WorldCanvasInner({ mobile, reduced }: WorldCanvasInnerProps) {
  const [tabHidden, setTabHidden] = useState(false)
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Render quality knob: mobile and reduced-motion both fall back to a
  // calmer, cheaper render path. Everyone still gets the scene; just less
  // of it on lower-power / quieter devices.
  const lite = mobile || reduced

  return (
    <Canvas
      camera={{ position: [-7.4, 7.6, 8.6], fov: 28 }}
      dpr={lite ? [1, 1.5] : [1, 2]}
      shadows={!lite}
      frameloop={tabHidden ? 'demand' : 'always'}
      gl={{
        antialias: !mobile,
        powerPreference: 'high-performance',
        alpha: false,
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement
        canvas.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          console.warn('[WorldCanvas] WebGL context lost — will attempt restore')
        })
        canvas.addEventListener('webglcontextrestored', () => {
          console.info('[WorldCanvas] WebGL context restored')
        })
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <WorldScene />
        {!lite && <Environment preset="city" />}
        <ContactShadows
          position={[0, -0.04, 0]}
          opacity={lite ? 0.35 : 0.55}
          scale={10}
          blur={2.6}
          far={4}
        />
      </Suspense>
    </Canvas>
  )
}
