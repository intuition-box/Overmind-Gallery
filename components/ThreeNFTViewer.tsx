// components/ThreeNFTViewer.tsx
"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

type Props = {
  glbUrl?: string
  title?: string
  className?: string
}

export default function ThreeNFTViewer({ glbUrl, title, className }: Props) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const container = canvasRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Scene & Camera
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0.8, 2)

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7)
    hemi.position.set(0, 20, 0)
    scene.add(hemi)

    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(5, 10, 7.5)
    dir.castShadow = true
    dir.shadow.camera.near = 0.1
    dir.shadow.camera.far = 100
    scene.add(dir)

    // ground (subtle)
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1, metalness: 0 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1.5
    ground.visible = false
    scene.add(ground)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.rotateSpeed = 0.6
    controls.zoomSpeed = 0.8
    controls.panSpeed = 0.8
    controls.enablePan = true
    // limit polar angle slightly so model doesn't get upside down easily
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI

    // Model container
    const root = new THREE.Group()
    scene.add(root)

    // Load model if provided
    const loader = new GLTFLoader()
    let currentModel: THREE.Object3D | null = null

    const fitCameraToObject = (camera: THREE.PerspectiveCamera, object: THREE.Object3D, offset = 1.25) => {
      const boundingBox = new THREE.Box3().setFromObject(object)
      const center = boundingBox.getCenter(new THREE.Vector3())
      const size = boundingBox.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / 2 * 1 / Math.tan(fov / 2)) * offset

      // prevent camera from being too close/too far
      if (cameraZ < 0.5) cameraZ = 0.5
      camera.position.set(center.x, center.y, cameraZ + center.z + 0.2)
      camera.lookAt(center)
      controls.target.copy(center)
      controls.update()
    }

    if (glbUrl) {
      loader.load(
        glbUrl,
        (gltf) => {
          currentModel = gltf.scene
          // basic material correction (make sure it uses sRGB)
          currentModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const m = (child as THREE.Mesh).material as any
              if (m && typeof m === "object") {
                if (m.map) m.map.encoding = THREE.sRGBEncoding
                m.needsUpdate = true
              }
            }
          })

          root.add(currentModel)
          // fit camera
          fitCameraToObject(camera, currentModel)
        },
        (xhr) => {
          // progress - we could surface a mini loader later
        },
        (err) => {
          console.error("GLTF load error:", err)
        }
      )
    }

    // animation loop
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      frameIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    // resize handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", handleResize)

    // cleanup
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
      window.removeEventListener("resize", handleResize)
      controls.dispose()
      // dispose model geometries + materials
      root.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh) {
          mesh.geometry?.dispose()
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              if ((m as any).map) (m as any).map.dispose?.()
              (m as any).dispose?.()
            })
          } else {
            const mat = mesh.material as any
            if (mat?.map) mat.map.dispose?.()
            mat?.dispose?.()
          }
        }
      })
      renderer.dispose()
      renderer.domElement && renderer.domElement.remove()
    }
  }, [glbUrl])

  return (
    <div
      ref={canvasRef}
      className={`w-full h-full ${className ?? ""}`}
      role="img"
      aria-label={title ?? "3D NFT Viewer"}
    />
  )
}
