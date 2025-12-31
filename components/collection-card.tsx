// components/collection-card.tsx
"use client"

import { useState } from "react"
import { Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CollectionCardProps {
  collection: {
    id: number
    slug: string
    name: string
    description: string
    creator: string
    itemCount: number
    biddersCount: number  // ← Changed from floorPrice
    image: string
    banner: string
    // verified removed
  }
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false)
  const [showFavoriteToast, setShowFavoriteToast] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setShowFavoriteToast(true)
    setTimeout(() => setShowFavoriteToast(false), 2000)
  }

  return (
    <div className="relative">
      <Link href={`/collections/${collection.slug}`}>
        <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer">
          {/* Banner */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={collection.banner}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Favorite Star Button */}
            <button
              onClick={handleFavoriteClick}
              onMouseEnter={() => setIsFavoriteHovered(true)}
              onMouseLeave={() => setIsFavoriteHovered(false)}
              className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-full border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/80 hover:border-cyan-400/50 hover:scale-110 z-10"
            >
              <Star
                className={`w-4 h-4 transition-all duration-300 ${
                  isFavoriteHovered ? "text-cyan-400 fill-cyan-400" : "text-gray-300"
                }`}
              />
            </button>

            {/* Verified Badge REMOVED */}
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={collection.image}
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

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{collection.itemCount}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Bidders</p>
                <p className="text-cyan-400 font-bold">{collection.biddersCount}</p>
              </div>
            </div>

            <Button className="w-full bg-cyan-500/30 border border-cyan-400/50 hover:bg-cyan-500/50 hover:text-white transition-all duration-300 text-cyan-100 font-semibold">
              Explore Collection
            </Button>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-xl" />
          </div>
        </div>
      </Link>

      {/* Toast */}
      {showFavoriteToast && (
        <div className="fixed top-20 right-4 z-50 bg-black/90 backdrop-blur-md border border-cyan-400/50 rounded-lg px-4 py-3 shadow-2xl shadow-cyan-500/20 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span className="text-white text-sm font-medium">Added to Favorites</span>
          </div>
        </div>
      )}
    </div>
  )
}