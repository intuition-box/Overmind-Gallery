'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

interface Web3WrapperProps {
  children: ReactNode
}

// Import Web3Provider dynamically to avoid SSR issues
const Web3Provider = dynamic(() => import("@/components/providers/Web3Provider").then(mod => ({ default: mod.Web3Provider })), {
  ssr: false,
  loading: () => <>{null}</>
})

export function Web3Wrapper({ children }: Web3WrapperProps) {
  return (
    <Web3Provider>
      {children}
    </Web3Provider>
  )
}