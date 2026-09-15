import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 5200
const PLATES = [
  { x: 0.55, y: -0.55, z: -0.85, alpha: 0.35 },
  { x: 0.28, y: -0.28, z: -0.42, alpha: 0.65 },
  { x: 0, y: 0, z: 0, alpha: 1 },
]

/** A point somewhere inside a flat hexagon of the given radius. */
function hexPoint(radius: number) {
  // Pick a wedge, then a point in the triangle that wedge spans.
  const wedge = Math.floor(Math.random() * 6)
  const a0 = (Math.PI / 3) * wedge - Math.PI / 2
  const a1 = a0 + Math.PI / 3
  let u = Math.random()
  let v = Math.random()
  if (u + v > 1) {
    u = 1 - u
    v = 1 - v
  }
  const x0 = Math.cos(a0) * radius
  const y0 = Math.sin(a0) * radius
  const x1 = Math.cos(a1) * radius
  const y1 = Math.sin(a1) * radius
  return { x: u * x0 + v * x1, y: u * y0 + v * y1 }
}

/** A point on the hexagon's edge, with a little radial jitter. */
function hexEdge(radius: number, jitter: number) {
  const edge = Math.floor(Math.random() * 6)
  const t = Math.random()
  const a0 = (Math.PI / 3) * edge - Math.PI / 2
  const a1 = a0 + Math.PI / 3
  const x = Math.cos(a0) * radius + (Math.cos(a1) - Math.cos(a0)) * radius * t
  const y = Math.sin(a0) * radius + (Math.sin(a1) - Math.sin(a0)) * radius * t
  const len = Math.hypot(x, y) || 1
  const j = (Math.random() - 0.5) * jitter
  return { x: x + (x / len) * j, y: y + (y / len) * j }
}

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aMark;
  attribute vec3 aTrail;
  attribute float aAlpha;
  attribute float aSeed;
  attribute float aScale;

  varying float vAlpha;
  varying float vSeed;
  varying float vStretch;
  varying vec2 vDir;

  void main() {
    // Each point leaves the mark at a slightly different moment.
    float stagger = smoothstep(0.0, 1.0, clamp((uProgress - aSeed * 0.22) / 0.78, 0.0, 1.0));

    vec3 pos = mix(aMark, aTrail, stagger);

    // Released points hold the corridor and drift; the camera does the travelling.
    float drift = stagger * stagger;
    pos.x += sin(uTime * 0.3 + aSeed * 12.0) * drift * 0.34;
    pos.y += cos(uTime * 0.26 + aSeed * 9.0) * drift * 0.34;
    pos.z += sin(uTime * 0.19 + aSeed * 15.0) * drift * 0.7;

    // A slow breath while the mark is still assembled.
    float idle = 1.0 - stagger;
    pos.x += sin(uTime * 0.5 + aSeed * 6.0) * 0.022 * idle;
    pos.y += cos(uTime * 0.45 + aSeed * 7.0) * 0.022 * idle;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = aScale * (1.0 + stagger * 0.9);
    gl_PointSize = clamp(size * uPixelRatio * (42.0 / -mv.z), 1.0, 9.0);

    // Streak away from screen centre once released, so points read as trails.
    vec2 ndc = gl_Position.xy / max(gl_Position.w, 0.0001);
    vDir = length(ndc) > 0.001 ? normalize(ndc) : vec2(1.0, 0.0);
    vStretch = 1.0 + stagger * 4.2;

    vAlpha = aAlpha * mix(1.0, 2.6, stagger);
    vSeed = aSeed;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uCoreColor;
  uniform vec3 uEdgeColor;

  varying float vAlpha;
  varying float vSeed;
  varying float vStretch;
  varying vec2 vDir;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float falloff = 1.0 - smoothstep(0.0, 0.5, d);
    falloff = pow(falloff, 1.35);

    vec3 color = mix(uCoreColor, uEdgeColor, vSeed);
    gl_FragColor = vec4(color, falloff * vAlpha);
  }
`

type HexFieldProps = {
  progress: React.MutableRefObject<number>
}

export default function HexField({ progress }: HexFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  const geometry = useMemo(() => {
    const mark = new Float32Array(COUNT * 3)
    const trail = new Float32Array(COUNT * 3)
    const alpha = new Float32Array(COUNT)
    const seed = new Float32Array(COUNT)
    const scale = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const plate = PLATES[i % PLATES.length]

      // Most points trace the edge so each hexagon stays legible; the rest
      // dust the interior faintly.
      const onRim = Math.random() < 0.74
      const p = onRim ? hexEdge(1.05, 0.055) : hexPoint(0.98)

      mark[i * 3] = p.x + plate.x
      mark[i * 3 + 1] = p.y + plate.y
      mark[i * 3 + 2] = plate.z + (Math.random() - 0.5) * 0.04

      // Trail formation: a long corridor the camera flies the length of.
      const angle = Math.random() * Math.PI * 2
      const radius = 0.9 + Math.pow(Math.random(), 0.65) * 5.4
      trail[i * 3] = Math.cos(angle) * radius
      trail[i * 3 + 1] = Math.sin(angle) * radius * 0.78
      trail[i * 3 + 2] = 2 - Math.random() * 34

      alpha[i] = plate.alpha * (onRim ? 0.2 + Math.random() * 0.16 : 0.05 + Math.random() * 0.06)
      seed[i] = Math.random()
      scale[i] = onRim ? 0.4 + Math.random() * 0.5 : 0.3 + Math.random() * 0.45
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(mark.slice(), 3))
    g.setAttribute('aMark', new THREE.BufferAttribute(mark, 3))
    g.setAttribute('aTrail', new THREE.BufferAttribute(trail, 3))
    g.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -16), 48)
    return g
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uCoreColor: { value: new THREE.Color('#3b82f6') },
        uEdgeColor: { value: new THREE.Color('#7dd3fc') },
      },
    })
  }, [])

  useFrame((state) => {
    const mat = materialRef.current
    if (!mat) return
    const p = progress.current
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uProgress.value = THREE.MathUtils.lerp(
      mat.uniforms.uProgress.value,
      p,
      0.07,
    )

    if (groupRef.current) {
      // The stack turns a few degrees as it comes apart.
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -0.35 + p * 0.9,
        0.05,
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.12 - p * 0.24,
        0.05,
      )
    }
  })

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <primitive object={geometry} attach="geometry" />
        <primitive object={material} attach="material" ref={materialRef} />
      </points>
    </group>
  )
}
