// components/nft-modal.tsx
"use client"

import { useState, useEffect } from "react"
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
  User,
} from "lucide-react"
import { NFT3DViewer } from "@/components/nft-3d-viewer"

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

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  }

  return () => {
    document.body.style.overflow = ""
  }
}, [isOpen])

 if (!isOpen || !nft) return null

  const isAuction = nft.status === "in-auction" || nft.currentBid
  const isComingSoon = nft.status === "coming-soon"
  
  // ✅ Unified media type detection
  const mediaType = nft.mediaType || "2d"
  const is3D = mediaType === "3d" && nft.modelUrl
  const isVideo = mediaType === "video" && nft.videoUrl

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

  // ✅ Unified Media Renderer
  const renderMedia = () => {
    const containerClasses = "relative w-full max-w-[530px] aspect-square rounded-xl overflow-hidden shadow-2xl"
    
    switch (mediaType) {
      case "3d":
        return (
          <div className={containerClasses}>
            <NFT3DViewer modelUrl={nft.modelUrl} />
          </div>
        )
      
      case "video":
        return (
          <div className={containerClasses}>
            <video
              src={nft.videoUrl}
              poster={nft.image}
              controls
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-xl"
              style={{ backgroundColor: '#000' }}
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-xl" />
          </div>
        )
      
      case "2d":
      default:
        return (
          <div className={containerClasses}>
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
        )
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* Modal Container - Responsive max height */}
      <div className={`relative w-full ${(is3D || isVideo) ? 'max-w-[1400px]' : 'max-w-[1200px]'} max-h-[95vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in zoom-in-95 duration-300`}>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-gray-700 hover:border-cyan-500/50 transition-all group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </button>

        {/* Main Content Grid - Responsive height */}
        <div className={(is3D || isVideo)
          ? "grid grid-cols-1 lg:grid-cols-[58%_42%] max-h-[95vh]"
          : "grid grid-cols-1 lg:grid-cols-2 max-h-[95vh]"
        }>
          
          {/* LEFT SIDE - Media Container */}
          <div className="relative bg-gradient-to-br from-gray-800 to-black p-4 sm:p-6 lg:p-8 flex items-center justify-center border-r border-gray-800 overflow-hidden">
            {renderMedia()}
          </div>

          {/* RIGHT SIDE - Details Panel (Scrollable) */}
          <div className="flex flex-col max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 space-y-4">
              
              {/* Header */}
              <div className="space-y-2">
                <h1 className="font-playfair text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {nft.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">by {nft.creator}</span>
                </div>
              </div>

              {/* Collection Badge */}
              {nft.collection && (
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 px-3 py-1 text-xs">
                  {nft.collection.replace(/-/g, ' ').toUpperCase()}
                </Badge>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{nft.description}</p>
              </div>

              {/* Price/Auction Info */}
              {isAuction ? (
                <div className="space-y-3 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Current Bid</p>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-base px-3 py-1.5 font-bold">
                        {nft.currentBid}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Min Next Bid</p>
                      <span className="text-violet-400 font-semibold text-base">{nft.minNextBid}</span>
                    </div>
                  </div>
                  
                  {nft.totalBidders && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs">{nft.totalBidders} bidders participating</span>
                    </div>
                  )}

                  {/* Bid Input */}
                  <div className="space-y-2 pt-3 border-t border-gray-700">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder={`Min: ${nft.minNextBid?.split(" ")[0] || "0"}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 bg-black/50 border-gray-700 focus:border-cyan-500 text-white h-10"
                      />
                      <span className="flex items-center text-cyan-400 font-semibold text-sm">TRUST</span>
                    </div>
                    
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2.5">
                      <div className="flex items-center space-x-2 mb-1">
                        <Coins className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-violet-400 font-semibold text-xs">Reward Guarantee</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-tight">
                        If outbid, receive {bidAmount ? `${(parseFloat(bidAmount) * 0.1).toFixed(2)} TRUST` : "10% of your bid"} as a divine reward
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-2">Price</p>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xl px-5 py-2 font-bold">
                      {nft.price}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                {isAuction ? (
                  <>
                    <Button
                      onClick={handleBidSubmit}
                      disabled={!bidAmount || parseFloat(bidAmount) < parseFloat(nft.minNextBid?.split(" ")[0] || "0")}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white py-4 text-base font-semibold shadow-lg shadow-cyan-500/20"
                    >
                      <Gavel className="w-4 h-4 mr-2" />
                      Place Bid
                    </Button>
                    {onCalendar && (
                      <Button
                        variant="outline"
                        onClick={onCalendar}
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 py-4 px-3"
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                    )}
                  </>
                ) : isComingSoon ? (
                  <Button
                    disabled
                    className="flex-1 bg-gray-700/50 text-gray-400 py-4 text-base font-semibold cursor-not-allowed"
                  >
                    Not Available Yet
                  </Button>
                ) : (
                  <Button
                    onClick={onBuy}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white py-4 text-base font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    Buy Now
                  </Button>
                )}
              </div>

              {/* Bid History */}
              {isAuction && nft.bidHistory && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-gray-300 text-sm">Bid History ({nft.bidHistory.length})</span>
                    {showHistory ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  
                  {showHistory && (
                    <div className="p-3 bg-gray-800/30 rounded-lg space-y-2 max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                      {nft.bidHistory.map((bid: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2.5 bg-black/50 rounded-lg border border-gray-700"
                        >
                          <div>
                            <p className="text-gray-300 font-semibold text-xs">{bid.bidder}</p>
                            <p className="text-gray-500 text-xs">{bid.timestamp}</p>
                          </div>
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                            {bid.amount}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}