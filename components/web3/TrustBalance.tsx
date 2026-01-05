'use client'

import { useTrustBalance } from '@/hooks/overmind/useTrustBalance'

interface TrustBalanceProps {
  address?: string
  className?: string
}

/**
 * Display $TRUST token balance for connected wallet
 * Used for GBM auctions and bidding
 */
export function TrustBalance({ address, className = '' }: TrustBalanceProps) {
  const { displayBalance, isLoading, isConnected, isTokenDeployed } = useTrustBalance()

  if (!isConnected) return null

  if (!isTokenDeployed) {
    return (
      <span className={`font-mono text-sm text-gray-400 ${className}`}>
        TRUST token not deployed
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-600 rounded w-16"></div>
      </div>
    )
  }

  return (
    <span className={`font-mono text-sm text-cyan-400 ${className}`}>
      {displayBalance}
    </span>
  )
}