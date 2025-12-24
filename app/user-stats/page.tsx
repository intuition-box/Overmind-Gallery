"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UserStatsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/profile?tab=user-stats')
  }, [router])

  return null
}