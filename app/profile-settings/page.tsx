"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Upload, Save, ArrowLeft } from "lucide-react"

export default function ProfileSettingsPage() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState("/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png")
  const [displayName, setDisplayName] = useState("Wolfgang")
  const [bio, setBio] = useState("Collector of mystical artifacts and digital relics from the ethereal realm.")
  const [walletAddress] = useState("0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // TODO: save to backend or local storage
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        {/* SiteHeader /> */}

        <div className="max-w-2xl mx-auto px-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-6 mt-8 text-muted-foreground hover:text-primary transition-all duration-300 group hover:bg-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <Card className="border-border/30 bg-black/30 backdrop-blur-md rune-glow-violet">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                <User className="w-6 h-6 text-cyan-400" />
                Edit Profile
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Customize your profile appearance and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-cyan-400/30">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile Avatar" className="object-cover" />
                  <AvatarFallback className="bg-cyan-400/20 text-cyan-400 text-2xl">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center gap-2">
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Picture
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="display-name" className="text-card-foreground">
                  Display Name
                </Label>
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-background/50 border-border/30 text-card-foreground"
                  placeholder="Enter your display name"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-card-foreground">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-background/50 border-border/30 text-card-foreground min-h-[100px]"
                  placeholder="Tell others about yourself..."
                />
              </div>

              {/* Wallet Address (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="wallet-address" className="text-card-foreground">
                  Wallet Address
                </Label>
                <Input
                  id="wallet-address"
                  value={walletAddress}
                  readOnly
                  className="bg-background/30 border-border/20 text-muted-foreground font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Your wallet address cannot be changed</p>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
