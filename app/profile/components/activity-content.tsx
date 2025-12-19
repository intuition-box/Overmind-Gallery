// app/profile/components/activity-content.tsx
"use client"

import { Badge } from "@/components/ui/badge"

const mockActivityData = [
  {
    id: 1,
    artifact: "Ethereal Void Walker",
    amountBid: "1.8 TRUST",
    amountSold: "2.1 TRUST",
    winningAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    status: "Win" as const,
    isEnded: true,
    bidAmount: 1.8,
    soldAmount: 2.1,
  },
  {
    id: 2,
    artifact: "Shadow Nexus Crystal",
    amountBid: "3.5 TRUST",
    amountSold: "4.1 TRUST",
    winningAddress: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
    status: "Lose" as const,
    isEnded: true,
    bidAmount: 3.5,
    soldAmount: 4.1,
  },
  {
    id: 3,
    artifact: "Neon Sigil of Power",
    amountBid: "2.8 TRUST",
    amountSold: "-",
    winningAddress: "-",
    status: "Ongoing" as const,
    isEnded: false,
    bidAmount: 2.8,
    soldAmount: null,
  },
  {
    id: 4,
    artifact: "The Obsidian Codex",
    amountBid: "2.2 TRUST",
    amountSold: "2.5 TRUST",
    winningAddress: "0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C053",
    status: "Lose" as const,
    isEnded: true,
    bidAmount: 2.2,
    soldAmount: 2.5,
  },
]

const getStatusBadge = (status: string, isEnded: boolean) => {
  const statusText = isEnded ? `${status} (Ended)` : `${status} (Ongoing)`

  switch (status) {
    case "Win":
      return (
        <Badge className={isEnded ? "bg-green-500/20 text-green-400 border-green-400/30" : "bg-green-500/30 text-green-300 border-green-300/40"}>
          {statusText}
        </Badge>
      )
    case "Lose":
      return (
        <Badge className={isEnded ? "bg-orange-500/20 text-orange-400 border-orange-400/30" : "bg-orange-500/30 text-orange-300 border-orange-300/40"}>
          {statusText}
        </Badge>
      )
    case "Ongoing":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">Ongoing</Badge>
    default:
      return <Badge variant="secondary">{statusText}</Badge>
  }
}

const calculateReward = (item: typeof mockActivityData[0]) => {
  if (item.status === "Lose" && item.soldAmount && item.bidAmount) {
    const reward = item.bidAmount * 0.10
    return `+${reward.toFixed(2)} TRUST`
  }
  return null
}

export default function ActivityContent() {
  return (
    <div className="overflow-x-auto -mx-6 sm:-mx-8">
      <div className="inline-block min-w-full align-middle px-6 sm:px-8">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Artifact</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Amount Bid</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Amount Sold</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Your Reward</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockActivityData.map((item) => {
              const reward = calculateReward(item)
              return (
                <tr
                  key={item.id}
                  className="border-b border-primary/10 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-sm text-primary-foreground">{item.artifact}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-card-foreground">{item.amountBid}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-primary-foreground">
                        {item.amountSold === "-" ? "N/A" : item.amountSold}
                      </div>
                      {item.winningAddress !== "-" && (
                        <div className="text-xs text-muted-foreground font-mono break-all max-w-[150px]">
                          {item.winningAddress}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {reward ? (
                      <div className="text-green-400 font-semibold text-sm">{reward}</div>
                    ) : (
                      <div className="text-sm text-card-foreground">N/A</div>
                    )}
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(item.status, item.isEnded)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}