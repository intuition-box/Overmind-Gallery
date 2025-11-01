"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, User, Folder, Gem, X, Menu, Wallet } from "lucide-react"
import Link from "next/link"
import ProfileDropdown from "@/components/profile-dropdown"

// Mock data for search functionality
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

const mockRelics = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "Wolfgang",
    price: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "Wolfgang",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "Wolfgang",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "Wolfgang",
    price: "4.1 TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isProfilePage = ["/activity", "/profile-settings", "/user-stats", "/my-nfts"].includes(pathname)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678")

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], relics: [] }

    const query = searchQuery.toLowerCase().trim()

    const filteredCreators = mockCreators.filter((creator) => creator.name.toLowerCase().includes(query))

    const filteredCollections = mockCollections.filter(
      (collection) => collection.name.toLowerCase().includes(query) || collection.creator.toLowerCase().includes(query),
    )

    const filteredRelics = mockRelics.filter(
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
    <>
      {!isProfilePage && (
        <header className="relative z-10 border-b border-border backdrop-blur-sm">
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

              {/* Navigation - hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="/"
                  className={
                    pathname === "/"
                      ? "font-medium text-primary"
                      : "font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  Home
                </a>
                <a
                  href="/explore"
                  className={
                    pathname === "/explore"
                      ? "font-medium text-primary"
                      : "font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  Explore
                </a>
                <Link
                  href="/about"
                  className={
                    pathname === "/about"
                      ? "font-medium text-primary"
                      : "font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  About
                </Link>
                <a
                  href="/collections"
                  className={
                    pathname === "/collections"
                      ? "font-medium text-primary"
                      : "font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  Collections
                </a>
                <a
                  href="/creators"
                  className={
                    pathname === "/creators"
                      ? "font-medium text-primary"
                      : "font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  Creators
                </a>
              </nav>

              {/* Search and Connect - search hidden on mobile, wallet icon only on mobile */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden sm:flex text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Search className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleWalletConnect}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-medium transition-all duration-300 hidden sm:flex"
                >
                  <Wallet className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">{isWalletConnected ? walletAddress : "Connect Wallet"}</span>
                </Button>
                <Button
                  onClick={handleWalletConnect}
                  variant="ghost"
                  size="sm"
                  className="sm:hidden text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  <Wallet className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <ProfileDropdown />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden text-muted-foreground hover:text-primary"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Menu Overlay */}
      {!isProfilePage && isMobileMenuOpen && (
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
                <Search className="w-6 h-6 mr-3" />
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
              <a
                href="/"
                className={
                  pathname === "/"
                    ? "text-primary font-medium text-xl"
                    : "text-muted-foreground hover:text-primary transition-colors text-xl"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/explore"
                className={
                  pathname === "/explore"
                    ? "text-primary font-medium text-xl"
                    : "text-muted-foreground hover:text-primary transition-colors text-xl"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </a>
              <Link
                href="/about"
                className={
                  pathname === "/about"
                    ? "text-primary font-medium text-xl"
                    : "text-muted-foreground hover:text-primary transition-colors text-xl"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="/collections"
                className={
                  pathname === "/collections"
                    ? "text-primary font-medium text-xl"
                    : "text-muted-foreground hover:text-primary transition-colors text-xl"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a
                href="/creators"
                className={
                  pathname === "/creators"
                    ? "text-primary font-medium text-xl"
                    : "text-muted-foreground hover:text-primary transition-colors text-xl"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creators
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {!isProfilePage && (
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
      )}
    </>
  )
}

export default SiteHeader
