"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export type FilterState = {
  sortBy: "date-newest" | "date-oldest" | "price-low" | "price-high"
  category: "all" | "art" | "music" | "gaming" | "photography"
  status: "all" | "coming-soon" | "in-auction" | "sold"
}

export interface FilterOptions {
  sortBy: "date-newest" | "date-oldest" | "price-low" | "price-high"
  category: "all" | "art" | "music" | "gaming" | "photography"
  status: "all" | "coming-soon" | "in-auction" | "sold"
}

interface NFTFilterBarProps {
  onFiltersChange: (filters: FilterOptions) => void
  totalCount: number
}

export function NFTFilterBar({ onFiltersChange, totalCount }: NFTFilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "date-newest",
    category: "all",
    status: "all",
  })

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "all":
        return "All"
      case "art":
        return "Art"
      case "music":
        return "Music"
      case "gaming":
        return "Gaming"
      case "photography":
        return "Photo"
      default:
        return "All"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "all":
        return "All"
      case "coming-soon":
        return "Coming Soon"
      case "in-auction":
        return "Live"
      case "sold":
        return "Sold"
      default:
        return "All"
    }
  }

  const hasActiveFilters = filters.category !== "all" || filters.status !== "all"

  return (
    <div className="sticky top-[64px] z-40 w-full py-3">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort */}
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger className="h-8 px-3 bg-transparent border-none text-muted-foreground hover:text-foreground text-sm w-auto gap-1.5 focus:ring-0">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                <SelectItem value="date-newest" className="text-sm">
                  Newest
                </SelectItem>
                <SelectItem value="date-oldest" className="text-sm">
                  Oldest
                </SelectItem>
                <SelectItem value="price-low" className="text-sm">
                  Price: Low - High
                </SelectItem>
                <SelectItem value="price-high" className="text-sm">
                  Price: High - Low
                </SelectItem>
              </SelectContent>
            </Select>

            <span className="text-border">|</span>

            {/* Category */}
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="h-8 px-3 bg-transparent border-none text-muted-foreground hover:text-foreground text-sm w-auto gap-1.5 focus:ring-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                <SelectItem value="all" className="text-sm">
                  All Categories
                </SelectItem>
                <SelectItem value="art" className="text-sm">
                  Art
                </SelectItem>
                <SelectItem value="music" className="text-sm">
                  Music
                </SelectItem>
                <SelectItem value="gaming" className="text-sm">
                  Gaming
                </SelectItem>
                <SelectItem value="photography" className="text-sm">
                  Photography
                </SelectItem>
              </SelectContent>
            </Select>

            <span className="text-border">|</span>

            {/* Status */}
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger className="h-8 px-3 bg-transparent border-none text-muted-foreground hover:text-foreground text-sm w-auto gap-1.5 focus:ring-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                <SelectItem value="all" className="text-sm">
                  All Status
                </SelectItem>
                <SelectItem value="coming-soon" className="text-sm">
                  Coming Soon
                </SelectItem>
                <SelectItem value="in-auction" className="text-sm">
                  Live Auction
                </SelectItem>
                <SelectItem value="sold" className="text-sm">
                  Sold
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Active filter badges */}
            {hasActiveFilters && (
              <>
                <span className="text-border">|</span>
                {filters.category !== "all" && (
                  <Badge
                    variant="secondary"
                    className="h-6 px-2 bg-primary/10 text-primary border-0 cursor-pointer hover:bg-primary/20 text-xs gap-1"
                    onClick={() => handleFilterChange("category", "all")}
                  >
                    {getCategoryLabel(filters.category)}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {filters.status !== "all" && (
                  <Badge
                    variant="secondary"
                    className="h-6 px-2 bg-secondary/10 text-secondary border-0 cursor-pointer hover:bg-secondary/20 text-xs gap-1"
                    onClick={() => handleFilterChange("status", "all")}
                  >
                    {getStatusLabel(filters.status)}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Right: Count */}
          <span className="text-xs text-muted-foreground">{totalCount} items</span>
        </div>
      </div>
    </div>
  )
}

export { NFTFilterBar as default }
