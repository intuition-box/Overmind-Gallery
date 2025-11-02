import { useWriteContract } from 'wagmi'
import { Abi } from 'viem'

type UseScaffoldWriteContractConfig = {
  contractName: string
  functionName: string
  args?: readonly unknown[]
  abi?: Abi
  address?: `0x${string}`
}

/**
 * Hook for writing to smart contracts
 * Simplified version of Scaffold-ETH useScaffoldWriteContract
 */
export function useScaffoldWriteContract<T = unknown>({
  contractName,
  functionName,
  args,
  abi,
  address,
  ...writeContractConfig
}: UseScaffoldWriteContractConfig & Parameters<typeof useWriteContract>[0]) {
  
  const { writeContract, ...result } = useWriteContract()

  const writeContractAsync = (variables?: any) => {
    return writeContract({
      address,
      abi,
      functionName,
      args,
      ...variables,
    })
  }

  return {
    ...result,
    writeContract,
    writeContractAsync,
  }
}