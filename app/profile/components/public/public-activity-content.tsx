// app/profile/components/activity-content.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import UserLink from "@/components/UserLink"

// Mock mapping of addresses to display names (for visualization)
const addressToName: Record<string, string> = {
  "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4": "Wolfgang",
  "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a": "ShadowCaster",
  "0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C053": "MysticOracle",
}

// Mock collection slugs for artifacts
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
    winningAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4", // Wolfgang
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
    isEnded: true,
    bidAmount: 2.2,
    soldAmount: 2.5,
  },
]

const getStatusBadge = (isEnded: boolean) => {
  if (isEnded) {
    return (
      <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
        Ended
      </Badge>
    )
  }
  return (
    <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
      Ongoing
    </Badge>
  )
}

const calculateReward = (item: typeof mockActivityData[0]) => {
  // Reward only applies to ended auctions where user didn't win (i.e., was outbid)
  if (item.isEnded && item.soldAmount && item.bidAmount) {
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
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Winner</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Reward</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockActivityData.map((item) => {
              const reward = calculateReward(item)
              const winnerName = item.winningAddress !== "-" 
                ? addressToName[item.winningAddress] || item.winningAddress.slice(0, 6) + "..." + item.winningAddress.slice(-4)
                : "-"

              return (
                <tr
                  key={item.id}
                  className="border-b border-primary/10 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"
                >
                  {/* Artifact - Clickable to collection */}
                  <td className="py-4 px-4">
                    <Link 
                      href={`/collections/${item.collectionSlug}`}
                      className="font-medium text-sm text-primary-foreground hover:text-primary transition-colors"
                    >
                      {item.artifact}
                    </Link>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-card-foreground">{item.amountBid}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-primary-foreground">
                      {item.amountSold === "-" ? "N/A" : item.amountSold}
                    </div>
                  </td>

                  {/* Winner - Clickable username/profile */}
                  <td className="py-4 px-4">
                    {item.winningAddress !== "-" ? (
                      <UserLink 
                        address={item.winningAddress}
                        displayName={winnerName}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    {reward ? (
                      <div className="text-green-400 font-semibold text-sm">{reward}</div>
                    ) : (
                      <div className="text-sm text-card-foreground">N/A</div>
                    )}
                  </td>

                  {/* Status Badge - Only "Ended" or "Ongoing" */}
                  <td className="py-4 px-4">
                    {getStatusBadge(item.isEnded)}
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