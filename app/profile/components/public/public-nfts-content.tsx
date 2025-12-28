"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Gem, Folder } from "lucide-react"

// Mock data — replace with real on-chain data later
const mockCreatedCollections = [
  { slug: "ancient-codex", name: "Ancient Codex", coverImage: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png", itemCount: 8 },
  { slug: "void-walkers", name: "Void Walkers", coverImage: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png", itemCount: 8 },
  { slug: "neon-sigils", name: "Neon Sigils", coverImage: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png", itemCount: 8 },
  { slug: "shadow-crystals", name: "Shadow Crystals", coverImage: "/shadow-crystal-dark-mystical-glowing-purple-energy.png", itemCount: 8 },
  { slug: "cyber-oracles", name: "Cyber Oracles", coverImage: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png", itemCount: 8 },
  { slug: "phoenix-feathers", name: "Phoenix Feathers", coverImage: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png", itemCount: 8 },
]

const mockOwnedNFTs = [
  { name: "The Obsidian Codex", image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png", collectionSlug: "ancient-codex" },
  { name: "Ethereal Void Walker", image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png", collectionSlug: "void-walkers" },
  { name: "Neon Sigil of Power", image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png", collectionSlug: "neon-sigils" },
  { name: "Shadow Nexus Crystal", image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png", collectionSlug: "shadow-crystals" },
]

export default function PublicNFTsContent({ address, isCreator }: { address: string; isCreator: boolean }) {
  const hasOwned = mockOwnedNFTs.length > 0
  const hasCreated = isCreator && mockCreatedCollections.length > 0

  return (
    <div className="space-y-16 py-8">
      {/* Owned NFTs */}
      <section>
        <h2 className="text-3xl font-bold text-card-foreground mb-8">
          Owned NFTs
          <span className="ml-3 text-muted-foreground text-xl font-normal">({mockOwnedNFTs.length})</span>
        </h2>

        {hasOwned ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockOwnedNFTs.map((nft, i) => (
              <Link href={`/collections/${nft.collectionSlug}`} key={i}>
                <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-violet shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img src={nft.image} alt={nft.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
                      {nft.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Gem className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
            <p className="text-xl text-muted-foreground">No owned NFTs visible</p>
          </div>
        )}
      </section>

      {/* Created Collections - Only if creator */}
      {isCreator && (
        <section>
          <h2 className="text-3xl font-bold text-card-foreground mb-8">
            Created Collections
            <span className="ml-3 text-muted-foreground text-xl font-normal">({mockCreatedCollections.length})</span>
          </h2>

          {hasCreated ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {mockCreatedCollections.map((collection) => (
                <Link href={`/collections/${collection.slug}`} key={collection.slug}>
                  <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:rune-glow-cyan shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
              <p className="text-xl text-muted-foreground">No collections created</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}