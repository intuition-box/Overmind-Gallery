'use client'

import { ReactNode, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { QueryClient } from '@tanstack/react-query'
import { Theme } from '@rainbow-me/rainbowkit'

// Dynamically import Web3 components to avoid SSR issues
const WagmiProvider = dynamic(() => import('wagmi').then(mod => ({ default: mod.WagmiProvider })), { ssr: false })
const QueryClientProvider = dynamic(() => import('@tanstack/react-query').then(mod => ({ default: mod.QueryClientProvider })), { ssr: false })
const RainbowKitProvider = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => ({ default: mod.RainbowKitProvider })), { ssr: false })

// Create a custom dark theme that matches our mystical aesthetic
const overmindTheme: Theme = {
  blurs: {
    modalOverlay: 'small',
  },
  colors: {
    accentColor: '#22d3ee',
    accentColorForeground: 'white',
    actionButtonBorder: '#374151',
    actionButtonBorderMobile: '#374151',
    actionButtonSecondaryBackground: '#1f2937',
    closeButton: '#9ca3af',
    closeButtonBackground: '#374151',
    connectButtonBackground: '#22d3ee',
    connectButtonBackgroundError: '#dc2626',
    connectButtonInnerBackground: '#22d3ee',
    connectButtonText: 'white',
    connectButtonTextError: 'white',
    connectionIndicator: '#10b981',
    downloadBottomCardBackground: '#1f2937',
    downloadTopCardBackground: '#111827',
    error: '#dc2626',
    generalBorder: '#374151',
    generalBorderDim: '#4b5563',
    menuItemBackground: '#374151',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: '#000000',
    modalBorder: '#1f1f1f',
    modalText: '#ffffff',
    modalTextDim: '#9ca3af',
    modalTextSecondary: '#6b7280',
    profileAction: '#1f1f1f',
    profileActionHover: '#374151',
    profileForeground: '#ffffff',
    selectedOptionBorder: '#22d3ee',
    standby: '#8b5cf6',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  radii: {
    actionButton: '6px',
    connectButton: '6px',
    menuButton: '6px',
    modal: '12px',
    modalMobile: '12px',
  },
  shadows: {
    connectButton: '0 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0 2px 6px rgba(0, 0, 0, 0.1)',
    selectedOption: '0 0 0 1px #22d3ee',
    selectedWallet: '0 0 0 1px #22d3ee',
    walletLogo: '0 2px 16px rgba(0, 0, 0, 0.16)',
  },
}

const queryClient = new QueryClient()

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [config, setConfig] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const { config: wagmiConfig } = await import('@/lib/wagmi')
        setConfig(wagmiConfig)
      } catch (error) {
        console.error('Failed to load Web3 config:', error)
      }
    }

    loadConfig()
    setMounted(true)
  }, [])

  if (!mounted || !config) {
    return <>{children}</>
  }

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