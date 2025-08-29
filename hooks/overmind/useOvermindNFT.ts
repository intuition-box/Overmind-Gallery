import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import OvermindNFTABI from '../../artifacts/contracts/OvermindNFT.sol/OvermindNFT.json'

const OVERMIND_NFT_ABI = OvermindNFTABI.abi

// This would be deployed contract address - for now using placeholder
const OVERMIND_NFT_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`

export function useOvermindNFT() {
  const { address } = useAccount()
  
  // Read functions
  const { data: totalSupply } = useReadContract({
    address: OVERMIND_NFT_ADDRESS,
    abi: OVERMIND_NFT_ABI,
    functionName: 'totalSupply',
  })

  const { data: isVerified } = useReadContract({
    address: OVERMIND_NFT_ADDRESS,
    abi: OVERMIND_NFT_ABI,
    functionName: 'isVerifiedCreator',
    args: address ? [address] : undefined,
  })

  // Write functions
  const { writeContract: mintRelic, isPending: isMinting } = useWriteContract()
  const { writeContract: verifyCreator, isPending: isVerifying } = useWriteContract()

  const mintRelicAsync = async (to: string, uri: string, power: number) => {
    return mintRelic({
      address: OVERMIND_NFT_ADDRESS,
      abi: OVERMIND_NFT_ABI,
      functionName: 'mintRelic',
      args: [to, uri, power],
    })
  }

  const verifyCreatorAsync = async (creator: string) => {
    return verifyCreator({
      address: OVERMIND_NFT_ADDRESS,
      abi: OVERMIND_NFT_ABI,
      functionName: 'verifyCreator',
      args: [creator],
    })
  }

  const getRelicPower = (tokenId: number) => {
    return useReadContract({
      address: OVERMIND_NFT_ADDRESS,
      abi: OVERMIND_NFT_ABI,
      functionName: 'getPower',
      args: [tokenId],
    })
  }

  const getRelicCreator = (tokenId: number) => {
    return useReadContract({
      address: OVERMIND_NFT_ADDRESS,
      abi: OVERMIND_NFT_ABI,
      functionName: 'getCreator',
      args: [tokenId],
    })
  }

  return {
    // Contract address
    contractAddress: OVERMIND_NFT_ADDRESS,
    
    // Read data
    totalSupply,
    isVerified,
    
    // Write functions
    mintRelicAsync,
    verifyCreatorAsync,
    isMinting,
    isVerifying,
    
    // Helper functions
    getRelicPower,
    getRelicCreator,
  }
}