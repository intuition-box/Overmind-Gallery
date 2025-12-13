import { http } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Define the chains we want to support
const chains = [mainnet, sepolia, hardhat] as const

export const config = getDefaultConfig({
  appName: 'The Overmind Gallery',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'default-project-id',
  chains,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
  ssr: true, // Enable SSR support to prevent WagmiProviderNotFoundError
})

export { chains }