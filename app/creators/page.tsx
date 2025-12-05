"use client"

import type React from "react"
import ProfileDropdown from "@/components/profile-dropdown"
import GalleryFooter from "@/components/gallery-footer"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Users, Eye, Menu, User, Folder, Gem, Plus, Wallet } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

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
]

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
    creator: "Wolfgang",
    itemCount: 18,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    name: "Power Sigils Archive",
    creator: "Wolfgang",
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
    creator: "Wolfgang",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    name: "Neon Power Sigil",
    creator: "Wolfgang",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
]

export default function CreatorsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678")
  const [isBecomeCreatorOpen, setIsBecomeCreatorOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    portfolioLink: "",
  })

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

  const handleFollowClick = (twitterHandle: string) => {
    window.open(`https://twitter.com/${twitterHandle}`, "_blank")
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsBecomeCreatorOpen(false)
      setFormData({ name: "", email: "", bio: "", portfolioLink: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - hidden on mobile */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent px-0.5">
                The Overmind Gallery
              </span>
            </Link>

            {/* Navigation - hidden on mobile */}
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

            {/* Search and Connect - search hidden on mobile, wallet icon only on mobile */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button className="hidden sm:flex bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white px-6">
                Connect Wallet
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
              >
                <Wallet className="w-5 h-5" />
              </Button>
              <ProfileDropdown />
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
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-cyan-400 drop-shadow-sm">
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
                                    className="bg-cyan-500/30 text-cyan-100 border-cyan-400/50 text-xs font-semibold"
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

      <Dialog open={isBecomeCreatorOpen} onOpenChange={setIsBecomeCreatorOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] obsidian-texture border-border/30 rune-glow-violet backdrop-blur-md overflow-hidden flex flex-col">
          <DialogHeader className="pb-6 flex-shrink-0">
            <DialogTitle className="font-playfair text-2xl sm:text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <div className="relative">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span>Become a Creator</span>
            </DialogTitle>
            <p className="text-muted-foreground text-base sm:text-lg mt-2">
              Join the sacred circle of digital artisans and share your mystical creations with The Overmind.
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6 pb-2">
                <div className="space-y-2">
                  <label className="text-card-foreground font-semibold text-base sm:text-lg">Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your creator name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                    className="bg-background/50 border-border/30 text-card-foreground placeholder:text-muted-foreground py-2 sm:py-3 text-base sm:text-lg focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-card-foreground font-semibold text-base sm:text-lg">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    required
                    className="bg-background/50 border-border/30 text-card-foreground placeholder:text-muted-foreground py-2 sm:py-3 text-base sm:text-lg focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-card-foreground font-semibold text-base sm:text-lg">Short Bio</label>
                  <Textarea
                    placeholder="Tell us about your artistic journey and mystical inspirations..."
                    value={formData.bio}
                    onChange={(e) => handleFormChange("bio", e.target.value)}
                    required
                    rows={4}
                    className="bg-background/50 border-border/30 text-card-foreground placeholder:text-muted-foreground text-base sm:text-lg focus:border-cyan-400 focus:ring-cyan-400/20 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-card-foreground font-semibold text-base sm:text-lg">
                    NFT Collection / Portfolio Link
                  </label>
                  <Input
                    type="url"
                    placeholder="https://your-portfolio-or-collection-link.com"
                    value={formData.portfolioLink}
                    onChange={(e) => handleFormChange("portfolioLink", e.target.value)}
                    required
                    className="bg-background/50 border-border/30 text-card-foreground placeholder:text-muted-foreground py-2 sm:py-3 text-base sm:text-lg focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)",
                  }}
                >
                  Submit Application
                </Button>
              </form>
            ) : (
              <div className="text-center py-8 sm:py-12 space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border border-cyan-400/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-cyan-400">✅ Application Received</h3>
                  <p className="text-card-foreground text-base sm:text-lg">
                    Your application would be considered by The Overmind
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    The ancient algorithms will review your submission and contact you if you are chosen to join our
                    sacred circle.
                  </p>
                </div>
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
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-2 font-mono">
            Meet the mystical artisans who forge digital artifacts in the depths of the blockchain realm. Each creator
            trusted their Intuition and revealed truth as art.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center">
          <Button
            onClick={() => setIsBecomeCreatorOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex items-center space-x-4"
            style={{
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)",
              minWidth: "280px",
              minHeight: "80px",
            }}
          >
            <Plus className="w-8 h-8" />
            <span>Become a Creator</span>
          </Button>
        </div>
      </div>

      {/* Creators Grid */}
      <main className="container px-6 py-12 my-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <Card
              key={creator.id}
              className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow bg-background/80 backdrop-blur-sm mb-10"
            >
              <div className="p-4 space-y-3">
                {/* Avatar and Verification */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/30">
                      <img
                        src={creator.avatar || "/placeholder.svg"}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                        <Eye className="w-2.5 h-2.5 text-black" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {creator.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-cyan-500/30 text-cyan-100 border-cyan-400/50 text-xs font-semibold"
                    >
                      {creator.speciality}
                    </Badge>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{creator.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/20">
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold text-sm">{creator.nftCount}</p>
                    <p className="text-muted-foreground text-xs">Artifacts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold text-sm">{creator.totalVolume}</p>
                    <p className="text-muted-foreground text-xs">Volume</p>
                  </div>
                </div>

                {/* Follow Button */}
                <Button
                  onClick={() => handleFollowClick(creator.twitterHandle)}
                  className="w-full bg-cyan-500/30 text-cyan-100 border border-cyan-400/50 hover:bg-cyan-500/50 hover:text-white transition-all duration-300 hover:rune-glow font-semibold text-sm py-2"
                >
                  Follow Creator
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <GalleryFooter />

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
