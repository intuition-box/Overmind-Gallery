"use client"

import { useState, useEffect } from "react"
import { NFTModal } from "@/components/nft-modal"
import { NFTCard } from "@/components/nft-card"
import { Gavel, Timer, Coins, TrendingUp } from "lucide-react"
import NFTFilterBar, { type FilterOptions } from "@/components/nft-filter-bar"
import SiteHeader from "@/components/site-header"

// Helper function to map collection values to slugs and names
const getCollectionInfo = (collectionValue: string) => {
  const collectionMap: Record<string, { slug: string; name: string }> = {
    "coming-soon": { slug: "coming-soon", name: "Coming Soon" },
    "void-walkers": { slug: "void-walkers", name: "Void Walkers" },
    "neon-sigils": { slug: "neon-sigils", name: "Neon Sigils" },
    "shadow-crystals": { slug: "shadow-crystals", name: "Shadow Crystals" },
    "cyber-oracles": { slug: "cyber-oracles", name: "Cyber Oracles" },
    "phoenix-feathers": { slug: "phoenix-feathers", name: "Phoenix Feathers" },
    "ancient-codex": { slug: "ancient-codex", name: "Ancient Codex" },
    "quantum-runes": { slug: "quantum-runes", name: "Quantum Runes" },
    "mystical-artifacts": { slug: "mystical-artifacts", name: "Mystical Artifacts" },
  }
  return collectionMap[collectionValue] || { slug: collectionValue, name: collectionValue }
}

// === PRESERVED MOCK DATA FROM SECOND FILE ===
const nftRelics = [
  {
    id: 1,
    title: "The Obsidian Codex",
    creator: "DigitalMystic",
    price: "2.5 TRUST",
    priceValue: 2.5,
    image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    description: "An ancient digital grimoire containing forbidden knowledge of the blockchain realm.",
    collection: "coming-soon",
    category: "art",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-15"),
    mediaType: "2d" as const,
  },
  {
    id: 3,
    title: "Neon Sigil of Power",
    creator: "RuneForger",
    price: "3.2 TRUST",
    priceValue: 3.2,
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    description: "A powerful sigil that channels the energy of the digital cosmos.",
    collection: "coming-soon",
    category: "gaming",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-10"),
    mediaType: "2d" as const,
  },
  {
    id: 4,
    title: "Shadow Nexus Crystal",
    creator: "VoidCrafter",
    price: "4.1 TRUST",
    priceValue: 4.1,
    image: "/shadow-crystal-dark-mystical-glowing-purple-energy.png",
    description: "A crystalline artifact that holds the essence of shadow magic.",
    collection: "coming-soon",
    category: "art",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-25"),
    mediaType: "2d" as const,
  },
  {
    id: 5,
    title: "Cyber Oracle Mask",
    creator: "TechnoMage",
    price: "2.9 TRUST",
    priceValue: 2.9,
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    description: "An ancient mask that grants visions of future blockchain events.",
    collection: "coming-soon",
    category: "photography",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-12"),
    mediaType: "2d" as const,
  },
  {
    id: 6,
    title: "Digital Phoenix Feather",
    creator: "ElementalForge",
    price: "1.6 TRUST",
    priceValue: 1.6,
    image: "/digital-phoenix-feather-glowing-cyan-fire-mystical.png",
    description: "A feather from the legendary digital phoenix, symbol of rebirth.",
    collection: "coming-soon",
    category: "music",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-08"),
    mediaType: "2d" as const,
  },
  {
    id: 7,
    title: "Quantum Rune Stone",
    creator: "ArcaneBuilder",
    price: "5.3 TRUST",
    priceValue: 5.3,
    image: "/quantum-rune-stone-glowing-violet-ancient-mystical.png",
    description: "A stone inscribed with quantum runes that bend reality itself.",
    collection: "coming-soon",
    category: "gaming",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-30"),
    mediaType: "2d" as const,
  },
  {
    id: 8,
    title: "Spectral Blade of Code",
    creator: "GhostHacker",
    price: "3.7 TRUST",
    priceValue: 3.7,
    image: "/spectral-blade-sword-glowing-code-mystical-weapon.png",
    description: "A blade forged from pure code, capable of cutting through any firewall.",
    collection: "coming-soon",
    category: "gaming",
    status: "coming-soon" as const,
    createdAt: new Date("2024-01-18"),
    mediaType: "2d" as const,
  },
]

