// app/profile/components/my-nfts-content.tsx
"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Gem, Folder } from "lucide-react"
import Link from "next/link"

interface NFT {
  id: number
  name: string
  image: string
  collectionSlug: string
  collectionName: string
}

interface Collection {
  id: number
  slug: string
  name: string
  coverImage: string
  itemCount: number
}

// Updated with collection slugs so NFTs can link correctly
const mockOwnedNFTs: NFT[] = [
  {
    id: 1,
    name: "Cyber Oracle Mask",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    collectionSlug: "mystical-artifacts",
    collectionName: "Mystical Artifacts",
  },
  {
    id: 2,
    name: "Ethereal Void Walker",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    collectionSlug: "void-walkers",
    collectionName: "Void Walker Series",
  },
  {
    id: 3,
    name: "Neon Power Sigil",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    collectionSlug: "neon-sigils",
    collectionName: "Neon Sigils",
  },
  {
    id: 4,
    name: "Shadow Nexus Crystal",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    collectionSlug: "shadow-crystals",
    collectionName: "Shadow Crystals",
  },
  {
    id: 5,
    name: "Phoenix Feather",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    collectionSlug: "phoenix-feathers",
    collectionName: "Phoenix Feathers",
  },
  {
    id: 6,
    name: "Quantum Rune Stone",
    image: "/quantum-rune-stone-glowing-violet-ancient-mystical.png",
    collectionSlug: "quantum-runes",
    collectionName: "Quantum Runes",
  },
]

const mockCreatedCollections: Collection[] = [
  {
    id: 1,
    slug: "mystical-artifacts",
    name: "Mystical Artifacts",
    coverImage: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    itemCount: 23,
  },
  {
    id: 2,
    slug: "void-walkers",
    name: "Void Walkers",
    coverImage: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    itemCount: 18,
  },
  {
    id: 3,
    slug: "neon-sigils",
    name: "Neon Sigils",
    coverImage: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    itemCount: 31,
  },
  {
    id: 4,
    slug: "shadow-crystals",
    name: "Shadow Crystals",
    coverImage: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    itemCount: 12,
  },
]

interface MyNFTsContentProps {
  isCreator: boolean
}

export default function MyNFTsContent({ isCreator }: MyNFTsContentProps) {
  const hasOwnedNFTs = mockOwnedNFTs.length > 0
  const hasCreatedCollections = isCreator && mockCreatedCollections.length > 0

  return (
    <div className="space-y-16 py-8">
      {/* Owned Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-card-foreground">
            Owned
            <span className="ml-3 text-muted-foreground text-xl font-normal">({mockOwnedNFTs.length})</span>
          </h2>
        </div>

        {hasOwnedNFTs ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockOwnedNFTs.map((nft) => (
              <Link href={`/collections/${nft.collectionSlug}`} key={nft.id}>
                <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-violet shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                      {nft.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{nft.collectionName}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Gem className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="text-xl font-semibold text-card-foreground mb-4">No NFTs Owned Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your collection is empty. Explore the gallery to begin your journey.
            </p>
          </div>
        )}
      </section>

      {/* Created Section - Only for Creators */}
      {isCreator && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground">
              Created
              <span className="ml-3 text-muted-foreground text-xl font-normal">({mockCreatedCollections.length})</span>
            </h2>
          </div>

          {hasCreatedCollections ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {mockCreatedCollections.map((collection) => (
                <Link href={`/collections/${collection.slug}`} key={collection.id}>
                  <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-cyan shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={collection.coverImage}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {collection.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Folder className="w-3 h-3" />
                        <span>{collection.itemCount} items</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
              <h3 className="text-xl font-semibold text-card-foreground mb-4">No Collections Created Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your creative legacy awaits. Begin forging your first collection.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}