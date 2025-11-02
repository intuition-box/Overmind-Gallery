import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import OvermindMarketplaceABI from '../../artifacts/contracts/OvermindMarketplace.sol/OvermindMarketplace.json'

const MARKETPLACE_ABI = OvermindMarketplaceABI.abi

// This would be deployed contract address - for now using placeholder
const MARKETPLACE_ADDRESS = '0x0000000000000000000000000000000000000001' as `0x${string}`

export function useOvermindMarketplace() {
  const { address } = useAccount()
  
  // Read functions
  const { data: marketplaceFee } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: 'marketplaceFee',
  })

  const { data: listingCounter } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: 'getListingCounter',
  })

  // Write functions
  const { writeContract: listRelic, isPending: isListing } = useWriteContract()
  const { writeContract: buyRelic, isPending: isBuying } = useWriteContract()
  const { writeContract: cancelListing, isPending: isCancelling } = useWriteContract()

  const listRelicAsync = async (nftContract: string, tokenId: number, priceInEth: string) => {
    return listRelic({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'listRelic',
      args: [nftContract, tokenId, parseEther(priceInEth)],
    })
  }

  const buyRelicAsync = async (listingId: number, priceInEth: string) => {
    return buyRelic({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'buyRelic',
      args: [listingId],
      value: parseEther(priceInEth),
    })
  }

  const cancelListingAsync = async (listingId: number) => {
    return cancelListing({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'cancelListing',
      args: [listingId],
    })
  }

  const getListing = (listingId: number) => {
    return useReadContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'getListing',
      args: [listingId],
    })
  }

  const isListingActive = (listingId: number) => {
    return useReadContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'isListingActive',
      args: [listingId],
    })
  }

  return {
    // Contract address
    contractAddress: MARKETPLACE_ADDRESS,
    
    // Read data
    marketplaceFee,
    listingCounter,
    
    // Write functions
    listRelicAsync,
    buyRelicAsync,
    cancelListingAsync,
    isListing,
    isBuying,
    isCancelling,
    
    // Helper functions
    getListing,
    isListingActive,
    
    // Utils
    formatEther,
    parseEther,
  }
}