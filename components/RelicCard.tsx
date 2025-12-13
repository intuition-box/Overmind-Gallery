// components/RelicCard.tsx
"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type RelicCardProps = {
  relic: {
    id: number
    title: string
    creator: string
    price: string
    image?: string
    status?: string
    glbUrl?: string
  }
  onOpen: (r: any) => void
}

export default function RelicCard({ relic, onOpen }: RelicCardProps) {
  return (
    <Card
      key={relic.id}
      className="group cursor-pointer overflow-hidden border border-gray-800 bg-gray-950 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02]"
      onClick={() => onOpen(relic)}
      aria-label={`Open ${relic.title}`}
    >
      {/* Thumbnail (fast) */}
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {/* If you want autoplaying small 3D preview later, replace with optimized video/WebP */}
        <img
          src={relic.image}
          alt={relic.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          draggable={false}
          loading="lazy"
        />

        {relic.glbUrl && (
          <div className="absolute top-3 left-3 bg-black/50 text-cyan-300 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
            3D
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{relic.title}</h3>
        <p className="text-gray-400 text-sm mb-3 truncate">by {relic.creator}</p>

        <div className="flex justify-between items-center">
          <Badge className="bg-cyan-900/50 text-cyan-300 border border-cyan-700">
            {relic.price}
          </Badge>
          <span className="text-gray-500 text-sm capitalize">{relic.status?.replace("-", " ") ?? ""}</span>
        </div>
      </div>
    </Card>
  )
}