const auctionRelics = [
  {
    id: 1,
    title: "Phantom Wanderer",
    creator: "Wolfgang",
    creatorAddress: "0x41DEDF02e93588DE5Cfa92349D77E993881cd9b2",
    currentBid: "2.5 TRUST",
    currentBidValue: 2.5,
    minNextBid: "2.8 TRUST",
    timeRemaining: "2h 34m",
    timeRemainingMs: 2 * 60 * 60 * 1000 + 34 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A spectral wanderer that drifts through the void, seeking lost souls in the digital realm.",
    bidHistory: [
      { bidder: "CryptoSage", bidderAddress: "0x1111111111111111111111111111111111111111", amount: "1.2 TRUST", timestamp: "3h ago" },
      { bidder: "VoidWalker", bidderAddress: "0x2222222222222222222222222222222222222222", amount: "1.8 TRUST", timestamp: "2h ago" },
      { bidder: "RuneMaster", bidderAddress: "0x3333333333333333333333333333333333333333", amount: "2.5 TRUST", timestamp: "45m ago" },
    ],
    totalBidders: 12,
    collection: "void-walkers",
    status: "in-auction" as const,
    is3D: true,
    modelUrl: "/mockup.glb",
    mediaType: "3d" as const,
  },
  {
    id: 2,
    title: "Ethereal Void Walker",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    currentBid: "4.2 TRUST",
    currentBidValue: 4.2,
    minNextBid: "4.6 TRUST",
    timeRemaining: "1h 12m",
    timeRemainingMs: 1 * 60 * 60 * 1000 + 12 * 60 * 1000,
    image: "/tog.jpg",
    videoUrl: "/mockup.mp4",
    description: "A spectral guardian that traverses between digital dimensions.",
    bidHistory: [
      { bidder: "ShadowCaster", bidderAddress: "0x41DEDF02e93588DE5Cfa92349D77E993881cd9b2", amount: "2.1 TRUST", timestamp: "4h ago" },
      { bidder: "MysticOracle", bidderAddress: "0x5555555555555555555555555555555555555555", amount: "3.5 TRUST", timestamp: "2h ago" },
      { bidder: "DigitalPhoenix", bidderAddress: "0x6666666666666666666666666666666666666666", amount: "4.2 TRUST", timestamp: "23m ago" },
    ],
    totalBidders: 18,
    collection: "void-walkers",
    status: "in-auction" as const,
    mediaType: "video" as const,
  },
  {
    id: 3,
    title: "Shadow Drifter",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    currentBid: "6.8 TRUST",
    currentBidValue: 6.8,
    minNextBid: "7.5 TRUST",
    timeRemaining: "4h 56m",
    timeRemainingMs: 4 * 60 * 60 * 1000 + 56 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A shadowy entity that drifts between realms, collecting whispers from the void.",
    bidHistory: [
      { bidder: "CosmicWeaver", bidderAddress: "0x7777777777777777777777777777777777777777", amount: "3.2 TRUST", timestamp: "6h ago" },
      { bidder: "EtherMage", bidderAddress: "0x8888888888888888888888888888888888888888", amount: "5.1 TRUST", timestamp: "3h ago" },
      { bidder: "QuantumSeer", bidderAddress: "0x9999999999999999999999999999999999999999", amount: "6.8 TRUST", timestamp: "1h ago" },
    ],
    totalBidders: 24,
    collection: "void-walkers",
    mediaType: "2d" as const,
    status: "in-auction" as const,
  },
  {
    id: 4,
    title: "Shadow Oracle",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    currentBid: "7.8 TRUST",
    currentBidValue: 7.8,
    minNextBid: "8.5 TRUST",
    timeRemaining: "4h 56m",
    timeRemainingMs: 4 * 60 * 60 * 1000 + 56 * 60 * 1000,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    description: "A shadowy entity that drifts between realms, collecting whispers from the void.",
    bidHistory: [
      { bidder: "CosmicWeaver", bidderAddress: "0xaaaaaaaAAAAaaaaaAAAAAaaaaAAAAAaaaAAAAA", amount: "3.2 TRUST", timestamp: "6h ago" },
      { bidder: "EtherMage", bidderAddress: "0xbbbbbbbBBBBBbbbbBBBBBbbbbBBBBBbbbBBBBB", amount: "5.1 TRUST", timestamp: "3h ago" },
      { bidder: "QuantumSeer", bidderAddress: "0xccccccccCCCCccccCCCCcCCCCccccCCCCcCCC", amount: "7.8 TRUST", timestamp: "1h ago" },
    ],
    totalBidders: 22,
    collection: "void-walkers",
    mediaType: "2d" as const,
    status: "in-auction" as const,
  },
]

