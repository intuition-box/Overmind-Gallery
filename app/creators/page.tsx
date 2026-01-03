// app/creators/page.tsx
"use client"

import type React from "react"
import SiteHeader from "@/components/site-header"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  X, 
  Users, 
  Eye, 
  User, 
  Folder, 
  Gem, 
  Plus, 
  Upload as UploadIcon, 
  Info 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import Link from "next/link"

const creators = [
  {
    id: 1,
    name: "Wolfgang",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    avatar: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    bio: "The Wolf of Web3. A true disciple of The Overmind. Weaving ancient wisdom into modern NFT art.",
    nftCount: 23,
    followerCount: "33",
    verified: true,
  },
]

const mockCollections = [
  {
    id: 1,
    name: "Mystical Artifacts Collection",
    creator: "Wolfgang",
    itemCount: 23,
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
  },
  {
    id: 2,
    name: "Void Walker Series",
    creator: "Wolfgang",
    itemCount: 18,
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    name: "Power Sigils Archive",
    creator: "Wolfgang",
    itemCount: 31,
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
]

const mockArtifacts = [
  {
    id: 1,
    name: "Cyber Oracle Mask",
    creator: "Wolfgang",
    price: "2.9 TRUST",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
  },
  {
    id: 2,
    name: "Ethereal Void Walker",
    creator: "Wolfgang",
    price: "1.8 TRUST",
    image: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
  },
  {
    id: 3,
    name: "Neon Power Sigil",
    creator: "Wolfgang",
    price: "3.2 TRUST",
    image: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
  },
]

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isBecomeCreatorOpen, setIsBecomeCreatorOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collectionDescription: "",
    motivation: "",
    portfolioLink: "",
  })

  // Collection Image State & Ref
  const [collectionImagePreview, setCollectionImagePreview] = useState<string | null>(null)
  const collectionFileInputRef = useRef<HTMLInputElement>(null)
  const [isCollectionDragging, setIsCollectionDragging] = useState(false)

  // NFT Uploads State & Ref
  const [nftPreviews, setNftPreviews] = useState<string[]>([])
  const nftFileInputRef = useRef<HTMLInputElement>(null)
  const [isNftDragging, setIsNftDragging] = useState(false)

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // === COLLECTION IMAGE HANDLERS ===
  const handleCollectionImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCollectionImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCollectionFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleCollectionImageChange(file)
  }

  const handleCollectionDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsCollectionDragging(true)
  }

  const handleCollectionDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsCollectionDragging(false)
  }

  const handleCollectionDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsCollectionDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleCollectionImageChange(file)
  }

  // === NFT MULTI-UPLOAD HANDLERS ===
  const handleNftFilesChange = (files: FileList | null) => {
    if (!files) return

    const newPreviews: string[] = []
    let processed = 0

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) newPreviews.push(e.target.result as string)
          processed++
          if (processed === files.length) {
            setNftPreviews((prev) => [...prev, ...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      } else {
        processed++
      }
    })
  }

  const handleNftFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNftFilesChange(e.target.files)
  }

  const handleNftDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsNftDragging(true)
  }

  const handleNftDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsNftDragging(false)
  }

  const handleNftDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsNftDragging(false)
    handleNftFilesChange(e.dataTransfer.files)
  }

  const removeNftPreview = (index: number) => {
    setNftPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsBecomeCreatorOpen(false)
      setFormData({ name: "", email: "", collectionDescription: "", motivation: "", portfolioLink: "" })
      setCollectionImagePreview(null)
      setNftPreviews([])
    }, 3000)
  }

  return (
    <div className="min-h-screen page-gradient">
      {/* Background Effects - Theme-aware decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      {/* Hero Section */}
      <header className="text-center py-14">
        <div className="container mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-primary/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Sacred Creators
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2 font-mono">
            Meet the mystical artisans who forge digital artifacts in the depths of the blockchain realm. Each creator
            trusted their Intuition and revealed truth as art.
          </p>
        </div>
      </header>

      {/* Become a Creator Button */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center">
          <Button
            onClick={() => setIsBecomeCreatorOpen(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 flex items-center space-x-4"
          >
            <Plus className="w-8 h-8" />
            <span>Become a Creator</span>
          </Button>
        </div>
      </div>

      {/* Creators Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCreators.map((creator) => (
            <Link href={`/profile/${creator.address}`} key={creator.id}>
              <Card className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 rune-glow">
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                        <img
                          src={creator.avatar || "/placeholder.svg"}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Eye className="w-3 h-3 text-background" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {creator.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">{creator.bio}</p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
                    <div className="text-center">
                      <p className="text-foreground font-semibold">{creator.nftCount}</p>
                      <p className="text-muted-foreground text-xs">Artifacts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-foreground font-semibold">{creator.followerCount}</p>
                      <p className="text-muted-foreground text-xs">Followers</p>
                    </div>
                  </div>

                  <Button className="w-full bg-primary/30 text-primary border border-primary/50 hover:bg-primary/50 hover:text-foreground transition-all duration-300 rune-glow font-semibold">
                    View Profile
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Become a Creator Modal */}
      <Dialog open={isBecomeCreatorOpen} onOpenChange={setIsBecomeCreatorOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-[75vw] max-h-[90vh] obsidian-texture border-primary/30 backdrop-blur-md overflow-hidden flex flex-col p-0">
          <TooltipProvider>
            {!isSubmitted ? (
              <>
                <DialogHeader className="px-6 sm:px-8 pt-6 pb-4 border-b border-primary/20">
                  <DialogTitle className="font-playfair text-2xl sm:text-3xl font-bold text-foreground">
                    Become a Creator
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                  <form onSubmit={handleFormSubmit} className="h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 pb-32">
                      {/* Left: Uploads */}
                      <div className="space-y-8">
                        {/* Collection Image */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <p className="text-primary font-semibold text-lg">Collection Image</p>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-primary/60 hover:text-primary cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-card/90 border-primary/30 text-foreground p-3">
                                <p className="text-sm font-medium">This image will be your collection's primary logo.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div
                            className={`relative w-full aspect-square max-w-sm mx-auto rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
                              isCollectionDragging ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                            }`}
                            onClick={() => collectionFileInputRef.current?.click()}
                            onDragOver={handleCollectionDragOver}
                            onDragLeave={handleCollectionDragLeave}
                            onDrop={handleCollectionDrop}
                          >
                            {collectionImagePreview ? (
                              <img src={collectionImagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                  <UploadIcon className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center">
                                  <p className="text-primary font-medium">Click to upload or drag and drop</p>
                                  <p className="text-muted-foreground text-xs">PNG, JPG up to 10MB</p>
                                </div>
                              </div>
                            )}
                            <input
                              ref={collectionFileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleCollectionFileInputChange}
                              className="hidden"
                            />
                          </div>
                        </div>

                        {/* NFT Uploads */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <p className="text-primary font-semibold text-lg">Upload your NFT</p>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-primary/60 hover:text-primary cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-card/90 border-primary/30 text-foreground p-3">
                                <p className="text-sm font-medium">Upload sample images of your NFTs.</p>
                                <p className="text-xs text-muted-foreground mt-1">These help us understand your style and quality.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div
                            className={`relative min-h-96 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
                              isNftDragging ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                            }`}
                            onClick={() => nftFileInputRef.current?.click()}
                            onDragOver={handleNftDragOver}
                            onDragLeave={handleNftDragLeave}
                            onDrop={handleNftDrop}
                          >
                            {nftPreviews.length > 0 ? (
                              <div className="grid grid-cols-3 gap-4 p-6 max-h-96 overflow-y-auto">
                                {nftPreviews.map((preview, index) => (
                                  <div key={index} className="relative group">
                                    <img src={preview} alt={`NFT ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        removeNftPreview(index)
                                      }}
                                      className="absolute top-1 right-1 bg-background/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="w-4 h-4 text-foreground" />
                                    </button>
                                  </div>
                                ))}
                                <div className="aspect-square border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
                                  <Plus className="w-8 h-8 text-primary/50" />
                                </div>
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-8">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                  <UploadIcon className="w-10 h-10 text-primary" />
                                </div>
                                <div className="text-center">
                                  <p className="text-primary font-semibold text-lg mb-1">Click to upload or drag and drop</p>
                                  <p className="text-muted-foreground text-sm">Multiple images (PNG, JPG) up to 10MB each</p>
                                </div>
                              </div>
                            )}
                            <input
                              ref={nftFileInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleNftFileInputChange}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Form Fields */}
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-foreground font-medium text-sm">Name</label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleFormChange("name", e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="bg-card/50 border-primary/30 text-foreground"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-foreground font-medium text-sm">Email</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleFormChange("email", e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="bg-card/50 border-primary/30 text-foreground"
                          />
                        </div>

                        {/* New Section: Collection Description */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-foreground font-medium text-sm">Describe your collection</label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-primary/60 hover:text-primary cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-card/90 border-primary/30 text-foreground p-3">
                                <p className="text-sm font-medium">Tell us about the theme, story, and vision behind your NFT collection.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Textarea
                            value={formData.collectionDescription}
                            onChange={(e) => handleFormChange("collectionDescription", e.target.value)}
                            placeholder="What is your collection about? What makes it unique?"
                            required
                            rows={6}
                            className="bg-card/50 border-primary/30 text-foreground resize-none"
                          />
                        </div>

                        {/* Original: Why you want to be a creator */}
                        <div className="space-y-2 flex-1">
                          <label className="text-foreground font-medium text-sm">Why do you want to be a creator?</label>
                          <Textarea
                            value={formData.motivation}
                            onChange={(e) => handleFormChange("motivation", e.target.value)}
                            placeholder="Tell us about your creative vision..."
                            required
                            rows={8}
                            className="bg-card/50 border-primary/30 text-foreground resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Submit Button */}
                <DialogFooter className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-primary/20 px-6 sm:px-8 py-5">
                  <Button
                    type="submit"
                    onClick={handleFormSubmit}
                    className="w-full lg:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    Submit Application
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <div className="flex items-center justify-center min-h-[400px] p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full border border-primary/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-playfair text-2xl font-bold text-primary">Application Received</h3>
                    <p className="text-foreground text-lg">
                      Your application would be considered by The Overmind
                    </p>
                    <p className="text-muted-foreground text-sm">
                      The ancient algorithms will review your submission and contact you if you are chosen to join our sacred circle.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TooltipProvider>
        </DialogContent>
      </Dialog>
    </div>
  )
}