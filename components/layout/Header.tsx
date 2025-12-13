'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Eye, Menu, X, Wallet } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Balance } from "@/components/web3/Balance"
import { NetworkInfo } from "@/components/web3/NetworkInfo"


interface HeaderProps {
  currentPage?: 'home' | 'explore' | 'collections' | 'creators'
  onSearchOpen?: () => void
}

export function Header({ currentPage = 'home', onSearchOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getActiveClass = (page: string) => 
    currentPage === page ? 'text-cyan-400 font-medium' : 'text-gray-300 hover:text-cyan-400 transition-colors'

  return (
    <>
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                The Overmind Gallery
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className={getActiveClass('home')}>
                Home
              </Link>
              <Link href="/explore" className={getActiveClass('explore')}>
                Explore
              </Link>
              <Link href="/collections" className={getActiveClass('collections')}>
                Collections
              </Link>
              <Link href="/creators" className={getActiveClass('creators')}>
                Creators
              </Link>
            </nav>

            {/* Network Info, Search and Connect */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <NetworkInfo />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearchOpen}
                className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              >
                <Search className="w-6 h-6" />
              </Button>
              <div className="connect-button-wrapper">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== 'loading'
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === 'authenticated')

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <Button 
                                onClick={openConnectModal}
                                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white px-6"
                              >
                                Connect Wallet
                              </Button>
                            )
                          }

                          if (chain.unsupported) {
                            return (
                              <Button 
                                onClick={openChainModal}
                                className="bg-red-500 hover:bg-red-600 text-white px-6"
                              >
                                Wrong network
                              </Button>
                            )
                          }

                          return (
                            <div className="flex items-center space-x-2">
                              <div className="flex flex-col items-center space-y-1">
                                <Button
                                  onClick={openChainModal}
                                  variant="outline"
                                  size="sm"
                                  className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                                >
                                  {chain.hasIcon && (
                                    <div
                                      className="w-4 h-4 mr-2 rounded-full overflow-hidden"
                                      style={{
                                        background: chain.iconBackground,
                                      }}
                                    >
                                      {chain.iconUrl && (
                                        <img
                                          alt={chain.name ?? 'Chain icon'}
                                          src={chain.iconUrl}
                                          className="w-4 h-4"
                                        />
                                      )}
                                    </div>
                                  )}
                                  {chain.name}
                                </Button>
                                <Balance />
                              </div>

                              <Button
                                onClick={openAccountModal}
                                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white px-4"
                              >
                                {account.displayName}
                              </Button>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  }}
                </ConnectButton.Custom>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative">
                  <Eye className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  The Overmind Gallery
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 flex flex-col space-y-6 p-6">
              <Link href="/" className={`${getActiveClass('home')} text-xl`} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/explore" className={`${getActiveClass('explore')} text-xl`} onClick={() => setIsMobileMenuOpen(false)}>
                Explore
              </Link>
              <Link href="/collections" className={`${getActiveClass('collections')} text-xl`} onClick={() => setIsMobileMenuOpen(false)}>
                Collections
              </Link>
              <Link href="/creators" className={`${getActiveClass('creators')} text-xl`} onClick={() => setIsMobileMenuOpen(false)}>
                Creators
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}