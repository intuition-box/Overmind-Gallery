"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Users, Sparkles, X, User, Folder, Gem, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import GalleryFooter from "@/components/gallery-footer"

const collections = [
  {
    id: 1,
    name: "Ancient Codex",
    description: "Mystical tomes containing forgotten knowledge and arcane wisdom",
    creator: "Wolfgang",
    itemCount: 8,
    floorPrice: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    banner: "/ancient-library-with-glowing-books-and-mystical-at.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Tome of Shadows",
        price: "2.8 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 2,
        name: "Grimoire of Light",
        price: "3.1 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 3,
        name: "Codex Arcanum",
        price: "2.5 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 4,
        name: "Book of Whispers",
        price: "2.9 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 5,
        name: "Chronicle of Void",
        price: "3.3 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 6,
        name: "Manuscript of Time",
        price: "2.7 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 7,
        name: "Scroll of Eternity",
        price: "3.0 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 8,
        name: "Lexicon of Dreams",
        price: "2.6 TRUST",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
    ],
  },
  {
    id: 2,
    name: "Void Walkers",
    description: "Ethereal beings that traverse the boundaries between dimensions",
    creator: "Wolfgang",
    itemCount: 8,
    floorPrice: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Phantom Wanderer",
        price: "1.9 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 2,
        name: "Shadow Drifter",
        price: "2.1 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 3,
        name: "Void Sentinel",
        price: "1.8 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 4,
        name: "Ethereal Guide",
        price: "2.0 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 5,
        name: "Dimension Walker",
        price: "2.3 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 6,
        name: "Astral Nomad",
        price: "1.7 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 7,
        name: "Spirit Traveler",
        price: "2.2 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 8,
        name: "Void Keeper",
        price: "1.9 TRUST",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
    ],
  },
  {
    id: 3,
    name: "Neon Sigils",
    description: "Digital runes pulsing with cybernetic energy and ancient power",
    creator: "Wolfgang",
    itemCount: 8,
    floorPrice: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    banner: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Cyber Sigil",
        price: "3.4 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 2,
        name: "Digital Rune",
        price: "3.0 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 3,
        name: "Neon Emblem",
        price: "3.5 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 4,
        name: "Cyber Symbol",
        price: "3.1 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 5,
        name: "Digital Artifact",
        price: "3.3 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 6,
        name: "Neon Artifact",
        price: "3.2 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 7,
        name: "Cyber Glyph",
        price: "3.6 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 8,
        name: "Digital Emblem",
        price: "3.0 TRUST",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
    ],
  },
  {
    id: 4,
    name: "Shadow Crystals",
    description: "Crystalline formations infused with dark energy and forbidden magic",
    creator: "Wolfgang",
    itemCount: 8,
    floorPrice: "4.1 TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    banner: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
    verified: false,
    nfts: [
      {
        id: 1,
        name: "Dark Crystal",
        price: "4.3 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 2,
        name: "Shadow Formation",
        price: "4.0 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 3,
        name: "Mystical Crystal",
        price: "4.2 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 4,
        name: "Forbidden Crystal",
        price: "4.4 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 5,
        name: "Crystal of Power",
        price: "4.1 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 6,
        name: "Void Crystal",
        price: "4.5 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 7,
        name: "Ethereal Crystal",
        price: "4.3 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 8,
        name: "Shadow Artifact",
        price: "4.0 TRUST",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
    ],
  },
  {
    id: 5,
    name: "Cyber Oracles",
    description: "Prophetic masks that reveal glimpses of digital futures",
    creator: "Wolfgang",
    itemCount: 8,
    floorPrice: "2.9 TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    banner: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Oracle Mask",
        price: "3.0 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 2,
        name: "Digital Prophet",
        price: "3.2 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 3,
        name: "Cyber Seer",
        price: "2.9 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 4,
        name: "Futuristic Oracle",
        price: "3.1 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 5,
        name: "Digital Visionary",
        price: "3.3 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 6,
        name: "Cyber Oracle",
        price: "2.8 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 7,
        name: "Futuristic Seer",
        price: "3.4 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 8,
        name: "Digital Oracle",
        price: "3.0 TRUST",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
    ],
  },
  {
    id: 6,
    name: "Phoenix Feathers",
    description: "Remnants of digital phoenixes, burning with eternal cyber-flame",
    creator: "Wolfgang",
    itemCount: 8,
    floorPrice: "5.7 TRUST",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    banner: "/digital-phoenix-nest-with-glowing-cyan-flames-and-.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Phoenix Feather",
        price: "5.9 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 2,
        name: "Cyber Flame",
        price: "5.5 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 3,
        name: "Digital Ash",
        price: "5.8 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 4,
        name: "Eternal Flame",
        price: "5.6 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 5,
        name: "Phoenix Artifact",
        price: "5.7 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 6,
        name: "Cyber Phoenix",
        price: "5.4 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 7,
        name: "Digital Feather",
        price: "5.9 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 8,
        name: "Eternal Ash",
        price: "5.5 TRUST",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
    ],
  },
]

