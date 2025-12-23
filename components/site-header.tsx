"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, User, Folder, Gem, X, Menu, Wallet, HelpCircle, ChevronDown } from "lucide-react"
import Link from "next/link"
import ProfileDropdown from "@/components/profile-dropdown"
import Image from "next/image"
import { useAccount } from 'wagmi'

// Updated mock data to match your real structure
const mockCreators = [
  {
    id: 1,
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4", // Wolfgang's address (lowercase for consistency)
    name: "Wolfgang",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    followers: "5.2K",
    verified: true,
  },
  // Add more creators with their real addresses when available
]

const mockCollections = [
  {
    id: 1,
    slug: "ancient-codex",
    name: "Ancient Codex",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    banner: "/ancient-library-with-glowing-books-and-mystical-at.png",
  },
  {
    id: 2,
    slug: "void-walkers",
    name: "Void Walkers",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
  },
  {
    id: 3,
    slug: "neon-sigils",
    name: "Neon Sigils",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    banner: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
  },
  {
    id: 4,
    slug: "shadow-crystals",
    name: "Shadow Crystals",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "4.1 TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    banner: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
  },
  {
    id: 5,
    slug: "cyber-oracles",
    name: "Cyber Oracles",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "2.9 TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    banner: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
  },
  {
    id: 6,
    slug: "phoenix-feathers",
    name: "Phoenix Feathers",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "5.7 TRUST",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    banner: "/digital-phoenix-nest-with-glowing-cyan-flames-and-.png",
  },
]

