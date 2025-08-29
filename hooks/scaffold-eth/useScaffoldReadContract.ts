import { useReadContract } from 'wagmi'
import { Abi } from 'viem'

type UseScaffoldReadContractConfig = {
  contractName: string
  functionName: string
  args?: readonly unknown[]
  abi?: Abi
  address?: `0x${string}`
}

/**
 * Hook for reading from smart contracts
 * Simplified version of Scaffold-ETH useScaffoldReadContract
 */
export function useScaffoldReadContract<T = unknown>({
  contractName,
  functionName,
  args,
  abi,
  address,
  ...readContractConfig
}: UseScaffoldReadContractConfig & Parameters<typeof useReadContract>[0]) {
  
  return useReadContract({
    address,
    abi,
    functionName,
    args,
    ...readContractConfig,
  } as any)
}