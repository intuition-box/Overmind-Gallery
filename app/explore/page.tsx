"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { NFTModal } from "@/components/nft-modal"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Gavel, Timer, Coins, ShoppingBagIcon, TrendingUp } from "lucide-react"
import NFTFilterBar, { type FilterOptions } from "@/components/nft-filter-bar"
import SiteHeader from "@/components/site-header"

// NFT Type Badge Component
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

// Mock NFT data with mediaType
const nftRelics = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "DigitalMystic",
    price: "2.5 TRUST",
    priceValue: 2.5,
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    description: "An ancient digital grimoire containing forbidden knowledge of the blockchain realm.",
    collection: "coming-soon",
    category: "art",
    status: "coming-soon",
    createdAt: new Date("2024-01-15"),
    mediaType: "2d" as const,
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "RuneForger",
    price: "3.2 TRUST",
    priceValue: 3.2,
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    description: "A powerful sigil that channels the energy of the digital cosmos.",
    collection: "coming-soon",
    category: "gaming",
    status: "coming-soon",
    createdAt: new Date("2024-01-10"),
    mediaType: "2d" as const,
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "VoidCrafter",
    price: "4.1 TRUST",
    priceValue: 4.1,
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    description: "A crystalline artifact that holds the essence of shadow magic.",
    collection: "coming-soon",
    category: "art",
    status: "coming-soon",
    createdAt: new Date("2024-01-25"),
    mediaType: "2d" as const,
  },
  {
    id: 5,
    title: "Cyber Oracle Mask",
    creator: "TechnoMage",
    price: "2.9 TRUST",
    priceValue: 2.9,
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    description: "An ancient mask that grants visions of future blockchain events.",
    collection: "coming-soon",
    category: "photography",
    status: "coming-soon",
    createdAt: new Date("2024-01-12"),
    mediaType: "2d" as const,
  },
  {
    id: 6,
    title: "Digital Phoenix Feather",
    creator: "ElementalForge",
    price: "1.6 TRUST",
    priceValue: 1.6,
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    description: "A feather from the legendary digital phoenix, symbol of rebirth.",
    collection: "coming-soon",
    category: "music",
    status: "coming-soon",
    createdAt: new Date("2024-01-08"),
    mediaType: "2d" as const,
  },
  {
    id: 7,
    title: "Quantum Rune Stone",
    creator: "ArcaneBuilder",
    price: "5.3 TRUST",
    priceValue: 5.3,
    image: "/quantum-rune-stone-glowing-violet-ancient-mystical.png",
    description: "A stone inscribed with quantum runes that bend reality itself.",
    collection: "coming-soon",
    category: "gaming",
    status: "coming-soon",
    createdAt: new Date("2024-01-30"),
    mediaType: "2d" as const,
  },
  {
    id: 8,
    title: "Spectral Blade of Code",
    creator: "GhostHacker",
    price: "3.7 TRUST",
    priceValue: 3.7,
    image: "/spectral-blade-sword-glowing-code-mystical-weapon.png",
    description: "A blade forged from pure code, capable of cutting through any firewall.",
    collection: "coming-soon",
    category: "gaming",
    status: "coming-soon",
    createdAt: new Date("2024-01-18"),
    mediaType: "2d" as const,
  },
]

