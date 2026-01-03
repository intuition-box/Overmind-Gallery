// app/profile/components/activity-content.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import UserLink from "@/components/UserLink"

// Mock mapping of addresses to display names
const addressToName: Record<string, string> = {
  "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4": "Wolfgang",
  "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a": "ShadowCaster",
  "0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C053": "MysticOracle",
}

// Mock collection slugs
const artifactToCollectionSlug: Record<string, string> = {
  "Ethereal Void Walker": "void-walkers",
  "Shadow Nexus Crystal": "shadow-crystals",
  "Neon Sigil of Power": "neon-sigils",
  "The Obsidian Codex": "ancient-codex",
}

const mockActivityData = [
  {
    id: 1,
    artifact: "Ethereal Void Walker",
    collectionSlug: "void-walkers",
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
    collectionSlug: "shadow-crystals",
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
    collectionSlug: "neon-sigils",
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
    collectionSlug: "ancient-codex",
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
        <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
          {statusText}
        </Badge>
      )
    case "Lose":
      return (
        <Badge variant="outline" className="border-orange-500/50 text-orange-400 bg-orange-500/10">
          {statusText}
        </Badge>
      )
    case "Ongoing":
      return (
        <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
          Ongoing
        </Badge>
      )
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
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Artifact</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Amount Bid</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Amount Sold</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Winner</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Your Reward</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {mockActivityData.map((item) => {
              const reward = calculateReward(item)
              const winnerName = item.winningAddress !== "-" 
                ? addressToName[item.winningAddress] || `${item.winningAddress.slice(0, 6)}...${item.winningAddress.slice(-4)}`
                : "-"

              return (
                <tr
                  key={item.id}
                  className="border-b border-border/30 hover:bg-accent/50 transition-colors duration-200"
                >
                  {/* Artifact */}
                  <td className="py-5 px-4">
                    <Link 
                      href={`/collections/${item.collectionSlug}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.artifact}
                    </Link>
                  </td>

                  {/* Amount Bid */}
                  <td className="py-5 px-4">
                    <div className="text-sm font-medium text-foreground">{item.amountBid}</div>
                  </td>

                  {/* Amount Sold */}
                  <td className="py-5 px-4">
                    <div className="text-sm font-medium text-foreground">
                      {item.amountSold === "-" ? "N/A" : item.amountSold}
                    </div>
                  </td>

                  {/* Winner */}
                  <td className="py-5 px-4">
                    {item.winningAddress !== "-" ? (
                      <UserLink 
                        address={item.winningAddress}
                        displayName={winnerName}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>

                  {/* Your Reward */}
                  <td className="py-5 px-4">
                    {reward ? (
                      <div className="text-sm font-semibold text-green-400">{reward}</div>
                    ) : (
                      <div className="text-sm text-muted-foreground">N/A</div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-5 px-4">
                    {getStatusBadge(item.status, item.isEnded)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}