'use client'

import { ReactNode, useEffect, useState } from 'react'
import { config } from '../../lib/wagmi'
import { Web3InnerProvider } from './Web3InnerProvider'

interface Web3ProviderProps {
  children: ReactNode
}

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
    <Web3InnerProvider config={config}>
      {children}
    </Web3InnerProvider>
  )
}
// Force redeploy
