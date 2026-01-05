// components/collection-card.tsx
"use client"

import { useState } from "react"
import { Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFavoritesContext } from "@/contexts/FavoritesContext"

interface CollectionCardProps {
  collection: {
    id: string | number
    slug: string
    name: string
    description: string
    creator: string
    itemCount: number
    biddersCount: number
    image: string
    banner: string
  }
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const collectionId = String(collection.id)
  const isCollectionFavorite = isFavorite(collectionId)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const favoriteItem = {
      id: collectionId,
      type: 'collection' as const,
      name: collection.name,
      image: collection.image,
      collection: collection.slug
    }

    if (isCollectionFavorite) {
      removeFavorite(collectionId)
      setToastMessage("Collection removed from Favorites")
    } else {
      addFavorite(favoriteItem)
      setToastMessage("Collection added to Favorites")
    }

    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div className="relative h-full">
      <Link href={`/collections/${collection.slug}`} className="block h-full">
        <div className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer flex flex-col h-full">
          {/* Fixed Height Banner */}
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <img
              src={collection.banner}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Favorite Star Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-2 bg-card/60 backdrop-blur-sm rounded-full border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card/80 hover:border-primary/50 hover:scale-110 z-10"
            >
              <Star
                className={`w-4 h-4 transition-all duration-300 ${
                  isCollectionFavorite
                    ? "text-primary fill-primary drop-shadow-glow-cyan"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          {/* Content Section - Takes remaining space */}
          <div className="p-6 flex flex-col flex-1">
            {/* Top Info */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-1">
                    by {collection.creator} • {collection.itemCount} artifacts
                  </p>
                </div>
              </div>
            </div>

            {/* Description - Fixed 2 lines */}
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
              {collection.description}
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{collection.itemCount}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Bidders</p>
                <p className="text-primary font-bold">{collection.biddersCount}</p>
              </div>
            </div>

            {/* Button - Pushes to bottom */}
            <Button className="w-full mt-auto bg-primary/30 border border-primary/50 hover:bg-primary/50 hover:text-foreground transition-all duration-300 text-primary font-semibold">
              Explore Collection
            </Button>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl" />
          </div>
        </div>
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-card/90 backdrop-blur-md border border-primary/50 rounded-lg px-6 py-4 shadow-2xl shadow-primary/20 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-primary fill-primary drop-shadow-glow-cyan" />
            <span className="text-foreground text-base font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}