const mockCreators = [
  {
    id: 1,
    name: "Wolfgang",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    followers: "5.2K",
    verified: true,
  },
]

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678")
  const [comingSoonCountdowns, setComingSoonCountdowns] = useState<
    Record<number, { days: number; hours: number; minutes: number; seconds: number }>
  >({})

  useEffect(() => {
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
          3: { days, hours, minutes, seconds },
          4: { days, hours, minutes, seconds },
          5: { days, hours, minutes, seconds },
        })
      }
    }

    updateComingSoonCountdown()
    const comingSoonInterval = setInterval(updateComingSoonCountdown, 1000)

    return () => clearInterval(comingSoonInterval)
  }, [])

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], artifacts: [] }

    const query = searchQuery.toLowerCase()

    const filteredCreators = mockCreators.filter((creator) => creator.name.toLowerCase().includes(query))

    const filteredCollections = collections.filter(
      (collection) => collection.name.toLowerCase().includes(query) || collection.creator.toLowerCase().includes(query),
    )

    const allArtifacts = collections.flatMap(
      (collection) =>
        collection.nfts?.map((nft) => ({
          ...nft,
          collectionName: collection.name,
          creator: collection.creator,
        })) || [],
    )

    const filteredArtifacts = allArtifacts.filter(
      (artifact) => artifact.name.toLowerCase().includes(query) || artifact.creator.toLowerCase().includes(query),
    )

    return { creators: filteredCreators, collections: filteredCollections, artifacts: filteredArtifacts }
  }

  const searchResults = getSearchResults()
  const hasResults =
    searchResults.creators.length > 0 || searchResults.collections.length > 0 || searchResults.artifacts.length > 0

  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const openCollectionModal = (collection) => {
    setSelectedCollection(collection)
  }

  const closeCollectionModal = () => {
    setSelectedCollection(null)
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
              <a
                href="/"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
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
                className="text-cyan-400 font-medium text-xl"
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

      {/* Search Overlay */}
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
                placeholder="Search for creators, collections, or artifacts..."
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
                        <a key={creator.id} href="/creators">
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
                        </a>
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
                        <Card
                          key={collection.id}
                          className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300"
                          onClick={() => {
                            openCollectionModal(collection)
                            setIsSearchOpen(false)
                          }}
                        >
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
                      ))}
                    </div>
                  </div>
                )}

                {/* Artifacts Results */}
                {searchResults.artifacts.length > 0 && (
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-cyan-400 mb-3 flex items-center space-x-2">
                      <Gem className="w-5 h-5" />
                      <span>Artifacts ({searchResults.artifacts.length})</span>
                    </h3>
                    <div className="grid gap-3">
                      {searchResults.artifacts.map((artifact) => (
                        <Card
                          key={`${artifact.collectionName}-${artifact.id}`}
                          className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={artifact.image || "/placeholder.svg"}
                              alt={artifact.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-card-foreground">{artifact.name}</h4>
                              <p className="text-muted-foreground text-sm">
                                from {artifact.collectionName} • by {artifact.creator}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-cyan-500/30 text-cyan-100 border-cyan-400/50 font-semibold"
                            >
                              {artifact.price}
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

      {/* Collection Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-black/95 border border-cyan-500/30 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl shadow-cyan-500/20">
            {/* Modal Header */}
            <div className="relative p-8 border-b border-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    {selectedCollection.name}
                  </h2>
                  <p className="text-gray-300 text-lg">by {selectedCollection.creator}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCollectionModal}
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              {selectedCollection.name !== "Void Walkers" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                      <Sparkles className="w-16 h-16 text-cyan-400" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-full blur-xl"></div>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    Coming Soon
                  </h3>
                  {comingSoonCountdowns[selectedCollection.id] && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-6 w-full max-w-sm">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <Clock className="w-5 h-5 text-cyan-400" />
                        <span className="text-cyan-400 font-semibold">Collection Launches In:</span>
                      </div>
                      <div className="grid grid-cols-4 gap-3 text-center mb-6">
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-cyan-400">
                            {comingSoonCountdowns[selectedCollection.id].days}
                          </div>
                          <div className="text-xs text-muted-foreground">Days</div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-cyan-400">
                            {comingSoonCountdowns[selectedCollection.id].hours}
                          </div>
                          <div className="text-xs text-muted-foreground">Hours</div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-cyan-400">
                            {comingSoonCountdowns[selectedCollection.id].minutes}
                          </div>
                          <div className="text-xs text-muted-foreground">Minutes</div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-cyan-400">
                            {comingSoonCountdowns[selectedCollection.id].seconds}
                          </div>
                          <div className="text-xs text-muted-foreground">Seconds</div>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          const startDate = new Date()
                          startDate.setDate(startDate.getDate() + 7)
                          startDate.setHours(0, 0, 0, 0)
                          const endDate = new Date(startDate)
                          endDate.setHours(1, 0, 0, 0)

                          const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
                          const title = encodeURIComponent(`${selectedCollection.name} Collection - Coming Soon`)
                          const details = encodeURIComponent(
                            `The ${selectedCollection.name} collection by ${selectedCollection.creator} launches soon!`,
                          )
                          const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}`
                          window.open(calendarUrl, "_blank")
                        }}
                        className="w-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 border border-cyan-400/50 hover:from-cyan-500/50 hover:to-violet-500/50 text-cyan-100 font-semibold"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  )}
                  <p className="text-gray-300 text-lg mb-2 max-w-md">
                    This sacred collection is being prepared by The Overmind. Return soon to witness these digital
                    artifacts.
                  </p>
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {selectedCollection.nfts?.map((nft) => (
                    <div
                      key={nft.id}
                      className="group relative bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20"
                    >
                      {/* NFT Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* NFT Info */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                          {nft.name}
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-cyan-400 font-bold">{nft.price}</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-cyan-600/20 to-violet-600/20 border border-cyan-500/30 hover:from-cyan-600/40 hover:to-violet-600/40 hover:border-cyan-400/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20 text-white">
                          Acquire
                        </Button>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl"></div>
                        <div className="absolute inset-0 border border-cyan-400/20 rounded-xl animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Sacred Collections
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-mono">
            Curated assemblages of digital artifacts, each collection a testament to the artistry and vision of The
            Overmind's chosen creators.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
              onClick={() => openCollectionModal(collection)}
            >
              {/* Collection Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={collection.banner || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Verified Badge */}
                {collection.verified && (
                  <div className="absolute top-4 right-4 bg-cyan-500/20 border border-cyan-500/50 rounded-full p-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
              </div>

              {/* Collection Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        by {collection.creator} • {collection.itemCount} artifacts
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-2">{collection.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{collection.itemCount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Floor Price</p>
                    <p className="text-cyan-400 font-bold">{collection.floorPrice}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-cyan-500/30 border border-cyan-400/50 hover:bg-cyan-500/50 hover:text-white transition-all duration-300 text-cyan-100 font-semibold">
                  Explore Collection
                </Button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCollections.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No collections found</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </main>

      <GalleryFooter />
    </div>
  )
}
