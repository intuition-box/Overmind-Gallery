"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, User, Settings, Activity, BarChart3, Gem, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

// Import existing page content
import ProfileSettingsContent from "./components/profile-settings-content"
import MyNFTsContent from "./components/my-nfts-content"
import ActivityContent from "./components/activity-content"
import UserStatsContent from "./components/user-stats-content"

type TabType = "settings" | "my-nfts" | "activity" | "user-stats"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("settings")
  const [copied, setCopied] = useState(false)
  const { address, isConnected } = useAccount()
  const router = useRouter()

  const displayName = "Wolfgang"
  const isCreator = true
  const profileImage = "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png"

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const walletAddressDisplay = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : "0x1234...5678"

  const tabs = [
    { id: "settings" as TabType, label: "Settings", icon: Settings },
    { id: "my-nfts" as TabType, label: "My NFTs", icon: Gem },
    { id: "activity" as TabType, label: "Activity", icon: Activity },
    { id: "user-stats" as TabType, label: "User Stats", icon: BarChart3 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return <ProfileSettingsContent />
      case "my-nfts":
        return <MyNFTsContent />
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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        <SiteHeader />

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
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-primary/30 shadow-lg shadow-primary/20">
                <AvatarImage src={profileImage} alt="Profile Avatar" className="object-cover" />
                <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
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

                {/* Wallet Address */}
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-background/50 rounded-lg px-3 py-2 w-fit mx-auto sm:mx-0 border border-primary/20">
                  <span className="text-sm font-mono text-primary">
                    {walletAddressDisplay}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                    title="Copy address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
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
                      ${
                        isActive
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