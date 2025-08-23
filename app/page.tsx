import { Eye, Search, Wallet, Menu, Star, Zap, Crown, Skull } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock NFT data with mystical themes
const featuredNFTs = [
  {
    id: 1,
    title: "The Watcher's Gaze",
    creator: "0x...7a9b",
    price: "2.5 ETH",
    rarity: "Legendary",
    image: "/mystical-eye-runes.png",
    views: 1247,
    likes: 89,
  },
  {
    id: 2,
    title: "Obsidian Codex",
    creator: "0x...3c2d",
    price: "1.8 ETH",
    rarity: "Epic",
    image: "/placeholder-kip41.png",
    views: 892,
    likes: 67,
  },
  {
    id: 3,
    title: "Void Sentinel",
    creator: "0x...8f1e",
    price: "3.2 ETH",
    rarity: "Mythic",
    image: "/hooded-guardian-temple.png",
    views: 1456,
    likes: 134,
  },
  {
    id: 4,
    title: "Runic Convergence",
    creator: "0x...5b4a",
    price: "0.9 ETH",
    rarity: "Rare",
    image: "/placeholder-9qruc.png",
    views: 634,
    likes: 45,
  },
  {
    id: 5,
    title: "Shadow Throne",
    creator: "0x...9d6c",
    price: "4.1 ETH",
    rarity: "Legendary",
    image: "/ornate-mystical-throne.png",
    views: 1789,
    likes: 156,
  },
  {
    id: 6,
    title: "Ethereal Grimoire",
    creator: "0x...2e7f",
    price: "1.3 ETH",
    rarity: "Epic",
    image: "/placeholder-xcxo0.png",
    views: 723,
    likes: 58,
  },
]

const rarityColors = {
  Mythic: "bg-gradient-to-r from-purple-500 to-pink-500",
  Legendary: "bg-gradient-to-r from-yellow-400 to-orange-500",
  Epic: "bg-gradient-to-r from-purple-400 to-blue-500",
  Rare: "bg-gradient-to-r from-blue-400 to-cyan-400",
  Common: "bg-gradient-to-r from-gray-400 to-gray-500",
}

const rarityIcons = {
  Mythic: Crown,
  Legendary: Star,
  Epic: Zap,
  Rare: Eye,
  Common: Skull,
}

export default function OvermindGallery() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Mystical Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/30 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-violet-500/30 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-cyan-500/20 rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-violet-500/20 rotate-12"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 h-8 bg-cyan-400/20 rounded-full blur-md font-bold w-[50px]"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                The Overmind Gallery
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Explore
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Collections
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Creators
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                {""}
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10">
                <Search className="w-5 h-5" />
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border-0">
                <Wallet className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with All-Seeing Eye */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="relative mb-12">
            {/* Central All-Seeing Eye */}
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-full h-full border-2 border-cyan-400/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Eye className="w-16 h-16 text-white" />
                </div>
                {/* Radiating Lines */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent text-white"
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: "0 0",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              The Overmind Gallery 
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Where ancient wisdom meets digital artistry. Discover relics of the digital realm, guarded by the eternal
              gaze of The Overmind.
              <br />
              <bold className="font-extrabold text-xl text-white opacity-90">$TRUST YOUR INTUITION</bold>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border-0 px-8"
              >
                Enter the Vault
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
              >
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 mb-12">
        <div className="container mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search the ancient archives..."
              className="pl-12 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 h-12 backdrop-blur-sm focus:border-cyan-400/50 focus:ring-cyan-400/20"
            />
          </div>
        </div>
      </section>

      {/* Featured NFTs Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Sacred Relics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNFTs.map((nft) => {
              const RarityIcon = rarityIcons[nft.rarity as keyof typeof rarityIcons]

              return (
                <Card
                  key={nft.id}
                  className="bg-gray-900/50 border-gray-800 hover:border-cyan-400/50 transition-all duration-500 group backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-400/10"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} text-white border-0`}
                        >
                          <RarityIcon className="w-3 h-3 mr-1" />
                          {nft.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      {nft.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">by {nft.creator}</p>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{nft.views} views</span>
                      <span>{nft.likes} likes</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">{nft.price}</p>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border-0">
                      Acquire
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-6 h-6 text-cyan-400 mr-2" />
            <span className="text-gray-400">The Overmind watches over all</span>
          </div>
          <p className="text-gray-500 text-sm">
            All digital relics protected by ancient encryption. You are blessed sweet baby child of the Overmind.
            <br />© 2025 created by wolfgang.
          </p>
        </div>
      </footer>
    </div>
  )
}
