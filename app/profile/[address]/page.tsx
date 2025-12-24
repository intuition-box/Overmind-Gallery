// app/profile/[address]/page.tsx
import PublicProfile from "@/components/public-profile"
import { notFound } from "next/navigation"

export default async function PublicProfilePage({ 
  params 
}: { 
  params: Promise<{ address: string }> 
}) {
  const { address } = await params

  // Simple validation
  if (!address || address.length < 10) {
    notFound()
  }

  return <PublicProfile address={address} />
}