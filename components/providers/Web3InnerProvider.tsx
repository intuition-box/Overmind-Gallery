'use client'

import { ReactNode, useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

const overmindTheme = {
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

interface Web3InnerProviderProps {
  children: ReactNode
  config: any
}

export function Web3InnerProvider({ children, config }: Web3InnerProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR, provide a minimal WagmiProvider to prevent context errors
  if (!mounted) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    )
  }

  // After mounting, provide full RainbowKit functionality
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={overmindTheme}
          appInfo={{
            appName: 'The Overmind Gallery',
          }}
          locale="en-US"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}