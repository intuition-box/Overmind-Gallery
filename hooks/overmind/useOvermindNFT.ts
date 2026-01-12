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
  const { writeContract: transferNFT, isPending: isTransferring } = useWriteContract()

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

  const transferNFTAsync = async (from: string, to: string, tokenId: number) => {
    return transferNFT({
      address: contracts.OvermindNFT as `0x${string}`,
      abi: OVERMIND_NFT_ABI,
      functionName: 'safeTransferFrom',
      args: [from, to, tokenId],
    })
  }

  // Contract config for external use
  const contractConfig = {
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
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
    transferNFTAsync,
    isMinting,
    isVerifying,
    isTransferring,

    // Contract config for external hooks
    contractConfig,
  }
}

// Separate hooks for dynamic contract calls
export function useRelicPower(tokenId: number) {
  const { contracts } = useDeployedContracts()
  return useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'getPower',
    args: [tokenId],
  })
}

export function useRelicCreator(tokenId: number) {
  const { contracts } = useDeployedContracts()
  return useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'getCreator',
    args: [tokenId],
  })
}

export function useBalanceOf(ownerAddress: string) {
  const { contracts } = useDeployedContracts()
  return useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'balanceOf',
    args: [ownerAddress],
  })
}

export function useTokenOfOwnerByIndex(ownerAddress: string, index: number) {
  const { contracts } = useDeployedContracts()
  return useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'tokenOfOwnerByIndex',
    args: [ownerAddress, index],
  })
}

export function useTokenURI(tokenId: number) {
  const { contracts } = useDeployedContracts()
  return useReadContract({
    address: contracts.OvermindNFT as `0x${string}`,
    abi: OVERMIND_NFT_ABI,
    functionName: 'tokenURI',
    args: [tokenId],
  })
}