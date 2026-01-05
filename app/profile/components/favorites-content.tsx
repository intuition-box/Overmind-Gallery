// app/profile/components/favorites-content.tsx
"use client"

import { Star, Users } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useFavoritesContext } from "@/contexts/FavoritesContext"

export default function FavoritesContent() {
  const { favorites, removeFavorite } = useFavoritesContext()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const removeItem = (id: string, name: string) => {
    removeFavorite(id)
    setToastMessage(`"${name}" removed from favorites`)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const nftFavorites = favorites.filter(fav => fav.type === 'nft')
  const collectionFavorites = favorites.filter(fav => fav.type === 'collection')

  const hasAnyFavorites = nftFavorites.length > 0 || collectionFavorites.length > 0

  if (!hasAnyFavorites) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-6">
          <Star className="w-24 h-24 text-muted-foreground/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-primary/20 rounded-full animate-pulse" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">No favorites yet</h3>
        <p className="text-muted-foreground max-w-md">
          Click the star on any artifact or collection to save it here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12 relative">
      {/* Toast Notification – now theme-aware */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-card/90 backdrop-blur-md border border-primary/30 rounded-lg px-6 py-4 shadow-2xl shadow-primary/20 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-foreground text-base font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Favorited Collections */}
      {collectionFavorites.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            Favorited Collections
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {collectionFavorites.map((collection) => (
              <div
                key={collection.id}
                className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <Link href={`/collections/${collection.collection || collection.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-cyan shadow-lg">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          removeItem(collection.id, collection.name)
                        }}
                        className="absolute top-2 right-2 p-2 bg-background/60 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/80 hover:scale-110 z-10"
                        title="Remove from favorites"
                        aria-label={`Remove ${collection.name} from favorites`}
                      >
                        <Star className="w-5 h-5 text-primary fill-primary" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {collection.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Users className="w-3 h-3" />
                        <span>Collection</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorited Artifacts (NFTs) */}
      {nftFavorites.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            Favorited Artifacts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {nftFavorites.map((nft) => (
              <div
                key={nft.id}
                className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <Link href={`/collections/${nft.collection || 'unknown'}`}>
                  <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-violet shadow-lg">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          removeItem(nft.id, nft.name)
                        }}
                        className="absolute top-2 right-2 p-2 bg-background/60 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/80 hover:scale-110 z-10"
                        title="Remove from favorites"
                        aria-label={`Remove ${nft.name} from favorites`}
                      >
                        <Star className="w-5 h-5 text-primary fill-primary" />
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {nft.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{nft.collection || 'Unknown Collection'}</p>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}