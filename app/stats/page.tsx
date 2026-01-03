// app/stats/page.tsx
"use client"

import SiteHeader from "@/components/site-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Gem, Users, DollarSign, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// Monthly volume data (last 12 months)
const monthlyVolumeData = [
  { month: "Jan", volume: 45000 },
  { month: "Feb", volume: 52000 },
  { month: "Mar", volume: 48000 },
  { month: "Apr", volume: 61000 },
  { month: "May", volume: 68000 },
  { month: "Jun", volume: 75000 },
  { month: "Jul", volume: 82000 },
  { month: "Aug", volume: 95000 },
  { month: "Sep", volume: 108000 },
  { month: "Oct", volume: 115000 },
  { month: "Nov", volume: 122000 },
  { month: "Dec", volume: 127400 },
]

export default function StatsPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Theme-aware colors
  const isDark = resolvedTheme === "dark"
  const chartColors = {
    grid: isDark ? "#333" : "#e5e5e5",
    axis: isDark ? "#666" : "#666",
    tooltipBg: isDark ? "#111" : "#fff",
    tooltipBorder: isDark ? "#333" : "#e5e5e5",
    tooltipLabel: "#22d3ee", // primary color
  }

  return (
    <div className="min-h-screen page-gradient relative">
      
      {/* Background Effects - Theme-aware decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl" />
      </div>

      {/* SiteHeader*/}
      <SiteHeader />

      {/* Main content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-playfair mb-4">
              Marketplace Stats
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Live insights into The Overmind Gallery ecosystem
            </p>
          </div>

          {/* Core Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Total Volume Traded</p>
              <p className="text-4xl font-bold text-foreground">127.4K TRUST</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +24.3% this year
              </Badge>
            </Card>

            <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Gem className="w-8 h-8 text-secondary" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Total NFTs Sold</p>
              <p className="text-4xl font-bold text-foreground">503</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +18.7% this year
              </Badge>
            </Card>

            <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-primary" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">No. of Users</p>
              <p className="text-4xl font-bold text-foreground">3,892</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +31.2% this year
              </Badge>
            </Card>

            <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-secondary" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Total Transactions</p>
              <p className="text-4xl font-bold text-foreground">1,247</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +42.1% this month
              </Badge>
            </Card>
          </div>

          {/* Volume Chart */}
          <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Volume Over Time (Monthly)</h2>
            <div className="h-96 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="month" stroke={chartColors.axis} />
                    <YAxis stroke={chartColors.axis} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: chartColors.tooltipBg, 
                        border: `1px solid ${chartColors.tooltipBorder}`,
                        borderRadius: "8px"
                      }}
                      labelStyle={{ color: chartColors.tooltipLabel }}
                      itemStyle={{ color: isDark ? "#fff" : "#000" }}
                      formatter={(value: number) => `${(value / 1000).toFixed(1)}K TRUST`}
                    />
                    <Line
                      type="monotone"
                      dataKey="volume"
                      stroke="url(#colorGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#22d3ee", r: 4 }}
                      activeDot={{ r: 6, fill: "#a78bfa" }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Top Collections</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mystical Artifacts</span>
                  <span className="text-primary font-semibold text-xl">32.1K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Void Walker Series</span>
                  <span className="text-primary font-semibold text-xl">28.7K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Power Sigils Archive</span>
                  <span className="text-primary font-semibold text-xl">21.4K TRUST</span>
                </div>
              </div>
            </Card>

            <Card className="bg-card/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Market Activity</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="text-primary font-semibold text-xl">12.8K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Bid Rewards</span>
                  <span className="text-primary font-semibold text-xl">61K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Listed NFTs</span>
                  <span className="text-primary font-semibold text-xl">1,892</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}