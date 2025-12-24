"use client"

export default function PublicStatsContent({ address }: { address: string }) {
  const stats = {
    auctionsParticipated: 538,
    auctionsWon: 58,
    totalBidsPlaced: 575,
    timesOutbid: 517,
    openingBidsPlaced: 277,
  }

  return (
    <div className="space-y-8 py-8">
      {/* Blurred Total Earned */}
      <div className="text-center py-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Total Earned Incentives</h3>
        <div className="inline-block p-6 rounded-lg border-2 border-primary/30 bg-primary/5">
          <div className="text-4xl font-bold text-primary blur-md select-none">
            ****** TRUST
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
          Earnings are private and not visible on public profiles.
        </p>
      </div>

      {/* Auction Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-lg border border-primary/30 bg-primary/5">
          <h4 className="text-primary font-semibold mb-2 text-sm">Auctions Participated In</h4>
          <div className="text-3xl font-bold text-primary">{stats.auctionsParticipated}</div>
        </div>
        <div className="text-center p-4 rounded-lg border border-primary/30 bg-primary/5">
          <h4 className="text-primary font-semibold mb-2 text-sm">Auctions Won</h4>
          <div className="text-3xl font-bold text-primary">{stats.auctionsWon}</div>
        </div>
      </div>

      {/* Bidding Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <h4 className="text-secondary font-semibold mb-2 text-sm">Total Bids Placed</h4>
          <div className="text-2xl font-bold text-secondary">{stats.totalBidsPlaced}</div>
        </div>
        <div className="text-center p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <h4 className="text-secondary font-semibold mb-2 text-sm">Times Outbid</h4>
          <div className="text-2xl font-bold text-secondary">{stats.timesOutbid}</div>
        </div>
        <div className="text-center p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <h4 className="text-secondary font-semibold mb-2 text-sm">Opening Bids Placed</h4>
          <div className="text-2xl font-bold text-secondary">{stats.openingBidsPlaced}</div>
        </div>
      </div>

      {/* No Share Button */}
    </div>
  )
}