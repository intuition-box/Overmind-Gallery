'use client'

import { useAccountBalance } from '@/hooks/scaffold-eth/useAccountBalance'

interface BalanceProps {
  address?: string
  className?: string
}

/**
 * Display ETH balance for connected wallet
 */
export function Balance({ address, className = '' }: BalanceProps) {
  const { displayBalance, isLoading, isConnected } = useAccountBalance()

  if (!isConnected) return null

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