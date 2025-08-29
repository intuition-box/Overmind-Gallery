'use client'

import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/wagmi'

// Create a custom dark theme that matches our mystical aesthetic
const overmindTheme: Theme = {
  ...darkTheme({
    accentColor: '#22d3ee', // cyan-400
    accentColorForeground: 'white',
    borderRadius: 'medium',
    fontStack: 'system',
    overlayBlur: 'small',
  }),
  colors: {
    ...darkTheme().colors,
    modalBackground: '#000000',
    modalBorder: '#1f1f1f',
    modalText: '#ffffff',
    modalTextDim: '#9ca3af',
    modalTextSecondary: '#6b7280',
    profileAction: '#1f1f1f',
    profileActionHover: '#374151',
    profileForeground: '#ffffff',
    selectedOptionBorder: '#22d3ee',
    standby: '#8b5cf6', // violet-500
  },
}

const queryClient = new QueryClient()

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={overmindTheme}
          appInfo={{
            appName: 'The Overmind Gallery',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}