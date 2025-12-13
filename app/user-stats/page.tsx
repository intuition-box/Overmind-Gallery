"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

export default function UserStatsPage() {
  const router = useRouter()

  const userStats = {
    totalEarnedIncentives: 4060.86,
    auctionsParticipated: 538,
    auctionsWon: 58,
    totalBidsPlaced: 575,
    timesOutbid: 517,
    openingBidsPlaced: 277,
  }

  const handleShareStats = () => {
    const tweetText = `🌟 My Overmind Gallery Stats 🌟

💎 Total Earned: ${userStats.totalEarnedIncentives.toLocaleString()} TRUST
🎯 Auctions Won: ${userStats.auctionsWon}/${userStats.auctionsParticipated}
📈 Total Bids: ${userStats.totalBidsPlaced}
⚡ Times Outbid: ${userStats.timesOutbid}

#OvermindGallery #NFT $TRUST`

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        
        <div className="max-w-6xl mx-auto px-6">
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
              <CardTitle className="text-2xl text-card-foreground">Your Performance Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Track your bidding activity and earnings across the Overmind Gallery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Total Earned Section */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-4">Total Earned Incentives</h3>
                <div className="inline-block p-8 rounded-lg border-2 border-primary/30 bg-primary/5 rune-glow-cyan">
                  <div className="text-5xl font-bold text-primary">
                    {userStats.totalEarnedIncentives.toLocaleString()} TRUST
                  </div>
                </div>
                <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
                  Total amount earned from being outbid, using the token-to-TRUST price at the time of each auction.
                </p>
              </div>

              {/* Auction Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg border border-primary/30 bg-primary/5">
                  <h4 className="text-primary font-semibold mb-3 text-lg">Auctions Participated In</h4>
                  <div className="text-4xl font-bold text-primary">{userStats.auctionsParticipated}</div>
                </div>
                <div className="text-center p-6 rounded-lg border border-primary/30 bg-primary/5">
                  <h4 className="text-primary font-semibold mb-3 text-lg">Auctions Won</h4>
                  <div className="text-4xl font-bold text-primary">{userStats.auctionsWon}</div>
                </div>
              </div>

              {/* Bidding Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border border-secondary/30 bg-secondary/5">
                  <h4 className="text-secondary font-semibold mb-3 text-lg">Total Bids Placed</h4>
                  <div className="text-3xl font-bold text-secondary">{userStats.totalBidsPlaced}</div>
                </div>
                <div className="text-center p-6 rounded-lg border border-secondary/30 bg-secondary/5">
                  <h4 className="text-secondary font-semibold mb-3 text-lg">Number Of Times Outbid</h4>
                  <div className="text-3xl font-bold text-secondary">{userStats.timesOutbid}</div>
                </div>
                <div className="text-center p-6 rounded-lg border border-secondary/30 bg-secondary/5">
                  <h4 className="text-secondary font-semibold mb-3 text-lg">Opening Bids Placed</h4>
                  <div className="text-3xl font-bold text-secondary">{userStats.openingBidsPlaced}</div>
                </div>
              </div>

              {/* Share Button */}
              <div className="text-center pt-5">
                <Button
                  onClick={handleShareStats}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-8 py-3 text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-share w-5 h-5 mr-2"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" x2="12" y1="2" y2="15"></line>
                  </svg>
                  Share Your Stats On X
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
