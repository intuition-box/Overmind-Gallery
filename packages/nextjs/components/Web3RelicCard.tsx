"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

interface Web3RelicCardProps {
  tokenId: number;
  onClick?: () => void;
}

export const Web3RelicCard = ({ tokenId, onClick }: Web3RelicCardProps) => {
  const { address: connectedAddress } = useAccount();
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Read relic data from smart contract
  const { data: relicData } = useScaffoldReadContract({
    contractName: "OvermindRelic",
    functionName: "relics",
    args: [BigInt(tokenId)],
  });

  const { data: tokenURI } = useScaffoldReadContract({
    contractName: "OvermindRelic",
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  const { data: owner } = useScaffoldReadContract({
    contractName: "OvermindRelic",
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });

  const { writeContractAsync: purchaseRelic } = useScaffoldWriteContract("OvermindRelic");

  const handlePurchase = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!relicData || !connectedAddress) return;

    setIsPurchasing(true);
    try {
      await purchaseRelic({
        functionName: "purchaseRelic",
        args: [BigInt(tokenId)],
        value: relicData[2], // price is at index 2
      });
    } catch (error) {
      console.error("Purchase failed:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!relicData) {
    return (
      <Card className="group obsidian-texture border-border/30 overflow-hidden animate-pulse">
        <div className="aspect-square bg-gray-800" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded w-2/3" />
        </div>
      </Card>
    );
  }

  const [title, creator, price, isForSale, imageURI] = relicData;
  const isOwner = owner === connectedAddress;

  return (
    <Card
      className="group obsidian-texture border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:rune-glow"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={imageURI || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!isForSale && (
          <Badge className="absolute top-2 right-2 bg-gray-800/80">Not for sale</Badge>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-playfair text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="text-muted-foreground text-sm flex items-center gap-1">
            by <Address address={creator as `0x${string}`} format="short" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
            {formatEther(price)} ETH
          </Badge>
          {isForSale && !isOwner && connectedAddress && (
            <Button
              size="sm"
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rune-glow"
            >
              {isPurchasing ? "Acquiring..." : "Acquire"}
            </Button>
          )}
          {isOwner && (
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">Owned</Badge>
          )}
        </div>
      </div>
    </Card>
  );
};