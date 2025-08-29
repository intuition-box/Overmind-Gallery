"use client"

import { useState } from "react"
import { Search, Users, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/Header"

const collections = [
  {
    id: 1,
    name: "Ancient Codex",
    description: "Mystical tomes containing forgotten knowledge and arcane wisdom",
    creator: "The Scribe",
    itemCount: 47,
    floorPrice: "2.5 ETH",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    banner: "/ancient-library-with-glowing-books-and-mystical-at.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Tome of Shadows",
        price: "2.8 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 2,
        name: "Grimoire of Light",
        price: "3.1 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 3,
        name: "Codex Arcanum",
        price: "2.5 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 4,
        name: "Book of Whispers",
        price: "2.9 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 5,
        name: "Chronicle of Void",
        price: "3.3 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 6,
        name: "Manuscript of Time",
        price: "2.7 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 7,
        name: "Scroll of Eternity",
        price: "3.0 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
      {
        id: 8,
        name: "Lexicon of Dreams",
        price: "2.6 ETH",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      },
    ],
  },
  {
    id: 2,
    name: "Void Walkers",
    description: "Ethereal beings that traverse the boundaries between dimensions",
    creator: "Shadow Weaver",
    itemCount: 333,
    floorPrice: "1.8 ETH",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Phantom Wanderer",
        price: "1.9 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 2,
        name: "Shadow Drifter",
        price: "2.1 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 3,
        name: "Void Sentinel",
        price: "1.8 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 4,
        name: "Ethereal Guide",
        price: "2.0 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 5,
        name: "Dimension Walker",
        price: "2.3 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 6,
        name: "Astral Nomad",
        price: "1.7 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 7,
        name: "Spirit Traveler",
        price: "2.2 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
      {
        id: 8,
        name: "Void Keeper",
        price: "1.9 ETH",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      },
    ],
  },
  {
    id: 3,
    name: "Neon Sigils",
    description: "Digital runes pulsing with cybernetic energy and ancient power",
    creator: "Rune Master",
    itemCount: 108,
    floorPrice: "3.2 ETH",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    banner: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Cyber Sigil",
        price: "3.4 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 2,
        name: "Digital Rune",
        price: "3.0 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 3,
        name: "Neon Emblem",
        price: "3.5 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 4,
        name: "Cyber Symbol",
        price: "3.1 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 5,
        name: "Digital Artifact",
        price: "3.3 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 6,
        name: "Neon Artifact",
        price: "3.2 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 7,
        name: "Cyber Glyph",
        price: "3.6 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
      {
        id: 8,
        name: "Digital Emblem",
        price: "3.0 ETH",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      },
    ],
  },
  {
    id: 4,
    name: "Shadow Crystals",
    description: "Crystalline formations infused with dark energy and forbidden magic",
    creator: "Crystal Sage",
    itemCount: 77,
    floorPrice: "4.1 ETH",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    banner: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
    verified: false,
    nfts: [
      {
        id: 1,
        name: "Dark Crystal",
        price: "4.3 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 2,
        name: "Shadow Formation",
        price: "4.0 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 3,
        name: "Mystical Crystal",
        price: "4.2 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 4,
        name: "Forbidden Crystal",
        price: "4.4 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 5,
        name: "Crystal of Power",
        price: "4.1 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 6,
        name: "Void Crystal",
        price: "4.5 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 7,
        name: "Ethereal Crystal",
        price: "4.3 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
      {
        id: 8,
        name: "Shadow Artifact",
        price: "4.0 ETH",
        image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
      },
    ],
  },
  {
    id: 5,
    name: "Cyber Oracles",
    description: "Prophetic masks that reveal glimpses of digital futures",
    creator: "The Prophet",
    itemCount: 156,
    floorPrice: "2.9 ETH",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    banner: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Oracle Mask",
        price: "3.0 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 2,
        name: "Digital Prophet",
        price: "3.2 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      { id: 3, name: "Cyber Seer", price: "2.9 ETH", image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png" },
      {
        id: 4,
        name: "Futuristic Oracle",
        price: "3.1 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 5,
        name: "Digital Visionary",
        price: "3.3 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 6,
        name: "Cyber Oracle",
        price: "2.8 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 7,
        name: "Futuristic Seer",
        price: "3.4 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
      {
        id: 8,
        name: "Digital Oracle",
        price: "3.0 ETH",
        image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      },
    ],
  },
  {
    id: 6,
    name: "Phoenix Feathers",
    description: "Remnants of digital phoenixes, burning with eternal cyber-flame",
    creator: "Fire Keeper",
    itemCount: 89,
    floorPrice: "5.7 ETH",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    banner: "/digital-phoenix-nest-with-glowing-cyan-flames-and-.png",
    verified: true,
    nfts: [
      {
        id: 1,
        name: "Phoenix Feather",
        price: "5.9 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 2,
        name: "Cyber Flame",
        price: "5.5 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 3,
        name: "Digital Ash",
        price: "5.8 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 4,
        name: "Eternal Flame",
        price: "5.6 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 5,
        name: "Phoenix Artifact",
        price: "5.7 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 6,
        name: "Cyber Phoenix",
        price: "5.4 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 7,
        name: "Digital Feather",
        price: "5.9 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
      {
        id: 8,
        name: "Eternal Ash",
        price: "5.5 ETH",
        image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      },
    ],
  },
]

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)

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
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <Header currentPage="collections" onSearchOpen={() => setIsSearchOpen(true)} />

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32">
          <div className="bg-gray-900/90 border border-cyan-500/30 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search collections..."
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
                      <Button className="w-full bg-gradient-to-r from-cyan-600/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-600/40 hover:to-violet-600/40 hover:border-cyan-400/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
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
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
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
                <Button className="w-full bg-gradient-to-r from-cyan-600/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-600/30 hover:to-violet-600/30 hover:border-cyan-400/50 transition-all duration-300">
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
    </div>
  )
}
