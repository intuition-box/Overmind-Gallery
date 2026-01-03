import { useChainId } from 'wagmi'

// Contract addresses by chain ID
const DEPLOYED_CONTRACTS = {
  // Local Hardhat
  1337: {
    OvermindNFT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    OvermindMarketplace: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    // GBM Diamond contracts (to be deployed)
    GBMDiamond: '',
    GBM_TRUSTFacet: '',
    SettingsFacet: '',
    DiamondCutFacet: '',
    DiamondLoupeFacet: '',
    OwnershipFacet: '',
  },
  // Sepolia testnet
  11155111: {
    OvermindNFT: '',
    OvermindMarketplace: '',
    GBMDiamond: '',
    GBM_TRUSTFacet: '',
    SettingsFacet: '',
    DiamondCutFacet: '',
    DiamondLoupeFacet: '',
    OwnershipFacet: '',
  },
  // Mainnet
  1: {
    OvermindNFT: '',
    OvermindMarketplace: '',
    GBMDiamond: '',
    GBM_TRUSTFacet: '',
    SettingsFacet: '',
    DiamondCutFacet: '',
    DiamondLoupeFacet: '',
    OwnershipFacet: '',
  },
} as const

/**
 * Hook to get deployed contract addresses for the current chain
 */
export function useDeployedContracts() {
  const chainId = useChainId()
  
  const contracts = DEPLOYED_CONTRACTS[chainId as keyof typeof DEPLOYED_CONTRACTS] || {
    OvermindNFT: '',
    OvermindMarketplace: '',
    GBMDiamond: '',
    GBM_TRUSTFacet: '',
    SettingsFacet: '',
    DiamondCutFacet: '',
    DiamondLoupeFacet: '',
    OwnershipFacet: '',
  }

  return {
    contracts,
    chainId,
    isLocalNetwork: chainId === 1337,
    isTestnet: chainId === 11155111,
    isMainnet: chainId === 1,
  }
}