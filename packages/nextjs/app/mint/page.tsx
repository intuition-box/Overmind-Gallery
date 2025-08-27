"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Upload } from "lucide-react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Card } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function MintPage() {
  const router = useRouter();
  const { address: connectedAddress } = useAccount();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync: mintRelic } = useScaffoldWriteContract("OvermindGallery");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedAddress || !formData.title || !formData.price || !formData.imageUrl) {
      alert("Please fill in all required fields and connect your wallet");
      return;
    }

    setIsMinting(true);
    try {
      // In a real app, you would upload metadata to IPFS first
      const mockTokenURI = `ipfs://Qm${formData.title.replace(/\s/g, "")}`;

      await mintRelic({
        functionName: "mintRelic",
        args: [formData.title, mockTokenURI, formData.imageUrl, parseEther(formData.price)],
      });

      // Redirect to explore page after successful mint
      router.push("/explore-web3");
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background smoky-gradient">
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                The Overmind Gallery
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <a href="/explore-web3" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Explore
              </a>
              <a href="/mint" className="text-cyan-400 font-medium">
                Mint
              </a>
            </nav>

            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Forge a Sacred Relic
          </h1>
          <p className="text-gray-400 text-lg">Create your mystical artifact and mint it on the blockchain</p>
          {connectedAddress && (
            <p className="text-cyan-400 mt-2">
              Creator: <Address address={connectedAddress} />
            </p>
          )}
        </div>

        <Card className="obsidian-texture border-border/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Relic Name *</label>
              <Input
                type="text"
                placeholder="The Eternal Codex"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="bg-background/50 border-border/30 text-card-foreground"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Price (ETH) *</label>
              <Input
                type="number"
                step="0.001"
                placeholder="2.5"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="bg-background/50 border-border/30 text-card-foreground"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Image URL *</label>
              <Input
                type="text"
                placeholder="/mystical-artifact.png or https://..."
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                className="bg-background/50 border-border/30 text-card-foreground"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use a public image URL or path. IPFS integration coming soon.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
              <textarea
                placeholder="An ancient artifact containing the wisdom of the digital realm..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full min-h-[120px] px-3 py-2 bg-background/50 border border-border/30 rounded-md text-card-foreground resize-none"
              />
            </div>

            {/* Preview */}
            {formData.imageUrl && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Preview</label>
                <Card className="obsidian-texture border-border/30 overflow-hidden max-w-xs">
                  <div className="aspect-square relative">
                    <img
                      src={formData.imageUrl}
                      alt={formData.title || "Preview"}
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair text-lg font-bold text-card-foreground mb-2">
                      {formData.title || "Unnamed Relic"}
                    </h3>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                      {formData.price || "0"} ETH
                    </Badge>
                  </div>
                </Card>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              {connectedAddress ? (
                <Button
                  type="submit"
                  disabled={isMinting || !formData.title || !formData.price || !formData.imageUrl}
                  className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white font-bold text-lg px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                >
                  {isMinting ? (
                    <>
                      <Upload className="w-5 h-5 mr-2 animate-pulse" />
                      Forging Relic...
                    </>
                  ) : (
                    "Mint Sacred Relic"
                  )}
                </Button>
              ) : (
                <p className="text-gray-400">Please connect your wallet to mint</p>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
