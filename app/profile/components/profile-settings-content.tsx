"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2, Check, AlertCircle } from "lucide-react"

interface ProfileSettingsContentProps {
  onProfileUpdate?: (data: { displayName: string; bio: string }) => void
}

export default function ProfileSettingsContent({ onProfileUpdate }: ProfileSettingsContentProps) {
  const [displayName, setDisplayName] = useState("Wolfgang")
  const [bio, setBio] = useState("Collector of mystical artifacts and digital relics from the ethereal realm.")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const validateData = () => {
    if (!displayName.trim()) {
      setErrorMessage("Display name cannot be empty")
      return false
    }
    if (displayName.length > 50) {
      setErrorMessage("Display name must be less than 50 characters")
      return false
    }
    if (bio.length > 200) {
      setErrorMessage("Bio must be less than 200 characters")
      return false
    }
    return true
  }

  const handleSave = async () => {
    if (!validateData()) {
      setSaveError(true)
      setTimeout(() => {
        setSaveError(false)
        setErrorMessage("")
      }, 3000)
      return
    }

    setIsSaving(true)
    setSaveError(false)

    try {
      // Simuler un délai de sauvegarde (comme un appel API)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Sauvegarder dans localStorage (pour développement)
      const profileData = {
        displayName: displayName.trim(),
        bio: bio.trim(),
        lastUpdated: new Date().toISOString()
      }

      localStorage.setItem('userProfileSettings', JSON.stringify(profileData))

      // Mettre à jour le composant parent
      onProfileUpdate?.({
        displayName: profileData.displayName,
        bio: profileData.bio
      })

      // Feedback de succès
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)

      console.log("Profile settings saved successfully:", profileData)

    } catch (error) {
      console.error('Failed to save profile settings:', error)
      setErrorMessage("Failed to save changes. Please try again.")
      setSaveError(true)
      setTimeout(() => {
        setSaveError(false)
        setErrorMessage("")
      }, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  // Charger les données sauvegardées au montage du composant
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('userProfileSettings')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setDisplayName(parsedData.displayName || "Wolfgang")
        setBio(parsedData.bio || "Collector of mystical artifacts and digital relics from the ethereal realm.")
      }
    } catch (error) {
      console.error('Failed to load saved profile data:', error)
    }
  }, [])

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
          placeholder="Why The Overmind Gallery?"
        />
        <p className="text-xs text-muted-foreground">
          Maximum 200 characters
        </p>
      </div>

      {/* Save Button */}
      <div className="flex flex-col items-end gap-3 pt-4">
        {/* Error Message */}
        {saveError && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <Check className="w-4 h-4" />
            Profile updated successfully!
          </div>
        )}

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] ${
            saveSuccess ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''
          } ${
            saveError ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''
          }`}
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : saveSuccess ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}