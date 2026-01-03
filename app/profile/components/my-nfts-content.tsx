// app/profile/components/my-nfts-content.tsx
"use client"

import { Card } from "@/components/ui/card"
import { Gem, Folder, Loader2 } from "lucide-react"
import Link from "next/link"
import { useUserNFTs, UserNFT } from "@/hooks/overmind/useUserNFTs"

interface NFT {
  id: number
  name: string
  image: string
  collectionSlug: string
  collectionName: string
}

// Transform UserNFT to NFT format for display
function transformNFTData(userNFT: UserNFT): NFT {
  // Extract name from tokenURI or use default
  const name = `Relic #${userNFT.tokenId}`

  // Use appropriate image based on tokenURI
  let image = "/placeholder.jpg"
  if (userNFT.tokenURI.includes('QmMock1')) {
    image = "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png"
  } else if (userNFT.tokenURI.includes('QmMock2')) {
    image = "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png"
  } else if (userNFT.tokenURI.includes('QmMock3')) {
    image = "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png"
  }

  return {
    id: userNFT.tokenId,
    name,
    image,
    collectionSlug: "ancient-codex",
    collectionName: "Ancient Codex",
  }
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
  const { userNFTs, isLoading, error, hasNFTs } = useUserNFTs()
  const ownedNFTs = userNFTs.map(transformNFTData)
  const hasOwnedNFTs = hasNFTs
  const hasCreatedCollections = isCreator && mockCreatedCollections.length > 0

  return (
    <div className="space-y-16 py-8">
      {/* Owned Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-card-foreground">
               My NFTs
              <span className="ml-3 text-muted-foreground text-xl font-normal">({ownedNFTs.length})</span>
            </h2>
            {ownedNFTs.length > 0 && (
              <p className="text-muted-foreground text-sm mt-1">
                Click on any NFT to view its detailed page
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading your NFTs...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <Gem className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Error Loading NFTs</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There was an error loading your NFTs. Please try again later.
            </p>
          </div>
         ) : hasOwnedNFTs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ownedNFTs.map((nft) => (
              <Link href={`/nft/${nft.id}`} key={nft.id}>
                <Card className="obsidian-texture border-border/30 overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                  </div>
                  <div className="p-4 space-y-2">
                    <div className="space-y-1">
                      <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {nft.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{nft.collectionName}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Power: {userNFTs.find(u => u.tokenId === nft.id)?.power || 0}
                      </span>
                      <svg className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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