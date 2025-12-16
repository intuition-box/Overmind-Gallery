"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  X, 
  Gavel, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Coins, 
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User
} from "lucide-react"

interface NFTModalProps {
  nft: any
  isOpen: boolean
  onClose: () => void
  countdown?: string
  onBid?: (amount: string) => void
  onBuy?: () => void
  onCalendar?: () => void
}

export function NFTModal({ 
  nft, 
  isOpen, 
  onClose, 
  countdown,
  onBid,
  onBuy,
  onCalendar 
}: NFTModalProps) {
  const [bidAmount, setBidAmount] = useState("")
  const [showMetadata, setShowMetadata] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  if (!isOpen || !nft) return null

  const isAuction = nft.status === "in-auction" || nft.currentBid
  const isComingSoon = nft.status === "coming-soon"

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleBidSubmit = () => {
    if (onBid && bidAmount) {
      onBid(bidAmount)
      setBidAmount("")
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[1400px] max-h-[90vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-gray-700 hover:border-cyan-500/50 transition-all group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-hidden">
          
          <div className="relative bg-gradient-to-br from-gray-800 to-black p-8 lg:p-12 flex items-center justify-center border-r border-gray-800">
            <div className="relative w-full max-w-[600px] aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img
                src={nft.image || "/placeholder.svg"}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {isAuction && countdown && (
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 font-semibold text-sm">{countdown}</span>
                  </div>
                </div>
              )}
              
              {isComingSoon && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <Badge className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-lg px-6 py-3">
                    Coming Soon
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="p-8 lg:p-12 space-y-6">
              
              <div className="space-y-3">
                <h1 className="font-playfair text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {nft.title}
                </h1>
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">by {nft.creator}</span>
                </div>
              </div>

              {nft.collection && (
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 px-3 py-1">
                  {nft.collection.replace(/-/g, ' ').toUpperCase()}
                </Badge>
              )}

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Description</h3>
                <p className="text-gray-300 leading-relaxed">{nft.description}</p>
              </div>

              {isAuction ? (
                <div className="space-y-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Current Bid</p>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-lg px-4 py-2 font-bold">
                        {nft.currentBid}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Min Next Bid</p>
                      <span className="text-violet-400 font-semibold text-lg">{nft.minNextBid}</span>
                    </div>
                  </div>
                  
                  {nft.totalBidders && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm">{nft.totalBidders} bidders participating</span>
                    </div>
                  )}

                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder={`Min: ${nft.minNextBid?.split(" ")[0] || "0"}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 bg-black/50 border-gray-700 focus:border-cyan-500 text-white"
                      />
                      <span className="flex items-center text-cyan-400 font-semibold">TRUST</span>
                    </div>
                    
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Coins className="w-4 h-4 text-violet-400" />
                        <span className="text-violet-400 font-semibold text-sm">Reward Guarantee</span>
                      </div>
                      <p className="text-gray-300 text-xs">
                        If outbid, receive {bidAmount ? `${(parseFloat(bidAmount) * 0.1).toFixed(2)} TRUST` : "10% of your bid"} as a divine reward
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Price</p>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-2xl px-6 py-3 font-bold">
                      {nft.price}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                {isAuction ? (
                  <>
                    <Button
                      onClick={handleBidSubmit}
                      disabled={!bidAmount || parseFloat(bidAmount) < parseFloat(nft.minNextBid?.split(" ")[0] || "0")}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white py-6 text-lg font-semibold shadow-lg shadow-cyan-500/20"
                    >
                      <Gavel className="w-5 h-5 mr-2" />
                      Place Bid
                    </Button>
                    {onCalendar && (
                      <Button
                        variant="outline"
                        onClick={onCalendar}
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 py-6 px-4"
                      >
                        <Calendar className="w-5 h-5" />
                      </Button>
                    )}
                  </>
                ) : isComingSoon ? (
                  <Button
                    disabled
                    className="flex-1 bg-gray-700/50 text-gray-400 py-6 text-lg font-semibold cursor-not-allowed"
                  >
                    Not Available Yet
                  </Button>
                ) : (
                  <Button
                    onClick={onBuy}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white py-6 text-lg font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    Buy Now
                  </Button>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-800">
                             
                {showMetadata && (
                  <div className="p-4 bg-gray-800/30 rounded-lg space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-3">
                      {nft.category && (
                        <div className="bg-black/50 rounded-lg p-3 border border-gray-700">
                          <p className="text-gray-400 text-xs mb-1">Category</p>
                          <p className="text-cyan-400 font-semibold capitalize">{nft.category}</p>
                        </div>
                      )}
                      {nft.status && (
                        <div className="bg-black/50 rounded-lg p-3 border border-gray-700">
                          <p className="text-gray-400 text-xs mb-1">Status</p>
                          <p className="text-cyan-400 font-semibold capitalize">{nft.status.replace(/-/g, ' ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isAuction && nft.bidHistory && (
                  <>
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <span className="font-semibold text-gray-300">Bid History ({nft.bidHistory.length})</span>
                      {showHistory ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {showHistory && (
                      <div className="p-4 bg-gray-800/30 rounded-lg space-y-2 max-h-64 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                        {nft.bidHistory.map((bid: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-gray-700"
                          >
                            <div>
                              <p className="text-gray-300 font-semibold text-sm">{bid.bidder}</p>
                              <p className="text-gray-500 text-xs">{bid.timestamp}</p>
                            </div>
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                              {bid.amount}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}