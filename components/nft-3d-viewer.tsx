// components/nft-3d-viewer.tsx
"use client"

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei'
import { Loader2 } from 'lucide-react'

interface Model3DProps {
  url: string
}

function Model3D({ url }: Model3DProps) {
  const { scene } = useGLTF(url)

  return <primitive object={scene} scale={1.5} />
}

interface NFT3DViewerProps {
  modelUrl: string
  // Add a key prop from parent to force remount when modal opens
  key?: string | number
}

export function NFT3DViewer({ modelUrl }: NFT3DViewerProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <Canvas
        shadows
        gl={{ 
          alpha: false, // Changed to false to prevent transparent/clear issues
          antialias: true,
          preserveDrawingBuffer: true 
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <color attach="background" args={['#000000']} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.6} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} castShadow />

        <Environment preset="studio" />

        {/* Proper Suspense with visible fallback */}
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#222222" wireframe />
          </mesh>
        }>
          <Model3D url={modelUrl} />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30 z-10">
        <p className="text-cyan-400 text-xs font-semibold">
          🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  )
}