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
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import { NFT3DViewer } from "@/components/nft-3d-viewer"

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
  const [bidSuccess, setBidSuccess] = useState(false)
  const [bidSuccessAmount, setBidSuccessAmount] = useState("")

  useEffect(() => {
    if (isOpen) {
      setBidSuccess(false)
      setBidSuccessAmount("")
      setBidAmount("")
      setShowHistory(false)
      setShareSuccess(false)
      document.body.style.overflow = "hidden"
    } else {
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
    if (bidSuccess) return
    if (e.target === e.currentTarget) onClose()
  }

  const handleBidSubmit = () => {
    const minNextValue = parseFloat(nft.minNextBid?.split(" ")[0] || "0")
    const bidValue = parseFloat(bidAmount)

    if (bidAmount && bidValue >= minNextValue) {
      setBidSuccessAmount(bidAmount)
      setBidAmount("")
      setBidSuccess(true)
      onBid?.(bidAmount)
    }
  }

  const handleShare = () => {
    const shareUrl = window.location.href
    const shareText = `Check out ${nft.title} by ${nft.creator} on The Overmind Gallery`

    if (navigator.share) {
      navigator.share({ title: nft.title, text: shareText, url: shareUrl }).catch(() => {
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

  const formatAddress = (address: string) => {
    if (!address) return "Unknown"
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getBidderAvatar = (bidderName: string) => {
    return bidderAvatars[bidderName] || bidderAvatars["default"]
  }

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
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none rounded-xl" />
          </div>
        )
      default:
        return (
          <div className={containerClasses}>
            <img
              src={nft.image || "/placeholder.svg"}
              alt={nft.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />

            {isAuction && countdown && (
              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary/30">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-primary font-semibold text-sm">{countdown}</span>
                </div>
              </div>
            )}
            
            {isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                <Badge className="bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 text-lg px-6 py-3">
                  Coming Soon
                </Badge>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className={`relative w-full ${is3D || isVideo ? 'max-w-[1400px]' : 'max-w-[1200px]'} 
                        h-[95vh] max-h-[95vh] bg-card/95 backdrop-blur-xl
                        rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 
                        overflow-hidden flex flex-col lg:flex-row`}>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative flex-shrink-0 w-full lg:w-[58%] bg-card/50 backdrop-blur-sm p-6 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
            {renderMedia()}
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  {nft.title}
                </h1>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  {shareSuccess && <span className="text-green-400 text-xs font-medium">Copied!</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm">by</span>
                <Link href={`/profile/${nft.creatorAddress}`} className="flex items-center gap-2 group">
                  <img src="/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png" alt={nft.creator} className="w-8 h-8 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-all" />
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">{nft.creator}</span>
                </Link>
              </div>

              {nft.collection && (
                <Badge variant="outline" className="border-primary/30 text-primary px-3 py-1 text-xs">
                  {nft.collection.replace(/-/g, ' ').toUpperCase()}
                </Badge>
              )}

              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{nft.description || "No description available."}</p>
              </div>

              {isAuction ? (
                <div className="space-y-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Current Bid</p>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-base px-3 py-1.5 font-bold">
                        {nft.currentBid}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Min Next Bid</p>
                      <span className="text-secondary font-semibold text-base">{nft.minNextBid}</span>
                    </div>
                  </div>
                  
                  {nft.totalBidders && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-xs">{nft.totalBidders} bidders participating</span>
                    </div>
                  )}

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder={`Min: ${nft.minNextBid?.split(" ")[0] || "0"}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 bg-card/50 border-border focus:border-primary text-foreground h-11"
                      />
                      <span className="flex items-center text-primary font-semibold px-3">TRUST</span>
                    </div>
                    
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Coins className="w-4 h-4 text-secondary" />
                        <span className="text-secondary font-semibold text-xs">Reward Guarantee</span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-tight">
                        If outbid, receive{" "}
                        {rewardAmount ? (
                          <span className="text-secondary font-bold">{rewardAmount} TRUST</span>
                        ) : (
                          "up to 10% of your bid"
                        )}{" "}
                        as a divine reward
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-5">
                  <p className="text-muted-foreground text-xs mb-2">Price</p>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-2xl px-6 py-3 font-bold">
                    {nft.price}
                  </Badge>
                </div>
              )}

              <div className="flex space-x-3 pt-2">
                {isAuction ? (
                  <>
                    <Button
                      onClick={handleBidSubmit}
                      disabled={!bidAmount || parseFloat(bidAmount) < parseFloat(nft.minNextBid?.split(" ")[0] || "0")}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-5 text-lg font-semibold shadow-lg shadow-primary/20"
                    >
                      <Gavel className="w-5 h-5 mr-2" />
                      Place Bid
                    </Button>
                    {onCalendar && (
                      <Button variant="outline" onClick={onCalendar} className="border-primary/30 text-primary hover:bg-primary/10 px-4">
                        <Calendar className="w-5 h-5" />
                      </Button>
                    )}
                  </>
                ) : isComingSoon ? (
                  <Button disabled className="flex-1 bg-muted/50 text-muted-foreground py-5 text-lg cursor-not-allowed">
                    Not Available Yet
                  </Button>
                ) : (
                  <Button onClick={onBuy} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-5 text-lg font-semibold shadow-lg shadow-primary/20">
                    Buy Now
                  </Button>
                )}
              </div>

              {/* Updated Bid History with Avatars + Etherscan Address Link */}
              {isAuction && nft.bidHistory && nft.bidHistory.length > 0 && (
                <div className="space-y-3 pt-6">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full flex items-center justify-between p-4 bg-card/50 hover:bg-card/70 rounded-xl transition-all duration-200 border border-border"
                  >
                    <span className="font-semibold text-foreground">Bid History ({nft.bidHistory.length})</span>
                    {showHistory ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>

                  {showHistory && (
                    <div className="space-y-3">
                      {nft.bidHistory.map((bid: any, index: number) => {
                        const bidderAddress = bid.bidderAddress || bid.bidder || ""
                        const displayName = bid.bidderName || bid.bidder || "Anonymous"

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border/50"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={getBidderAvatar(displayName)}
                                alt={displayName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                              />
                              <div className="flex flex-col">
                                <Link
                                  href={`/profile/${bidderAddress}`}
                                  className="font-medium text-foreground hover:text-primary transition-colors"
                                >
                                  {displayName}
                                </Link>
                                <span className="text-muted-foreground text-xs">
                                  {formatAddress(bidderAddress)}
                                </span>
                                <span className="text-muted-foreground text-xs mt-1">
                                  {bid.timestamp}
                                </span>
                              </div>
                            </div>

                            <div className="text-right space-y-2">
                              <div className="font-semibold text-foreground">
                                {bid.amount}
                              </div>
                              {bidderAddress && (
                                <a
                                  href={`https://etherscan.io/address/${bidderAddress}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-primary/70 hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BID SUCCESS POPUP */}
      {bidSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/60 backdrop-blur-md">
          <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20 p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-400">
            <button
              onClick={() => setBidSuccess(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-5">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Bid Successful!
                </h2>
                <p className="text-muted-foreground mt-3 text-lg">
                  Your bid of <span className="font-bold text-primary">{bidSuccessAmount} TRUST</span> has been successfully placed.
                </p>
              </div>

              <Button
                onClick={() => setBidSuccess(false)}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}