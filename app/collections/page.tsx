// app/collections/page.tsx
"use client"

import { useState } from "react"
import { Search, Eye, Users, Sparkles, X, Gavel, Copy, Check, User, Gem, Activity, BarChart3, Share2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import SiteHeader from "@/components/site-header"


const collections = [
  {
    id: 1,
    slug: "ancient-codex",
    name: "Ancient Codex",
    description: "Mystical tomes containing forgotten knowledge and arcane wisdom",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "2.5 TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    banner: "/ancient-library-with-glowing-books-and-mystical-at.png",
    verified: true,
  },
  {
    id: 2,
    slug: "void-walkers",
    name: "Void Walkers",
    description: "Ethereal beings that traverse the boundaries between dimensions",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    verified: true,
  },
  {
    id: 3,
    slug: "neon-sigils",
    name: "Neon Sigils",
    description: "Digital runes pulsing with cybernetic energy and ancient power",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    banner: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    verified: true,
  },
  {
    id: 4,
    slug: "shadow-crystals",
    name: "Shadow Crystals",
    description: "Crystalline formations infused with dark energy and forbidden magic",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "4.1 TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    banner: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
    verified: false,
  },
  {
    id: 5,
    slug: "cyber-oracles",
    name: "Cyber Oracles",
    description: "Prophetic masks that reveal glimpses of digital futures",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "2.9 TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    banner: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
    verified: true,
  },
  {
    id: 6,
    slug: "phoenix-feathers",
    name: "Phoenix Feathers",
    description: "Remnants of digital phoenixes, burning with eternal cyber-flame",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    floorPrice: "5.7 TRUST",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    banner: "/digital-phoenix-nest-with-glowing-cyan-flames-and-.png",
    verified: true,
  },
]

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

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

        {/* Collections Grid - Now with proper navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <Link href={`/collections/${collection.slug}`} key={collection.id}>
              <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer">
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
            </Link>
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
    </div>
  )
}