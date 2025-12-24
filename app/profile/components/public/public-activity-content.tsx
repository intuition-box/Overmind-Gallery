"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Public activity: only shows wins (no personal losses or rewards)
const getPublicActivity = (address: string) => {
  const lowerAddress = address.toLowerCase()

  return [
    {
      id: 1,
      artifact: "Ethereal Void Walker",
      collectionSlug: "void-walkers",
      amount: "2.1 TRUST",
      type: "Purchased",
      date: "2 days ago",
    },
    {
      id: 2,
      artifact: "The Obsidian Codex",
      collectionSlug: "ancient-codex",
      amount: "2.5 TRUST",
      type: "Purchased",
      date: "1 week ago",
    },
  ].filter((item) => lowerAddress === "0x742d35cc6634c0532925a3b8d4c0532925a3b8d4") // Only show for Wolfgang as example
}

export default function PublicActivityContent({ address }: { address: string }) {
  const activities = getPublicActivity(address)

  return (
    <div className="overflow-x-auto -mx-6 sm:-mx-8">
      <div className="inline-block min-w-full align-middle px-6 sm:px-8">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Activity</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Artifact</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-primary text-sm">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-primary/10 hover:bg-primary/5 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                      {item.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      href={`/collection/${item.collectionSlug}`}
                      className="font-medium text-sm text-primary-foreground hover:text-primary transition-colors"
                    >
                      {item.artifact}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-card-foreground">
                    {item.amount}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {item.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-12 text-muted-foreground">
                  No public activity available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}