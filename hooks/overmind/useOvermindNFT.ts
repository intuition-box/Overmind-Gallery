import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import OvermindNFTABI from '../../artifacts/contracts/OvermindNFT.sol/OvermindNFT.json'
import { useDeployedContracts } from './useDeployedContracts'

const OVERMIND_NFT_ABI = OvermindNFTABI.abi

export function useOvermindNFT() {
  const { address } = useAccount()
  const { contracts } = useDeployedContracts()

  // Read functions
  const { data: totalSupply } = useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'totalSupply',
  })

  const { data: isVerified } = useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'isVerifiedCreator',
    args: address ? [address] : undefined,
  })

  // Write functions
  const { writeContract: mintRelic, isPending: isMinting } = useWriteContract()
  const { writeContract: verifyCreator, isPending: isVerifying } = useWriteContract()

  const mintRelicAsync = async (to: string, uri: string, power: number) => {
    return mintRelic({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'mintRelic',
      args: [to, uri, power],
    })
  }

  const verifyCreatorAsync = async (creator: string) => {
    return verifyCreator({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'verifyCreator',
      args: [creator],
    })
  }

  const getRelicPower = (tokenId: number) => {
    return useReadContract({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'getPower',
      args: [tokenId],
    })
  }

  const getRelicCreator = (tokenId: number) => {
    return useReadContract({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'getCreator',
      args: [tokenId],
    })
  }

  const getBalanceOf = (ownerAddress: string) => {
    return useReadContract({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'balanceOf',
      args: [ownerAddress],
    })
  }

  const getTokenOfOwnerByIndex = (ownerAddress: string, index: number) => {
    return useReadContract({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [ownerAddress, index],
    })
  }

  const getTokenURI = (tokenId: number) => {
    return useReadContract({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'tokenURI',
      args: [tokenId],
    })
  }

  return {
    // Contract address
    contractAddress: contracts.OvermindNFT,

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
    getBalanceOf,
    getTokenOfOwnerByIndex,
    getTokenURI,
  }
}