"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Eye,
  User,
  Folder,
  Gem,
  X,
  Calendar,
  Clock,
  Wallet,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import SiteHeader from "@/components/site-header"
import GalleryFooter from "@/components/gallery-footer"

// Mock curated NFTs for homepage
const curatedRelics = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "Wolfgang",
    price: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    description: "An ancient digital grimoire containing forbidden knowledge of the blockchain realm.",
    collection: "ancient-codex",
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "Wolfgang",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral guardian that traverses between digital dimensions.",
    collection: "void-walkers",
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "Wolfgang",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    description: "A powerful sigil that channels the energy of the digital cosmos.",
    collection: "cyber-sigils",
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "Wolfgang",
    price: "4.1 TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    description: "A crystalline artifact that holds the essence of shadow magic.",
    collection: "shadow-crystals",
  },
]

// Mock featured collections
const featuredCollections = [
  {
    id: 1,
    name: "Ancient Codex Archive",
    creator: "Wolfgang",
    itemCount: 12,
    image: "/ancient-library-with-glowing-books-and-mystical-at.png",
    description: "Sacred texts from the digital realm",
  },
  {
    id: 2,
    name: "Void Walker Spirits",
    creator: "Wolfgang",
    itemCount: 8,
    image: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    description: "Ethereal beings from beyond the veil",
  },
  {
    id: 3,
    name: "Cyber Temple Relics",
    creator: "Wolfgang",
    itemCount: 15,
    image: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    description: "Artifacts from the digital temples",
  },
]

// Mock data for creators and collections to enable comprehensive search
const mockCreators = [
  {
    id: 1,
    name: "Wolfgang",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    followers: "5.2K",
    verified: true,
  },
]

const mockCollections = [
  {
    id: 1,
    name: "Ancient Codex Archive",
    creator: "Wolfgang",
    itemCount: 12,
    image: "/ancient-library-with-glowing-books-and-mystical-at.png",
  },
  {
    id: 2,
    name: "Void Walker Spirits",
    creator: "Wolfgang",
    itemCount: 8,
    image: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
  },
  {
    id: 3,
    name: "Cyber Temple Relics",
    creator: "Wolfgang",
    itemCount: 15,
    image: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
  },
  {
    id: 4,
    name: "Crystal Nexus Collection",
    creator: "Wolfgang",
    itemCount: 6,
    image: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
  },
  {
    id: 5,
    name: "Oracle Mask Series",
    creator: "Wolfgang",
    itemCount: 10,
    image: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
  },
]

// Sample data for activity graph
const activityData = [
  { date: "Jan", volume: 45 },
  { date: "Feb", volume: 52 },
  { date: "Mar", volume: 61 },
  { date: "Apr", volume: 58 },
  { date: "May", volume: 70 },
  { date: "Jun", volume: 85 },
  { date: "Jul", volume: 92 },
]

