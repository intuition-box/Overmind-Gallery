"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export interface CollectionFilterOptions {
  sortBy: "date-newest" | "date-oldest" | "items-high" | "items-low" | "bidders-high" | "bidders-low" | "name-az" | "name-za"
  itemsRange: "all" | "1-5" | "6-10" | "11-20" | "20+"
  biddersRange: "all" | "0-50" | "51-100" | "101-200" | "200+"
  creator: "all" | string
}

interface CollectionFilterBarProps {
  onFiltersChange: (filters: CollectionFilterOptions) => void
  totalCount: number
  creators?: string[]
}

export function CollectionFilterBar({ onFiltersChange, totalCount, creators = [] }: CollectionFilterBarProps) {
  const [filters, setFilters] = useState<CollectionFilterOptions>({
    sortBy: "date-newest",
    itemsRange: "all",
    biddersRange: "all",
    creator: "all",
  })

  const handleFilterChange = (key: keyof CollectionFilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value as any }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const getItemsRangeLabel = (range: string) => {
    switch (range) {
      case "all":
        return "All"
      case "1-5":
        return "1-5 Items"
      case "6-10":
        return "6-10 Items"
      case "11-20":
        return "11-20 Items"
      case "20+":
        return "20+ Items"
      default:
        return "All"
    }
  }

  const getBiddersRangeLabel = (range: string) => {
    switch (range) {
      case "all":
        return "All"
      case "0-50":
        return "0-50 Bidders"
      case "51-100":
        return "51-100 Bidders"
      case "101-200":
        return "101-200 Bidders"
      case "200+":
        return "200+ Bidders"
      default:
        return "All"
    }
  }

  const getCreatorLabel = (creator: string) => {
    if (creator === "all") return "All"
    return creator
  }

  const hasActiveFilters = filters.itemsRange !== "all" || filters.biddersRange !== "all" || filters.creator !== "all"

  return (
    <div className="sticky top-0 z-40 w-full bg-background border-b border-border/50">
      <div className="container mx-auto px-6 py-3">
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
                <SelectItem value="items-high" className="text-sm">
                  Items: High - Low
                </SelectItem>
                <SelectItem value="items-low" className="text-sm">
                  Items: Low - High
                </SelectItem>
                <SelectItem value="bidders-high" className="text-sm">
                  Bidders: High - Low
                </SelectItem>
                <SelectItem value="bidders-low" className="text-sm">
                  Bidders: Low - High
                </SelectItem>
                <SelectItem value="name-az" className="text-sm">
                  Name: A - Z
                </SelectItem>
                <SelectItem value="name-za" className="text-sm">
                  Name: Z - A
                </SelectItem>
              </SelectContent>
            </Select>

            <span className="text-border">|</span>

            {/* Items Range */}
            <Select value={filters.itemsRange} onValueChange={(value) => handleFilterChange("itemsRange", value)}>
              <SelectTrigger className="h-8 px-3 bg-transparent border-none text-muted-foreground hover:text-foreground text-sm w-auto gap-1.5 focus:ring-0">
                <SelectValue placeholder="Items" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                <SelectItem value="all" className="text-sm">
                  All Items
                </SelectItem>
                <SelectItem value="1-5" className="text-sm">
                  1-5 Items
                </SelectItem>
                <SelectItem value="6-10" className="text-sm">
                  6-10 Items
                </SelectItem>
                <SelectItem value="11-20" className="text-sm">
                  11-20 Items
                </SelectItem>
                <SelectItem value="20+" className="text-sm">
                  20+ Items
                </SelectItem>
              </SelectContent>
            </Select>

            <span className="text-border">|</span>

            {/* Bidders Range */}
            <Select value={filters.biddersRange} onValueChange={(value) => handleFilterChange("biddersRange", value)}>
              <SelectTrigger className="h-8 px-3 bg-transparent border-none text-muted-foreground hover:text-foreground text-sm w-auto gap-1.5 focus:ring-0">
                <SelectValue placeholder="Bidders" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                <SelectItem value="all" className="text-sm">
                  All Bidders
                </SelectItem>
                <SelectItem value="0-50" className="text-sm">
                  0-50 Bidders
                </SelectItem>
                <SelectItem value="51-100" className="text-sm">
                  51-100 Bidders
                </SelectItem>
                <SelectItem value="101-200" className="text-sm">
                  101-200 Bidders
                </SelectItem>
                <SelectItem value="200+" className="text-sm">
                  200+ Bidders
                </SelectItem>
              </SelectContent>
            </Select>

            <span className="text-border">|</span>

            {/* Creator */}
            <Select value={filters.creator} onValueChange={(value) => handleFilterChange("creator", value)}>
              <SelectTrigger className="h-8 px-3 bg-transparent border-none text-muted-foreground hover:text-foreground text-sm w-auto gap-1.5 focus:ring-0">
                <SelectValue placeholder="Creator" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                <SelectItem value="all" className="text-sm">
                  All Creators
                </SelectItem>
                {creators.map((creator) => (
                  <SelectItem key={creator} value={creator} className="text-sm">
                    {creator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Active filter badges */}
            {hasActiveFilters && (
              <>
                <span className="text-border">|</span>
                {filters.itemsRange !== "all" && (
                  <Badge
                    variant="secondary"
                    className="h-6 px-2 bg-primary/10 text-primary border-0 cursor-pointer hover:bg-primary/20 text-xs gap-1"
                    onClick={() => handleFilterChange("itemsRange", "all")}
                  >
                    {getItemsRangeLabel(filters.itemsRange)}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {filters.biddersRange !== "all" && (
                  <Badge
                    variant="secondary"
                    className="h-6 px-2 bg-secondary/10 text-secondary border-0 cursor-pointer hover:bg-secondary/20 text-xs gap-1"
                    onClick={() => handleFilterChange("biddersRange", "all")}
                  >
                    {getBiddersRangeLabel(filters.biddersRange)}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {filters.creator !== "all" && (
                  <Badge
                    variant="secondary"
                    className="h-6 px-2 bg-violet-500/10 text-violet-500 border-0 cursor-pointer hover:bg-violet-500/20 text-xs gap-1"
                    onClick={() => handleFilterChange("creator", "all")}
                  >
                    {getCreatorLabel(filters.creator)}
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

export { CollectionFilterBar as default }