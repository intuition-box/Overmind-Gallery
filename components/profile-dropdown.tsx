"use client"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, BarChart3, Activity, Gem, LogOut } from "lucide-react"

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: buttonRect.bottom + 8,
        right: window.innerWidth - buttonRect.right,
      })
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = () => {
    setIsOpen(false)
  }

  const handleDisconnectWallet = () => {
    setIsOpen(false)
    alert("Wallet disconnected!")
  }

  const DropdownMenu = () => (
    <div
      ref={dropdownRef}
      className="fixed w-56 bg-card border border-border rounded-md shadow-xl overflow-hidden will-change-transform"
      style={{
        top: dropdownPosition.top,
        right: dropdownPosition.right,
        zIndex: 99999,
      }}
      role="menu"
      aria-orientation="vertical"
    >
      <ul className="py-1" role="none">
        <li role="none">
          <Link
            href="/profile-settings"
            className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 no-underline"
            role="menuitem"
            onClick={handleNavigation}
          >
            <Settings className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none" />
            <span className="font-medium">Profile Settings</span>
          </Link>
        </li>

        <li role="none">
          <div className="h-px bg-border mx-3" />
        </li>

        <li role="none">
          <Link
            href="/user-stats"
            className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 no-underline"
            role="menuitem"
            onClick={handleNavigation}
          >
            <BarChart3 className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none" />
            <span className="font-medium">User Stats</span>
          </Link>
        </li>

        <li role="none">
          <Link
            href="/activity"
            className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 no-underline"
            role="menuitem"
            onClick={handleNavigation}
          >
            <Activity className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none" />
            <span className="font-medium">Activity</span>
          </Link>
        </li>

        <li role="none">
          <Link
            href="/my-nfts"
            className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 no-underline"
            role="menuitem"
            onClick={handleNavigation}
          >
            <Gem className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none" />
            <span className="font-medium">My NFTs</span>
          </Link>
        </li>

        <li role="none">
          <div className="h-px bg-border mx-3" />
        </li>

        <li role="none">
          <button
            className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground hover:text-destructive hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 text-left"
            role="menuitem"
            onClick={handleDisconnectWallet}
            type="button"
          >
            <LogOut className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none" />
            <span className="font-medium">Disconnect Wallet</span>
          </button>
        </li>
      </ul>
    </div>
  )

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center justify-center p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <Avatar className="w-8 h-8 border-2 border-primary/30 hover:border-primary/50 transition-colors duration-300">
          <AvatarImage
            src="/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png"
            alt="Profile Avatar"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && mounted && createPortal(<DropdownMenu />, document.body)}
    </>
  )
}