export default function HomePage() {
  const [selectedRelic, setSelectedRelic] = useState<(typeof curatedRelics)[0] | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678") // Mock wallet address
  const [voidWalkerCountdown, setVoidWalkerCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [comingSoonCountdowns, setComingSoonCountdowns] = useState<Record<number, string>>({})

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3) // 3 days from now
    targetDate.setHours(23, 59, 59, 999)

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setVoidWalkerCountdown({ days, hours, minutes, seconds })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    const comingSoonTargetDate = new Date()
    comingSoonTargetDate.setDate(comingSoonTargetDate.getDate() + 7) // 7 days from now
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
      clearInterval(interval)
      clearInterval(comingSoonInterval)
    }
  }, [])

  const generateCalendarLink = (relic: (typeof curatedRelics)[0]) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 3)
    startDate.setHours(23, 59, 0, 0)

    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 1)

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const title = encodeURIComponent(`${relic.title} Auction Ends`)
    const details = encodeURIComponent(`Don't miss the auction end for ${relic.title} by ${relic.creator}`)
    const startTime = formatDate(startDate)
    const endTime = formatDate(endDate)

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}`
  }

  const handleCalendarClick = (relic: (typeof curatedRelics)[0]) => {
    const calendarUrl = generateCalendarLink(relic)
    window.open(calendarUrl, "_blank")
  }

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], relics: [] }

    const query = searchQuery.toLowerCase().trim()

    const filteredCreators = mockCreators.filter((creator) => creator.name.toLowerCase().includes(query))

    const filteredCollections = mockCollections.filter(
      (collection) => collection.name.toLowerCase().includes(query) || collection.creator.toLowerCase().includes(query),
    )

    const filteredRelics = curatedRelics.filter(
      (relic) => relic.title.toLowerCase().includes(query) || relic.creator.toLowerCase().includes(query),
    )

    return { creators: filteredCreators, collections: filteredCollections, relics: filteredRelics }
  }

  const searchResults = getSearchResults()
  const hasResults =
    searchResults.creators.length > 0 || searchResults.collections.length > 0 || searchResults.relics.length > 0

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Eye className="w-8 h-8 text-primary" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-primary drop-shadow-sm">
                  The Overmind Gallery
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-primary"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 flex flex-col space-y-6 p-6">
              <Button
                onClick={() => {
                  setIsSearchOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="text-left justify-start text-muted-foreground hover:text-primary transition-colors text-xl bg-transparent hover:bg-primary/10 p-0"
                variant="ghost"
              >
                <Search className="w-5 h-5 mr-3" />
                Search
              </Button>
              <Button
                onClick={() => {
                  handleWalletConnect()
                  setIsMobileMenuOpen(false)
                }}
                className="text-left justify-start bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground text-xl font-medium"
              >
                <Wallet className="w-6 h-6 mr-3" />
                {isWalletConnected ? walletAddress : "Connect Wallet"}
              </Button>
              <hr className="border-border" />
              <a href="/" className="text-primary font-medium text-xl" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
              <a
                href="/explore"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </a>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="/collections"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a
                href="/creators"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creators
              </a>
            </nav>
          </div>
        </div>
      )}

      <header className="text-center relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Central Eye Symbol */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center">
                <Eye className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent md:text-7xl mb-6">
            The Overmind Gallery
          </h1>
          <p className="max-w-3xl mx-auto mb-8 leading-relaxed text-gray-400 font-mono text-lg">
            Where ancient wisdom meets digital artistry. Discover artifacts of the digital realm, guarded by the eternal
            gaze of The Overmind.
          </p>
          <p className="text-lg font-semibold mb-12 tracking-[0.30em] text-emerald-200">$TRUST YOUR INTUITION</p>

          <Link href="/explore">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25">
              Enter the Gallery
            </Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-primary drop-shadow-sm">
            Sacred Artifacts
          </h2>
          <p className="text-muted-foreground text-lg">Handpicked artifacts from the digital realm</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {curatedRelics.map((relic) => (
            <Card
              key={relic.id}
              className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow relative"
              onClick={() => setSelectedRelic(relic)}
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
                  <h3 className="font-playfair text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {relic.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/30 text-primary border-primary/50 font-semibold">
                    {relic.price}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-primary/30 border border-primary/50 hover:bg-primary/50 hover:text-white transition-all duration-300 hover:rune-glow text-primary font-semibold"
                  >
                    Acquire
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-primary drop-shadow-sm">
            Featured Collections
          </h2>
          <p className="text-muted-foreground text-lg">Curated archives from master artisans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCollections.map((collection) => (
            <Link key={collection.id} href="/collections">
              <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-playfair text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">by {collection.creator}</p>
                    <p className="text-primary text-sm">{collection.itemCount} artifacts</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/collections">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 bg-transparent"
            >
              View All Collections
            </Button>
          </Link>
        </div>
      </section>

      {/* Marketplace Stats Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-primary drop-shadow-sm">
            Marketplace Stats
          </h2>
          <p className="text-muted-foreground text-lg">Real-time insights from The Overmind Gallery</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Transactions */}
          <Card className="bg-black/30 backdrop-blur-md border-border/30 p-6 hover:rune-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-400/30">
                +12.5%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-primary">24,567</p>
            </div>
          </Card>

          {/* Volume Traded */}
          <Card className="bg-black/30 backdrop-blur-md border-border/30 p-6 hover:rune-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                <DollarSign className="w-6 h-6 text-secondary" />
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-400/30">
                +8.3%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Volume Traded</p>
              <p className="text-3xl font-bold text-secondary">1.2M $TRUST</p>
            </div>
          </Card>

          {/* Number of Users */}
          <Card className="bg-black/30 backdrop-blur-md border-border/30 p-6 hover:rune-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-400/30">
                +15.7%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Number of Users</p>
              <p className="text-3xl font-bold text-primary">8,432</p>
            </div>
          </Card>

          {/* NFTs Sold */}
          <Card className="bg-black/30 backdrop-blur-md border-border/30 p-6 hover:rune-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                <ShoppingBag className="w-6 h-6 text-secondary" />
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-400/30">
                +9.2%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">NFTs Sold</p>
              <p className="text-3xl font-bold text-secondary">12,845</p>
            </div>
          </Card>
        </div>

        {/* Activity Graph */}
        <Card className="bg-black/30 backdrop-blur-md border-border/30 p-6 hover:rune-glow transition-all duration-300">
          <div className="mb-6">
            <h3 className="font-playfair text-xl font-bold text-primary mb-2">Trading Activity</h3>
            <p className="text-muted-foreground text-sm">Volume traded over the last 7 months (in $TRUST thousands)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#22d3ee" }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ fill: "#22d3ee", r: 4 }}
                activeDot={{ r: 6, fill: "#a78bfa" }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* Footer */}
      <GalleryFooter />

      {/* Modal for NFT Preview */}
      <Dialog open={!!selectedRelic} onOpenChange={() => setSelectedRelic(null)}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto obsidian-texture border-border/30 rune-glow-violet">
          {selectedRelic && (
            <>
              <DialogHeader>
                <DialogTitle className="font-playfair text-2xl font-bold text-card-foreground">
                  {selectedRelic.title}
                </DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={selectedRelic.image || "/placeholder.svg"}
                    alt={selectedRelic.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground mb-2">Created by</p>
                    <p className="text-card-foreground font-semibold">{selectedRelic.creator}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2">Description</p>
                    <p className="text-card-foreground leading-relaxed">{selectedRelic.description}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2">Price</p>
                    <Badge
                      variant="secondary"
                      className="bg-primary/30 text-primary border-primary/50 text-lg px-4 py-2 font-semibold"
                    >
                      {selectedRelic.price}
                    </Badge>
                  </div>

                  {selectedRelic.collection === "void-walkers" ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-primary font-semibold">Auction Ends In:</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="bg-background/50 rounded-lg p-2">
                            <div className="text-2xl font-bold text-primary">{voidWalkerCountdown.days}</div>
                            <div className="text-xs text-muted-foreground">D</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2">
                            <div className="text-2xl font-bold text-primary">{voidWalkerCountdown.hours}</div>
                            <div className="text-xs text-muted-foreground">H</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2">
                            <div className="text-2xl font-bold text-primary">{voidWalkerCountdown.minutes}</div>
                            <div className="text-xs text-muted-foreground">M</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2 px-2 text-center">
                            <div className="text-2xl font-bold text-primary">{voidWalkerCountdown.seconds}</div>
                            <div className="text-xs text-muted-foreground">S</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-primary/30 text-primary border border-primary/50 hover:bg-primary/50 hover:text-white transition-all duration-300 hover:rune-glow py-6 text-lg font-semibold">
                          Place Bid
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCalendarClick(selectedRelic)
                          }}
                          className="border-primary/30 text-primary hover:bg-primary/10 py-6 bg-transparent"
                        >
                          <Calendar className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-400/30 rounded-lg p-6 text-center">
                        <div className="text-2xl font-bold text-gray-400 mb-2">Coming Soon</div>
                        <p className="text-gray-500 text-sm">This artifact will be available for auction soon</p>
                      </div>
                      <Button
                        disabled
                        className="w-full bg-gray-500/20 text-gray-400 border border-gray-400/30 py-6 text-lg font-semibold cursor-not-allowed"
                      >
                        Not Available Yet
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Comprehensive Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] obsidian-texture border-border/30 rune-glow-violet overflow-hidden">
          <DialogHeader className="pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-playfair text-2xl font-bold text-card-foreground flex items-center space-x-2">
                <Search className="w-6 h-6 text-primary" />
                <span>Search the Gallery</span>
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative">
              <Input
                placeholder="Search for creators, collections, or relics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/50 border-border/30 text-card-foreground placeholder:text-muted-foreground pl-10 py-3 text-lg"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {searchQuery && (
              <div className="max-h-96 overflow-y-auto space-y-6">
                {!hasResults && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-lg">No results found for "{searchQuery}"</p>
                  </div>
                )}

                {/* Creators Results */}
                {searchResults.creators.length > 0 && (
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-primary mb-3 flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Creators ({searchResults.creators.length})</span>
                    </h3>
                    <div className="grid gap-3">
                      {searchResults.creators.map((creator) => (
                        <Link key={creator.id} href="/creators">
                          <Card className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300">
                            <div className="flex items-center space-x-4">
                              <img
                                src={creator.avatar || "/placeholder.svg"}
                                alt={creator.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold text-card-foreground">{creator.name}</h4>
                                  {creator.verified && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-primary/20 text-primary border-primary/30 text-xs"
                                    >
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground text-sm">{creator.followers} followers</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collections Results */}
                {searchResults.collections.length > 0 && (
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-secondary mb-3 flex items-center space-x-2">
                      <Folder className="w-5 h-5" />
                      <span>Collections ({searchResults.collections.length})</span>
                    </h3>
                    <div className="grid gap-3">
                      {searchResults.collections.map((collection) => (
                        <Link key={collection.id} href="/collections">
                          <Card className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300">
                            <div className="flex items-center space-x-4">
                              <img
                                src={collection.image || "/placeholder.svg"}
                                alt={collection.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-card-foreground">{collection.name}</h4>
                                <p className="text-muted-foreground text-sm">
                                  by {collection.creator} • {collection.itemCount} artifacts
                                </p>
                              </div>
                              <Badge
                                variant="secondary"
                                className="bg-primary/30 text-primary border-primary/50 font-semibold"
                              >
                                {collection.itemCount} artifacts
                              </Badge>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Relics Results */}
                {searchResults.relics.length > 0 && (
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-primary mb-3 flex items-center space-x-2">
                      <Gem className="w-5 h-5" />
                      <span>Relics ({searchResults.relics.length})</span>
                    </h3>
                    <div className="grid gap-3">
                      {searchResults.relics.map((relic) => (
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
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-card-foreground">{relic.title}</h4>
                              <p className="text-muted-foreground text-sm">by {relic.creator}</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-primary/30 text-primary border-primary/50 font-semibold"
                            >
                              {relic.price}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
