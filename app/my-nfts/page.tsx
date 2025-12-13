"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gem, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

export default function MyNFTsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <SiteHeader />

        <div className="max-w-6xl mx-auto px-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-6 mt-8 text-muted-foreground hover:text-primary transition-all duration-300 group hover:bg-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <Card className="border-border/30 bg-black/30 backdrop-blur-md rune-glow-violet mb-4">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Your NFT Collection</CardTitle>
              <CardDescription className="text-muted-foreground">
                View and manage all the artifacts you've won from auctions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <Gem className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">No NFTs Found</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed mb-8">
                  You don't own any NFTs yet. Start bidding on artifacts to build your collection.
                </p>
                <Link href="/explore">
                  <Button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                    Browse Gallery
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
