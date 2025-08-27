"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Custom Scaffold-ETH 2 Connect Button with Overmind Gallery design
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const [mounted, setMounted] = useState(false);

  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render loading state on server-side to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white px-6 py-2 rounded-lg border-0 transition-all duration-300 font-medium opacity-50 cursor-not-allowed"
        disabled
      >
        Loading...
      </button>
    );
  }

  // Show connect button when not connected
  if (!isConnected || !address) {
    return (
      <button
        className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white px-6 py-2 rounded-lg border-0 transition-all duration-300 font-medium"
        onClick={() => {
          const connector = connectors.find(c => c.name.includes("MetaMask")) || connectors[0];
          if (connector) {
            connect({ connector });
          }
        }}
        disabled={isPending}
        type="button"
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  // Show wrong network button when connected to wrong network
  if (chain && chain.id !== targetNetwork.id) {
    return (
      <button
        onClick={() => switchChain({ chainId: targetNetwork.id })}
        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50 px-6 py-2 rounded-lg border transition-all duration-300 font-medium"
      >
        Wrong Network
      </button>
    );
  }

  // Show connected state with network and account info
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchChain({ chainId: targetNetwork.id })}
        className="text-cyan-400 hover:bg-cyan-400/10 px-3 py-1 rounded-md transition-all duration-300 text-sm border border-cyan-400/30"
        style={{ color: networkColor }}
      >
        {chain?.name || targetNetwork.name}
      </button>
      <button
        onClick={() => {
          // Simple disconnect - reconnect to trigger wallet options
          const connector = connectors.find(c => c.name.includes("MetaMask")) || connectors[0];
          if (connector) {
            connect({ connector });
          }
        }}
        className="bg-gradient-to-r from-cyan-500/20 to-violet-600/20 hover:from-cyan-500/30 hover:to-violet-600/30 text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-md transition-all duration-300 text-sm"
      >
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Account"}
      </button>
    </div>
  );
};
