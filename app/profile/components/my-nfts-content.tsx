// app/profile/components/my-nfts-content.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Gem } from "lucide-react"
import Link from "next/link"

export default function MyNFTsContent() {
  return (
    <div className="text-center py-12">
      <Gem className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-card-foreground mb-3">No NFTs Found</h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed mb-6">
        You don't own any NFTs yet. Start bidding on artifacts to build your collection.
      </p>
      <Link href="/explore">
        <Button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
          Browse Gallery
        </Button>
      </Link>
    </div>
  )
}