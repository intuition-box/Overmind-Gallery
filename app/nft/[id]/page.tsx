// app/nft/[id]/page.tsx
import { notFound } from "next/navigation"
import { Metadata } from "next"
import NFTDetailPage from "@/components/nft-detail-page"

// Mock NFT data - replace with real data fetching
const mockNFTs = {
  1: {
    id: 1,
    name: "Relic #1",
    image: "/cyber-oracle-mask-futuristic-mystical-glowing-eyes.png",
    collection: "Ancient Codex",
    collectionSlug: "ancient-codex",
    creator: "Wolfgang",
    creatorAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    power: 750,
    rarity: "Rare",
    description: "A mystical relic containing ancient knowledge and forgotten wisdom from the digital realm.",
    attributes: [
      { trait_type: "Power", value: "750", rarity: "15%" },
      { trait_type: "Element", value: "Arcane", rarity: "8%" },
      { trait_type: "Rarity", value: "Rare", rarity: "25%" },
      { trait_type: "Origin", value: "Ancient", rarity: "12%" }
    ],
    priceHistory: [
      { date: "2024-01-01", price: 0.5 },
      { date: "2024-01-15", price: 0.7 },
      { date: "2024-02-01", price: 0.8 },
      { date: "2024-02-15", price: 1.2 }
    ],
    status: "owned" as const
  }
}

interface NFTPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: NFTPageProps): Promise<Metadata> {
  const { id } = await params
  const nftId = parseInt(id)
  const nft = mockNFTs[nftId as keyof typeof mockNFTs]

  if (!nft) {
    return {
      title: "NFT Not Found | Overmind Gallery"
    }
  }

  return {
    title: `${nft.name} | ${nft.collection} | Overmind Gallery`,
    description: nft.description,
    openGraph: {
      title: `${nft.name} | ${nft.collection}`,
      description: nft.description,
      images: [nft.image],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${nft.name} | ${nft.collection}`,
      description: nft.description,
      images: [nft.image]
    }
  }
}

export default async function NFTPage({ params }: NFTPageProps) {
  const { id } = await params
  const nftId = parseInt(id)

  if (isNaN(nftId)) {
    notFound()
  }

  const nft = mockNFTs[nftId as keyof typeof mockNFTs]

  if (!nft) {
    notFound()
  }

  return <NFTDetailPage nft={nft} />
}