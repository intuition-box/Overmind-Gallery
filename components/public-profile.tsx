// components/PublicProfile.tsx
"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, User, Gem, Activity, BarChart3, ArrowLeft, X } from "lucide-react"

// Public-specific components
import PublicNFTsContent from "@/app/profile/components/public/public-nfts-content"
import PublicActivityContent from "@/app/profile/components/public/public-activity-content"
import PublicStatsContent from "@/app/profile/components/public/public-stats-content"

// Mock user data (replace with ENS or on-chain name service later)
const MOCK_USERS: Record<string, { name: string; avatar: string; isCreator: boolean }> = {
  "0x742d35cc6634c0532925a3b8d4c0532925a3b8d4": {
    name: "Wolfgang",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    isCreator: true,
  },
  "0x1111111111111111111111111111111111111111": {
    name: "CryptoSage",
    avatar: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
    isCreator: false,
  },
  "0x2222222222222222222222222222222222222222": {
    name: "VoidWalker",
    avatar: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
    isCreator: true,
  },
  "0x3333333333333333333333333333333333333333": {
    name: "RuneMaster",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    isCreator: false,
  },
  "0x4444444444444444444444444444444444444444": {
    name: "ShadowCaster",
    avatar: "/tog.jpg",
    isCreator: true,
  },
}

type TabType = "nfts" | "activity" | "stats"

interface PublicProfileProps {
  address: string
}

export default function PublicProfile({ address }: PublicProfileProps) {
  const { address: connectedAddress, isConnected } = useAccount()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("nfts")
  const [copied, setCopied] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [avatarSrc, setAvatarSrc] = useState("")
  const [isCreator, setIsCreator] = useState(false)

  const isOwnProfile = isConnected && connectedAddress?.toLowerCase() === address.toLowerCase()

  useEffect(() => {
    const lowerAddress = address.toLowerCase()
    const userData = MOCK_USERS[lowerAddress]

    if (userData) {
      setDisplayName(userData.name)
      setAvatarSrc(userData.avatar)
      setIsCreator(userData.isCreator)
    } else {
      setDisplayName(address.slice(0, 6) + "..." + address.slice(-4))
      setAvatarSrc("/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png")
      setIsCreator(false)
    }
  }, [address])

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: "nfts" as TabType, label: "NFTs", icon: Gem },
    { id: "activity" as TabType, label: "Activity", icon: Activity },
    { id: "stats" as TabType, label: "Stats", icon: BarChart3 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "nfts":
        return <PublicNFTsContent address={address} isCreator={isCreator} />
      case "activity":
        return <PublicActivityContent address={address} />
      case "stats":
        return <PublicStatsContent address={address} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Mobile Close Button */}
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 md:hidden text-gray-400 hover:text-cyan-400"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Back Button */}
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-6 text-muted-foreground hover:text-primary transition-all duration-300 group hover:bg-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          {/* Profile Header */}
          <div className="bg-black/30 backdrop-blur-md border border-primary/20 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl shadow-primary/10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-primary/30 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300">
                <AvatarImage src={avatarSrc} alt={displayName} className="object-cover" />
                <AvatarFallback className="bg-primary/20 text-primary">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              {/* Profile Info + Follow */}
              <div className="flex-1 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-6 w-full text-center lg:text-left">
                <div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {displayName}
                    </h1>
                    {isCreator && (
                      <Badge className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/30 text-cyan-400 px-3 py-1">
                        Creator
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-2 bg-background/50 rounded-lg px-3 py-2 w-fit mx-auto lg:mx-0 border border-primary/20">
                    <span className="text-sm font-mono text-primary">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                      title="Copy address"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Follow Button - Only for other users */}
                {!isOwnProfile && (
                  <div className="flex flex-col items-center lg:items-end">
                    <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                      Follow
                    </Button>
                    <span className="text-cyan-400 text-sm font-medium mt-2">33 Followers</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-black/30 backdrop-blur-md border border-primary/20 rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-primary/10">
            <div className="flex overflow-x-auto no-scrollbar border-b border-primary/20">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 flex-1 sm:flex-none
                      ${isActive
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}