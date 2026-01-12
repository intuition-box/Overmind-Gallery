// components/nft-card.tsx
import { useState, memo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, Gavel, Star } from "lucide-react"
import { useFavoritesContext } from "@/contexts/FavoritesContext"

// NFT Type Badge Component – now fully theme-aware
function NFTTypeBadge({ mediaType }: { mediaType: "2d" | "3d" | "video" | undefined }) {
  const getBadgeConfig = () => {
    switch (mediaType) {
      case "3d":
        return {
          text: "3D",
          icon: "🎮",
          class: "bg-primary/20 border-primary/40 text-primary",
        }
      case "video":
        return {
          text: "VIDEO",
          icon: "▶",
          class: "bg-secondary/20 border-secondary/40 text-secondary",
        }
      case "2d":
      default:
        return {
          text: "2D",
          icon: "🖼️",
          class: "bg-accent/20 border-accent/40 text-accent-foreground",
        }
    }
  }
  const config = getBadgeConfig()
  return (
    <div className={`inline-flex items-center space-x-1 ${config.class} rounded px-2 py-0.5 border shadow-sm`}>
      <span className="text-xs">{config.icon}</span>
      <span className="font-bold text-[10px] tracking-wide">{config.text}</span>
    </div>
  )
}

interface NFTCardProps {
  nft: {
    id: string | number
    name?: string
    title?: string
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
    collectionSlug?: string
    collectionName?: string
    collection?: string
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

export const NFTCard = memo(function NFTCard({
  nft,
  onClick,
  countdown,
  comingSoonCountdown,
  forceAuctionButton = false,
  showAuctionBadge = true
}: NFTCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const nftId = String(nft.id)
  const isNftFavorite = isFavorite(nftId)
  const isAuction = nft.status === "in-auction"
  const isComingSoon = nft.status === "coming-soon"

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const favoriteItem = {
      id: nftId,
      type: 'nft' as const,
      name: nft.name || nft.title || 'Unknown NFT',
      image: nft.image,
      collection: nft.collectionSlug || nft.collection || nft.collectionName || 'unknown'
    }

    if (isNftFavorite) {
      removeFavorite(nftId)
      setToastMessage("Artifact removed from Favorites")
    } else {
      addFavorite(favoriteItem)
      setToastMessage("Artifact added to Favorites")
    }

    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <>
      <Card
        className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow-violet relative rounded-2xl shadow-xl flex flex-col h-full"
        onClick={onClick}
      >
        {/* Coming Soon Overlay – fully theme-aware */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/20 border-primary/40 text-primary text-lg px-6 py-3 mb-4">
                Coming Soon
              </Badge>
              {comingSoonCountdown && (
                <div className="bg-card/80 rounded-lg p-3 border border-primary/30">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-primary font-semibold text-sm">Launches In:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="bg-background/70 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.days}</div>
                      <div className="text-xs text-muted-foreground">D</div>
                    </div>
                    <div className="bg-background/70 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.hours}</div>
                      <div className="text-xs text-muted-foreground">H</div>
                    </div>
                    <div className="bg-background/70 rounded p-1">
                      <div className="text-sm font-bold text-primary">{comingSoonCountdown.minutes}</div>
                      <div className="text-xs text-muted-foreground">M</div>
                    </div>
                    <div className="bg-background/70 rounded p-1">
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
              <p className="text-muted-foreground text-xs">This artifact will be available soon</p>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden rounded-t-2xl flex-shrink-0">
          <img
            src={nft.image}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-background/70 backdrop-blur-sm rounded-full border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/90 hover:border-primary/50 hover:scale-110 z-20"
          >
            <Star
              className={`w-4 h-4 transition-all duration-300 ${
                isNftFavorite
                  ? "text-primary fill-primary"
                  : "text-muted-foreground"
              }`}
            />
          </button>

          {/* Auction Badges – theme-aware */}
          {isAuction && showAuctionBadge && (
            <div className="absolute top-3 left-3 right-16 flex justify-between pointer-events-none">
              {nft.totalBidders !== undefined && (
                <div className="bg-background/70 backdrop-blur-sm rounded-md px-2.5 py-1 border border-primary/30 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-medium text-xs">{nft.totalBidders} bidders</span>
                  </div>
                </div>
              )}
              {countdown && (
                <div className="bg-background/70 backdrop-blur-sm rounded-md px-2.5 py-1 border border-primary/30 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-medium text-xs">{countdown}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col justify-between flex-1 min-h-0">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-playfair text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {nft.title}
                </h3>
                <NFTTypeBadge mediaType={nft.mediaType} />
              </div>
              {nft.creator && (
                <p className="text-muted-foreground text-sm line-clamp-1">by {nft.creator}</p>
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
          </div>

          {/* Action Button */}
          <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground py-4 text-base font-semibold transition-all duration-300 hover:rune-glow">
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

      {/* Theme-aware Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-card/90 backdrop-blur-md border border-primary/30 rounded-lg px-6 py-4 shadow-2xl shadow-primary/20 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-foreground text-base font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  )
})