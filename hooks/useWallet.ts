import { useAccount, useBalance } from 'wagmi'

export function useWallet() {
  const { address, isConnected, chain } = useAccount()
  const { data: balance } = useBalance({
    address,
    chainId: chain?.id,
  })

  return {
    address,
    isConnected,
    chain,
    balance,
    displayAddress: address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : null,
    displayBalance: balance
      ? `${parseFloat(balance.value.toString()).toFixed(4)} ${balance.symbol}`
      : null,
  }
}