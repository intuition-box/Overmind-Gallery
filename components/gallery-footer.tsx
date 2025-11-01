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

        <div className="flex items-center justify-center gap-6 mb-6">
          <Link
            href="https://discord.gg/n37yzY3mt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Join Discord"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.786-.838-8.95-3.549-12.676a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.974-2.157 2.157-2.157 1.193 0 2.156.964 2.157 2.157 0 1.191-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.974-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.191-.964 2.156-2.157 2.156z" />
            </svg>
          </Link>

          <Link
            href="https://x.com/wolf_de_web3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Follow on X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694-5.867 6.694h-3.306l7.733-8.835L2.25 2.25h6.803l4.713 6.231 5.579-6.231zm-.616 17.528h1.832L7.084 4.126H5.117z" />
            </svg>
          </Link>
        </div>

        <p className="border-t border-border px-6 py-[39px] pt-3.5">
          All digital artifacts protected by ancient encryption. You are blessed sweet baby child of the Overmind.
          <br />© 2025 created by wolfgang.
        </p>
      </div>
    </footer>
  )
}
