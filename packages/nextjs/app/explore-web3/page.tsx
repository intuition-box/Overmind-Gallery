"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Web3RelicCard } from "../../components/Web3RelicCard";
import { Eye, Menu, X } from "lucide-react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function ExploreWeb3Page() {
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { address: connectedAddress } = useAccount();

  // Read all relics from the smart contract
  const { data: relicsForSale } = useScaffoldReadContract({
    contractName: "OvermindGallery",
    functionName: "getRelicsForSale",
  });

  // Read selected relic data
  const { data: selectedRelicData } = useScaffoldReadContract({
    contractName: "OvermindGallery",
    functionName: "relics",
    args: selectedTokenId !== null ? ([BigInt(selectedTokenId)] as const) : ([undefined] as const),
  });

  const { writeContractAsync: purchaseRelic } = useScaffoldWriteContract("OvermindGallery");

  const handlePurchase = async () => {
    if (!selectedRelicData || selectedTokenId === null || !connectedAddress) return;

    try {
      await purchaseRelic({
        functionName: "purchaseRelic",
        args: [BigInt(selectedTokenId)],
        value: selectedRelicData[2], // price is at index 2
      });
      setSelectedTokenId(null);
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background smoky-gradient">
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                The Overmind Gallery
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <a href="/explore-web3" className="text-cyan-400 font-medium">
                Explore
              </a>
              <a href="/collections" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Collections
              </a>
              <a href="/creators" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Creators
              </a>
            </nav>

            {/* Connect Wallet */}
            <div className="flex items-center space-x-4">
              <RainbowKitCustomConnectButton />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Explore Sacred Relics
          </h1>
          <p className="text-gray-400 text-lg">Discover mystical artifacts on the blockchain</p>
          {connectedAddress && (
            <p className="text-cyan-400 mt-2">
              Connected: <Address address={connectedAddress} />
            </p>
          )}
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relicsForSale && relicsForSale.length > 0 ? (
            relicsForSale.map(tokenId => (
              <Web3RelicCard
                key={tokenId.toString()}
                tokenId={Number(tokenId)}
                onClick={() => setSelectedTokenId(Number(tokenId))}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No relics available yet</p>
              <p className="text-gray-500">Connect your wallet and mint the first sacred artifact!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for NFT Preview */}
      <Dialog open={selectedTokenId !== null} onOpenChange={() => setSelectedTokenId(null)}>
        <DialogContent className="max-w-2xl obsidian-texture border-border/30 rune-glow-violet">
          {selectedRelicData && (
            <>
              <DialogHeader>
                <DialogTitle className="font-playfair text-2xl font-bold text-card-foreground">
                  {selectedRelicData[0]}
                </DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={selectedRelicData[4] || "/placeholder.svg"}
                    alt={selectedRelicData[0]}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground mb-2">Created by</p>
                    <Address address={selectedRelicData[1] as `0x${string}`} />
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2">Description</p>
                    <p className="text-card-foreground leading-relaxed">
                      A sacred digital artifact minted on the blockchain, forever preserved in the Overmind Gallery.
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2">Price</p>
                    <Badge
                      variant="secondary"
                      className="bg-secondary/20 text-secondary border-secondary/30 text-lg px-4 py-2"
                    >
                      {formatEther(selectedRelicData[2])} ETH
                    </Badge>
                  </div>

                  {selectedRelicData[3] && connectedAddress && (
                    <Button
                      onClick={handlePurchase}
                      className="w-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow py-6 text-lg font-semibold"
                    >
                      Acquire Sacred Artifact
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Eye className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  The Overmind Gallery
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 flex flex-col space-y-6 p-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="/explore-web3"
                className="text-cyan-400 font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </a>
              <a
                href="/collections"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a
                href="/creators"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creators
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
