// app/collections/[slug]/page.tsx
import { notFound } from "next/navigation"
import CollectionDetail from "@/components/collection-detail"

export default async function CollectionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return <CollectionDetail slug={slug} />
}