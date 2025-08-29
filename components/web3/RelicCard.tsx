'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Address } from "./Address"
import { useOvermindNFT } from "@/hooks/overmind/useOvermindNFT"

interface RelicCardProps {
  tokenId: number
  title: string
  image: string
  creator: string
  price?: string
  onAcquire?: () => void
  className?: string
}

/**
 * Enhanced NFT card with Web3 integration
 */
export function RelicCard({
  tokenId,
  title,
  image,
  creator,
  price,
  onAcquire,
  className = ""
}: RelicCardProps) {
  const { getRelicPower, getRelicCreator } = useOvermindNFT()
  
  // Get relic power from blockchain (commented out for now as contracts aren't deployed)
  // const { data: relicPower } = getRelicPower(tokenId)
  // const { data: relicCreatorAddress } = getRelicCreator(tokenId)

  // Mock data for now - using deterministic value to avoid hydration mismatch
  const relicPower = ((tokenId * 137) % 1000) + 1
  const relicCreatorAddress = "0x1234567890123456789012345678901234567890"

  return (
    <Card
      className={`group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow ${className}`}
      onClick={onAcquire}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Power level indicator */}
        <div className="absolute top-2 right-2">
          <Badge 
            variant="secondary" 
            className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs"
          >
            ⚡ {relicPower}
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-playfair text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="text-muted-foreground text-sm space-y-1">
            <p>by {creator}</p>
            <Address 
              address={relicCreatorAddress} 
              className="text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {price && (
            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
              {price}
            </Badge>
          )}
          <Button
            size="sm"
            className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow"
          >
            Acquire
          </Button>
        </div>

        {/* Web3 metadata */}
        <div className="text-xs text-muted-foreground border-t border-border/30 pt-3">
          <div className="flex justify-between">
            <span>Token ID: #{tokenId}</span>
            <span>Power: {relicPower}/1000</span>
          </div>
        </div>
      </div>
    </Card>
  )
}