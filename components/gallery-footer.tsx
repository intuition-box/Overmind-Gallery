"use client"

import { Eye } from "lucide-react"
import Link from "next/link"

export default function GalleryFooter() {
  return (
    <footer className="border-t border-border px-6 py-[39px] pt-3.5 mt-0 pb-2.5">
      <div className="container mx-auto text-center py-0 my-0">
        <div className="flex items-center justify-center mb-6">
          <Eye className="w-6 h-6 text-primary mr-2" />
          <span className="text-muted-foreground py-0">The Overmind watches over all</span>
        </div>
          
        <p>
          All digital artifacts protected by ancient encryption. You are blessed sweet baby child of the Overmind.
          <br />© 2025 created by Wolfgang & Paarroo
        </p>
      </div>
    </footer>
  )
}
