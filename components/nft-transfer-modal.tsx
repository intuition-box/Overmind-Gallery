'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { isAddress } from 'viem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useOvermindNFT } from '@/hooks/overmind/useOvermindNFT'
import { toast } from 'sonner'

interface NFTTransferModalProps {
  isOpen: boolean
  onClose: () => void
  nft: {
    id: number
    name: string
    image: string
  }
  onSuccess?: () => void
}

export function NFTTransferModal({ isOpen, onClose, nft, onSuccess }: NFTTransferModalProps) {
  const { address } = useAccount()
  const { transferNFTAsync, isTransferring } = useOvermindNFT()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [isValidAddress, setIsValidAddress] = useState(false)
  const [error, setError] = useState('')

  const validateAddress = (addr: string) => {
    const isValid = isAddress(addr)
    setIsValidAddress(isValid)
    if (!isValid && addr.length > 0) {
      setError('Invalid Ethereum address')
    } else {
      setError('')
    }
    return isValid
  }

  const handleAddressChange = (value: string) => {
    setRecipientAddress(value)
    validateAddress(value)
  }

  const handleTransfer = async () => {
    if (!address || !isValidAddress) return

    try {
      setError('')
      await transferNFTAsync(address, recipientAddress, nft.id)

      toast.success('NFT transferred successfully!', {
        description: `${nft.name} has been transferred to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`
      })

      onSuccess?.()
      onClose()
      setRecipientAddress('')
    } catch (err: any) {
      console.error('Transfer failed:', err)
      const errorMessage = err.message?.includes('User rejected')
        ? 'Transaction cancelled by user'
        : err.message?.includes('insufficient funds')
        ? 'Insufficient funds for gas'
        : 'Transfer failed. Please try again.'

      setError(errorMessage)
      toast.error('Transfer failed', { description: errorMessage })
    }
  }

  const handleClose = () => {
    setRecipientAddress('')
    setError('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer NFT</DialogTitle>
          <DialogDescription>
            Transfer {nft.name} to another Ethereum address. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* NFT Preview */}
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <p className="font-medium text-sm">{nft.name}</p>
              <p className="text-xs text-muted-foreground">Token ID: {nft.id}</p>
            </div>
          </div>

          {/* Address Input */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => handleAddressChange(e.target.value)}
              className={error ? 'border-red-500' : isValidAddress ? 'border-green-500' : ''}
            />
            {error && (
              <div className="flex items-center space-x-2 text-sm text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            {isValidAddress && !error && (
              <p className="text-sm text-green-400">Valid Ethereum address</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col space-y-2">
          <div className="flex space-x-2 w-full">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={!isValidAddress || isTransferring}
              className="flex-1"
            >
              {isTransferring ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Transferring...
                </>
              ) : (
                'Transfer NFT'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}