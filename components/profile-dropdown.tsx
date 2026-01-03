"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { useAccount, useDisconnect } from 'wagmi'
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Copy, Check, Settings } from "lucide-react"
import { Balance } from "@/components/web3/Balance"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

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
    disconnect()
  }

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Fallback copy failed:', error)
    } finally {
      document.body.removeChild(textArea)
    }
  }

  const handleCopyAddress = async () => {
    if (!address) return

    try {
      await navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy address:', err)
      // Fallback pour navigateurs anciens ou contextes non sécurisés
      fallbackCopy(address)
    }
  }

  const walletAddressDisplay = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "0x1234...5678"

  const DisconnectedDropdownMenu = () => (
    <div
      ref={dropdownRef}
      className="fixed w-56 bg-background border border-border rounded-md shadow-xl overflow-hidden will-change-transform"
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
          <p className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground text-left">
            <span className="font-medium">Connect wallet to view profile</span>
          </p>
        </li>
        <li role="none">
          <div className="h-px bg-border mx-3 my-1" />
        </li>
        <li role="none">
          <ThemeToggle />
        </li>
      </ul>
    </div>
  )

  const ConnectedDropdownMenu = () => (
    <div
      ref={dropdownRef}
      className="fixed w-72 bg-background border border-border/30 rounded-lg shadow-2xl overflow-hidden will-change-transform"
      style={{
        top: dropdownPosition.top,
        right: dropdownPosition.right,
        zIndex: 99999,
      }}
      role="menu"
      aria-orientation="vertical"
    >
      {/* Wallet Identity Section */}
      <div className="px-4 py-4 border-b border-border/30 bg-background/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Wallet
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-sm font-mono text-card-foreground tracking-wide">
            {walletAddressDisplay}
          </span>
          <button
            onClick={handleCopyAddress}
            className="flex items-center justify-center p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 flex-shrink-0"
            title="Copy address"
            type="button"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="pt-2 border-t border-border/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Balance
            </span>
            <div className="text-sm font-semibold text-primary">
              <Balance />
            </div>
          </div>
        </div>
      </div>

      <ul className="py-2" role="none">
        {/* Profile Link */}
        <li role="none">
          <Link
            href="/profile"
            className="flex items-center w-full px-4 py-3 text-sm text-card-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 no-underline group"
            role="menuitem"
            onClick={handleNavigation}
          >
            <User className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none group-hover:text-primary transition-colors" />
            <span className="font-medium">Profile</span>
          </Link>
        </li>

        {/* Profile Link */}
        <li role="none">
          <Link
            href="/profile"
            className="flex items-center w-full px-4 py-3 text-sm text-card-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 no-underline group"
            role="menuitem"
            onClick={handleNavigation}
          >
            <Settings className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none group-hover:text-primary transition-colors" />
            <span className="font-medium">Settings</span>
          </Link>
        </li>

        <li role="none">
          <div className="h-px bg-border mx-3 my-1" />
        </li>

        {/* Theme Toggle */}
        <li role="none">
          <ThemeToggle />
        </li>

        <li role="none">
          <div className="h-px bg-border mx-3 my-1" />
        </li>

        {/* Disconnect Wallet */}
        <li role="none">
          <button
            className="flex items-center w-full px-4 py-3 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 text-left group"
            role="menuitem"
            onClick={handleDisconnectWallet}
            type="button"
          >
            <LogOut className="w-4 h-4 mr-3 flex-shrink-0 pointer-events-none group-hover:text-destructive transition-colors" />
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
        className="flex items-center justify-center gap-2 p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300 min-h-[44px] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {isConnected ? (
          <Avatar className="w-12 h-12 border-2 border-primary/30 hover:border-primary/50 transition-colors duration-300">
            <AvatarImage
              src="/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png"
              alt="Profile Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-8 h-8 border-2 border-muted-foreground/30 hover:border-primary/50 transition-colors duration-300 rounded-full bg-muted flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </button>

      {isOpen &&
        mounted &&
        createPortal(isConnected ? <ConnectedDropdownMenu /> : <DisconnectedDropdownMenu />, document.body)}
    </>
  )
}