const auctionRelics = [
  {
    id: 1,
    title: "Phantom Wanderer",
    creator: "Wolfgang",
    currentBid: "2.5 TRUST",
    currentBidValue: 2.5,
    minNextBid: "2.8 TRUST",
    timeRemaining: "2h 34m",
    timeRemainingMs: 2 * 60 * 60 * 1000 + 34 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral wanderer that drifts through the void, seeking lost souls in the digital realm.",
    bidHistory: [
      { bidder: "CryptoSage", amount: "1.2 TRUST", timestamp: "3h ago" },
      { bidder: "VoidWalker", amount: "1.8 TRUST", timestamp: "2h ago" },
      { bidder: "RuneMaster", amount: "2.5 TRUST", timestamp: "45m ago" },
    ],
    totalBidders: 12,
    collection: "void-walkers",
    status: "in-auction",
    is3D: true,
    modelUrl: "/mockup.glb",
    mediaType: "3d" as const,
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "Wolfgang",
    currentBid: "4.2 TRUST",
    currentBidValue: 4.2,
    minNextBid: "4.6 TRUST",
    timeRemaining: "1h 12m",
    timeRemainingMs: 1 * 60 * 60 * 1000 + 12 * 60 * 1000,
    image: "/tog.jpg",
    videoUrl: "/mockup.mp4",
    description: "A spectral guardian that traverses between digital dimensions.",
    bidHistory: [
      { bidder: "ShadowCaster", amount: "2.1 TRUST", timestamp: "4h ago" },
      { bidder: "MysticOracle", amount: "3.5 TRUST", timestamp: "2h ago" },
      { bidder: "DigitalPhoenix", amount: "4.2 TRUST", timestamp: "23m ago" },
    ],
    totalBidders: 18,
    collection: "void-walkers",
    status: "in-auction",
    mediaType: "video" as const,
  },
  // Remaining auction items default to 2D
  {
    id: 3,
    title: "Shadow Drifter",
    creator: "Wolfgang",
    currentBid: "6.8 TRUST",
    currentBidValue: 6.8,
    minNextBid: "7.5 TRUST",
    timeRemaining: "4h 56m",
    timeRemainingMs: 4 * 60 * 60 * 1000 + 56 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A shadowy entity that drifts between realms, collecting whispers from the void.",
    bidHistory: [
      { bidder: "CosmicWeaver", amount: "3.2 TRUST", timestamp: "6h ago" },
      { bidder: "EtherMage", amount: "5.1 TRUST", timestamp: "3h ago" },
      { bidder: "QuantumSeer", amount: "6.8 TRUST", timestamp: "1h ago" },
    ],
    totalBidders: 24,
    collection: "void-walkers",
    mediaType: "2d" as const,
  },
  {
    id: 4,
    title: "Shadow Oracle",
    creator: "Wolfgang",
    currentBid: "7.8 TRUST",
    currentBidValue: 6.8,
    minNextBid: "8.5 TRUST",
    timeRemaining: "4h 56m",
    timeRemainingMs: 4 * 60 * 60 * 1000 + 56 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A shadowy entity that drifts between realms, collecting whispers from the void.",
    bidHistory: [
      { bidder: "CosmicWeaver", amount: "3.2 TRUST", timestamp: "6h ago" },
      { bidder: "EtherMage", amount: "5.1 TRUST", timestamp: "3h ago" },
      { bidder: "QuantumSeer", amount: "7.8 TRUST", timestamp: "1h ago" },
    ],
    totalBidders: 22,
    collection: "void-walkers",
    mediaType: "2d" as const,
  },
  // ... continue adding mediaType: "2d" to others as needed later
]

