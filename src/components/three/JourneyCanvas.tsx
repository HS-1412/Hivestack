import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import HexField from './HexField'

type ProgressRef = React.MutableRefObject<number>

/** Glides the camera through the field as the page scrolls. */
function CameraRig({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const p = progress.current
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04

    const targetZ = 5.4 - p * 26
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.current.x * 0.4,
      0.06,
    )
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      pointer.current.y * 0.28,
      0.06,
    )
    camera.lookAt(0, 0, camera.position.z - 6)
  })

  return null
}

export default function JourneyCanvas({ progress }: { progress: ProgressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 50, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#05070d']} />
        <CameraRig progress={progress} />
        <HexField progress={progress} />
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.26}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
