"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { NFTModal } from "@/components/nft-modal"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Gavel, ShoppingBagIcon, TrendingUp, Coins, Timer } from "lucide-react"
import NFTFilterBar, { type FilterOptions } from "@/components/nft-filter-bar"
import SiteHeader from "@/components/site-header"


// Mock NFT data
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
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "CyberShaman",
    price: "1.8 TRUST",
    priceValue: 1.8,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral guardian that traverses between digital dimensions.",
    collection: "void-walkers",
    category: "art",
    status: "in-auction",
    createdAt: new Date("2024-01-20"),
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
  },
]

// Mock data for comprehensive search functionality
const mockCreators = [
  {
    id: 1,
    name: "DigitalMystic",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    followers: "2.3K",
    verified: true,
  },
  {
    id: 2,
    name: "CyberShaman",
    avatar: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    followers: "1.8K",
    verified: true,
  },
  {
    id: 3,
    name: "RuneForger",
    avatar: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    followers: "3.1K",
    verified: false,
  },
  {
    id: 4,
    name: "VoidCrafter",
    avatar: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    followers: "1.2K",
    verified: true,
  },
  {
    id: 5,
    name: "TechnoMage",
    avatar: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    followers: "4.5K",
    verified: true,
  },
]

const mockCollections = [
  {
    id: 1,
    name: "Ancient Codex Archive",
    creator: "DigitalMystic",
    itemCount: 12,
    image: "/ancient-library-with-glowing-books-and-mystical-at.png",
  },
  {
    id: 2,
    name: "Void Walker Spirits",
    creator: "CyberShaman",
    itemCount: 8,
    image: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
  },
  {
    id: 3,
    name: "Cyber Temple Artifacts",
    creator: "TechnoMage",
    itemCount: 15,
    image: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
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
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral guardian that traverses between digital dimensions.",
    bidHistory: [
      { bidder: "ShadowCaster", amount: "2.1 TRUST", timestamp: "4h ago" },
      { bidder: "MysticOracle", amount: "3.5 TRUST", timestamp: "2h ago" },
      { bidder: "DigitalPhoenix", amount: "4.2 TRUST", timestamp: "23m ago" },
    ],
    totalBidders: 18,
    collection: "void-walkers",
  },
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
  },
  {
    id: 4,
    title: "Void Sentinel",
    creator: "Wolfgang",
    currentBid: "3.7 TRUST",
    currentBidValue: 3.7,
    minNextBid: "4.1 TRUST",
    timeRemaining: "6h 18m",
    timeRemainingMs: 6 * 60 * 60 * 1000 + 18 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "An eternal guardian standing watch at the gates of the void realm.",
    bidHistory: [
      { bidder: "DarkAlchemist", amount: "1.5 TRUST", timestamp: "8h ago" },
      { bidder: "VoidSeeker", amount: "2.8 TRUST", timestamp: "4h ago" },
      { bidder: "ShadowBinder", amount: "3.7 TRUST", timestamp: "2h ago" },
    ],
    totalBidders: 15,
    collection: "void-walkers",
  },
  {
    id: 5,
    title: "Dimension Walker",
    creator: "Wolfgang",
    currentBid: "5.3 TRUST",
    currentBidValue: 5.3,
    minNextBid: "5.8 TRUST",
    timeRemaining: "12h 45m",
    timeRemainingMs: 12 * 60 * 60 * 1000 + 45 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A being capable of stepping between dimensions, exploring infinite realities.",
    bidHistory: [
      { bidder: "FireWeaver", amount: "2.9 TRUST", timestamp: "10h ago" },
      { bidder: "PhoenixRider", amount: "4.1 TRUST", timestamp: "6h ago" },
      { bidder: "FlameKeeper", amount: "5.3 TRUST", timestamp: "3h ago" },
    ],
    totalBidders: 21,
    collection: "void-walkers",
  },
  {
    id: 6,
    title: "Astral Nomad",
    creator: "Wolfgang",
    currentBid: "8.9 TRUST",
    currentBidValue: 8.9,
    minNextBid: "9.8 TRUST",
    timeRemaining: "23h 12m",
    timeRemainingMs: 23 * 60 * 60 * 1000 + 12 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A wandering spirit that travels the astral planes, collecting cosmic wisdom.",
    bidHistory: [
      { bidder: "QuantumWalker", amount: "4.2 TRUST", timestamp: "12h ago" },
      { bidder: "DimensionBender", amount: "6.7 TRUST", timestamp: "8h ago" },
      { bidder: "RealityShaper", amount: "8.9 TRUST", timestamp: "4h ago" },
    ],
    totalBidders: 31,
    collection: "void-walkers",
  },
  {
    id: 7,
    title: "Spirit Traveler",
    creator: "Wolfgang",
    currentBid: "7.2 TRUST",
    currentBidValue: 7.2,
    minNextBid: "7.9 TRUST",
    timeRemaining: "8h 27m",
    timeRemainingMs: 8 * 60 * 60 * 1000 + 27 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spiritual entity that journeys through ethereal realms, bridging worlds.",
    bidHistory: [
      { bidder: "SpiritBinder", amount: "3.8 TRUST", timestamp: "9h ago" },
      { bidder: "EtherWalker", amount: "5.4 TRUST", timestamp: "5h ago" },
      { bidder: "VoidMaster", amount: "7.2 TRUST", timestamp: "2h ago" },
    ],
    totalBidders: 19,
    collection: "void-walkers",
  },
  {
    id: 8,
    title: "Void Keeper",
    creator: "Wolfgang",
    currentBid: "9.5 TRUST",
    currentBidValue: 9.5,
    minNextBid: "10.4 TRUST",
    timeRemaining: "15h 33m",
    timeRemainingMs: 15 * 60 * 60 * 1000 + 33 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "The ultimate guardian of void secrets, keeper of ancient digital mysteries.",
    bidHistory: [
      { bidder: "VoidSeeker", amount: "5.1 TRUST", timestamp: "14h ago" },
      { bidder: "DarkOracle", amount: "7.8 TRUST", timestamp: "10h ago" },
      { bidder: "ShadowLord", amount: "9.5 TRUST", timestamp: "6h ago" },
    ],
    totalBidders: 28,
    collection: "void-walkers",
  },
]

