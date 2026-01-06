// components/nft-detail-page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BidHistory } from "@/components/web3/BidHistory"
import {
  ArrowLeft,
  Share2,
  ExternalLink,
  TrendingUp,
  Zap,
  ArrowRightLeft,
} from "lucide-react"
import SiteHeader from "@/components/site-header"
import UserLink from "@/components/UserLink"

interface NFT {
  id: number
  name: string
  image: string
  collection: string
  collectionSlug: string
  creator: string
  creatorAddress: string
  power: number
  rarity: string
  description: string
  priceHistory: any[]
  status: "owned" | "listed" | "auction"
}

interface NFTDetailPageProps {
  nft: NFT
}

export default function NFTDetailPage({ nft }: NFTDetailPageProps) {
  const router = useRouter()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleShare = () => {
    const shareUrl = window.location.href
    const shareText = `Check out ${nft.name} from ${nft.collection} on Overmind Gallery`

    if (navigator.share) {
      navigator.share({
        title: nft.name,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        navigator.clipboard.writeText(shareUrl)
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  const handleTransfer = () => {
    console.log('Transfer NFT:', nft.id)
  }

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  const handleCloseModal = () => {
    setIsFullscreen(false)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <SiteHeader />

      {/* Clean Top Navigation - Only Back Button, no border line */}
      <div className="bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Compact NFT Image */}
          <div className="w-full max-w-md mx-auto lg:max-w-none lg:w-full">
            <div
              className="relative aspect-square max-w-sm mx-auto lg:max-w-md bg-card rounded-2xl overflow-hidden border border-border cursor-pointer hover:opacity-90 transition-opacity shadow-xl"
              onClick={handleImageClick}
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />

              {/* Rarity Badge */}
              <div className="absolute top-4 left-4">
                <Badge className={`px-3 py-1 text-sm font-medium border ${
                  nft.rarity === 'Rare' ? 'bg-purple-500/20 text-purple-400 dark:bg-purple-500/10 border-purple-500/30' :
                  nft.rarity === 'Epic' ? 'bg-orange-500/20 text-orange-400 dark:bg-orange-500/10 border-orange-500/30' :
                  'bg-cyan-500/20 text-cyan-400 dark:bg-cyan-500/10 border-cyan-500/30'
                }`}>
                  {nft.rarity}
                </Badge>
              </div>

              {/* Heart icon completely removed */}
            </div>
          </div>

          {/* Right Column - Compact, Clean Details */}
          <div className="space-y-6 max-h-[80vh] overflow-y-auto pb-8 lg:pb-0 pr-2">
            {/* Title & Collection */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {nft.name}
                  </h1>
                  <Link
                    href={`/collections/${nft.collectionSlug}`}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-cyan-400 transition-colors mt-1 text-sm group"
                  >
                    {nft.collection}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border-border text-muted-foreground hover:bg-accent"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Created by <UserLink address={nft.creatorAddress} displayName={nft.creator} />
              </div>
            </div>

            {/* Price & Power Stats */}
            <div className="grid grid-cols-2 gap-6 bg-card/50 rounded-xl p-5 border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">-- TRUST</span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Power Level</p>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-xl font-bold text-cyan-400">{nft.power}/1000</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{nft.description}</p>
            </div>

            {/* Transfer Action */}
            <div>
              <Button
                onClick={handleTransfer}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-medium py-5 text-base shadow-lg"
              >
                <ArrowRightLeft className="w-5 h-5 mr-2" />
                Transfer
              </Button>
            </div>

            {/* Bid History */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Bid History</h3>
              <BidHistory tokenId={nft.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={handleOverlayClick}
          onKeyDown={(e) => e.key === 'Escape' && handleCloseModal()}
          tabIndex={-1}
        >
          <img
            src={nft.image}
            alt={nft.name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  )
}