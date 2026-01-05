import { useState, useEffect } from 'react'

// Mock bid history data - replace with real contract data fetching
const mockBidHistory = {
  1: [
    {
      bidder: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      bidderName: "CryptoSage",
      amount: 2.5,
      timestamp: "2024-01-15T14:30:00Z",
      status: "outbid" as const,
      txHash: "0x123..."
    },
    {
      bidder: "0x1111111111111111111111111111111111111111",
      bidderName: "VoidWalker",
      amount: 3.2,
      timestamp: "2024-01-15T16:45:00Z",
      status: "outbid" as const,
      txHash: "0x456..."
    },
    {
      bidder: "0x2222222222222222222222222222222222222222",
      bidderName: "RuneMaster",
      amount: 4.1,
      timestamp: "2024-01-16T09:12:00Z",
      status: "won" as const,
      txHash: "0x789..."
    }
  ]
}

export interface BidEntry {
  bidder: string
  bidderName: string
  amount: number
  timestamp: string
  status: 'won' | 'outbid' | 'active'
  txHash: string
}

/**
 * Hook to fetch bid history for an NFT from GBM auctions
 * Shows all bids that occurred before current ownership
 */
export function useBidHistory(tokenId: number) {
  const [bids, setBids] = useState<BidEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        setIsLoading(true)

        // TODO: Replace with real contract data fetching
        // 1. Get auctionId from auctionMapping[contractAddress][tokenId][0]
        // 2. Query Auction_BidPlaced events for that auctionId
        // 3. Format and sort by timestamp

        const mockData = mockBidHistory[tokenId as keyof typeof mockBidHistory] || []

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        setBids(mockData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch bid history')
        console.error('Error fetching bid history:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (tokenId) {
      fetchBidHistory()
    }
  }, [tokenId])

  return {
    bids,
    isLoading,
    error,
    // Helper functions
    totalBids: bids.length,
    highestBid: bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0,
    winner: bids.find(b => b.status === 'won')
  }
}