export default function ExplorePage() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678")
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
  console.log(`Placing bid of ${amount} TRUST on ${selectedNFT.title}`)
  handleCloseModal()
}

const handleBuy = () => {
  console.log(`Purchasing ${selectedNFT.title}`)
  handleCloseModal()
}

const handleCalendar = () => {
  if (!selectedNFT) return
  const calendarUrl = generateCalendarLink(selectedNFT)
  window.open(calendarUrl, "_blank")
}

  useEffect(() => {
    const endTime = new Date()
    endTime.setDate(endTime.getDate() + 3) // 3 days from now

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

  const handleBid = () => {
    if (selectedAuctionRelic && bidAmount) {
      console.log(`Placing bid of ${bidAmount} TRUST on ${selectedAuctionRelic.title}`)
      setBidAmount("")
      setSelectedAuctionRelic(null)
    }
  }

  const generateCalendarLink = (relic: (typeof auctionRelics)[0]) => {
    const endTime = new Date()
    endTime.setDate(endTime.getDate() + 3)

    const startDate = endTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const endDate = new Date(endTime.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const title = encodeURIComponent(`${relic.title} - Auction Ends`)
    const details = encodeURIComponent(
      `Don't miss the auction end for ${relic.title} by ${relic.creator}. Current bid: ${relic.currentBid}`,
    )

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`
  }

  const handleCalendarClick = (relic: (typeof auctionRelics)[0]) => {
    const calendarUrl = generateCalendarLink(relic)
    window.open(calendarUrl, "_blank")
  }

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], artifacts: [] }

    const query = searchQuery.toLowerCase()

    const filteredCreators = mockCreators.filter((creator) => creator.name.toLowerCase().includes(query))

    const filteredCollections = mockCollections.filter(
      (collection) => collection.name.toLowerCase().includes(query) || collection.creator.toLowerCase().includes(query),
    )

    const filteredArtifacts = nftRelics.filter(
      (artifact) => artifact.title.toLowerCase().includes(query) || artifact.creator.toLowerCase().includes(query),
    )

    return { creators: filteredCreators, collections: filteredCollections, artifacts: filteredArtifacts }
  }

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

  const searchResults = getSearchResults()
  const hasResults =
    searchResults.creators.length > 0 || searchResults.collections.length > 0 || searchResults.artifacts.length > 0

  const filteredRelics = getFilteredAndSortedRelics()
  const filteredAuctions = getFilteredAuctionRelics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
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
        <SiteHeader/>
      {/* Updated Hero Section with Gradient Text Styling */}
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

      {/* Active Auctions Section from about page */}
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

                {/* Time remaining overlay */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-secondary/30 text-right mr-[-4px] mt-[-10px]">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-secondary font-semibold text-sm">{voidWalkerCountdown}</span>
                  </div>
                </div>

                {/* Bid count overlay */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border-primary/30 text-left mr-0 border pr-2 ml-[-9px] mb-[53px] mt-[-10px]">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-primary font-semibold text-sm">{relic.totalBidders} bidders</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-playfair text-lg font-bold text-card-foreground mb-2 group-hover:text-secondary transition-colors">
                    {relic.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Current Bid</span>
                    <Badge
                      variant="secondary"
                      className="bg-secondary/20 text-secondary border border-secondary/30 font-bold"
                    >
                      {relic.currentBid}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Min Next Bid</span>
                    <span className="text-primary font-semibold">{relic.minNextBid}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 text-white py-4 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:rune-glow-violet"
                  >
                    <Gavel className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Place Bid
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent px-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      generateCalendarLink(relic)
                    }}
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* NFT Grid */}
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
                            <div className="text-sm font-bold text-primary">
                              {comingSoonCountdowns[relic.id].minutes}
                            </div>
                            <div className="text-xs text-muted-foreground">M</div>
                          </div>
                          <div className="bg-background/50 rounded p-1">
                            <div className="text-sm font-bold text-primary">
                              {comingSoonCountdowns[relic.id].seconds}
                            </div>
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
                  <h3 className="font-playfair text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {relic.title}
                  </h3>
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

        {filteredRelics.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No artifacts found matching "{searchQuery}"</p>
            <p className="text-gray-500 text-sm mt-2">Try searching for a different term</p>
          </div>
        )}
      </main>

      {/* Modal */}
      <NFTModal
  nft={selectedNFT}
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  countdown={voidWalkerCountdown}
  onBid={handleBid}
  onBuy={handleBuy}
  onCalendar={handleCalendar}
/>
    </div>
  )
}
