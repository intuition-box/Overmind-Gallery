// app/stats/page.tsx
"use client"

import SiteHeader from "@/components/site-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Gem, Users, DollarSign, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* SiteHeader*/}
      <SiteHeader />

      {/* Main content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-playfair mb-4">
              Marketplace Stats
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Live insights into The Overmind Gallery ecosystem
            </p>
          </div>

          {/* Core Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-cyan-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Total Volume Traded</p>
              <p className="text-4xl font-bold text-card-foreground">127.4K TRUST</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +24.3% this year
              </Badge>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Gem className="w-8 h-8 text-violet-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Total NFTs Sold</p>
              <p className="text-4xl font-bold text-card-foreground">8,421</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +18.7% this year
              </Badge>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-cyan-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">No. of Users</p>
              <p className="text-4xl font-bold text-card-foreground">3,892</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +31.2% this year
              </Badge>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-violet-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">Total Transactions</p>
              <p className="text-4xl font-bold text-card-foreground">1,247</p>
              <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                +42.1% this month
              </Badge>
            </Card>
          </div>

          {/* Volume Chart */}
          <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl shadow-primary/10">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Volume Over Time (Monthly)</h2>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
                    labelStyle={{ color: "#22d3ee" }}
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
            </div>
          </Card>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Top Collections</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Mystical Artifacts</span>
                  <span className="text-primary font-semibold text-xl">32.1K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Void Walker Series</span>
                  <span className="text-primary font-semibold text-xl">28.7K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Power Sigils Archive</span>
                  <span className="text-primary font-semibold text-xl">21.4K TRUST</span>
                </div>
              </div>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-primary/20 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Market Activity</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">24h Volume</span>
                  <span className="text-primary font-semibold text-xl">12.8K TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Average Bid Price</span>
                  <span className="text-primary font-semibold text-xl">2.1 TRUST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Listed NFTs</span>
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