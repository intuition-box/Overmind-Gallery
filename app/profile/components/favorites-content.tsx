// app/profile/components/favorites-content.tsx
"use client"

import { Star, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Mock favorited data - mix of NFTs and Collections
const mockFavorites = {
  nfts: [
    {
      id: 1,
      title: "The Obsidian Codex",
      creator: "DigitalMystic",
      price: "2.5 TRUST",
      image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
      collectionSlug: "ancient-codex",
      collectionName: "Ancient Codex",
    },
    {
      id: 3,
      title: "Neon Sigil of Power",
      creator: "RuneForger",
      price: "3.2 TRUST",
      image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
      collectionSlug: "neon-sigils",
      collectionName: "Neon Sigils",
    },
    {
      id: 5,
      title: "Cyber Oracle Mask",
      creator: "TechnoMage",
      price: "2.9 TRUST",
      image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
      collectionSlug: "cyber-oracles",
      collectionName: "Cyber Oracles",
    },
  ],
  collections: [
    {
      id: 1,
      slug: "void-walkers",
      name: "Void Walkers",
      description: "Ethereal beings that traverse the boundaries between dimensions",
      creator: "Wolfgang",
      itemCount: 8,
      floorPrice: "1.8 TRUST",
      image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
      banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
      verified: true,
      type: "collection" as const,
    },
    {
      id: 2,
      slug: "phoenix-feathers",
      name: "Phoenix Feathers",
      description: "Remnants of digital phoenixes, burning with eternal cyber-flame",
      creator: "Wolfgang",
      itemCount: 8,
      floorPrice: "5.7 TRUST",
      image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
      banner: "/digital-phoenix-nest-with-glowing-cyan-flames-and-.png",
      verified: true,
      type: "collection" as const,
    },
  ],
}

export default function FavoritesContent() {
  const hasAnyFavorites = mockFavorites.nfts.length > 0 || mockFavorites.collections.length > 0

  if (!hasAnyFavorites) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-6">
          <Star className="w-24 h-24 text-gray-700/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-gray-700/20 rounded-full animate-pulse" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">No favorites yet</h3>
        <p className="text-gray-500 max-w-md">
          Click the star on any artifact or collection to save it here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Favorited Collections - ONLY GRID CHANGED TO MATCH "Created" IN MY NFTs */}
      {mockFavorites.collections.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-cyan-400 fill-current" />
            Favorited Collections
          </h3>
          {/* GRID NOW IDENTICAL TO "Created" SECTION */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockFavorites.collections.map((collection) => (
              <Link href={`/collections/${collection.slug}`} key={collection.id}>
                <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-cyan shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Users className="w-3 h-3" />
                      <span>{collection.itemCount} items</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Favorited Artifacts - ONLY GRID CHANGED TO MATCH "Owned" IN MY NFTs */}
      {mockFavorites.nfts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-cyan-400 fill-current" />
            Favorited Artifacts
          </h3>
          {/* GRID NOW IDENTICAL TO "Owned" SECTION */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockFavorites.nfts.map((nft) => (
              <Link href={`/collections/${nft.collectionSlug}`} key={nft.id}>
                <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-violet shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                      {nft.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{nft.collectionName}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}