// components/follow-choice-modal.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Sparkles } from "lucide-react"
import { useState } from "react"

interface FollowChoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  displayName: string
  onFollowGallery: () => Promise<void> | void
}

export default function FollowChoiceModal({
  open,
  onOpenChange,
  displayName,
  onFollowGallery,
}: FollowChoiceModalProps) {
  const [followGallery, setFollowGallery] = useState(true)
  const [followIntuition, setFollowIntuition] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)

    if (followGallery) {
      await onFollowGallery()
    }

    if (followIntuition) {
      window.open("https://portal.intuition.systems", "_blank", "noopener,noreferrer")
    }

    setIsLoading(false)
    onOpenChange(false)

    // Reset for next time
    setTimeout(() => {
      setFollowGallery(true)
      setFollowIntuition(false)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-secondary" />
            Follow {displayName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-muted-foreground text-center">
            Choose where you'd like to follow {displayName}:
          </p>

          <div className="space-y-5">
            {/* Overmind Gallery Option */}
            <label className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={followGallery}
                  onCheckedChange={(checked) => setFollowGallery(checked as boolean)}
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div>
                  <p className="font-semibold text-primary">Overmind Gallery</p>
                  <p className="text-sm text-muted-foreground">See their NFTs, drops, and gallery activity</p>
                </div>
              </div>
            </label>

            {/* Intuition Portal Option */}
            <label className="flex items-center justify-between p-4 rounded-xl border border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={followIntuition}
                  onCheckedChange={(checked) => setFollowIntuition(checked as boolean)}
                  className="border-secondary/50 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
                />
                <div>
                  <p className="font-semibold text-secondary">Intuition Portal</p>
                  <p className="text-sm text-muted-foreground">Follow their insights, writings, and wisdom</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-secondary/60" />
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || (!followGallery && !followIntuition)}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}