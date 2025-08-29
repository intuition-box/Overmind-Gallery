'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface AddressProps {
  address?: string
  format?: 'short' | 'full'
  copyable?: boolean
  className?: string
}

/**
 * Display Ethereum address with optional copy functionality
 */
export function Address({ 
  address, 
  format = 'short', 
  copyable = true, 
  className = '' 
}: AddressProps) {
  const [copied, setCopied] = useState(false)

  if (!address) return null

  const displayAddress = format === 'short' 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : address

  const handleCopy = async () => {
    if (!copyable || copied) return
    
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy address:', error)
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="font-mono text-sm text-gray-300">
        {displayAddress}
      </span>
      {copyable && (
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          title="Copy address"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-400" />
          ) : (
            <Copy className="w-3 h-3 text-gray-400" />
          )}
        </button>
      )}
    </div>
  )
}