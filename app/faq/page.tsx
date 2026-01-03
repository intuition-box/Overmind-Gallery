"use client"

import { HelpCircle, BookOpen, Gavel, ShoppingBag, Palette, MessageCircle } from "lucide-react"
import SiteHeader from "@/components/site-header"
import FAQItem from "@/components/faq-item"

export default function FAQPage() {
  return (
    <div className="min-h-screen page-gradient">
      {/* Background Effects - Theme-aware decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      {/* Floating mystical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-primary/20 animate-pulse">
          <HelpCircle className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-secondary/20 animate-pulse delay-1000">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-primary/10 animate-pulse delay-2000">
          <Gavel className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-secondary/15 animate-pulse delay-3000">
          <MessageCircle className="w-full h-full" />
        </div>
      </div>

      {/* Hero Section */}
      <header className="text-center relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Central Help Symbol */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center">
                <HelpCircle className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent mb-6 md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed font-mono text-lg">
            Everything you need to know about The Overmind Gallery
          </p>
        </div>
      </header>

      {/* FAQ Section as Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* General / Platform Basics */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                General / Platform Basics
              </h2>
            </div>
            <div className="space-y-3">
              <FAQItem
                question="How does The Overmind Gallery differ from other NFT marketplaces?"
                answer="The Overmind Gallery is an art-first, auction-driven gallery built on the Intuition Network. Every sale is a live auction designed to let time, attention, and competition discover value — not a 'buy now' click. The experience is curated and story-led: each drop is chosen to fit the gallery's surreal, immersive aesthetic and to spark social engagement on the Intuition Network."
              />
              <FAQItem
                question="What blockchain does The Overmind Gallery use?"
                answer="The Overmind Gallery runs on the Intuition Network. All bids, transfers, and reward calculations are recorded on-chain to preserve provenance and make the system auditable and trustless. Transactions use the native token $TRUST."
              />
              <FAQItem
                question="Is The Overmind Gallery curated or open to all creators?"
                answer="The Overmind Gallery is selectively curated. Artists may apply via the Creator Page; the curatorial team reviews submissions to ensure each piece fits Overmind's quality standards. Selected artists will be contacted and assisted with minting and auction setup."
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Auctions & Bidding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 flex items-center justify-center border border-secondary/30">
                <Gavel className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                Auctions & Bidding
              </h2>
            </div>
            <div className="space-y-3">
              <FAQItem
                question="How do NFT auctions work on Overmind Gallery?"
                answer="Each artifact is listed with a starting price and an auction duration. Collectors place bids using $TRUST. When a new bid outbids the previous bidder, the previous bidder receives a dynamic outbid reward. The auction closes at the scheduled time. The highest bidder wins the NFT and on-chain settlement follows immediately."
              />
              <FAQItem
                question="What is the dynamic bid-reward formula?"
                answer={
                  <div className="space-y-3">
                    <p>
                      When you are outbid, you can receive a reward. That reward increases when the new bidder jumps the price by a larger margin and is smaller for tiny increases. The reward cannot exceed 10% of the new bid.
                    </p>
                    <div className="bg-card/30 border border-primary/20 rounded-lg p-4 font-mono text-sm">
                      <p className="text-primary font-semibold mb-2">Formula:</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Let:</p>
                        <p className="ml-4">B_prev = previous (outbid) bid amount (in $TRUST)</p>
                        <p className="ml-4">B_new = new winning bid amount (in $TRUST)</p>
                        <p className="ml-4">r = relative increase</p>
                        <p className="ml-4">MAX_P = maximum reward percent = 0.10 (10%)</p>
                        <p className="ml-4">p = reward percent</p>
                        <p className="ml-4">R = reward amount in $TRUST</p>
                        <p className="mt-3">Where:</p>
                        <p className="ml-4">MAX_P = 0.10 (10%)</p>
                        <p className="ml-4">r = (B_new - B_prev) / B_prev</p>
                        <p className="ml-4">p = (MAX_P * r)</p>
                        <p className="ml-4 text-secondary font-semibold">R = (p * B_new)</p>
                      </div>
                    </div>
                  </div>
                }
              />
              <FAQItem
                question="What happens if I win an auction?"
                answer="The highest bidder wins; on-chain settlement transfers the NFT to the winner's wallet."
              />
              <FAQItem
                question="What happens if I lose an auction?"
                answer="Your bid funds are released back to you plus the calculated outbid reward paid in $TRUST. (gas costs as applicable)"
              />
              <FAQItem
                question="Can I cancel a bid once placed?"
                answer="No. Bids are immutable once submitted to the auction contract."
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Buying & Collecting */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                Buying & Collecting
              </h2>
            </div>
            <div className="space-y-3">
              <FAQItem
                question="Where can I view my purchased NFTs?"
                answer="Purchased NFTs appear in 'My NFTs' and in your connected wallet. Because ownership is on-chain, any explorer or compatible marketplace will also show the token."
              />
              <FAQItem
                question="Are there royalties for artists?"
                answer="Yes. Royalty payments enforced by smart contracts."
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Artists & Creators */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 flex items-center justify-center border border-secondary/30">
                <Palette className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                Artists & Creators
              </h2>
            </div>
            <div className="space-y-3">
              <FAQItem
                question="How can artists list their NFTs for auction?"
                answer="Apply through the Creator Page where you then click the 'Become a Creator' button and fill the form. If accepted, you'll get step-by-step support to mint your work on the Intuition Network."
              />
              <FAQItem
                question="How are royalties handled for creators?"
                answer="Royalties are enforced by smart contracts. On a primary sale the artist receives 85% of the sale price; the gallery gets 15%."
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Community & Support */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                Community & Support
              </h2>
            </div>
            <div className="space-y-3">
              <FAQItem
                question="How can I contact the Overmind team?"
                answer={
                  <p>
                    Use the{" "}
                    <a
                      href="https://discord.gg/n37yzY3mt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary font-semibold transition-colors duration-200 underline decoration-primary/30 hover:decoration-secondary/30"
                    >
                      Discord
                    </a>
                    , or{" "}
                    <a
                      href="https://x.com/OvermindGallery"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary font-semibold transition-colors duration-200 underline decoration-primary/30 hover:decoration-secondary/30"
                    >
                      X
                    </a>{" "}
                    (also listed in the footer).
                  </p>
                }
              />
              <FAQItem
                question="Where can I stay updated on new drops and auctions?"
                answer="Follow The Overmind Gallery on X (Twitter) and join our Discord."
              />
              <FAQItem
                question="Can I suggest artists or collections to be featured?"
                answer="Yes. Using the bonding curve on the Intuition Portal, make claims stating a certain artist should be featured on the overmind gallery. If the claim meets the threshold, the artist will be featured."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}