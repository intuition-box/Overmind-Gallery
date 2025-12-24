"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, ArrowLeft } from "lucide-react"
import { NFTModal } from "@/components/nft-modal"
import { NFTCard } from "@/components/nft-card"
import SiteHeader from "@/components/site-header"
import UserLink from "@/components/UserLink"

// Full mock collections data — auction-only marketplace
const COLLECTIONS: Record<string, {
  name: string
  slug: string
  description: string
  creator: string
  creatorAddress: string
  banner: string
  cover: string
  itemCount: number
  totalBidRewards: string   // Total rewards paid to outbid bidders
  totalVolume: string
  nfts: Array<{
    id: number
    title: string
    image: string
    currentBid?: string
    minNextBid?: string
    price?: string
    status: "in-auction" | "fixed" | "coming-soon"
    mediaType: "2d" | "3d" | "video"
    modelUrl?: string
    videoUrl?: string
    bidHistory?: Array<{
      bidder: string
      bidderAddress: string
      amount: string
      timestamp: string
    }>
    totalBidders?: number
  }>
}> = {
  "ancient-codex": {
    name: "Ancient Codex",
    slug: "ancient-codex",
    description: "Mystical tomes containing forgotten knowledge and arcane wisdom from the digital realm.",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    banner: "/ancient-library-with-glowing-books-and-mystical-at.png",
    cover: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
    itemCount: 8,
    totalBidRewards: "4.7K TRUST",
    totalVolume: "18.4K TRUST",
    nfts: [
      {
        id: 1,
        title: "Tome of Shadows",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "2.8 TRUST",
        minNextBid: "3.1 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "MysticReader", bidderAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", amount: "1.8 TRUST", timestamp: "5h ago" },
          { bidder: "CodexSeeker", bidderAddress: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u", amount: "2.3 TRUST", timestamp: "3h ago" },
          { bidder: "AncientScribe", bidderAddress: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v", amount: "2.8 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 15
      },
      {
        id: 2,
        title: "Grimoire of Light",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "3.1 TRUST",
        minNextBid: "3.4 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "LightKeeper", bidderAddress: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w", amount: "2.0 TRUST", timestamp: "6h ago" },
          { bidder: "RadiantMage", bidderAddress: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x", amount: "2.7 TRUST", timestamp: "4h ago" },
          { bidder: "DivineCaster", bidderAddress: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y", amount: "3.1 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 18
      },
      {
        id: 3,
        title: "Codex Arcanum",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "2.5 TRUST",
        minNextBid: "2.8 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "ArcaneScholar", bidderAddress: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z", amount: "1.5 TRUST", timestamp: "7h ago" },
          { bidder: "SpellWeaver", bidderAddress: "0x8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a", amount: "2.0 TRUST", timestamp: "5h ago" },
          { bidder: "MagicCollector", bidderAddress: "0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b", amount: "2.5 TRUST", timestamp: "3h ago" },
        ],
        totalBidders: 12
      },
      {
        id: 4,
        title: "Book of Whispers",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "2.9 TRUST",
        minNextBid: "3.2 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "WhisperHunter", bidderAddress: "0xa0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c", amount: "1.9 TRUST", timestamp: "4h ago" },
          { bidder: "SecretKeeper", bidderAddress: "0xb1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d", amount: "2.4 TRUST", timestamp: "2h ago" },
          { bidder: "SilentReader", bidderAddress: "0xc2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e", amount: "2.9 TRUST", timestamp: "30m ago" },
        ],
        totalBidders: 20
      },
      {
        id: 5,
        title: "Chronicle of Void",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "3.3 TRUST",
        minNextBid: "3.6 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "VoidExplorer", bidderAddress: "0xd3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f", amount: "2.3 TRUST", timestamp: "8h ago" },
          { bidder: "DarkChronicler", bidderAddress: "0xe4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g", amount: "2.9 TRUST", timestamp: "5h ago" },
          { bidder: "AbyssWatcher", bidderAddress: "0xf5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h", amount: "3.3 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 22
      },
      {
        id: 6,
        title: "Manuscript of Time",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "2.7 TRUST",
        minNextBid: "3.0 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "TimeKeeper", bidderAddress: "0xg6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i", amount: "1.7 TRUST", timestamp: "6h ago" },
          { bidder: "ChronoMage", bidderAddress: "0xh7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j", amount: "2.2 TRUST", timestamp: "4h ago" },
          { bidder: "TemporalScribe", bidderAddress: "0xi8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k", amount: "2.7 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 16
      },
      {
        id: 7,
        title: "Scroll of Eternity",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "3.0 TRUST",
        minNextBid: "3.3 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "EternalSeeker", bidderAddress: "0xj9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l", amount: "2.0 TRUST", timestamp: "7h ago" },
          { bidder: "InfinityGuard", bidderAddress: "0xk0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m", amount: "2.5 TRUST", timestamp: "4h ago" },
          { bidder: "ForeverBound", bidderAddress: "0xl1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n", amount: "3.0 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 19
      },
      {
        id: 8,
        title: "Lexicon of Dreams",
        image: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        currentBid: "2.6 TRUST",
        minNextBid: "2.9 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "DreamWeaver", bidderAddress: "0xm2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o", amount: "1.6 TRUST", timestamp: "5h ago" },
          { bidder: "NightVision", bidderAddress: "0xn3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p", amount: "2.1 TRUST", timestamp: "3h ago" },
          { bidder: "SlumberMage", bidderAddress: "0xo4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q", amount: "2.6 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 14
      },
    ]
  },
  "void-walkers": {
    name: "Void Walkers",
    slug: "void-walkers",
    description: "Ethereal beings that traverse the boundaries between dimensions, guardians of the unseen.",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    banner: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    cover: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    itemCount: 8,
    totalBidRewards: "3.9K TRUST",
    totalVolume: "14.2K TRUST",
    nfts: [
      {
        id: 1,
        title: "Phantom Wanderer",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "1.9 TRUST",
        minNextBid: "2.1 TRUST",
        status: "in-auction",
        mediaType: "3d",
        modelUrl: "/mockup.glb",
        bidHistory: [
          { bidder: "VoidSeeker", bidderAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", amount: "1.2 TRUST", timestamp: "4h ago" },
          { bidder: "PhantomHunter", bidderAddress: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u", amount: "1.6 TRUST", timestamp: "2h ago" },
          { bidder: "ShadowWalker", bidderAddress: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v", amount: "1.9 TRUST", timestamp: "45m ago" },
        ],
        totalBidders: 17
      },
      {
        id: 2,
        title: "Shadow Drifter",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "2.1 TRUST",
        minNextBid: "2.4 TRUST",
        status: "in-auction",
        mediaType: "video",
        videoUrl: "/mockup.mp4",
        bidHistory: [
          { bidder: "DriftMaster", bidderAddress: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w", amount: "1.3 TRUST", timestamp: "5h ago" },
          { bidder: "ShadowDancer", bidderAddress: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x", amount: "1.8 TRUST", timestamp: "3h ago" },
          { bidder: "DarkDrifter", bidderAddress: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y", amount: "2.1 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 21
      },
      {
        id: 3,
        title: "Void Sentinel",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "1.8 TRUST",
        minNextBid: "2.0 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "SentinelGuard", bidderAddress: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z", amount: "1.0 TRUST", timestamp: "6h ago" },
          { bidder: "VoidProtector", bidderAddress: "0x8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a", amount: "1.5 TRUST", timestamp: "4h ago" },
          { bidder: "DarkGuardian", bidderAddress: "0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b", amount: "1.8 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 13
      },
      {
        id: 4,
        title: "Ethereal Guide",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "2.0 TRUST",
        minNextBid: "2.2 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "PathFinder", bidderAddress: "0xa0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c", amount: "1.4 TRUST", timestamp: "5h ago" },
          { bidder: "SpiritGuide", bidderAddress: "0xb1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d", amount: "1.7 TRUST", timestamp: "3h ago" },
          { bidder: "EtherealWalker", bidderAddress: "0xc2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e", amount: "2.0 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 19
      },
      {
        id: 5,
        title: "Dimension Walker",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "2.3 TRUST",
        minNextBid: "2.5 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "RealmCrosser", bidderAddress: "0xd3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f", amount: "1.5 TRUST", timestamp: "7h ago" },
          { bidder: "PortalKeeper", bidderAddress: "0xe4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g", amount: "1.9 TRUST", timestamp: "4h ago" },
          { bidder: "DimensionHopper", bidderAddress: "0xf5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h", amount: "2.3 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 24
      },
      {
        id: 6,
        title: "Astral Nomad",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "1.7 TRUST",
        minNextBid: "1.9 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "StarWanderer", bidderAddress: "0xg6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i", amount: "1.0 TRUST", timestamp: "6h ago" },
          { bidder: "CosmicTraveler", bidderAddress: "0xh7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j", amount: "1.4 TRUST", timestamp: "3h ago" },
          { bidder: "AstralRoamer", bidderAddress: "0xi8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k", amount: "1.7 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 15
      },
      {
        id: 7,
        title: "Spirit Traveler",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "2.2 TRUST",
        minNextBid: "2.4 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "SoulJourney", bidderAddress: "0xj9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l", amount: "1.5 TRUST", timestamp: "5h ago" },
          { bidder: "PhantomVoyager", bidderAddress: "0xk0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m", amount: "1.9 TRUST", timestamp: "3h ago" },
          { bidder: "SpiritSeeker", bidderAddress: "0xl1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n", amount: "2.2 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 18
      },
      {
        id: 8,
        title: "Void Keeper",
        image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        currentBid: "1.9 TRUST",
        minNextBid: "2.1 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "AbyssGuard", bidderAddress: "0xm2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o", amount: "1.2 TRUST", timestamp: "6h ago" },
          { bidder: "VoidMaster", bidderAddress: "0xn3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p", amount: "1.6 TRUST", timestamp: "4h ago" },
          { bidder: "DarknessKeeper", bidderAddress: "0xo4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q", amount: "1.9 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 16
      },
    ]
  },
  "neon-sigils": {
    name: "Neon Sigils",
    slug: "neon-sigils",
    description: "Digital runes pulsing with cybernetic energy and ancient power from the grid.",
    creator: "Wolfgang",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    banner: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    cover: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    itemCount: 8,
    totalBidRewards: "6.1K TRUST",
    totalVolume: "25.6K TRUST",
    nfts: [
      {
        id: 1,
        title: "Cyber Sigil",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.4 TRUST",
        minNextBid: "3.7 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "RuneCarver", bidderAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", amount: "2.4 TRUST", timestamp: "5h ago" },
          { bidder: "CyberMystic", bidderAddress: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u", amount: "2.9 TRUST", timestamp: "3h ago" },
          { bidder: "NeonSage", bidderAddress: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v", amount: "3.4 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 20
      },
      {
        id: 2,
        title: "Digital Rune",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.0 TRUST",
        minNextBid: "3.3 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "CodeWeaver", bidderAddress: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w", amount: "2.0 TRUST", timestamp: "6h ago" },
          { bidder: "DigitalScribe", bidderAddress: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x", amount: "2.5 TRUST", timestamp: "4h ago" },
          { bidder: "RuneKeeper", bidderAddress: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y", amount: "3.0 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 18
      },
      {
        id: 3,
        title: "Neon Emblem",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.5 TRUST",
        minNextBid: "3.8 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "EmblemCollector", bidderAddress: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z", amount: "2.5 TRUST", timestamp: "7h ago" },
          { bidder: "GlowForger", bidderAddress: "0x8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a", amount: "3.0 TRUST", timestamp: "5h ago" },
          { bidder: "LightBearer", bidderAddress: "0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b", amount: "3.5 TRUST", timestamp: "3h ago" },
        ],
        totalBidders: 22
      },
      {
        id: 4,
        title: "Cyber Symbol",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.1 TRUST",
        minNextBid: "3.4 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "SymbolHunter", bidderAddress: "0xa0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c", amount: "2.1 TRUST", timestamp: "4h ago" },
          { bidder: "TechnoRune", bidderAddress: "0xb1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d", amount: "2.6 TRUST", timestamp: "2h ago" },
          { bidder: "CyberGlyph", bidderAddress: "0xc2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e", amount: "3.1 TRUST", timestamp: "30m ago" },
        ],
        totalBidders: 17
      },
      {
        id: 5,
        title: "Digital Artifact",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.3 TRUST",
        minNextBid: "3.6 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "ArtifactSeeker", bidderAddress: "0xd3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f", amount: "2.3 TRUST", timestamp: "8h ago" },
          { bidder: "DataMage", bidderAddress: "0xe4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g", amount: "2.8 TRUST", timestamp: "5h ago" },
          { bidder: "DigitalOracle", bidderAddress: "0xf5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h", amount: "3.3 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 21
      },
      {
        id: 6,
        title: "Neon Artifact",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.2 TRUST",
        minNextBid: "3.5 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "GlowCollector", bidderAddress: "0xg6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i", amount: "2.2 TRUST", timestamp: "6h ago" },
          { bidder: "NeonKeeper", bidderAddress: "0xh7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j", amount: "2.7 TRUST", timestamp: "4h ago" },
          { bidder: "LightForge", bidderAddress: "0xi8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k", amount: "3.2 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 19
      },
      {
        id: 7,
        title: "Cyber Glyph",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.6 TRUST",
        minNextBid: "3.9 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "GlyphMaster", bidderAddress: "0xj9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l", amount: "2.6 TRUST", timestamp: "7h ago" },
          { bidder: "RuneWeaver", bidderAddress: "0xk0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m", amount: "3.1 TRUST", timestamp: "4h ago" },
          { bidder: "CyberSage", bidderAddress: "0xl1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n", amount: "3.6 TRUST", timestamp: "2h ago" },
        ],
        totalBidders: 24
      },
      {
        id: 8,
        title: "Digital Emblem",
        image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        currentBid: "3.0 TRUST",
        minNextBid: "3.3 TRUST",
        status: "in-auction",
        mediaType: "2d",
        bidHistory: [
          { bidder: "EmblemForge", bidderAddress: "0xm2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o", amount: "2.0 TRUST", timestamp: "5h ago" },
          { bidder: "SignMaker", bidderAddress: "0xn3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p", amount: "2.5 TRUST", timestamp: "3h ago" },
          { bidder: "CodeEmblem", bidderAddress: "0xo4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q", amount: "3.0 TRUST", timestamp: "1h ago" },
        ],
        totalBidders: 16
      },
    ]
  },
}

interface CollectionDetailProps {
  slug: string
}

export default function CollectionDetail({ slug }: CollectionDetailProps) {
  const router = useRouter()
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState("")

  const collection = COLLECTIONS[slug]

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
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setCountdown("Ended")
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Collection Not Found</h2>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleNFTClick = (nft: any) => {
    const enrichedNFT = {
      ...nft,
      creator: collection.creator,
      creatorAddress: collection.creatorAddress,
      collection: collection.slug,
    }
    setSelectedNFT(enrichedNFT)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedNFT(null), 300)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: collection.name,
        text: `Check out ${collection.name} on The Overmind Gallery`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleNFTBid = (amount: string) => {
    console.log(`Placing bid of ${amount} TRUST on ${selectedNFT?.title}`)
    handleCloseModal()
  }

  const handleBuy = () => {
    console.log(`Purchasing ${selectedNFT?.title}`)
    handleCloseModal()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <SiteHeader />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Banner */}
          <div className="relative h-36 md:h-44 rounded-2xl overflow-hidden mb-6 shadow-2xl">
            <img
              src={collection.banner}
              alt={`${collection.name} banner`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Collection Header */}
          <div className="relative -mt-16 md:-mt-20 mx-4 mb-8">
            <div className="bg-black/60 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative -mt-16 md:-mt-20">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-primary/40 shadow-2xl">
                    <img
                      src={collection.cover}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row md:justify-between items-start gap-6 w-full">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                      {collection.name}
                    </h1>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-muted-foreground text-sm">Created by</span>
                      <UserLink address={collection.creatorAddress} displayName={collection.creator} />
                    </div>
                    <p className="text-gray-300 text-sm max-w-2xl mb-4">{collection.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-muted-foreground text-xs">Items</p>
                        <p className="text-lg font-bold text-card-foreground">{collection.itemCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Total Bid Rewards</p>
                        <p className="text-lg font-bold text-primary">{collection.totalBidRewards}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Total Volume</p>
                        <p className="text-lg font-bold text-card-foreground">{collection.totalVolume}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Unique Bidders</p>
                        <p className="text-lg font-bold text-card-foreground">72</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end">
                    <Button
                      onClick={handleShare}
                      className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    {copied && (
                      <span className="text-green-400 text-xs font-medium mt-2">Link copied!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collection.nfts.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={{
                  ...nft,
                  creator: collection.creator,
                }}
                onClick={() => handleNFTClick(nft)}
                countdown={countdown}
                showAuctionBadge={false}
                forceAuctionButton={true}
              />
            ))}
          </div>
        </div>
      </div>

      <NFTModal
        nft={selectedNFT}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        countdown={selectedNFT?.status === "in-auction" ? countdown : undefined}
        onBid={handleNFTBid}
        onBuy={handleBuy}
      />
    </div>
  )
}