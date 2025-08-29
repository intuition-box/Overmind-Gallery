"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, User, Folder, Gem, X } from "lucide-react"
import Link from "next/link"
import { RelicCard } from "@/components/web3/RelicCard"
import { Header } from "@/components/layout/Header"

// Mock curated NFTs for homepage
const curatedRelics = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "DigitalMystic",
    price: "2.5 ETH",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    description: "An ancient digital grimoire containing forbidden knowledge of the blockchain realm.",
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "CyberShaman",
    price: "1.8 ETH",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral guardian that traverses between digital dimensions.",
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "RuneForger",
    price: "3.2 ETH",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    description: "A powerful sigil that channels the energy of the digital cosmos.",
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "VoidCrafter",
    price: "4.1 ETH",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    description: "A crystalline artifact that holds the essence of shadow magic.",
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

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], relics: [] }

    const query = searchQuery.toLowerCase()

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

      <Header currentPage="home" onSearchOpen={() => setIsSearchOpen(true)} />

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
          {curatedRelics.map((relic, index) => (
            <RelicCard
              key={relic.id}
              tokenId={index + 1}
              title={relic.title}
              image={relic.image}
              creator={relic.creator}
              price={relic.price}
              onAcquire={() => setSelectedRelic(relic)}
            />
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
        <DialogContent className="max-w-2xl obsidian-texture border-border/30 rune-glow-violet">
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

                  <Button className="w-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow py-6 text-lg font-semibold">
                    Acquire Sacred Artifact
                  </Button>
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
