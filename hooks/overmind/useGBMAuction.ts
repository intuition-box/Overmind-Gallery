import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import GBMDiamondABI from '../../artifacts/contracts/gbm/Diamond.sol/Diamond.json'
import GBM_TRUSTFacetABI from '../../artifacts/contracts/gbm/facets/GBM_TRUSTFacet.sol/GBM_TRUSTFacet.json'
import SettingsFacetABI from '../../artifacts/contracts/gbm/facets/SettingsFacet.sol/SettingsFacet.json'

const DIAMOND_ABI = GBMDiamondABI.abi
const GBM_TRUST_ABI = GBM_TRUSTFacetABI.abi
const SETTINGS_ABI = SettingsFacetABI.abi

// Placeholder addresses - will be updated when contracts are deployed
const DIAMOND_ADDRESS = '0x0000000000000000000000000000000000000002' as `0x${string}`

export function useGBMAuction() {
  const { address } = useAccount()

  // GBM Diamond contract functions
  const { data: diamondOwner } = useReadContract({
    address: DIAMOND_ADDRESS,
    abi: DIAMOND_ABI,
    functionName: 'owner',
  })

  // GBM_TRUSTFacet functions
  const { data: erc20Currency } = useReadContract({
    address: DIAMOND_ADDRESS,
    abi: GBM_TRUST_ABI,
    functionName: 'erc20Currency',
  })

  // SettingsFacet functions
  const { data: auctionSettings } = useReadContract({
    address: DIAMOND_ADDRESS,
    abi: SETTINGS_ABI,
    functionName: 'getInitiatorInfo',
  })

  const { data: startTime } = useReadContract({
    address: DIAMOND_ADDRESS,
    abi: SETTINGS_ABI,
    functionName: 'getStartTime',
    args: [0], // auctionId
  })

  const { data: endTime } = useReadContract({
    address: DIAMOND_ADDRESS,
    abi: SETTINGS_ABI,
    functionName: 'getEndTime',
    args: [0], // auctionId
  })

  // Write functions
  const { writeContract: commitBid, isPending: isBidding } = useWriteContract()
  const { writeContract: setAuctionSettings, isPending: isSettingAuction } = useWriteContract()

  const commitBidAsync = async (
    auctionId: number,
    bidAmount: string,
    highestBid: string,
    signature: string
  ) => {
    return commitBid({
      address: DIAMOND_ADDRESS,
      abi: GBM_TRUST_ABI,
      functionName: 'commitBid',
      args: [auctionId, parseEther(bidAmount), parseEther(highestBid), signature],
    })
  }

  const bidAsync = async (auctionId: number, bidAmount: string, highestBid: string) => {
    return commitBid({
      address: DIAMOND_ADDRESS,
      abi: GBM_TRUST_ABI,
      functionName: 'bid',
      args: [auctionId, parseEther(bidAmount), parseEther(highestBid)],
    })
  }

  const setInitiatorInfoAsync = async (initiatorInfo: any) => {
    return setAuctionSettings({
      address: DIAMOND_ADDRESS,
      abi: SETTINGS_ABI,
      functionName: 'setInitiatorInfo',
      args: [initiatorInfo],
    })
  }

  return {
    // Contract addresses
    diamondAddress: DIAMOND_ADDRESS,

    // Diamond contract data
    diamondOwner,

    // GBM_TRUSTFacet data
    erc20Currency,

    // SettingsFacet data
    auctionSettings,
    startTime,
    endTime,

    // Write functions
    commitBidAsync,
    bidAsync,
    setInitiatorInfoAsync,
    isBidding,
    isSettingAuction,

    // Utils
    formatEther,
    parseEther,
  }
}