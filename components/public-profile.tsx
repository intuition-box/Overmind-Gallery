// components/PublicProfile.tsx
"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Copy, 
  Check, 
  User, 
  Gem, 
  Activity, 
  BarChart3, 
  ArrowLeft, 
  X, 
  ExternalLink, 
  UserCheck 
} from "lucide-react"

// Public-specific content components
import PublicNFTsContent from "@/app/profile/components/public/public-nfts-content"
import PublicActivityContent from "@/app/profile/components/public/public-activity-content"
import PublicStatsContent from "@/app/profile/components/public/public-stats-content"

// Mock user data
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

  // Follow state
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false)
  const [followGallery, setFollowGallery] = useState(true)
  const [followIntuition, setFollowIntuition] = useState(false)
  const [isFollowingLoading, setIsFollowingLoading] = useState(false)

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

    const followingKey = `following_${lowerAddress}`
    const isAlreadyFollowing = localStorage.getItem(followingKey) === "true"
    setIsFollowing(isAlreadyFollowing)
  }, [address])

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy address:', error)
    }
  }

  const handleFollowClick = () => {
    if (isFollowing) {
      handleUnfollow()
    } else {
      setIsFollowModalOpen(true)
    }
  }

  const handleUnfollow = () => {
    const lowerAddress = address.toLowerCase()
    const followingKey = `following_${lowerAddress}`
    localStorage.removeItem(followingKey)
    setIsFollowing(false)
  }

  const handleFollowConfirm = async () => {
    setIsFollowingLoading(true)

    if (followGallery) {
      console.log(`Following ${displayName} on Overmind Gallery`)
    }

    if (followIntuition) {
      window.open("https://portal.intuition.systems", "_blank", "noopener,noreferrer")
    }

    const lowerAddress = address.toLowerCase()
    localStorage.setItem(`following_${lowerAddress}`, "true")
    
    setIsFollowing(true)
    setIsFollowingLoading(false)
    setIsFollowModalOpen(false)

    setTimeout(() => {
      setFollowGallery(true)
      setFollowIntuition(false)
    }, 300)
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
    <div className="min-h-screen page-gradient">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Mobile Close Button */}
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 md:hidden text-muted-foreground hover:text-primary"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Back Button */}
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-6 text-muted-foreground hover:text-primary transition-all duration-300 group hover:bg-transparent rune-glow"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          {/* Profile Header */}
          <div className="bg-card/30 backdrop-blur-md border border-primary/20 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl shadow-primary/10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-primary/30 hover:border-primary/50 rune-glow transition-all duration-300 flex-shrink-0">
                <AvatarImage src={avatarSrc} alt={displayName} className="object-cover" />
                <AvatarFallback className="bg-primary/20 text-primary">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 w-full flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                <div className="text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                      {displayName}
                    </h1>
                    {isCreator && (
                      <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-primary px-3 py-0.5 text-xs">
                        Creator
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3 bg-card/50 rounded-lg px-4 py-2 border border-primary/20">
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

                {!isOwnProfile && (
                  <div className="flex flex-col items-center">
                    <Button
                      onClick={handleFollowClick}
                      className={`
                        px-10 py-3 text-base font-semibold shadow-lg transition-all duration-300 rune-glow
                        ${isFollowing 
                          ? "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 hover:shadow-primary/20" 
                          : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 hover:shadow-green-500/20"
                        }
                      `}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Following
                        </>
                      ) : (
                        "Follow"
                      )}
                    </Button>
                    <span className="text-primary text-sm font-medium mt-3">33 Followers</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card/30 backdrop-blur-md border border-primary/20 rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-primary/10">
            <div className="flex justify-center overflow-x-auto no-scrollbar border-b border-primary/20">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-3 px-8 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300
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

            <div className="p-6 sm:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT & STYLISH FOLLOW MODAL WITH REAL IMAGES */}
      <Dialog open={isFollowModalOpen} onOpenChange={setIsFollowModalOpen}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/20 max-w-sm p-6">
          <DialogHeader className="pb-3">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
              Follow {displayName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <p className="text-muted-foreground text-center text-sm">
              Choose where you'd like to follow:
            </p>

            <div className="space-y-3">
              {/* Overmind Gallery */}
              <button
                onClick={() => setFollowGallery(!followGallery)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-300 group relative overflow-hidden
                  ${followGallery 
                    ? "border-primary/70 bg-primary/10 shadow-lg shadow-primary/30" 
                    : "border-primary/20 bg-card/50 hover:border-primary/40"
                  }
                `}
              >
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/tog.jpg')" }} />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md border border-primary/30">
                      <img src="/tog.jpg" alt="Overmind Gallery" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold ${followGallery ? "text-primary" : "text-foreground"}`}>
                        Overmind Gallery
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Get alerts for NFTs, Collections & activity
                      </p>
                    </div>
                  </div>

                  {followGallery && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </button>

              {/* Intuition Portal */}
              <button
                onClick={() => setFollowIntuition(!followIntuition)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-300 group relative overflow-hidden
                  ${followIntuition 
                    ? "border-secondary/70 bg-secondary/10 shadow-lg shadow-secondary/30" 
                    : "border-secondary/20 bg-card/50 hover:border-secondary/40"
                  }
                `}
              >
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/intuition.jpg')" }} />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md border border-secondary/30">
                      <img src="/intuition.jpg" alt="Intuition Portal" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold ${followIntuition ? "text-secondary" : "text-foreground"}`}>
                        Intuition Portal
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Be part of something greater, the knowledge graph
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-secondary/70 group-hover:text-secondary transition-colors" />
                    {followIntuition && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsFollowModalOpen(false)}
              className="flex-1"
              disabled={isFollowingLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFollowConfirm}
              disabled={isFollowingLoading || (!followGallery && !followIntuition)}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
            >
              {isFollowingLoading ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}