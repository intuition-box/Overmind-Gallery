"use client"

import { Button } from "@/components/ui/button"

export default function UserStatsContent() {
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
    <div className="space-y-6">
      {/* Total Earned Section */}
      <div className="text-center py-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Total Earned Incentives</h3>
        <div className="inline-block p-6 rounded-lg border-2 border-primary/30 bg-primary/5">
          <div className="text-4xl font-bold text-primary">
            {userStats.totalEarnedIncentives.toLocaleString()} TRUST
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
          Total amount earned from being outbid, using the token-to-TRUST price at the time of each auction.
        </p>
      </div>

      {/* Auction Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-lg border border-primary/30 bg-primary/5">
          <h4 className="text-primary font-semibold mb-2 text-sm">Auctions Participated In</h4>
          <div className="text-3xl font-bold text-primary">{userStats.auctionsParticipated}</div>
        </div>
        <div className="text-center p-4 rounded-lg border border-primary/30 bg-primary/5">
          <h4 className="text-primary font-semibold mb-2 text-sm">Auctions Won</h4>
          <div className="text-3xl font-bold text-primary">{userStats.auctionsWon}</div>
        </div>
      </div>

      {/* Bidding Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <h4 className="text-secondary font-semibold mb-2 text-sm">Total Bids Placed</h4>
          <div className="text-2xl font-bold text-secondary">{userStats.totalBidsPlaced}</div>
        </div>
        <div className="text-center p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <h4 className="text-secondary font-semibold mb-2 text-sm">Times Outbid</h4>
          <div className="text-2xl font-bold text-secondary">{userStats.timesOutbid}</div>
        </div>
        <div className="text-center p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <h4 className="text-secondary font-semibold mb-2 text-sm">Opening Bids Placed</h4>
          <div className="text-2xl font-bold text-secondary">{userStats.openingBidsPlaced}</div>
        </div>
      </div>

      {/* Share Button */}
      <div className="text-center pt-4">
        <Button
          onClick={handleShareStats}
          className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-6 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" x2="12" y1="2" y2="15"></line>
          </svg>
          Share Your Stats On X
        </Button>
      </div>
    </div>
  )
}