// Sample artifacts linked to correct collections
const mockArtifacts = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    collectionSlug: "ancient-codex",
    price: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    collectionSlug: "void-walkers",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    collectionSlug: "neon-sigils",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    collectionSlug: "shadow-crystals",
    price: "4.1 TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
  },
  {
    id: 5,
    title: "Cyber Oracle Mask",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    collectionSlug: "cyber-oracles",
    price: "2.9 TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
  },
  {
    id: 6,
    title: "Eternal Phoenix Feather",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    collectionSlug: "phoenix-feathers",
    price: "5.7 TRUST",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { address } = useAccount()

  const isProfilePage = pathname?.startsWith('/profile') || pathname?.startsWith('/my-nfts')

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { creators: [], collections: [], artifacts: [] }
    const query = searchQuery.toLowerCase().trim()

    const filteredCreators = mockCreators.filter((creator) =>
      creator.name.toLowerCase().includes(query) ||
      creator.address.toLowerCase().includes(query)
    )

    const filteredCollections = mockCollections.filter(
      (collection) =>
        collection.name.toLowerCase().includes(query) ||
        collection.creator.toLowerCase().includes(query)
    )

    const filteredArtifacts = mockArtifacts.filter(
      (artifact) =>
        artifact.title.toLowerCase().includes(query) ||
        artifact.creator.toLowerCase().includes(query)
    )

    return { creators: filteredCreators, collections: filteredCollections, artifacts: filteredArtifacts }
  }

  const searchResults = getSearchResults()
  const hasResults =
    searchResults.creators.length > 0 ||
    searchResults.collections.length > 0 ||
    searchResults.artifacts.length > 0

  // Helper to shorten address for display
  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <>
      {!isProfilePage && (
        <header>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/The_Overmind_Gallery_Logo.png"
                  alt="The Overmind Gallery"
                  width={20}
                  height={13}
                  className="w-11 h-11 object-contain"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent px-0.5">
                  The Overmind Gallery
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  href="/"
                  className={pathname === "/" ? "font-medium text-primary" : "font-medium text-muted-foreground hover:text-primary transition-colors"}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={pathname === "/about" ? "font-medium text-primary" : "font-medium text-muted-foreground hover:text-primary transition-colors"}
                >
                  About
                </Link>
                <Link
                  href="/explore"
                  className={pathname === "/explore" ? "font-medium text-primary" : "font-medium text-muted-foreground hover:text-primary transition-colors"}
                >
                  Explore
                </Link>
                <Link
                  href="/collections"
                  className={pathname === "/collections" ? "font-medium text-primary" : "font-medium text-muted-foreground hover:text-primary transition-colors"}
                >
                  Collections
                </Link>
                <Link
                  href="/creators"
                  className={pathname === "/creators" ? "font-medium text-primary" : "font-medium text-muted-foreground hover:text-primary transition-colors"}
                >
                  Creators
                </Link>
                <Link
                  href="/stats"
                  className={pathname === "/stats" ? "font-medium text-primary" : "font-medium text-muted-foreground hover:text-primary transition-colors"}
                >
                  Stats
                </Link>

                {/* Help Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                      Help
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-50 min-w-[180px] bg-background">
                    <DropdownMenuItem asChild>
                      <a href="https://discord.gg/uz29Em9REf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        Discord
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="https://x.com/OvermindGallery" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        X (Twitter)
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden sm:flex text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Search className="w-5 h-5" />
                </Button>

                <div className="hidden sm:block relative z-10">
                  <ConnectButton.Custom>
                    {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                      const ready = mounted && authenticationStatus !== 'loading'
                      const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                      return (
                        <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
                          {!connected ? (
                            <Button onClick={openConnectModal} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-medium transition-all duration-300">
                              Connect Wallet
                            </Button>
                          ) : chain.unsupported ? (
                            <Button onClick={openChainModal} variant="destructive" size="sm" className="font-medium">
                              Wrong network
                              <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                          ) : (
                            <Button onClick={openChainModal} variant="outline" size="sm" className="font-medium border-border/30 hover:border-primary/50 transition-all">
                              {chain.hasIcon && chain.iconUrl && (
                                <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} className="w-4 h-4 mr-2" />
                              )}
                              {chain.name}
                              <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                        </div>
                      )
                    }}
                  </ConnectButton.Custom>
                </div>

                <ProfileDropdown />

                <div className="sm:hidden">
                  <ConnectButton.Custom>
                    {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
                      const ready = mounted && authenticationStatus !== 'loading'
                      const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                      return (
                        <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
                          <Button
                            onClick={connected ? openAccountModal : openConnectModal}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
                          >
                            <Wallet className="w-5 h-5" />
                          </Button>
                        </div>
                      )
                    }}
                  </ConnectButton.Custom>
                </div>

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
        </header>
      )}

      {/* Mobile Menu & Search Modal unchanged – same as before */}
      {/* (Omitted for brevity – identical to previous version) */}

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

                  {/* Creators → /profile/0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4 */}
                  {searchResults.creators.length > 0 && (
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-primary mb-3 flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Creators ({searchResults.creators.length})</span>
                      </h3>
                      <div className="grid gap-3">
                        {searchResults.creators.map((creator) => (
                          <Link
                            key={creator.id}
                            href={`/profile/${creator.address}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="block"
                          >
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
                                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground text-sm font-mono">
                                    {shortenAddress(creator.address)}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collections → /collection/slug */}
                  {searchResults.collections.length > 0 && (
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-secondary mb-3 flex items-center space-x-2">
                        <Folder className="w-5 h-5" />
                        <span>Collections ({searchResults.collections.length})</span>
                      </h3>
                      <div className="grid gap-3">
                        {searchResults.collections.map((collection) => (
                          <Link
                            key={collection.id}
                            href={`/collection/${collection.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="block"
                          >
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
                                <Badge variant="secondary" className="bg-primary/30 text-primary border-primary/50 font-semibold">
                                  Floor: {collection.floorPrice}
                                </Badge>
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artifacts → go to parent collection */}
                  {searchResults.artifacts.length > 0 && (
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-primary mb-3 flex items-center space-x-2">
                        <Gem className="w-5 h-5" />
                        <span>Artifacts ({searchResults.artifacts.length})</span>
                      </h3>
                      <div className="grid gap-3">
                        {searchResults.artifacts.map((artifact) => {
                          const parentCollection = mockCollections.find(c => c.slug === artifact.collectionSlug)
                          return (
                            <Link
                              key={artifact.id}
                              href={`/collection/${artifact.collectionSlug}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="block"
                            >
                              <Card className="p-4 obsidian-texture border-border/30 hover:rune-glow cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                  <img
                                    src={artifact.image || "/placeholder.svg"}
                                    alt={artifact.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-card-foreground">{artifact.title}</h4>
                                    <p className="text-muted-foreground text-sm">
                                      by {artifact.creator} • in {parentCollection?.name || "Collection"}
                                    </p>
                                  </div>
                                  <Badge variant="secondary" className="bg-primary/30 text-primary border-primary/50 font-semibold">
                                    {artifact.price}
                                  </Badge>
                                </div>
                              </Card>
                            </Link>
                          )
                        })}
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