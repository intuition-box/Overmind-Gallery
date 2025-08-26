"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, X, Eye, Menu } from "lucide-react"

// Mock NFT data
const nftRelics = [
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
  {
    id: 5,
    title: "Cyber Oracle Mask",
    creator: "TechnoMage",
    price: "2.9 ETH",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    description: "An ancient mask that grants visions of future blockchain events.",
  },
  {
    id: 6,
    title: "Digital Phoenix Feather",
    creator: "ElementalForge",
    price: "1.6 ETH",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    description: "A feather from the legendary digital phoenix, symbol of rebirth.",
  },
  {
    id: 7,
    title: "Quantum Rune Stone",
    creator: "ArcaneBuilder",
    price: "5.3 ETH",
    image: "/quantum-rune-stone-glowing-violet-ancient-mystical.png",
    description: "A stone inscribed with quantum runes that bend reality itself.",
  },
  {
    id: 8,
    title: "Spectral Blade of Code",
    creator: "GhostHacker",
    price: "3.7 ETH",
    image: "/spectral-blade-sword-glowing-code-mystical-weapon.png",
    description: "A blade forged from pure code, capable of cutting through any firewall.",
  },
]

export default function ExplorePage() {
  const [selectedRelic, setSelectedRelic] = useState<(typeof nftRelics)[0] | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filteredRelics = nftRelics.filter(
    (relic) =>
      relic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      relic.creator.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <a href="/explore" className="text-cyan-400 font-medium">
                Explore
              </a>
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
                className="text-cyan-400 font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </a>
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

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32">
          <div className="bg-gray-900/90 border border-cyan-500/30 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search artifacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Updated Hero Section with Gradient Text Styling */}
      <header className="text-center my-0 py-[57px]">
        <div className="container mx-auto px-6">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Explore Sacred Artifacts
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-2">
            Discover the complete collection of digital artifacts, each one a testament to the power of The Overmind.
          </p>
        </div>
      </header>

      {/* NFT Grid */}
      <main className="container px-6 py-12 my-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRelics.map((relic) => (
            <Card
              key={relic.id}
              className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow"
              onClick={() => setSelectedRelic(relic)}
            >
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
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    {relic.price}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow"
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
    </div>
  )
}
