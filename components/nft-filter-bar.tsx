"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, SortAsc, SortDesc } from "lucide-react"

export interface FilterOptions {
  sortBy: "date-newest" | "date-oldest" | "price-low" | "price-high"
  category: "all" | "art" | "music" | "gaming" | "photography"
  status: "all" | "coming-soon" | "in-auction" | "sold"
}

interface NFTFilterBarProps {
  onFiltersChange: (filters: FilterOptions) => void
  totalCount: number
}

export default function NFTFilterBar({ onFiltersChange, totalCount }: NFTFilterBarProps) {
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

  const getSortLabel = (sortBy: string) => {
    switch (sortBy) {
      case "date-newest":
        return "Newest First"
      case "date-oldest":
        return "Oldest First"
      case "price-low":
        return "Price: Low to High"
      case "price-high":
        return "Price: High to Low"
      default:
        return "Newest First"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "all":
        return "All Categories"
      case "art":
        return "Art"
      case "music":
        return "Music"
      case "gaming":
        return "Gaming"
      case "photography":
        return "Photography"
      default:
        return "All Categories"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "all":
        return "All Status"
      case "coming-soon":
        return "Coming Soon"
      case "in-auction":
        return "In Auction"
      case "sold":
        return "Sold"
      default:
        return "All Status"
    }
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.category !== "all") count++
    if (filters.status !== "all") count++
    return count
  }

  return (
    <div className="sticky top-[64px] z-40 w-full">
      <div className="container mx-auto px-6">
        <div className="bg-black/30 border rounded-lg p-2 md:p-3 backdrop-blur-md border-t-2 pt-2 md:pt-3 mb-3 border-foreground mt-1.5">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Filter className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <h2 className="font-playfair text-sm md:text-base font-bold text-card-foreground">Filter & Sort</h2>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">{totalCount} artifacts</div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-2">
            {/* Sort By */}
            <div className="space-y-0.5">
              <label className="text-xs font-medium text-card-foreground flex items-center space-x-1">
                {filters.sortBy.includes("price") ? (
                  <SortAsc className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                ) : (
                  <SortDesc className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                )}
                <span>Sort</span>
              </label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="bg-background/50 border-border/30 text-card-foreground hover:border-primary/50 transition-colors h-7 md:h-8 text-xs">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="obsidian-texture border-border/30">
                  <SelectItem
                    value="date-newest"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Newest → Oldest
                  </SelectItem>
                  <SelectItem
                    value="date-oldest"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Oldest → Newest
                  </SelectItem>
                  <SelectItem
                    value="price-low"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Low → High
                  </SelectItem>
                  <SelectItem
                    value="price-high"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    High → Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-0.5">
              <label className="text-xs font-medium text-card-foreground">Category</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="bg-background/50 border-border/30 text-card-foreground hover:border-primary/50 transition-colors h-7 md:h-8 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="obsidian-texture border-border/30">
                  <SelectItem
                    value="all"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    All
                  </SelectItem>
                  <SelectItem
                    value="art"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Art
                  </SelectItem>
                  <SelectItem
                    value="music"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Music
                  </SelectItem>
                  <SelectItem
                    value="gaming"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Gaming
                  </SelectItem>
                  <SelectItem
                    value="photography"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Photography
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-0.5">
              <label className="text-xs font-medium text-card-foreground">Status</label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger className="bg-background/50 border-border/30 text-card-foreground hover:border-primary/50 transition-colors h-7 md:h-8 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="obsidian-texture border-border/30">
                  <SelectItem
                    value="all"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    All
                  </SelectItem>
                  <SelectItem
                    value="coming-soon"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Coming Soon
                  </SelectItem>
                  <SelectItem
                    value="in-auction"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    In Auction
                  </SelectItem>
                  <SelectItem
                    value="sold"
                    className="text-card-foreground hover:bg-primary/10 hover:text-primary text-xs"
                  >
                    Sold
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="mt-1.5 md:mt-2 pt-1.5 md:pt-2 border-t border-border/30">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center space-x-1 md:space-x-2 flex-wrap gap-1">
                  <span className="text-xs text-muted-foreground">Active:</span>
                  {filters.category !== "all" && (
                    <Badge
                      variant="secondary"
                      className="bg-secondary/20 text-secondary border-secondary/30 cursor-pointer hover:bg-secondary/30 transition-colors text-xs"
                      onClick={() => handleFilterChange("category", "all")}
                    >
                      {getCategoryLabel(filters.category)} ×
                    </Badge>
                  )}
                  {filters.status !== "all" && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary border-primary/30 cursor-pointer hover:bg-primary/30 transition-colors text-xs"
                      onClick={() => handleFilterChange("status", "all")}
                    >
                      {getStatusLabel(filters.status)} ×
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const resetFilters = {
                      sortBy: "date-newest" as const,
                      category: "all" as const,
                      status: "all" as const,
                    }
                    setFilters(resetFilters)
                    onFiltersChange(resetFilters)
                  }}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-xs h-6"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
