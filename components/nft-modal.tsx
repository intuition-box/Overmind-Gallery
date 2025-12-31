"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  X,
  Gavel,
  Calendar,
  Clock,
  TrendingUp,
  Coins,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react"
import { NFT3DViewer } from "@/components/nft-3d-viewer"

// Use only your real images from public folder
const bidderAvatars: Record<string, string> = {
"default": "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
}

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
  const [showHistory, setShowHistory] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

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

  const handleShare = () => {
    const shareUrl = window.location.href
    const shareText = `Check out ${nft.title} by ${nft.creator} on The Overmind Gallery`

    if (navigator.share) {
      navigator.share({
        title: nft.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        navigator.clipboard.writeText(shareUrl)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2000)
    }
  }

  const calculateReward = () => {
    if (!bidAmount || !nft.currentBid) return null

    const B_prev = parseFloat(nft.currentBid.split(" ")[0])
    const B_new = parseFloat(bidAmount)

    if (isNaN(B_prev) || isNaN(B_new) || B_new <= B_prev) return null

    const MAX_P = 0.10
    const r = (B_new - B_prev) / B_prev
    const p = Math.min(MAX_P * r, MAX_P)
    const R = p * B_new

    return R.toFixed(2)
  }

  const rewardAmount = calculateReward()

  const renderMedia = () => {
    const containerClasses = "relative w-full max-w-[530px] aspect-square rounded-xl overflow-hidden shadow-2xl mx-auto"
    
    switch (mediaType) {
      case "3d":
        return (
          <div className={containerClasses} key={nft.id}>
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

  const getBidderAvatar = (bidderName: string) => {
    return bidderAvatars[bidderName] || bidderAvatars["default"]
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full ${is3D || isVideo ? 'max-w-[1400px]' : 'max-w-[1200px]'} 
                      h-[95vh] max-h-[95vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 
                      rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 
                      overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300`}>
        
        {/* Clean Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Media Section */}
        <div className="relative flex-shrink-0 w-full lg:w-[58%] 
                        bg-gradient-to-br from-gray-800 to-black 
                        p-6 sm:p-8 flex items-center justify-center 
                        border-b lg:border-b-0 lg:border-r border-gray-800">
          {renderMedia()}
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
            
            {/* Title + Share on Same Line */}
            <div className="flex items-center justify-between">
              <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold 
                             bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 
                             bg-clip-text text-transparent">
                {nft.title}
              </h1>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                {shareSuccess && (
                  <span className="text-green-400 text-xs font-medium">Copied!</span>
                )}
              </div>
            </div>

            {/* Creator - Small PFP + "by" */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">by</span>
              <Link href={`/profile/${nft.creatorAddress}`} className="flex items-center gap-2 group">
                <img
                  src="/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png"
                  alt={nft.creator}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-cyan-500 transition-all"
                />
                <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                  {nft.creator}
                </span>
              </Link>
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
              <p className="text-gray-300 text-sm leading-relaxed">{nft.description || "No description available."}</p>
            </div>

            {/* Auction Info */}
            {isAuction ? (
              <div className="space-y-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 
                              border border-cyan-500/20 rounded-xl p-5">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="space-y-3 pt-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder={`Min: ${nft.minNextBid?.split(" ")[0] || "0"}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="flex-1 bg-black/50 border-gray-700 focus:border-cyan-500 text-white h-11"
                    />
                    <span className="flex items-center text-cyan-400 font-semibold px-3">TRUST</span>
                  </div>
                  
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Coins className="w-4 h-4 text-violet-400" />
                      <span className="text-violet-400 font-semibold text-xs">Reward Guarantee</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-tight">
                      If outbid, receive{" "}
                      {rewardAmount ? (
                        <span className="text-violet-300 font-bold">{rewardAmount} TRUST</span>
                      ) : (
                        "up to 10% of your bid"
                      )}{" "}
                      as a divine reward
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 
                              border border-cyan-500/20 rounded-xl p-5">
                <p className="text-gray-400 text-xs mb-2">Price</p>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-2xl px-6 py-3 font-bold">
                  {nft.price}
                </Badge>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              {isAuction ? (
                <>
                  <Button
                    onClick={handleBidSubmit}
                    disabled={!bidAmount || parseFloat(bidAmount) < parseFloat(nft.minNextBid?.split(" ")[0] || "0")}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 
                               hover:from-cyan-600 hover:to-violet-600 text-white 
                               py-5 text-lg font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    <Gavel className="w-5 h-5 mr-2" />
                    Place Bid
                  </Button>
                  {onCalendar && (
                    <Button
                      variant="outline"
                      onClick={onCalendar}
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 px-4"
                    >
                      <Calendar className="w-5 h-5" />
                    </Button>
                  )}
                </>
              ) : isComingSoon ? (
                <Button disabled className="flex-1 bg-gray-700/50 text-gray-400 py-5 text-lg cursor-not-allowed">
                  Not Available Yet
                </Button>
              ) : (
                <Button
                  onClick={onBuy}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 
                             hover:from-cyan-600 hover:to-violet-600 text-white 
                             py-5 text-lg font-semibold shadow-lg shadow-cyan-500/20"
                >
                  Buy Now
                </Button>
              )}
            </div>

            {/* Bid History with Real PFPs */}
            {isAuction && nft.bidHistory && nft.bidHistory.length > 0 && (
              <div className="space-y-3 pt-6 pb-12">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full flex items-center justify-between p-4 
                             bg-gray-800/50 hover:bg-gray-800 rounded-xl 
                             transition-all duration-200 border border-gray-700"
                >
                  <span className="font-semibold text-gray-200">
                    Bid History ({nft.bidHistory.length})
                  </span>
                  {showHistory ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {showHistory && (
                  <div className="bg-gray-800/30 rounded-xl p-4 space-y-3 
                                  animate-in slide-in-from-top-4 duration-300">
                    {nft.bidHistory.map((bid: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 
                                   bg-black/50 rounded-lg border border-gray-700"
                      >
                        <Link href={`/profile/${bid.bidderAddress}`} className="flex items-center space-x-3 group">
                          <img
                            src={getBidderAvatar(bid.bidder)}
                            alt={bid.bidder}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-cyan-500 transition-all"
                          />
                          <div>
                            <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                              {bid.bidder}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">{bid.timestamp}</p>
                          </div>
                        </Link>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
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
  )
}