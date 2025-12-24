"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, User, Folder, Gem, X, Wallet } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import Image from "next/image"

// Mock featured collections
const featuredCollections = [
  {
    id: 1,
    name: "Ancient Codex Archive",
    creator: "Wolfgang",
    itemCount: 12,
    image: "/ancient-library-with-glowing-books-and-mystical-at.png",
    description: "Sacred texts from the digital realm",
  },
  {
    id: 2,
    name: "Void Walker Spirits",
    creator: "Wolfgang",
    itemCount: 8,
    image: "/dark-void-with-ethereal-figures-and-glowing-portal.png",
    description: "Ethereal beings from beyond the veil",
  },
  {
    id: 3,
    name: "Cyber Temple Relics",
    creator: "Wolfgang",
    itemCount: 15,
    image: "/cyberpunk-temple-with-glowing-neon-runes-and-mysti.png",
    description: "Artifacts from the digital temples",
  },
]

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      <header className="text-center relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Logo */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/The_Overmind_Gallery_Logo.png"
                alt="The Overmind Gallery Logo"
                width={200}
                height={80}
                className="w-25 h-auto md:w-96 lg:w-[300px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent md:text-7xl mb-6">
            The Overmind Gallery
          </h1>
          <p className="max-w-3xl mx-auto mb-8 leading-relaxed text-gray-400 font-mono text-lg">
            Where ancient wisdom meets digital artistry. Discover artifacts of the digital realm, guarded by the eternal gaze of The Overmind.
          </p>
          <p className="text-lg font-semibold mb-12 tracking-[0.30em] text-emerald-200">$TRUST YOUR INTUITION</p>

          <Link href="/explore">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25">
              Enter the Gallery
            </Button>
          </Link>
        </div>
      </header>

      {/* Featured Collections Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
            Featured Collections
          </h2>
          <p className="text-muted-foreground text-lg">Curated archives from master artisans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCollections.map((collection) => (
            <Link key={collection.id} href={`/collection/${collection.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-playfair text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">by {collection.creator}</p>
                    <p className="text-primary text-sm">{collection.itemCount} artifacts</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/collections">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 bg-transparent"
            >
              View All Collections
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}