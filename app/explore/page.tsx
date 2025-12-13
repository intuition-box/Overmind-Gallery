"use client"

import React, { useState } from "react"
import SiteHeader from "@/components/site-header"
import GalleryFooter from "@/components/gallery-footer"
import RelicCard from "@/components/RelicCard"
import RelicDialog from "@/components/RelicDialog"
import { nftRelics } from "@/lib/nftRelics"

export default function ExplorePage() {
  const [selectedRelic, setSelectedRelic] = useState<any | null>(null)

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      <main className="container mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-12">
          Explore Sacred Artifacts
        </h1>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {nftRelics.map((relic) => (
            <RelicCard key={relic.id} relic={relic} onOpen={(r) => setSelectedRelic(r)} />
          ))}
        </div>
      </main>

      <GalleryFooter />

      <RelicDialog relic={selectedRelic} open={!!selectedRelic} onClose={() => setSelectedRelic(null)} />
    </div>
  )
}
