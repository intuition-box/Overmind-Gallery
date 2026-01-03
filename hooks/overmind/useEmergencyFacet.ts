import { useReadContract, useWriteContract } from 'wagmi'
import { useState } from 'react'

const GBM_DIAMOND_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`

export function useEmergencyFacet() {
  const [isEmergencyLoading, setIsEmergencyLoading] = useState(false)

  // Read functions
  const { data: paused, refetch: refetchPaused } = useReadContract({
    address: GBM_DIAMOND_ADDRESS,
    abi: [
      {
        inputs: [],
        name: 'paused',
        outputs: [{ type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
      }
    ],
    functionName: 'paused'
  })

  const { data: contractBalance } = useReadContract({
    address: GBM_DIAMOND_ADDRESS,
    abi: [
      {
        inputs: [],
        name: 'getContractBalance',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
      }
    ],
    functionName: 'getContractBalance'
  })

  // Write functions
  const { writeContract: emergencyPause, isPending: isPausing } = useWriteContract()
  const { writeContract: emergencyUnpause, isPending: isUnpausing } = useWriteContract()
  const { writeContract: emergencyWithdraw, isPending: isWithdrawing } = useWriteContract()

  const pauseContract = async () => {
    setIsEmergencyLoading(true)
    try {
      await emergencyPause({
        address: GBM_DIAMOND_ADDRESS,
        abi: [
          {
            inputs: [],
            name: 'emergencyPause',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        functionName: 'emergencyPause'
      })
      refetchPaused()
    } catch (error) {
      console.error('Failed to pause contract:', error)
    } finally {
      setIsEmergencyLoading(false)
    }
  }

  const unpauseContract = async () => {
    setIsEmergencyLoading(true)
    try {
      await emergencyUnpause({
        address: GBM_DIAMOND_ADDRESS,
        abi: [
          {
            inputs: [],
            name: 'emergencyUnpause',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        functionName: 'emergencyUnpause'
      })
      refetchPaused()
    } catch (error) {
      console.error('Failed to unpause contract:', error)
    } finally {
      setIsEmergencyLoading(false)
    }
  }

  const withdrawTokens = async (tokenAddress: `0x${string}`, recipient: `0x${string}`, amount: bigint) => {
    setIsEmergencyLoading(true)
    try {
      await emergencyWithdraw({
        address: GBM_DIAMOND_ADDRESS,
        abi: [
          {
            inputs: [
              { type: 'address' },
              { type: 'address' },
              { type: 'uint256' }
            ],
            name: 'emergencyWithdraw',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        functionName: 'emergencyWithdraw',
        args: [tokenAddress, recipient, amount]
      })
    } catch (error) {
      console.error('Failed to withdraw tokens:', error)
    } finally {
      setIsEmergencyLoading(false)
    }
  }

  return {
    // State
    paused,
    contractBalance,
    isEmergencyLoading,

    // Actions
    pauseContract,
    unpauseContract,
    withdrawTokens,

    // Loading states
    isPausing,
    isUnpausing,
    isWithdrawing,

    // Utils
    refetchPaused
  }
}