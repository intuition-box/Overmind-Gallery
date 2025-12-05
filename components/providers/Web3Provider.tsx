'use client'

import { ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface Web3ProviderProps {
  children: ReactNode
}

// Chargement dynamique côté client uniquement - PAS de SSR
const Web3InnerProvider = dynamic(() => import('./Web3InnerProvider'), {
  ssr: false, // Désactive complètement le rendu côté serveur
  loading: () => null // Rien pendant le chargement
})

export function Web3Provider({ children }: Web3ProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Côté serveur : rendu normal sans Web3 (évite toutes les erreurs SSR)
  if (!mounted) {
    return <>{children}</>
  }

  // Côté client : rendu avec Web3 chargé dynamiquement
  return (
    <Web3InnerProvider>
      {children}
    </Web3InnerProvider>
  )
}
// Force redeploy
