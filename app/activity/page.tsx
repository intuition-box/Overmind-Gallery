"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

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
  {
    id: 5,
    artifact: "Quantum Rune Stone",
    amountBid: "1.5 TRUST",
    amountSold: "3.0 TRUST",
    winningAddress: "billy.eth",
    status: "Lose" as const,
    isEnded: true,
    bidAmount: 1.5,
    soldAmount: 3.0,
  },
]

const getStatusBadge = (status: string, isEnded: boolean) => {
  const statusText = isEnded ? `${status} (Ended)` : `${status} (Ongoing)`

  switch (status) {
    case "Win":
      return (
        <Badge
          className={`${isEnded ? "bg-green-500/20 text-green-400 border-green-400/30" : "bg-green-500/30 text-green-300 border-green-300/40"}`}
        >
          {statusText}
        </Badge>
      )
    case "Lose":
      return (
        <Badge
          className={`${isEnded ? "bg-orange-500/20 text-orange-400 border-orange-400/30" : "bg-orange-500/30 text-orange-300 border-orange-300/40"}`}
        >
          {statusText}
        </Badge>
      )
    case "Ongoing":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">Ongoing</Badge>
    default:
      return <Badge variant="secondary">{statusText}</Badge>
  }
}

const calculateReward = (item: (typeof mockActivityData)[0]) => {
  if (item.status === "Lose" && item.soldAmount && item.bidAmount) {
    const reward = item.bidAmount * 0.05
    return `+${reward.toFixed(2)} TRUST`
  }
  return null
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<"all" | "win" | "lose" | "ongoing">("all")
  const router = useRouter()

  const filteredData = mockActivityData.filter((item) => {
    if (filter === "all") return true
    if (filter === "win") return item.status === "Win"
    if (filter === "lose") return item.status === "Lose"
    if (filter === "ongoing") return item.status === "Ongoing"
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        {/* Back button */}
        <div className="max-w-6xl mx-auto px-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-6 mt-8 text-muted-foreground hover:text-primary transition-all duration-300 group hover:bg-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <Card className="border border-primary/20 backdrop-blur-xl shadow-2xl shadow-primary/10 bg-black/30">
            <CardHeader className="border-b border-primary/20 pb-6">
              <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Your Auction History
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Track all your bidding activity and rewards across the gallery
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-primary/20 bg-black/20">
                      <th className="text-left py-5 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-w-[250px] text-base">
                        Artifact
                      </th>
                      <th className="text-left py-5 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-w-[150px] text-base">
                        Amount Bid
                      </th>
                      <th className="text-left py-5 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-w-[250px] text-base">
                        Amount Sold
                      </th>
                      <th className="text-left py-5 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-w-[150px] text-base">
                        Your Reward
                      </th>
                      <th className="text-left py-5 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-w-[180px] text-base">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => {
                      const reward = calculateReward(item)
                      return (
                        <tr
                          key={item.id}
                          className="border-b border-primary/10 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        >
                          <td className="py-6 px-6">
                            <div className="font-medium text-base text-primary-foreground">{item.artifact}</div>
                          </td>
                          <td className="py-6 px-6">
                            <div className="text-base font-medium text-card-foreground">{item.amountBid}</div>
                          </td>
                          <td className="py-6 px-6">
                            <div className="space-y-2">
                              <div className="text-base font-medium text-primary-foreground">
                                {item.amountSold === "-" ? "N/A" : item.amountSold}
                              </div>
                              {item.winningAddress !== "-" && (
                                <div className="text-sm text-muted-foreground font-mono break-all max-w-[200px]">
                                  {item.winningAddress}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            {reward ? (
                              <div className="text-green-400 font-semibold text-base">{reward}</div>
                            ) : (
                              <div className="text-base text-card-foreground">N/A</div>
                            )}
                          </td>
                          <td className="py-6 px-6">{getStatusBadge(item.status, item.isEnded)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