export default function ExplorePage() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "date-newest",
    category: "all",
    status: "all",
  })
  const [voidWalkerCountdown, setVoidWalkerCountdown] = useState("")
  const [comingSoonCountdowns, setComingSoonCountdowns] = useState<
    Record<number, { days: number; hours: number; minutes: number; seconds: number }>
  >({})

  const handleNFTClick = (nft: any) => {
    setSelectedNFT(nft)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedNFT(null), 300)
  }

  const handleNFTBid = (amount: string) => {
    console.log(`Placing bid of ${amount} TRUST on ${selectedNFT?.title}`)
    handleCloseModal()
  }

  const handleBuy = () => {
    console.log(`Purchasing ${selectedNFT?.title}`)
    handleCloseModal()
  }

  useEffect(() => {
    const endTime = new Date()
    endTime.setDate(endTime.getDate() + 3)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setVoidWalkerCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setVoidWalkerCountdown("Ended")
      }
    }, 1000)

    const comingSoonTargetDate = new Date()
    comingSoonTargetDate.setDate(comingSoonTargetDate.getDate() + 7)
    comingSoonTargetDate.setHours(0, 0, 0, 0)

    const updateComingSoonCountdown = () => {
      const now = new Date().getTime()
      const distance = comingSoonTargetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setComingSoonCountdowns({
          1: { days, hours, minutes, seconds },
          2: { days, hours, minutes, seconds },
          3: { days, hours, minutes, seconds },
          4: { days, hours, minutes, seconds },
          5: { days, hours, minutes, seconds },
          6: { days, hours, minutes, seconds },
          7: { days, hours, minutes, seconds },
          8: { days, hours, minutes, seconds },
        })
      }
    }

    updateComingSoonCountdown()
    const comingSoonInterval = setInterval(updateComingSoonCountdown, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(comingSoonInterval)
    }
  }, [])

  const getFilteredAndSortedRelics = () => {
    const filtered = nftRelics.filter((relic) => {
      const matchesSearch =
        relic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        relic.creator.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filters.category === "all" || relic.category === filters.category
      const matchesStatus = filters.status === "all" || relic.status === filters.status
      return matchesSearch && matchesCategory && matchesStatus
    })

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "date-newest":
          return b.createdAt.getTime() - a.createdAt.getTime()
        case "date-oldest":
          return a.createdAt.getTime() - b.createdAt.getTime()
        case "price-low":
          return a.priceValue - b.priceValue
        case "price-high":
          return b.priceValue - a.priceValue
        default:
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

    return filtered
  }

  const getFilteredAuctionRelics = () => {
    const filtered = auctionRelics.filter((relic) => {
      const matchesCategory = filters.category === "all" || relic.collection.includes(filters.category)
      const matchesStatus = filters.status === "all" || filters.status === "in-auction"
      return matchesCategory && matchesStatus
    })

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.currentBidValue - b.currentBidValue
        case "price-high":
          return b.currentBidValue - a.currentBidValue
        default:
          return 0
      }
    })

    return filtered
  }

  const filteredRelics = getFilteredAndSortedRelics()
  const filteredAuctions = getFilteredAuctionRelics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-primary/20 animate-pulse">
          <Gavel className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-secondary/20 animate-pulse delay-1000">
          <Timer className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-primary/10 animate-pulse delay-2000">
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-secondary/15 animate-pulse delay-3000">
          <TrendingUp className="w-full h-full" />
        </div>
      </div>

      <SiteHeader />

      <header className="text-center my-0 py-[57px]">
        <div className="container mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBagIcon className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6 md:text-6xl">
            Explore Sacred Artifacts
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-2 font-mono">
            Discover the complete collection of digital artifacts, each one a testament to the power of The Overmind.
          </p>
        </div>
      </header>

      <div className="sticky top-0 z-40 bg-black/30 backdrop-blur-md border-b border-border shadow-lg pt-3">
        <NFTFilterBar onFiltersChange={setFilters} totalCount={filteredRelics.length + filteredAuctions.length} />
      </div>

      {/* Active Auctions Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAuctions.map((relic) => (
            <Card
              key={relic.id}
              className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow-violet relative"
              onClick={() => handleNFTClick(relic)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={relic.image || "/placeholder.svg"}
                  alt={relic.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Timer */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-secondary/30">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-secondary font-semibold text-sm">{voidWalkerCountdown}</span>
                  </div>
                </div>

                {/* Bidders */}
                <div className="absolute top-4 left-4.5 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-primary/30">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-primary font-semibold text-sm">{relic.totalBidders} bidders</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair text-lg font-bold text-card-foreground group-hover:text-secondary transition-colors flex-1">
                      {relic.title}
                    </h3>
                    <NFTTypeBadge mediaType={relic.mediaType} />
                  </div>
                  <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Current Bid</span>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border border-secondary/30 font-bold">
                      {relic.currentBid}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Min Next Bid</span>
                    <span className="text-primary font-semibold">{relic.minNextBid}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 text-white py-6 text-lg font-semibold transition-all duration-300 hover:rune-glow-violet"
                >
                  <Gavel className="w-5 h-5 mr-2" />
                  Place Bid
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Regular NFT Grid */}
      <main className="container px-6 py-12 my-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRelics.map((relic) => (
            <Card
              key={relic.id}
              className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow relative"
              onClick={() => handleNFTClick(relic)}
            >
              {relic.collection !== "void-walkers" && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Badge className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-lg px-6 py-3 mb-4 bg-gray-900 text-sky-300">
                      Coming Soon
                    </Badge>
                    {comingSoonCountdowns[relic.id] && (
                      <div className="bg-background/50 rounded-lg p-3 border border-primary/30">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-primary font-semibold text-sm">Launches In:</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-center">
                          <div className="bg-background/50 rounded p-1">
                            <div className="text-sm font-bold text-primary">{comingSoonCountdowns[relic.id].days}</div>
                            <div className="text-xs text-muted-foreground">D</div>
                          </div>
                          <div className="bg-background/50 rounded p-1">
                            <div className="text-sm font-bold text-primary">{comingSoonCountdowns[relic.id].hours}</div>
                            <div className="text-xs text-muted-foreground">H</div>
                          </div>
                          <div className="bg-background/50 rounded p-1">
                            <div className="text-sm font-bold text-primary">{comingSoonCountdowns[relic.id].minutes}</div>
                            <div className="text-xs text-muted-foreground">M</div>
                          </div>
                          <div className="bg-background/50 rounded p-1">
                            <div className="text-sm font-bold text-primary">{comingSoonCountdowns[relic.id].seconds}</div>
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
                        const title = encodeURIComponent(`${relic.title} - Coming Soon`)
                        const details = encodeURIComponent(`${relic.title} by ${relic.creator} launches soon!`)
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

              <div className="aspect-square relative overflow-hidden">
                <img
                  src={relic.image || "/placeholder.svg"}
                  alt={relic.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair text-xl font-bold text-card-foreground group-hover:text-primary transition-colors flex-1">
                      {relic.title}
                    </h3>
                    <NFTTypeBadge mediaType={relic.mediaType} />
                  </div>
                  <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-cyan-500/30 text-cyan-100 border-cyan-400/50 font-semibold">
                    {relic.price}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-cyan-500/30 border border-cyan-400/50 hover:bg-cyan-500/50 hover:text-white transition-all duration-300 hover:rune-glow text-cyan-100 font-semibold"
                  >
                    Acquire
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <NFTModal
        nft={selectedNFT}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        countdown={voidWalkerCountdown}
        onBid={handleNFTBid}
        onBuy={handleBuy}
      />
    </div>
  )
}