export default function ExplorePage() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "date-newest",
    category: "all",
    status: "all",
  })
  const [voidWalkerCountdown, setVoidWalkerCountdown] = useState("")
  const [comingSoonCountdowns, setComingSoonCountdowns] = useState<
    Record<number, { days: number; hours: number; minutes: number; seconds: number }>
  >({})

  const handleNFTClick = (nft: any) => {
    setSelectedNFT(nft)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedNFT(null), 300)
  }

  const handleNFTBid = (amount: string) => {
    console.log(`Placing bid of ${amount} TRUST on ${selectedNFT?.title}`)

  }

  const handleBuy = () => {
    console.log(`Purchasing ${selectedNFT?.title}`)
    handleCloseModal()
  }

  // === PRESERVED COUNTDOWN LOGIC ===
  useEffect(() => {
    const endTime = new Date()
    endTime.setDate(endTime.getDate() + 3)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setVoidWalkerCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setVoidWalkerCountdown("Ended")
      }
    }, 1000)

    const comingSoonTargetDate = new Date()
    comingSoonTargetDate.setDate(comingSoonTargetDate.getDate() + 7)
    comingSoonTargetDate.setHours(0, 0, 0, 0)

    const updateComingSoonCountdown = () => {
      const now = new Date().getTime()
      const distance = comingSoonTargetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setComingSoonCountdowns({
          1: { days, hours, minutes, seconds },
          3: { days, hours, minutes, seconds },
          4: { days, hours, minutes, seconds },
          5: { days, hours, minutes, seconds },
          6: { days, hours, minutes, seconds },
          7: { days, hours, minutes, seconds },
          8: { days, hours, minutes, seconds },
        })
      }
    }

    updateComingSoonCountdown()
    const comingSoonInterval = setInterval(updateComingSoonCountdown, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(comingSoonInterval)
    }
  }, [])

  // === PRESERVED FILTERING & SORTING ===
  const getFilteredAndSortedRelics = () => {
    const filtered = nftRelics.filter((relic) => {
      const matchesCategory = filters.category === "all" || relic.category === filters.category
      const matchesStatus = filters.status === "all" || relic.status === filters.status
      return matchesCategory && matchesStatus
    })

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "date-newest":
          return b.createdAt.getTime() - a.createdAt.getTime()
        case "date-oldest":
          return a.createdAt.getTime() - b.createdAt.getTime()
        case "price-low":
          return a.priceValue - b.priceValue
        case "price-high":
          return b.priceValue - a.priceValue
        default:
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

    return filtered
  }

  const getFilteredAuctionRelics = () => {
    const filtered = auctionRelics.filter((relic) => {
      const matchesCategory = filters.category === "all" || relic.collection.includes(filters.category)
      const matchesStatus = filters.status === "all" || filters.status === "in-auction"
      return matchesCategory && matchesStatus
    })

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.currentBidValue - b.currentBidValue
        case "price-high":
          return b.currentBidValue - a.currentBidValue
        default:
          return 0
      }
    })

    return filtered
  }

  const filteredRelics = getFilteredAndSortedRelics()
  const filteredAuctions = getFilteredAuctionRelics()

  return (
    <div className="min-h-screen page-gradient">
      {/* Theme-aware decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
      </div>

      {/* Floating icons - Theme aware */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-primary/20 animate-pulse">
          <Gavel className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-secondary/20 animate-pulse delay-1000">
          <Timer className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-primary/10 animate-pulse delay-2000">
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-secondary/15 animate-pulse delay-3000">
          <TrendingUp className="w-full h-full" />
        </div>
      </div>

      <SiteHeader />

      <header className="text-center my-0 py-[57px]">
        <div className="container mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-primary/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Gavel className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent mb-6 md:text-6xl">
            Explore Sacred Artifacts
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2 font-mono">
            Discover the complete collection of digital artifacts, each one a testament to the power of The Overmind.
          </p>
        </div>
      </header>

      <div className="sticky top-0 z-40 bg-card/30 backdrop-blur-md border-b border-border shadow-lg pt-3">
        <NFTFilterBar onFiltersChange={setFilters} totalCount={filteredRelics.length + filteredAuctions.length} />
      </div>

      {/* Active Auctions Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAuctions.map((relic) => (
            <NFTCard
              key={relic.id}
              nft={{
                ...relic,
                collectionSlug: getCollectionInfo(relic.collection).slug,
                collectionName: getCollectionInfo(relic.collection).name,
              }}
              onClick={() => handleNFTClick(relic)}
              countdown={voidWalkerCountdown}
              showAuctionBadge={false}
            />
          ))}
        </div>
      </section>

      {/* Regular NFT Grid */}
      <main className="container px-6 py-12 my-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRelics.map((relic) => (
            <NFTCard
              key={relic.id}
              nft={{
                ...relic,
                collectionSlug: getCollectionInfo(relic.collection).slug,
                collectionName: getCollectionInfo(relic.collection).name,
              }}
              onClick={() => handleNFTClick(relic)}
              comingSoonCountdown={comingSoonCountdowns[relic.id]}
            />
          ))}
        </div>
      </main>

      <NFTModal
        nft={selectedNFT}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        countdown={voidWalkerCountdown}
        onBid={handleNFTBid}
        onBuy={handleBuy}
      />
    </div>
  )
}