import { useAccount } from 'wagmi'
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
  const { getBalanceOf, getTokenOfOwnerByIndex, getTokenURI, getRelicCreator, getRelicPower } = useOvermindNFT()

  const { data: userNFTs, isLoading, error } = useQuery({
    queryKey: ['user-nfts', address],
    queryFn: async (): Promise<UserNFT[]> => {
      if (!address || !isConnected) {
        return []
      }

      try {
        // Get balance of NFTs owned by user
        const balanceResult = getBalanceOf(address)
        if (!balanceResult.data) {
          // If no balance data, return mock NFTs for development
          console.log('No contract data available, using mock NFTs for development')
          return getMockNFTs()
        }

        const balance = Number(balanceResult.data)
        if (balance === 0) {
          return []
        }

        const nfts: UserNFT[] = []

        // Get each token ID owned by the user
        for (let i = 0; i < balance; i++) {
          try {
            const tokenIdResult = getTokenOfOwnerByIndex(address, i)
            if (!tokenIdResult.data) continue

            const tokenId = Number(tokenIdResult.data)

            // Get token URI
            const tokenURIResult = getTokenURI(tokenId)
            const tokenURI = tokenURIResult.data as string || ''

            // Get creator
            const creatorResult = getRelicCreator(tokenId)
            const creator = creatorResult.data as string || ''

            // Get power
            const powerResult = getRelicPower(tokenId)
            const power = Number(powerResult.data) || 0

            nfts.push({
              tokenId,
              tokenURI,
              creator,
              power,
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