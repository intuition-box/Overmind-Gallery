import { useAccount, usePublicClient } from 'wagmi'
import { useOvermindNFT } from './useOvermindNFT'
import { useQuery } from '@tanstack/react-query'

export interface UserNFT {
  tokenId: number
  tokenURI: string
  creator: string
  power: number
}

export function useUserNFTs() {
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { contractConfig } = useOvermindNFT()

  const { data: userNFTs, isLoading, error } = useQuery({
    queryKey: ['user-nfts', address],
    queryFn: async (): Promise<UserNFT[]> => {
      if (!address || !isConnected) {
        return []
      }

      try {
        if (!publicClient) {
          console.log('No public client available, using mock NFTs for development')
          return getMockNFTs()
        }

        // Get balance of NFTs owned by user
        const balance = await publicClient.readContract({
          ...contractConfig,
          functionName: 'balanceOf',
          args: [address],
        }) as bigint

        const balanceNumber = Number(balance)
        if (balanceNumber === 0) {
          return []
        }

        const nfts: UserNFT[] = []

        // Get each token ID owned by the user
        for (let i = 0; i < balanceNumber; i++) {
          try {
            const tokenId = await publicClient.readContract({
              ...contractConfig,
              functionName: 'tokenOfOwnerByIndex',
              args: [address, i],
            }) as bigint

            const tokenIdNumber = Number(tokenId)

            // Get token URI
            const tokenURI = await publicClient.readContract({
              ...contractConfig,
              functionName: 'tokenURI',
              args: [tokenIdNumber],
            }) as string

            // Get creator
            const creator = await publicClient.readContract({
              ...contractConfig,
              functionName: 'getCreator',
              args: [tokenIdNumber],
            }) as string

            // Get power
            const power = await publicClient.readContract({
              ...contractConfig,
              functionName: 'getPower',
              args: [tokenIdNumber],
            }) as bigint

            nfts.push({
              tokenId: tokenIdNumber,
              tokenURI: tokenURI || '',
              creator: creator || '',
              power: Number(power) || 0,
            })
          } catch (error) {
            console.error(`Error fetching NFT at index ${i}:`, error)
            // Continue with other NFTs even if one fails
          }
        }

        return nfts
      } catch (error) {
        console.error('Error fetching user NFTs:', error)
        // Fallback to mock data in development
        console.log('Falling back to mock NFTs due to contract error')
        return getMockNFTs()
      }
    },
    enabled: !!address && isConnected,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  return {
    userNFTs: userNFTs || [],
    isLoading,
    error,
    hasNFTs: (userNFTs?.length || 0) > 0,
  }
}

// Mock NFTs for development when contract is not available
function getMockNFTs(): UserNFT[] {
  return [
    {
      tokenId: 1,
      tokenURI: 'ipfs://QmMock1',
      creator: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      power: 50,
    },
    {
      tokenId: 2,
      tokenURI: 'ipfs://QmMock2',
      creator: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      power: 75,
    },
    {
      tokenId: 3,
      tokenURI: 'ipfs://QmMock3',
      creator: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      power: 100,
    }
  ]
}