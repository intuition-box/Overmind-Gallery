// components/nft-3d-viewer.tsx
"use client"

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei'
import { Loader2 } from 'lucide-react'

interface Model3DProps {
  url: string
}

function Model3D({ url }: Model3DProps) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<any>()

  // Optional: Add subtle rotation animation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002
    }
  })

  return <primitive ref={modelRef} object={scene} scale={1.5} />
}

interface NFT3DViewerProps {
  modelUrl: string
}

export function NFT3DViewer({ modelUrl }: NFT3DViewerProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-black/50">
      {/* Three.js Canvas - fills parent container exactly */}
      <Canvas
        shadows
        className="w-full h-full"
        gl={{ 
          alpha: true, 
          antialias: true,
          preserveDrawingBuffer: true 
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* 3D Model with loading fallback */}
        <Suspense fallback={null}>
          <Model3D url={modelUrl} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Loading overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Suspense fallback={
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-gray-400 text-sm">Loading 3D model...</p>
          </div>
        }>
          <div />
        </Suspense>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30 z-10">
        <p className="text-cyan-400 text-xs font-semibold">
          🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>

      {/* Gradient overlay for better integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

// Preload GLB files for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url)
}

export default NFT3DViewer