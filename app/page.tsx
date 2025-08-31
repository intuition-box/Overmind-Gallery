"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, User, Folder, Gem, X, Menu, Calendar, Clock } from "lucide-react"
import Link from "next/link"

// Mock curated NFTs for homepage
const curatedRelics = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "DigitalMystic",
    price: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    description: "An ancient digital grimoire containing forbidden knowledge of the blockchain realm.",
    collection: "ancient-codex",
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "CyberShaman",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral guardian that traverses between digital dimensions.",
    collection: "void-walkers",
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "RuneForger",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    description: "A powerful sigil that channels the energy of the digital cosmos.",
    collection: "cyber-sigils",
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "VoidCrafter",
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
    creator: "DigitalMystic",
    itemCount: 12,
    image: "/ancient-library-with-glowing-books-and-mystical-at.png",
    description: "Sacred texts from the digital realm",
  },
  {
    id: 2,
    name: "Void Walker Spirits",
    creator: "CyberShaman",
    itemCount: 8,
    image: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    description: "Ethereal beings from beyond the veil",
  },
  {
    id: 3,
    name: "Cyber Temple Relics",
    creator: "TechnoMage",
    itemCount: 15,
    image: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    description: "Artifacts from the digital temples",
  },
]

// Mock data for creators and collections to enable comprehensive search
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
  {
    id: 6,
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
    name: "Cyber Temple Relics",
    creator: "TechnoMage",
    itemCount: 15,
    image: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
  },
  {
    id: 4,
    name: "Crystal Nexus Collection",
    creator: "VoidCrafter",
    itemCount: 6,
    image: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
  },
  {
    id: 5,
    name: "Oracle Mask Series",
    creator: "RuneForger",
    itemCount: 10,
    image: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
  },
]

export default function HomePage() {
  const [selectedRelic, setSelectedRelic] = useState<(typeof curatedRelics)[0] | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [voidWalkerCountdown, setVoidWalkerCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

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

    return () => clearInterval(interval)
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

  return (
    <div className="min-h-screen bg-background smoky-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-cyan-400/20 animate-pulse">
          <Eye className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-violet-400/20 animate-pulse delay-1000">
          <Eye className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-cyan-400/10 animate-pulse delay-2000">
          <Eye className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-violet-400/15 animate-pulse delay-3000">
          <Eye className="w-full h-full" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                The Overmind Gallery
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-cyan-400 font-medium">
                Home
              </a>
              <a href="/explore" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Explore
              </a>
              <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                About
              </Link>
              <a href="/collections" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Collections
              </a>
              <a href="/creators" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Creators
              </a>
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
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Eye className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  The Overmind Gallery
                </span>
              </div>
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
              <a href="/" className="text-cyan-400 font-medium text-xl" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
              <a
                href="/explore"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </a>
              <Link
                href="/about"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="/collections"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a
                href="/creators"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
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
              <div className="w-24 h-24 rounded-full border-2 border-cyan-400/30 flex items-center justify-center">
                <Eye className="w-12 h-12 text-cyan-400" />
              </div>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-400 bg-clip-text text-transparent mb-6">
            The Overmind Gallery
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Where ancient wisdom meets digital artistry. Discover relics of the digital realm, guarded by the eternal
            gaze of The Overmind.
          </p>
          <p className="text-lg font-semibold mb-12 tracking-[0.30em] text-emerald-200">$TRUST YOUR INTUITION</p>

          <Link href="/explore">
            <Button className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
              Enter the Gallery
            </Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Sacred Artifacts
          </h2>
          <p className="text-gray-400 text-lg">Handpicked artifacts from the digital realm</p>
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
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-lg px-6 py-3 mb-4 bg-gray-900 text-sky-300">
                      Coming Soon
                    </Badge>
                    <p className="text-gray-400 text-sm">This artifact will be available soon</p>
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
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    {relic.price}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-primary/20 border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow text-primary"
                  >
                    Acquire
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 relative z-10 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Featured Collections
          </h2>
          <p className="text-gray-400 text-lg">Curated archives from master artisans</p>
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
                    <h3 className="font-playfair text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">by {collection.creator}</p>
                    <p className="text-cyan-400 text-sm">{collection.itemCount} artifacts</p>
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
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 bg-transparent"
            >
              View All Collections
            </Button>
          </Link>
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
                      className="bg-secondary/20 text-secondary border-secondary/30 text-lg px-4 py-2"
                    >
                      {selectedRelic.price}
                    </Badge>
                  </div>

                  {selectedRelic.collection === "void-walkers" ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Clock className="w-5 h-5 text-cyan-400" />
                          <span className="text-cyan-400 font-semibold">Auction Ends In:</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="bg-background/50 rounded-lg p-2">
                            <div className="text-2xl font-bold text-cyan-400">{voidWalkerCountdown.days}</div>
                            <div className="text-xs text-muted-foreground">D</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2">
                            <div className="text-2xl font-bold text-cyan-400">{voidWalkerCountdown.hours}</div>
                            <div className="text-xs text-muted-foreground">H</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2">
                            <div className="text-2xl font-bold text-cyan-400">{voidWalkerCountdown.minutes}</div>
                            <div className="text-xs text-muted-foreground">M</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2 px-2 text-center">
                            <div className="text-2xl font-bold text-cyan-400">{voidWalkerCountdown.seconds}</div>
                            <div className="text-xs text-muted-foreground">S</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow py-6 text-lg font-semibold">
                          Place Bid
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCalendarClick(selectedRelic)
                          }}
                          className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 py-6 bg-transparent"
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
                <Search className="w-6 h-6 text-cyan-400" />
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
                    <h3 className="font-playfair text-lg font-bold text-cyan-400 mb-3 flex items-center space-x-2">
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
                                      className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30 text-xs"
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
                    <h3 className="font-playfair text-lg font-bold text-violet-400 mb-3 flex items-center space-x-2">
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
                    <h3 className="font-playfair text-lg font-bold text-cyan-400 mb-3 flex items-center space-x-2">
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
                            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
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
