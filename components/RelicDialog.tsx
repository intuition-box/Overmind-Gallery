// components/RelicDialog.tsx
"use client"

import React, { Suspense } from "react"
import dynamic from "next/dynamic"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { Relic } from "@/lib/nftRelics"

// dynamic import - no SSR
const ThreeNFTViewer = dynamic(() => import("./ThreeNFTViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black/50 flex items-center justify-center">
      <p className="text-cyan-400 text-lg animate-pulse">Loading 3D viewer...</p>
    </div>
  ),
})

type Props = {
  relic: Relic | null
  open: boolean
  onClose: () => void
}

export default function RelicDialog({ relic, open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-[98vw] h-[92vh] p-0 bg-gray-950 border border-cyan-500/20 rounded-2xl overflow-hidden">
        {relic && (
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] h-full">
            {/* LEFT: 3D Viewer large area */}
            <div className="relative bg-black h-full">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute z-30 top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Info hint */}
              <div className="absolute bottom-6 left-6 z-30 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-cyan-300">
                Drag to rotate • Scroll to zoom • Right-click to pan
              </div>

              <div className="w-full h-full">
                {/* Suspense wrapper for viewer. Viewer mounted only when modal open */}
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-black/60">
                      <p className="text-cyan-400 animate-pulse">Preparing scene...</p>
                    </div>
                  }
                >
                  <ThreeNFTViewer glbUrl={relic.glbUrl} title={relic.title} />
                </Suspense>
              </div>
            </div>

            {/* RIGHT: Info panel */}
            <div className="flex flex-col h-full">
              <div className="p-10 border-b border-gray-800">
                <DialogTitle className="text-3xl font-bold text-white mb-2">{relic.title}</DialogTitle>
                <p className="text-lg text-gray-400">by {relic.creator}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Price */}
                <div>
                  <p className="text-gray-500 uppercase text-sm tracking-wider mb-2">Current Price</p>
                  <p className="text-4xl font-bold text-cyan-400">{relic.price}</p>
                </div>

                {/* Auction Timer (placeholder) */}
                {relic.status === "in-auction" && (
                  <div className="bg-gradient-to-r from-cyan-950/50 to-violet-950/30 border border-cyan-700/50 rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center gap-3 text-cyan-300 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-medium">Auction ends in</span>
                    </div>
                    {/* Replace with dynamic Timer component */}
                    <p className="text-2xl font-bold text-cyan-400">02d 14h 33m</p>
                  </div>
                )}

                <div className="space-y-4">
                  <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600">
                    {relic.status === "in-auction" ? "Place Bid" : "Acquire Now"}
                  </Button>

                  <Button variant="outline" className="w-full h-10 text-base border-gray-700 text-gray-300 hover:bg-gray-900 flex items-center justify-center gap-3">
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </Button>
                </div>

                <div>
                  <p className="text-gray-500 uppercase text-sm tracking-wider mb-3">Description</p>
                  <p className="text-gray-300 text-base leading-relaxed">{relic.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
