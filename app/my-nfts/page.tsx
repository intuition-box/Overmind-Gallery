"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MyNFTsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/profile?tab=my-nfts')
  }, [router])

  return null
}