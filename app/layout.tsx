import './globals.css'
import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Web3Wrapper } from "@/components/Web3Wrapper"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "The Overmind Gallery - Explore Sacred Relics",
  description: "Discover ancient digital artifacts in our mystical NFT marketplace",
  generator: "Wolfgang",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased h-full`}>
        <ThemeProvider>
          <Web3Wrapper>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </Web3Wrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}