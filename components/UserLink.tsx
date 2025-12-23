// components/UserLink.tsx
"use client"

import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface UserLinkProps {
  address: string
  displayName?: string
  showAvatar?: boolean
  truncate?: boolean
}

export default function UserLink({ 
  address, 
  displayName, 
  showAvatar = false, 
  truncate = true 
}: UserLinkProps) {
  const shortAddress = truncate 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : address

  const nameToShow = displayName || shortAddress

  // Load avatar for this address
  const avatarKey = `avatar_${address.toLowerCase()}`
  const savedAvatar = typeof window !== "undefined" ? localStorage.getItem(avatarKey) : null

  return (
    <Link
      href={`/profile/${address}`}
      className="inline-flex items-center gap-2 hover:text-primary transition-colors group"
    >
      {showAvatar && (
        <Avatar className="w-6 h-6 border border-primary/30">
          <AvatarImage src={savedAvatar || undefined} />
          <AvatarFallback className="bg-primary/20 text-xs">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <span className="font-medium group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
        {nameToShow}
      </span>
    </Link>
  )
}