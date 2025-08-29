'use client'

import { useChainId, useChains } from 'wagmi'
import { Badge } from '@/components/ui/badge'
import { useDeployedContracts } from '@/hooks/overmind/useDeployedContracts'

/**
 * Display current network information
 */
export function NetworkInfo() {
  const chainId = useChainId()
  const chains = useChains()
  const { isLocalNetwork, isTestnet, isMainnet } = useDeployedContracts()
  
  const currentChain = chains.find(chain => chain.id === chainId)
  
  if (!currentChain) return null

  const getNetworkBadgeColor = () => {
    if (isMainnet) return "bg-green-500/20 text-green-300 border-green-500/30"
    if (isTestnet) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    if (isLocalNetwork) return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    return "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }

  const getNetworkLabel = () => {
    if (isLocalNetwork) return "🏠 Local"
    if (isTestnet) return "🧪 Testnet"
    if (isMainnet) return "⚡ Mainnet"
    return "❓ Unknown"
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className={getNetworkBadgeColor()}>
        {getNetworkLabel()}
      </Badge>
      <span className="text-xs text-muted-foreground">
        {currentChain.name}
      </span>
    </div>
  )
}