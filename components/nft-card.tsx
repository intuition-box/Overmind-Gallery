// components/nft-card.tsx
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, Gavel, Star } from "lucide-react"

// NFT Type Badge Component (unchanged)
function NFTTypeBadge({ mediaType }: { mediaType: "2d" | "3d" | "video" | undefined }) {
  const getBadgeConfig = () => {
    switch (mediaType) {
      case "3d":
        return {
          text: "3D",
          icon: "🎮",
          gradient: "from-cyan-500 to-violet-500",
          border: "border-cyan-400/50"
        }
      case "video":
        return {
          text: "VIDEO",
          icon: "▶",
          gradient: "from-pink-500 to-orange-500",
          border: "border-pink-400/50"
        }
      case "2d":
      default:
        return {
          text: "2D",
          icon: "🖼️",
          gradient: "from-blue-500 to-black",
          border: "border-blue-400/50"
        }
    }
  }
  const config = getBadgeConfig()
  return (
    <div className={`inline-flex items-center space-x-1 bg-gradient-to-r ${config.gradient} rounded px-2 py-0.5 border ${config.border} shadow-sm`}>
      <span className="text-xs">{config.icon}</span>
      <span className="text-white font-bold text-[10px] tracking-wide">{config.text}</span>
    </div>
  )
}

interface NFTCardProps {
  nft: {
    id: number
    title: string
    creator?: string
    image: string
    price?: string
    currentBid?: string
    minNextBid?: string
    status: "in-auction" | "fixed" | "coming-soon"
    mediaType?: "2d" | "3d" | "video"
    timeRemaining?: string
    totalBidders?: number
    createdAt?: Date
  }
  onClick: () => void
  countdown?: string
  comingSoonCountdown?: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  forceAuctionButton?: boolean
  showAuctionBadge?: boolean
}

export function NFTCard({ nft, onClick, countdown, comingSoonCountdown, forceAuctionButton = false, showAuctionBadge = true }: NFTCardProps) {
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false)
  const [showFavoriteToast, setShowFavoriteToast] = useState(false)
  const isAuction = nft.status === "in-auction"
  const isComingSoon = nft.status === "coming-soon"

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Show toast notification
    setShowFavoriteToast(true)
    setTimeout(() => setShowFavoriteToast(false), 2000)
  }

  return (
    <>
      <Card
        className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow-violet relative rounded-2xl shadow-xl"
        onClick={onClick}
      >
        {/* Coming Soon Overlay (unchanged) */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Badge className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-lg px-6 py-3 mb-4 bg-gray-900 text-sky-300">
                Coming Soon
              </Badge>
              {comingSoonCountdown && (
                <div className="bg-background/50 rounded-lg p-3 border border-primary/30">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-primary font-semibold text-sm">Launches In:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="bg-background/50 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.days}</div>
                      <div className="text-xs text-muted-foreground">D</div>
                    </div>
                    <div className="bg-background/50 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.hours}</div>
                      <div className="text-xs text-muted-foreground">H</div>
                    </div>
                    <div className="bg-background/50 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.minutes}</div>
                      <div className="text-xs text-muted-foreground">M</div>
                    </div>
                    <div className="bg-background/50 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.seconds}</div>
                      <div className="text-xs text-muted-foreground">S</div>
                    </div>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  const startDate = new Date()
                  startDate.setDate(startDate.getDate() + 7)
                  startDate.setHours(0, 0, 0, 0)
                  const endDate = new Date(startDate)
                  endDate.setHours(1, 0, 0, 0)
                  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
                  const title = encodeURIComponent(`${nft.title} - Coming Soon`)
                  const details = encodeURIComponent(`${nft.title} by ${nft.creator} launches soon!`)
                  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}`
                  window.open(calendarUrl, "_blank")
                }}
                className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
              <p className="text-gray-400 text-xs">This artifact will be available soon</p>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden rounded-t-2xl">
          <img
            src={nft.image}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button - Top Right Corner */}
          <button
            onClick={handleFavoriteClick}
            onMouseEnter={() => setIsFavoriteHovered(true)}
            onMouseLeave={() => setIsFavoriteHovered(false)}
            className="absolute top-3 right-3 p-2 bg-black/70 backdrop-blur-sm rounded-full border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/90 hover:border-cyan-400/50 hover:scale-110 z-20"
          >
            <Star
              className={`w-4 h-4 transition-all duration-300 ${
                isFavoriteHovered
                  ? "text-cyan-400 fill-cyan-400"
                  : "text-gray-300"
              }`}
            />
          </button>

          {/* Compact Auction Badges: Smaller, slimmer, same cyan theme */}
          {isAuction && showAuctionBadge && (
            <div className="absolute top-3 left-3 right-16 flex justify-between pointer-events-none">
              {/* Bidders Badge */}
              {nft.totalBidders !== undefined && (
                <div className="bg-black/70 backdrop-blur-sm rounded-md px-2.5 py-1 border border-cyan-400/30 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-400 font-medium text-xs">{nft.totalBidders} bidders</span>
                  </div>
                </div>
              )}

              {/* Timer Badge */}
              {countdown && (
                <div className="bg-black/70 backdrop-blur-sm rounded-md px-2.5 py-1 border border-cyan-400/30 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-400 font-medium text-xs">{countdown}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-playfair text-xl font-bold text-card-foreground group-hover:text-primary transition-colors flex-1">
                {nft.title}
              </h3>
              <NFTTypeBadge mediaType={nft.mediaType} />
            </div>
            {nft.creator && (
              <p className="text-muted-foreground text-sm">by {nft.creator}</p>
            )}
          </div>

          {/* Pricing Section */}
          {isAuction || forceAuctionButton ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Current Bid</span>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {nft.currentBid}
                </Badge>
              </div>
              {nft.minNextBid && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Min Next Bid</span>
                  <span className="text-primary font-semibold">{nft.minNextBid}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Price</span>
              <Badge className="bg-primary/20 text-primary border-primary/30 font-bold">
                {nft.price}
              </Badge>
            </div>
          )}

          {/* Action Button */}
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white py-4 text-base font-semibold transition-all duration-300 hover:rune-glow">
            {isAuction || forceAuctionButton ? (
              <>
                <Gavel className="w-5 h-5 mr-2" />
                Place Bid
              </>
            ) : (
              "Acquire"
            )}
          </Button>
        </div>
      </Card>

      {/* Toast Notification */}
      {showFavoriteToast && (
        <div className="fixed top-20 right-4 z-50 bg-black/90 backdrop-blur-md border border-cyan-400/50 rounded-lg px-4 py-3 shadow-2xl shadow-cyan-500/20 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span className="text-white text-sm font-medium">Added to Favorites</span>
          </div>
        </div>
      )}
    </>
  )
}