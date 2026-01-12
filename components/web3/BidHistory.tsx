'use client'

import { useBidHistory, BidEntry } from '@/hooks/overmind/useBidHistory'
import { User, Clock, ExternalLink } from 'lucide-react'

interface BidHistoryProps {
  tokenId: number
  className?: string
}

/**
 * Display bid history for an NFT from GBM auctions
 * Shows all bids that occurred before current ownership
 */
export function BidHistory({ tokenId, className = '' }: BidHistoryProps) {
  const { bids, isLoading, error } = useBidHistory(tokenId)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: BidEntry['status']) => {
    switch (status) {
      case 'won':
        return '🏆'
      case 'outbid':
        return '🔄'
      case 'active':
        return '⏳'
      default:
        return '❓'
    }
  }

  const getStatusColor = (status: BidEntry['status']) => {
    switch (status) {
      case 'won':
        return 'text-green-500 dark:text-green-400'
      case 'outbid':
        return 'text-yellow-500 dark:text-yellow-400'
      case 'active':
        return 'text-blue-500 dark:text-blue-400'
      default:
        return 'text-gray-500 dark:text-gray-400'
    }
  }

  if (isLoading) {
    return (
      <div className={`bg-white/5 dark:bg-gray-800/20 rounded-xl p-5 border border-gray-200/20 dark:border-gray-700/20 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bid History</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center justify-between py-3 border-b border-gray-200/50 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-red-50/50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200/50 dark:border-red-700/30 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bid History</h3>
        <p className="text-red-600 dark:text-red-400 text-sm">Failed to load bid history: {error}</p>
      </div>
    )
  }

  if (bids.length === 0) {
    return (
      <div className={`bg-white/5 dark:bg-gray-800/20 rounded-xl p-5 border border-gray-200/20 dark:border-gray-700/20 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bid History</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">No bidding history available for this relic.</p>
      </div>
    )
  }

  return (
    <div className={`bg-white/5 dark:bg-gray-800/20 rounded-xl p-5 border border-gray-200/20 dark:border-gray-700/20 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bid History</h3>
      <div className="space-y-3">
        {bids.map((bid, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-200/50 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="text-sm">{getStatusIcon(bid.status)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white font-medium text-sm">{bid.bidderName}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">{formatDate(bid.timestamp)}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-500 text-xs">{formatAddress(bid.bidder)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 dark:text-white font-medium">{bid.amount} TRUST</div>
              <div className={`text-xs uppercase tracking-wide ${getStatusColor(bid.status)}`}>
                {bid.status}
              </div>
              <a
                href={`https://etherscan.io/tx/${bid.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mt-1"
              >
                <ExternalLink className="w-3 h-3" />
                View
              </a>
            </div>
          </div>
        ))}
      </div>

      {bids.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Showing {bids.length} bid{bids.length > 1 ? 's' : ''} from the auction history
          </div>
        </div>
      )}
    </div>
  )
}