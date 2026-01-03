"use client"

import { useState, useEffect, useRef } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, User, Settings, Activity, BarChart3, Gem, ArrowLeft, Camera, Star } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

// Import tab content components
import ProfileSettingsContent from "./components/profile-settings-content"
import MyNFTsContent from "./components/my-nfts-content"
import ActivityContent from "./components/activity-content"
import UserStatsContent from "./components/user-stats-content"
import FavoritesContent from "./components/favorites-content"

type TabType = "settings" | "my-nfts" | "favorites" | "activity" | "user-stats"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("settings")
  const [copied, setCopied] = useState(false)
  const [profileImage, setProfileImage] = useState("/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png")
  const [displayName, setDisplayName] = useState("Wolfgang")
  const { address, isConnected } = useAccount()
  const router = useRouter()

  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isCreator = true
  const bio = "A true disciple of the overmind"

  // === PRESERVED useEffect & HANDLER FUNCTIONS ===
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    const savedDisplayName = localStorage.getItem("userDisplayName")
    if (savedAvatar) setProfileImage(savedAvatar)
    if (savedDisplayName) setDisplayName(savedDisplayName)
  }, [])

  useEffect(() => {
    if (address) {
      localStorage.setItem("userAvatar", profileImage)
      localStorage.setItem("userDisplayName", displayName)
    }
  }, [profileImage, displayName, address])

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const walletAddressDisplay = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "0x1234...5678"

  const tabs = [
    { id: "settings" as TabType, label: "Settings", icon: Settings },
    { id: "my-nfts" as TabType, label: "My NFTs", icon: Gem },
    { id: "favorites" as TabType, label: "Favorites", icon: Star },
    { id: "activity" as TabType, label: "Activity", icon: Activity },
    { id: "user-stats" as TabType, label: "User Stats", icon: BarChart3 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return <ProfileSettingsContent />
      case "my-nfts":
        return <MyNFTsContent isCreator={isCreator} />
      case "favorites":
        return <FavoritesContent />
      case "activity":
        return <ActivityContent />
      case "user-stats":
        return <UserStatsContent />
      default:
        return null
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen page-gradient">
        <SiteHeader />
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <User className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-muted-foreground mb-6">
              Please connect your wallet to view your profile
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen page-gradient">
      {/* Theme-aware decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 decorative-orb-violet rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        {/* Centered Container */}
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
          <div className="bg-card/30 backdrop-blur-md border border-primary/20 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl shadow-primary/10">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div
                className="relative cursor-pointer mb-6"
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setIsHoveringAvatar(true)}
                onMouseLeave={() => setIsHoveringAvatar(false)}
              >
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-primary/30 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300">
                  <AvatarImage src={profileImage} alt="Profile Avatar" className="object-cover" />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>

                {isHoveringAvatar && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/70 rounded-full backdrop-blur-sm">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-primary mx-auto mb-1" />
                      <span className="text-xs font-semibold text-primary">Change avatar</span>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* Text Elements */}
              <div className="space-y-4 w-full max-w-md">
                {/* Name + Creator Badge */}
                <div className="flex flex-col items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    {displayName}
                  </h1>
                  {isCreator && (
                    <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-primary px-3 py-1">
                      Creator
                    </Badge>
                  )}
                </div>

                {/* Wallet Address */}
                <div className="flex items-center justify-center gap-2 bg-background/50 rounded-lg px-3 py-2 border border-primary/20">
                  <span className="text-sm font-mono text-primary">
                    {walletAddressDisplay}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                    title="Copy address"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bio */}
                {bio && (
                  <p className="text-base text-muted-foreground italic leading-relaxed">
                    {bio}
                  </p>
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
                      flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300
                      ${isActive
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${tab.id === "favorites" && isActive ? "fill-current" : ""}`} />
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