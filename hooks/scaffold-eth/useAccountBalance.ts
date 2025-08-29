import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'

/**
 * Hook to get account balance in a formatted way
 * Similar to Scaffold-ETH balance display
 */
export function useAccountBalance() {
  const { address, isConnected } = useAccount()
  
  const { 
    data: balance, 
    isLoading: isBalanceLoading,
    error: balanceError 
  } = useBalance({
    address,
  })

  const formattedBalance = balance ? formatEther(balance.value) : '0'
  const displayBalance = balance ? `${Number(formattedBalance).toFixed(4)} ETH` : '0 ETH'

  return {
    address,
    isConnected,
    balance: balance?.value,
    formattedBalance,
    displayBalance,
    isLoading: isBalanceLoading,
    error: balanceError,
  }
}