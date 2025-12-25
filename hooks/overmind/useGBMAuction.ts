import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'

// Load ABIs dynamically to avoid build issues
const DIAMOND_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_contractOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_diamondCutFacet",
        "type": "address"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "facetAddress",
            "type": "address"
          },
          {
            "internalType": "enum IDiamondCut.FacetCutAction",
            "name": "action",
            "type": "uint8"
          },
          {
            "internalType": "bytes4[]",
            "name": "functionSelectors",
            "type": "bytes4[]"
          }
        ],
        "internalType": "struct IDiamondCut.FacetCut[]",
        "name": "_diamondCut",
        "type": "tuple[]"
      },
      {
        "internalType": "address",
        "name": "_init",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_calldata",
        "type": "bytes"
      }
    ],
    "name": "diamondCut",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "_functionSelector",
        "type": "bytes4"
      }
    ],
    "name": "facetAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "facetAddress_",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "facetAddresses",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "facetAddresses_",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_facet",
        "type": "address"
      }
    ],
    "name": "facetFunctionSelectors",
    "outputs": [
      {
        "internalType": "bytes4[]",
        "name": "facetFunctionSelectors_",
        "type": "bytes4[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "facets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "facetAddress",
            "type": "address"
          },
          {
            "internalType": "bytes4[]",
            "name": "functionSelectors",
            "type": "bytes4[]"
          }
        ],
        "internalType": "struct IDiamondLoupe.Facet[]",
        "name": "facets_",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "_interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const GBM_TRUST_ABI = [
  {
    "inputs": [],
    "name": "erc20Currency",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bidAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_highestBid",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "commitBid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bidAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_highestBid",
        "type": "uint256"
      }
    ],
    "name": "bid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_auctionIds",
        "type": "uint256[]"
      }
    ],
    "name": "batchClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_contract",
        "type": "address"
      }
    ],
    "name": "registerAnAuctionContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newAddress",
        "type": "address"
      }
    ],
    "name": "updatePlayerRewardsAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const SETTINGS_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "getAuctionEndTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "getAuctionHammerTimeDuration",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "getAuctionStartTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "getAuctionBidDecimals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "getAuctionStepMin",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

// Placeholder addresses - will be updated when contracts are deployed
const DIAMOND_ADDRESS = '0x0000000000000000000000000000000000000002' as `0x${string}`

export function useGBMAuction() {
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