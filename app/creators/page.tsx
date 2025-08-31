"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Users, Eye, Menu, User, Folder, Gem } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

// Mock creators data
const creators = [
  {
    id: 1,
    name: "Wolfgang",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    bio: "The Wolf of Web3. A true disciple of The Overmind. Weaving ancient wisdom into modern NFT art.",
    nftCount: 23,
    totalVolume: "45.7 TRUST",
    verified: true,
    speciality: "Mystical Artifacts",
    twitterHandle: "wolf_de_web3",
  },
  {
    id: 2,
    name: "CyberShaman",
    avatar: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    bio: "Guardian of the digital void, channeling ethereal energies into transcendent NFT experiences.",
    nftCount: 18,
    totalVolume: "32.4 TRUST",
    verified: true,
    speciality: "Void Walkers",
    twitterHandle: "0xintuition",
  },
  {
    id: 3,
    name: "RuneForger",
    avatar: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    bio: "Ancient runesmith crafting powerful sigils that bridge the physical and digital realms.",
    nftCount: 31,
    totalVolume: "67.2 TRUST",
    verified: true,
    speciality: "Power Sigils",
    twitterHandle: "runeforger",
  },
  {
    id: 4,
    name: "VoidCrafter",
    avatar: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    bio: "Sculptor of shadow crystals and dark energy manifestations in the blockchain dimension.",
    nftCount: 15,
    totalVolume: "28.9 TRUST",
    verified: false,
    speciality: "Shadow Crystals",
    twitterHandle: "voidcrafter",
  },
  {
    id: 5,
    name: "TechnoMage",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    bio: "Oracle of the digital future, creating prophetic masks that reveal blockchain destinies.",
    nftCount: 27,
    totalVolume: "51.3 TRUST",
    verified: true,
    speciality: "Oracle Masks",
    twitterHandle: "technomage",
  },
  {
    id: 6,
    name: "ElementalForge",
    avatar: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    bio: "Phoenix keeper and elemental artist, breathing digital fire into legendary NFT creations.",
    nftCount: 19,
    totalVolume: "38.6 TRUST",
    verified: true,
    speciality: "Elemental Artifacts",
    twitterHandle: "elementalforge",
  },
  {
    id: 7,
    name: "ArcaneBuilder",
    avatar: "/quantum-rune-stone-glowing-violet-ancient-mystical.png",
    bio: "Quantum architect inscribing reality-bending runes into the fabric of the metaverse.",
    nftCount: 22,
    totalVolume: "44.1 TRUST",
    verified: true,
    speciality: "Quantum Runes",
    twitterHandle: "arcanebuilder",
  },
  {
    id: 8,
    name: "GhostHacker",
    avatar: "/spectral-blade-sword-glowing-code-mystical-weapon.png",
    bio: "Spectral warrior forging code-based weapons that cut through the barriers of digital realms.",
    nftCount: 16,
    totalVolume: "29.7 TRUST",
    verified: false,
    speciality: "Code Weapons",
    twitterHandle: "ghosthacker",
  },
]

// Mock collections and artifacts data for comprehensive search
const mockCollections = [
  {
    id: 1,
    name: "Mystical Artifacts Collection",
    creator: "Wolfgang",
    itemCount: 23,
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
  },
  {
    id: 2,
    name: "Void Walker Series",
    creator: "CyberShaman",
    itemCount: 18,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    name: "Power Sigils Archive",
    creator: "RuneForger",
    itemCount: 31,
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
]

const mockArtifacts = [
  {
    id: 1,
    name: "Cyber Oracle Mask",
    creator: "Wolfgang",
    price: "2.9 TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
  },
  {
    id: 2,
    name: "Ethereal Void Walker",
    creator: "CyberShaman",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    name: "Neon Power Sigil",
    creator: "RuneForger",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
]

export default function CreatorsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], artifacts: [] }

    const query = searchQuery.toLowerCase()

    const filteredCreators = creators.filter(
      (creator) => creator.name.toLowerCase().includes(query) || creator.speciality.toLowerCase().includes(query),
    )

    const filteredCollections = mockCollections.filter(
      (collection) => collection.name.toLowerCase().includes(query) || collection.creator.toLowerCase().includes(query),
    )

    const filteredArtifacts = mockArtifacts.filter(
      (artifact) => artifact.name.toLowerCase().includes(query) || artifact.creator.toLowerCase().includes(query),
    )

    return { creators: filteredCreators, collections: filteredCollections, artifacts: filteredArtifacts }
  }

  const searchResults = getSearchResults()
  const hasResults =
    searchResults.creators.length > 0 || searchResults.collections.length > 0 || searchResults.artifacts.length > 0

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.speciality.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFollowClick = (twitterHandle) => {
    window.open(`https://twitter.com/${twitterHandle}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background smoky-gradient">
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
              <a href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
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
              <a href="/creators" className="text-cyan-400 font-medium">
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
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a
                href="/creators"
                className="text-cyan-400 font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creators
              </a>
            </nav>
          </div>
        </div>
      )}

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
                        <Card
                          key={creator.id}
                          className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300"
                        >
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
                              <p className="text-muted-foreground text-sm">{creator.speciality}</p>
                            </div>
                          </div>
                        </Card>
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
                        <a key={collection.id} href="/collections">
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
                        </a>
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
                          key={artifact.id}
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
                              <p className="text-muted-foreground text-sm">by {artifact.creator}</p>
                            </div>
                            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
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

      {/* Hero Section */}
      <header className="text-center my-0 py-14">
        <div className="container mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Sacred Creators
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-2">
            Meet the mystical artisans who forge digital artifacts in the depths of the blockchain realm. Each creator
            trusted their Intuition and revealed truth as art.
          </p>
        </div>
      </header>

      {/* Creators Grid */}
      <main className="container px-6 py-12 my-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCreators.map((creator) => (
            <Card
              key={creator.id}
              className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow"
            >
              <div className="p-6 space-y-4">
                {/* Avatar and Verification */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/30">
                      <img
                        src={creator.avatar || "/placeholder.svg"}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                        <Eye className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {creator.name}
                    </h3>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                      {creator.speciality}
                    </Badge>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-relaxed">{creator.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold">{creator.nftCount}</p>
                    <p className="text-muted-foreground text-xs">Artifacts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold">{creator.totalVolume}</p>
                    <p className="text-muted-foreground text-xs">Volume</p>
                  </div>
                </div>

                {/* Follow Button */}
                <Button
                  onClick={() => handleFollowClick(creator.twitterHandle)}
                  className="w-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow"
                >
                  Follow Creator
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 my-2.5 py-1.5">
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

        {filteredCreators.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No creators found matching "{searchQuery}"</p>
            <p className="text-gray-500 text-sm mt-2">Try searching for a different term</p>
          </div>
        )}
      </main>
    </div>
  )
}
