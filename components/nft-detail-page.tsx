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
  Heart,
  Share2,
  ExternalLink,
  TrendingUp,
  Calendar,
  DollarSign,
  Zap,
  ArrowRightLeft,
  ChevronRight,
  Star
} from "lucide-react"
import SiteHeader from "@/components/site-header"
import UserLink from "@/components/UserLink"

interface NFTAttribute {
  trait_type: string
  value: string
  rarity: string
}

interface PriceHistory {
  date: string
  price: number
}

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
  attributes: NFTAttribute[]
  priceHistory: PriceHistory[]
  status: "owned" | "listed" | "auction"
}

interface NFTDetailPageProps {
  nft: NFT
}

export default function NFTDetailPage({ nft }: NFTDetailPageProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
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
    // TODO: Implement transfer functionality
    console.log('Transfer NFT:', nft.id)
  }

  const handleSell = () => {
    // TODO: Implement sell functionality
    console.log('Sell NFT:', nft.id)
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <SiteHeader />

      {/* Breadcrumbs */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/profile" className="hover:text-white transition-colors">My NFTs</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{nft.name}</span>
            </nav>

            {/* Back Button */}
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My NFTs
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:h-[80vh]">

          {/* Left Column - Image (Sticky) */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {/* NFT Image */}
            <div className="relative w-full bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden border border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
                 onClick={handleImageClick}>
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-auto object-contain"
              />

              {/* Rarity Badge */}
              <div className="absolute top-4 left-4">
                <Badge className={`px-3 py-1 text-sm font-medium ${
                  nft.rarity === 'Rare' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                  nft.rarity === 'Epic' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                }`}>
                  {nft.rarity}
                </Badge>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>


          </div>

          {/* Right Column - Details (Scrollable) */}
          <div className="lg:max-h-[calc(80vh-4rem)] lg:overflow-y-auto lg:pr-4 space-y-6">

            {/* Sticky Header */}
            <div className="lg:sticky lg:top-0 lg:bg-gradient-to-b lg:from-gray-900 lg:to-gray-900/95 lg:backdrop-blur-sm lg:border-b lg:border-gray-700/50 lg:pb-4 lg:mb-6 lg:-mx-4 lg:px-4 lg:z-10">
              {/* Title & Collection */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                      {nft.name}
                    </h1>
                    <Link
                      href={`/collections/${nft.collectionSlug}`}
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mt-1 group"
                    >
                      <span className="text-sm">{nft.collection}</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Share Button */}
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500 ml-4"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Creator */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Created by</span>
                  <UserLink address={nft.creatorAddress} displayName={nft.creator} />
                </div>
              </div>
            </div>

            {/* Price & Stats */}
            <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Current Value</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">-- TRUST</span>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Power Level</p>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span className="text-xl font-bold text-cyan-400">{nft.power}/1000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-white">Description</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{nft.description}</p>
            </div>

            {/* Attributes */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">Attributes</h3>
              <div className="grid grid-cols-2 gap-2">
                {nft.attributes.map((attr, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{attr.trait_type}</p>
                    <p className="text-white font-medium text-sm">{attr.value}</p>
                    <p className="text-cyan-400 text-xs">{attr.rarity} have this trait</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-base font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleTransfer}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 text-sm"
                >
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Transfer
                </Button>
                <Button
                  onClick={handleSell}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 text-sm"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>
            </div>

            {/* Bid History */}
            <BidHistory tokenId={nft.id} />

          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCloseModal()
            }
          }}
          tabIndex={-1}
        >
          <img
            src={nft.image}
            alt={nft.name}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  )
}