import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'

// Standard ERC20 ABI for balance reading
const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * Hook to get $TRUST token balance for connected wallet
 * Used for GBM auctions and bidding
 */
export function useTrustBalance() {
  const { address, isConnected } = useAccount()

  // For now, use a placeholder TRUST token address
  // This will be replaced with the actual deployed TRUST token address
  // or read from GBM_TRUSTFacet.erc20Currency() once deployed
  const TRUST_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TRUST_TOKEN_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000'

  const {
    data: balance,
    isLoading: isBalanceLoading,
    error: balanceError
  } = useReadContract({
    address: TRUST_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && TRUST_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  })

  const {
    data: decimals,
  } = useReadContract({
    address: TRUST_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: TRUST_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  })

  // Format balance based on token decimals (assuming 18 like most ERC20)
  const tokenDecimals = decimals || 18
  const formattedBalance = balance ? Number(balance) / Math.pow(10, tokenDecimals) : 0
  const displayBalance = balance ? `${formattedBalance.toFixed(4)} TRUST` : '0 TRUST'

  return {
    address,
    isConnected,
    balance: balance || BigInt(0),
    formattedBalance,
    displayBalance,
    isLoading: isBalanceLoading,
    error: balanceError,
    tokenAddress: TRUST_TOKEN_ADDRESS,
    isTokenDeployed: TRUST_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
  }
}