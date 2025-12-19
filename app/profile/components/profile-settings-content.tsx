"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Save } from "lucide-react"

export default function ProfileSettingsContent() {
  const [displayName, setDisplayName] = useState("Wolfgang")
  const [bio, setBio] = useState("Collector of mystical artifacts and digital relics from the ethereal realm.")

  const handleSave = () => {
    // TODO: save to backend or local storage
    console.log("Saving profile settings...")
  }

  return (
    <div className="space-y-6">
      {/* Display Name */}
      <div className="space-y-2">
        <Label htmlFor="display-name" className="text-card-foreground text-sm font-medium">
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
        <Label htmlFor="bio" className="text-card-foreground text-sm font-medium">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bg-background/50 border-border/30 text-card-foreground min-h-[100px] resize-none"
          placeholder="Tell others about yourself..."
        />
        <p className="text-xs text-muted-foreground">
          Maximum 200 characters
        </p>
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
    </div>
  )
}