"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Users, Eye } from "lucide-react"
import { Header } from "@/components/layout/Header"

// Mock creators data
const creators = [
  {
    id: 1,
    name: "Wolfgang",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    bio: "The Wolf of Web3. A true disciple of The Overmind. Weaving ancient wisdom into modern NFT art.",
    nftCount: 23,
    totalVolume: "45.7 ETH",
    followers: 1247,
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
    totalVolume: "32.4 ETH",
    followers: 892,
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
    totalVolume: "67.2 ETH",
    followers: 1856,
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
    totalVolume: "28.9 ETH",
    followers: 634,
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
    totalVolume: "51.3 ETH",
    followers: 1423,
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
    totalVolume: "38.6 ETH",
    followers: 967,
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
    totalVolume: "44.1 ETH",
    followers: 1189,
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
    totalVolume: "29.7 ETH",
    followers: 743,
    verified: false,
    speciality: "Code Weapons",
    twitterHandle: "ghosthacker",
  },
]

export default function CreatorsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
      <Header currentPage="creators" onSearchOpen={() => setIsSearchOpen(true)} />

      {isSearchOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/95 border border-cyan-500/30 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl shadow-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-6 h-6 text-cyan-400" />
            <input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery('')
              }}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
        </div>
      )}

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
            channels ancient wisdom through modern artistry.
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
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold">{creator.nftCount}</p>
                    <p className="text-muted-foreground text-xs">Artifacts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold">{creator.totalVolume}</p>
                    <p className="text-muted-foreground text-xs">Volume</p>
                  </div>
                  <div className="text-center">
                    <p className="text-card-foreground font-semibold">{creator.followers}</p>
                    <p className="text-muted-foreground text-xs">Followers</p>
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
