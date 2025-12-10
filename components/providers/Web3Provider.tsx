'use client'

import { ReactNode } from 'react'
import { config } from '../../lib/wagmi'
import { Web3InnerProvider } from './Web3InnerProvider'

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <Web3InnerProvider config={config}>
      {children}
    </Web3InnerProvider>
  )
}
