import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import { WorldScene } from './WorldScene'

interface WorldCanvasInnerProps {
  mobile: boolean
}

export default function WorldCanvasInner({ mobile }: WorldCanvasInnerProps) {
  const [tabHidden, setTabHidden] = useState(false)
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <Canvas
      camera={{ position: [-4.6, 4.8, 5.6], fov: 36 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      shadows={!mobile}
      frameloop={tabHidden ? 'demand' : 'always'}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false, preserveDrawingBuffer: false }}
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
        {!mobile && <Environment preset="city" />}
        <ContactShadows position={[0, -0.04, 0]} opacity={mobile ? 0.4 : 0.55} scale={10} blur={2.6} far={4} />
      </Suspense>
    </Canvas>
  )
}
