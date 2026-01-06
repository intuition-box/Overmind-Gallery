"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Search, 
  X, 
  Users, 
  Eye, 
  Plus, 
  Upload, 
  Info,
  ChevronLeft,
  ChevronRight
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
import SiteHeader from "@/components/site-header"

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

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isBecomeCreatorOpen, setIsBecomeCreatorOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collectionDescription: "",
    motivation: "",
    nftCount: "",
    startingBidPrice: "",
  })

  // Track which required fields are empty for warnings
  const [fieldWarnings, setFieldWarnings] = useState({
    name: false,
    email: false,
    collectionDescription: false,
    motivation: false,
    nftCount: false,
    startingBidPrice: false,
  })

  // Collection Image
  const [collectionImagePreview, setCollectionImagePreview] = useState<string | null>(null)
  const collectionFileInputRef = useRef<HTMLInputElement>(null)
  const [isCollectionDragging, setIsCollectionDragging] = useState(false)

  // NFT Uploads
  const [nftPreviews, setNftPreviews] = useState<string[]>([])
  const nftFileInputRef = useRef<HTMLInputElement>(null)
  const [isNftDragging, setIsNftDragging] = useState(false)

  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear warning when user starts typing
    if (field in fieldWarnings) {
      setFieldWarnings((prev) => ({ ...prev, [field]: false }))
    }
  }

  // Collection Image Handlers
  const handleCollectionImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => setCollectionImagePreview(e.target?.result as string)
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

  // NFT Upload Handlers
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

  const validateAndShowWarnings = () => {
    const warnings = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      collectionDescription: !formData.collectionDescription.trim(),
      motivation: !formData.motivation.trim(),
      nftCount: !formData.nftCount || Number(formData.nftCount) <= 0,
      startingBidPrice: !formData.startingBidPrice || Number(formData.startingBidPrice) < 0,
    }
    setFieldWarnings(warnings)
    return warnings
  }

  const handleNextStep = () => {
    const warnings = validateAndShowWarnings()
    const hasErrors = Object.values(warnings).some(Boolean)
    if (!hasErrors) {
      setCurrentStep(2)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(1)
  }

  const handleFormSubmit = () => {
    const warnings = validateAndShowWarnings()
    const hasErrors = Object.values(warnings).some(Boolean)
    if (hasErrors) return

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsBecomeCreatorOpen(false)
      setCurrentStep(1)
      setFormData({
        name: "",
        email: "",
        collectionDescription: "",
        motivation: "",
        nftCount: "",
        startingBidPrice: "",
      })
      setFieldWarnings({
        name: false,
        email: false,
        collectionDescription: false,
        motivation: false,
        nftCount: false,
        startingBidPrice: false,
      })
      setCollectionImagePreview(null)
      setNftPreviews([])
    }, 3000)
  }

  const handleDialogClose = (open: boolean) => {
    setIsBecomeCreatorOpen(open)
    if (!open) {
      setCurrentStep(1)
      setFieldWarnings({
        name: false,
        email: false,
        collectionDescription: false,
        motivation: false,
        nftCount: false,
        startingBidPrice: false,
      })
    }
  }

  const allRequiredFilled = 
    formData.name.trim() &&
    formData.email.trim() &&
    formData.collectionDescription.trim() &&
    formData.motivation.trim() &&
    formData.nftCount &&
    Number(formData.nftCount) > 0 &&
    formData.startingBidPrice &&
    Number(formData.startingBidPrice) >= 0

  return (
    <div className="min-h-screen page-gradient">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

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

      <Dialog open={isBecomeCreatorOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-[95vw] lg:max-w-[75vw] max-h-[90vh] obsidian-texture border-primary/30 backdrop-blur-md overflow-hidden flex flex-col p-0">
          <TooltipProvider>
            {!isSubmitted ? (
              <>
                <DialogHeader className="px-6 sm:px-8 pt-6 pb-4 border-b border-primary/20">
                  <div className="space-y-3">
                    <DialogTitle className="font-playfair text-2xl sm:text-3xl font-bold text-foreground">
                      Become a Creator
                    </DialogTitle>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                          currentStep === 1 ? 'bg-primary text-background' : 'bg-primary/20'
                        }`}>
                          1
                        </div>
                        <span className="text-sm font-medium">Details</span>
                      </div>
                      <div className="h-px flex-1 bg-primary/20"></div>
                      <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                          currentStep === 2 ? 'bg-primary text-background' : 'bg-primary/20'
                        }`}>
                          2
                        </div>
                        <span className="text-sm font-medium">Assets</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
                  {currentStep === 1 && (
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="space-y-2">
                        <label className="text-foreground font-medium text-sm">Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleFormChange("name", e.target.value)}
                          placeholder="Your artist name"
                          className={`bg-card/50 border-primary/30 text-foreground ${fieldWarnings.name ? 'border-red-500' : ''}`}
                        />
                        {fieldWarnings.name && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <Info className="w-3 h-3" /> Please enter your name
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-foreground font-medium text-sm">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFormChange("email", e.target.value)}
                          placeholder="artist@example.com"
                          className={`bg-card/50 border-primary/30 text-foreground ${fieldWarnings.email ? 'border-red-500' : ''}`}
                        />
                        {fieldWarnings.email && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <Info className="w-3 h-3" /> Please enter a valid email
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="text-foreground font-medium text-sm">Your collection description *</label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-primary/60 hover:text-primary cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs bg-card/90 border-primary/30 text-foreground p-3">
                              <p>This would be the description of your collection</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Textarea
                          value={formData.collectionDescription}
                          onChange={(e) => handleFormChange("collectionDescription", e.target.value)}
                          placeholder="What makes your collection unique? What story does it tell?"
                          rows={6}
                          className={`bg-card/50 border-primary/30 text-foreground resize-none ${fieldWarnings.collectionDescription ? 'border-red-500' : ''}`}
                        />
                        {fieldWarnings.collectionDescription && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <Info className="w-3 h-3" /> Please describe your collection
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-foreground font-medium text-sm">Why do you want to be a creator? *</label>
                        <Textarea
                          value={formData.motivation}
                          onChange={(e) => handleFormChange("motivation", e.target.value)}
                          placeholder="Share your artistic vision and passion..."
                          rows={8}
                          className={`bg-card/50 border-primary/30 text-foreground resize-none ${fieldWarnings.motivation ? 'border-red-500' : ''}`}
                        />
                        {fieldWarnings.motivation && (
                          <p className="text-red-500 text-xs flex items-center gap-1">
                            <Info className="w-3 h-3" /> Please share your motivation
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-foreground font-medium text-sm">Number of NFTs in collection *</label>
                          <Input
                            type="number"
                            min="1"
                            value={formData.nftCount}
                            onChange={(e) => handleFormChange("nftCount", e.target.value)}
                            placeholder="e.g., 100"
                            className={`bg-card/50 border-primary/30 text-foreground ${fieldWarnings.nftCount ? 'border-red-500' : ''}`}
                          />
                          {fieldWarnings.nftCount && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                              <Info className="w-3 h-3" /> Please enter a valid number (greater than 0)
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-foreground font-medium text-sm">Starting Bid Price (ETH) *</label>
                          <Input
                            type="number"
                            step="0.001"
                            min="0"
                            value={formData.startingBidPrice}
                            onChange={(e) => handleFormChange("startingBidPrice", e.target.value)}
                            placeholder="e.g., 0.05"
                            className={`bg-card/50 border-primary/30 text-foreground ${fieldWarnings.startingBidPrice ? 'border-red-500' : ''}`}
                          />
                          {fieldWarnings.startingBidPrice && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                              <Info className="w-3 h-3" /> Please enter a valid starting price
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Required Fields Notice */}
                      <div className="py-4 border-t border-primary/20">
                        <p className="text-muted-foreground text-sm">
                          * Fields marked with an asterisk are required
                        </p>
                      </div>

                      {/* Disclaimer */}
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-5">
                        <p className="text-foreground text-sm leading-relaxed">
                          <span className="font-semibold text-primary">Disclaimer:</span> Submitting this application does not guarantee acceptance. 
                          All submissions are carefully reviewed by The Overmind, and only selected creators will be contacted.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="p-6 sm:p-8 pb-24 space-y-8">
                      {/* Collection Image */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-primary font-semibold text-lg">Your collection banner image</p>
                        </div>
                        <div
                          className={`relative w-full aspect-square max-w-sm mx-auto rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                            isCollectionDragging ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/50"
                          }`}
                          onClick={() => collectionFileInputRef.current?.click()}
                          onDragOver={handleCollectionDragOver}
                          onDragLeave={handleCollectionDragLeave}
                          onDrop={handleCollectionDrop}
                        >
                          {collectionImagePreview ? (
                            <img src={collectionImagePreview} alt="Collection preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                              <Upload className="w-10 h-10 text-primary" />
                              <p className="text-primary font-medium">Click or drag to upload</p>
                              <p className="text-muted-foreground text-xs">PNG, JPG up to 10MB</p>
                            </div>
                          )}
                          <input ref={collectionFileInputRef} type="file" accept="image/*" onChange={handleCollectionFileInputChange} className="hidden" />
                        </div>
                      </div>

                      {/* NFT Samples */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-primary font-semibold text-lg">Upload Sample NFTs</p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-primary/60 hover:text-primary cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Show us examples of your artwork</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div
                          className={`relative min-h-96 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                            isNftDragging ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/50"
                          }`}
                          onClick={() => nftFileInputRef.current?.click()}
                          onDragOver={handleNftDragOver}
                          onDragLeave={handleNftDragLeave}
                          onDrop={handleNftDrop}
                        >
                          {nftPreviews.length > 0 ? (
                            <div className="grid grid-cols-3 gap-4 p-6 max-h-96 overflow-y-auto">
                              {nftPreviews.map((preview, index) => (
                                <div key={index} className="relative group aspect-square">
                                  <img src={preview} alt={`NFT ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeNftPreview(index) }}
                                    className="absolute top-1 right-1 bg-background/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
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
                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                              <Upload className="w-10 h-10 text-primary" />
                              <p className="text-primary font-medium">Click or drag to upload samples</p>
                              <p className="text-muted-foreground text-xs">Multiple images supported</p>
                            </div>
                          )}
                          <input ref={nftFileInputRef} type="file" accept="image/*" multiple onChange={handleNftFileInputChange} className="hidden" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="border-t border-primary/20 px-6 sm:px-8 py-5 bg-card/95 backdrop-blur-md">
                  <div className="flex justify-between w-full items-center">
                    {currentStep === 2 && (
                      <Button variant="outline" onClick={handlePreviousStep} className="border-primary/30 text-primary hover:bg-primary/10">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                      </Button>
                    )}

                    <div className="ml-auto">
                      {currentStep === 1 ? (
                        <Button
                          onClick={handleNextStep}
                          disabled={!allRequiredFilled}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFormSubmit}
                          disabled={!allRequiredFilled}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Application
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-6">
                <div className="w-20 h-20 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border border-primary/50"></div>
                  <Eye className="w-8 h-8 text-primary absolute inset-0 m-auto" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-primary">Application Received</h3>
                  <p className="text-foreground text-lg mt-3">Thank you for applying.</p>
                  <p className="text-muted-foreground text-sm mt-4">
                    The Overmind will review your submission. You will be contacted if selected.
                  </p>
                </div>
              </div>
            )}
          </TooltipProvider>
        </DialogContent>
      </Dialog>
    </div>
  )
}