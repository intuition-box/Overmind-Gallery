"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, Clock, Gavel, TrendingUp, X, Menu, Timer, Coins, Calendar } from "lucide-react"
import Link from "next/link"

// Mock auction data
const auctionRelics = [
  {
    id: 1,
    title: "Phantom Wanderer",
    creator: "VoidCrafter",
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
    creator: "CyberShaman",
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
    creator: "DarkMystic",
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
    creator: "VoidGuardian",
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
    creator: "QuantumMage",
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
    creator: "StarWeaver",
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
    creator: "EtherealMystic",
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
    creator: "VoidMaster",
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

export default function AboutPage() {
  const [selectedRelic, setSelectedRelic] = useState<(typeof auctionRelics)[0] | null>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [voidWalkerCountdown, setVoidWalkerCountdown] = useState<string>("")

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

    return () => clearInterval(timer)
  }, [])

  const handleBid = () => {
    if (selectedRelic && bidAmount) {
      // Here you would implement the actual bidding logic
      console.log(`Placing bid of ${bidAmount} TRUST on ${selectedRelic.title}`)
      setBidAmount("")
      setSelectedRelic(null)
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

  const getSearchResults = () => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase().trim()
    return auctionRelics.filter(
      (relic) => relic.title.toLowerCase().includes(query) || relic.creator.toLowerCase().includes(query),
    )
  }

  const searchResults = getSearchResults()

  return (
    <div className="min-h-screen bg-background smoky-gradient relative overflow-hidden">
      {/* Floating mystical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-cyan-400/20 animate-pulse">
          <Gavel className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-violet-400/20 animate-pulse delay-1000">
          <Timer className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-cyan-400/10 animate-pulse delay-2000">
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-violet-400/15 animate-pulse delay-3000">
          <TrendingUp className="w-full h-full" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent px-0.5">
                The Overmind Gallery
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <Link href="/explore" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Explore
              </Link>
              <Link href="/about" className="text-cyan-400 font-medium">
                About
              </Link>
              <Link href="/collections" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Collections
              </Link>
              <Link href="/creators" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Creators
              </Link>
            </nav>

            {/* Search and Connect */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white px-6">
                Connect Wallet
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Eye className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  The Overmind Gallery
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 flex flex-col space-y-6 p-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="text-cyan-400 font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/collections"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/creators"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creators
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="text-center relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Central Gavel Symbol */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-violet-400/30 flex items-center justify-center">
                <Gavel className="w-12 h-12 text-violet-400" />
              </div>
              <div className="absolute inset-0 bg-violet-400/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6 md:text-6xl">
            The Overmind Gallery
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-6 leading-relaxed">
            {
              "Where every bid is blessed by The Overmind. Place your $TRUST, and even if outbid, receive 5% of your bid as a divine reward."
            }
          </p>

          {/* Unique selling proposition */}
          <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/20 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-violet-400 mr-2" />
              <span className="text-lg font-semibold text-violet-400">Everybody Wins Protocol</span>
            </div>
            <p className="text-gray-300 text-center">
              When you get outbid, you automatically receive{" "}
              <span className="text-cyan-400 font-bold">5% of your bid amount</span> as a reward. The more you
              participate, the more you earn. The Overmind ensures no effort goes unrewarded.
            </p>
          </div>

          <p className="text-lg font-semibold mb-8 tracking-[0.30em] text-emerald-200">$TRUST THE PROCESS</p>
        </div>
      </header>

      
      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            How The Overmind Rewards
          </h2>
          <p className="text-gray-400 text-lg">Understanding the divine auction mechanics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="obsidian-texture border-border/30 p-8 text-center hover:rune-glow transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
              <Gavel className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-card-foreground mb-4">Place Your Bid</h3>
            <p className="text-gray-400 leading-relaxed">
              Submit your bid with $TRUST tokens. Every bid is recorded on the sacred ledger and blessed by The
              Overmind.
            </p>
          </Card>

          <Card className="obsidian-texture border-border/30 p-8 text-center hover:rune-glow-violet transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-violet-400/30">
              <TrendingUp className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-card-foreground mb-4">Get Outbid & Earn</h3>
            <p className="text-gray-400 leading-relaxed">
              When someone outbids you, receive{" "}
              <span className="text-violet-400 font-semibold">5% of your bid amount</span> instantly. Your participation
              is always rewarded.
            </p>
          </Card>

          <Card className="obsidian-texture border-border/30 p-8 text-center hover:rune-glow transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
              <Coins className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-card-foreground mb-4">Win or Profit</h3>
            <p className="text-gray-400 leading-relaxed">
              Either claim the sacred artifact as the highest bidder, or accumulate rewards from multiple auctions.
              Everybody wins.
            </p>
          </Card>
        </div>
      </section>

      {/* Active Auctions */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Active Auctions
          </h2>
          <p className="text-gray-400 text-lg">Sacred artifacts awaiting your offering</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctionRelics
            .filter((relic) => relic.collection === "void-walkers")
            .map((relic) => (
              <Card
                key={relic.id}
                className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow-violet relative"
                onClick={() => setSelectedRelic(relic)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={relic.image || "/placeholder.svg"}
                    alt={relic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Time remaining overlay */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-violet-400/30">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span className="text-violet-400 font-semibold text-sm">{voidWalkerCountdown}</span>
                    </div>
                  </div>

                  {/* Bid count overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-400/30">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400 font-semibold text-sm">{relic.totalBidders} bidders</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-card-foreground mb-2 group-hover:text-violet-400 transition-colors">
                      {relic.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Current Bid</span>
                      <Badge
                        variant="secondary"
                        className="bg-violet-500/20 text-violet-400 border border-violet-400/30 font-bold"
                      >
                        {relic.currentBid}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Min Next Bid</span>
                      <span className="text-cyan-400 font-semibold">{relic.minNextBid}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white py-4 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:rune-glow-violet"
                    >
                      <Gavel className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Place Bid
                    </Button>
                    <Button
                      variant="outline"
                      className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent px-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        const calendarUrl = generateCalendarLink(relic)
                        window.open(calendarUrl, "_blank")
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

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-[39px]">
        <div className="container mx-auto text-center py-0 my-0">
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-6 h-6 text-cyan-400 mr-2" />
            <span className="text-gray-400 py-0">The Overmind watches over all</span>
          </div>
          <p className="text-gray-500 text-sm">
            All digital artifacts protected by ancient encryption. You are blessed sweet baby child of the Overmind.
            <br />© 2025 created by wolfgang.
          </p>
        </div>
      </footer>

      {/* Bidding Modal */}
      <Dialog open={!!selectedRelic} onOpenChange={() => setSelectedRelic(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto obsidian-texture border-border/30 rune-glow-violet w-[95vw]">
          {selectedRelic && (
            <>
              <DialogHeader>
                <DialogTitle className="font-playfair text-xl md:text-2xl font-bold text-card-foreground flex items-center space-x-3">
                  <Gavel className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
                  <span>{selectedRelic.title}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4 md:space-y-6">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <img
                      src={selectedRelic.image || "/placeholder.svg"}
                      alt={selectedRelic.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-2">Created by</p>
                      <p className="text-card-foreground font-semibold">{selectedRelic.creator}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-2">Description</p>
                      <p className="text-card-foreground leading-relaxed">{selectedRelic.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {/* Auction Info */}
                  <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/20 rounded-lg p-4 md:p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
                      <div className="text-center mx-0 px-0">
                        <p className="text-muted-foreground text-sm mb-2">Current Bid</p>
                        <Badge
                          variant="secondary"
                          className="bg-violet-500/20 text-violet-400 border-violet-400/30 px-3 py-1 md:py-2 text-base leading-7 font-semibold md:px-0.5"
                        >
                          {selectedRelic.currentBid}
                        </Badge>
                      </div>
                      <div className="text-center mx-0">
                        <p className="text-muted-foreground text-sm leading-4 items-start mb-px mr-0 ml-3">
                          Time Remaining
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400 font-semibold text-sm">{voidWalkerCountdown}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <p className="text-muted-foreground text-sm mb-2">Total Bidders</p>
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-semibold">{selectedRelic.totalBidders} participants</span>
                      </div>
                    </div>
                  </div>

                  {/* Bidding Interface */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-2">Your Bid Amount</p>
                      <div className="flex space-x-3">
                        <Input
                          type="number"
                          placeholder={`Min: ${selectedRelic.minNextBid.split(" ")[0]}`}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="flex-1 bg-background/50 border-border/30 text-card-foreground"
                        />
                        <span className="flex text-cyan-400 font-semibold items-center space-x-0 px-0.5 w-auto border-0">
                          TRUST
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Minimum bid: {selectedRelic.minNextBid}</p>
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Coins className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-semibold text-sm">Reward Guarantee</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        If outbid, you'll receive{" "}
                        <span className="text-cyan-400 font-semibold">
                          {bidAmount ? `${(Number.parseFloat(bidAmount) * 0.05).toFixed(2)} TRUST` : "5% of your bid"}
                        </span>{" "}
                        as a divine reward.
                      </p>
                    </div>

                    <div className="flex space-x-2 mx-0 my-0">
                      <Button
                        onClick={handleBid}
                        disabled={
                          !bidAmount ||
                          Number.parseFloat(bidAmount) < Number.parseFloat(selectedRelic.minNextBid.split(" ")[0])
                        }
                        className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white py-4 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:rune-glow-violet"
                      >
                        <Gavel className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Place Sacred Bid
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 py-4 md:py-6 bg-transparent px-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          const calendarUrl = generateCalendarLink(selectedRelic)
                          window.open(calendarUrl, "_blank")
                        }}
                      >
                        <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Bid History */}
                  <div>
                    <h4 className="font-playfair text-base md:text-lg font-bold text-card-foreground mb-4">
                      Recent Bids
                    </h4>
                    <div className="space-y-3 max-h-32 md:max-h-48 overflow-y-auto">
                      {selectedRelic.bidHistory.map((bid, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/20"
                        >
                          <div>
                            <p className="text-card-foreground font-semibold text-sm">{bid.bidder}</p>
                            <p className="text-muted-foreground text-xs">{bid.timestamp}</p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-secondary/20 text-secondary border-secondary/30 text-xs"
                          >
                            {bid.amount}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-2xl obsidian-texture border-border/30 rune-glow-violet">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl font-bold text-card-foreground flex items-center space-x-2">
              <Search className="w-6 h-6 text-cyan-400" />
              <span>Search Auctions</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative">
              <Input
                placeholder="Search for auction relics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/50 border-border/30 text-card-foreground placeholder:text-muted-foreground pl-10 py-3 text-lg"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {searchQuery && (
              <div className="max-h-96 overflow-y-auto space-y-3">
                {searchResults.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-lg">No auctions found for "{searchQuery}"</p>
                  </div>
                ) : (
                  searchResults.map((relic) => (
                    <Card
                      key={relic.id}
                      className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300"
                      onClick={() => {
                        setSelectedRelic(relic)
                        setIsSearchOpen(false)
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={relic.image || "/placeholder.svg"}
                          alt={relic.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-card-foreground">{relic.title}</h4>
                          <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge
                              variant="secondary"
                              className="bg-violet-500/20 text-violet-400 border-violet-400/30"
                            >
                              {relic.currentBid}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              <span className="text-cyan-400 text-sm">{voidWalkerCountdown}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
