"use client"

import { CollectionCard } from "@/components/collection-card"
import SiteHeader from "@/components/site-header"

// === PRESERVED COLLECTIONS DATA ===
const collections = [
  {
    id: 1,
    slug: "ancient-codex",
    name: "Ancient Codex",
    description: "Mystical tomes containing forgotten knowledge and arcane wisdom",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    biddersCount: 142,
    totalBidRewards: "4.7K TRUST",
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    banner: "/ancient-library-with-glowing-books-and-mystical-at.png",
  },
  {
    id: 2,
    slug: "void-walkers",
    name: "Void Walkers",
    description: "Ethereal beings that traverse the boundaries between dimensions",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    biddersCount: 89,
    totalBidRewards: "3.9K TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
  },
  {
    id: 3,
    slug: "neon-sigils",
    name: "Neon Sigils",
    description: "Digital runes pulsing with cybernetic energy and ancient power",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    biddersCount: 217,
    totalBidRewards: "6.1K TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    banner: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
  },
  {
    id: 4,
    slug: "shadow-crystals",
    name: "Shadow Crystals",
    description: "Crystalline formations infused with dark energy and forbidden magic",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    biddersCount: 104,
    totalBidRewards: "4.2K TRUST",
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    banner: "/dark-crystal-cave-with-purple-glowing-crystals-and.png",
  },
  {
    id: 5,
    slug: "cyber-oracles",
    name: "Cyber Oracles",
    description: "Prophetic masks that reveal glimpses of digital futures",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    biddersCount: 156,
    totalBidRewards: "5.3K TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    banner: "/futuristic-temple-with-glowing-oracle-masks-and-di.png",
  },
  {
    id: 6,
    slug: "phoenix-feathers",
    name: "Phoenix Feathers",
    description: "Remnants of digital phoenixes, burning with eternal cyber-flame",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    itemCount: 8,
    biddersCount: 203,
    totalBidRewards: "5.8K TRUST",
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    banner: "/digital-phoenix-nest-with-glowing-cyan-flames-and-.png",
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen page-gradient">
      {/* Theme-aware decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 md:text-6xl">
            Sacred Collections
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-mono">
            Curated assemblages of digital artifacts, each collection a testament to the artistry and vision of The
            Overmind's chosen creators.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </main>
    </div>
  )
}