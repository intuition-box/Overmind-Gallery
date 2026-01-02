"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Shield, Lock, TrendingDown, FileWarning, Gavel, Scale, Mail } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      {/* Floating mystical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-cyan-400/20 animate-pulse">
          <AlertTriangle className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-violet-400/20 animate-pulse delay-1000">
          <Shield className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-cyan-400/10 animate-pulse delay-2000">
          <TrendingDown className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-violet-400/15 animate-pulse delay-3000">
          <Scale className="w-full h-full" />
        </div>
      </div>

      {/* Hero Section - Reduced bottom padding */}
      <header className="text-center relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          {/* Central Warning Symbol */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-amber-400/30 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-amber-400" />
              </div>
              <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6 md:text-6xl">
            Disclaimer and Risk Disclosures
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed font-mono text-lg">
            Understanding the risks, limitations, and responsibilities of participating in blockchain-based NFT auctions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16 relative z-10 max-w-4xl">
        <div className="space-y-12">
          {/* Critical Warning Callout */}
          <Card className="bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-400/30 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-400 mb-2 text-lg">Critical Notice</h3>
                <p className="text-gray-300 leading-relaxed">
                  NFT auctions involve significant financial, emotional, technical, and regulatory risks. Participate only with funds you can afford to lose entirely. By using this platform, you acknowledge and accept all risks outlined in this disclaimer.
                </p>
              </div>
            </div>
          </Card>

          {/* Introduction */}
          <div className="space-y-4">
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The Overmind Gallery ("The Overmind Gallery," "we," "us," or "our") operates a blockchain-based NFT auction marketplace on the Intuition Network. The platform facilitates peer-to-peer interactions with NFTs and smart contracts. We do not provide custody, brokerage, or financial services.
              </p>
              <p>
                By accessing or using the platform, you affirm that you are at least 18 years old (or the age of majority in your jurisdiction) and affirmatively accept this Disclaimer (including incorporated Terms of Service and Privacy Policy). Continued use after changes constitutes acceptance.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 1: General Information Only */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">1.</span>
              <span>General Information Only</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                All content, information, and services are for informational and entertainment purposes only. They do not constitute financial, investment, legal, tax, or professional advice. You bear sole responsibility for evaluating risks and verifying information.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 2: No Securities or Investment Advice */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">2.</span>
              <span>No Securities or Investment Advice</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>NFTs, digital assets, and blockchain auctions are high-risk and speculative.</p>
              
              <Card className="bg-violet-500/10 border border-violet-400/20 p-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>The Overmind Gallery provides no investment recommendations or advice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>No NFT, auction, bid, or mechanism (including outbid rewards) promises profit, guaranteed return, or appreciation.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>Past performance or outcomes do not indicate future results.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>NFTs on the platform are not intended as securities, investment contracts, or financial instruments under laws like the U.S. Securities Act of 1933.</span>
                  </li>
                </ul>
              </Card>

              <p>
                Participation offers no equity, governance rights, dividends, or profit expectation from The Overmind Gallery's efforts beyond automated smart contract mechanics.
              </p>
              <p className="text-amber-400 font-semibold">
                Consult qualified professionals before decisions. If an NFT may qualify as a security in your jurisdiction, do not participate.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 3: Intellectual Property Rights */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">3.</span>
              <span>Intellectual Property Rights</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Purchasing an NFT grants a limited, non-exclusive, non-transferable, royalty-free license to display the associated digital asset for personal, non-commercial use only, unless the creator specifies otherwise.
              </p>
              <p>
                The Overmind Gallery makes no representations about underlying intellectual property ownership, non-infringement, or rights transferred. Creators and users must ensure content does not violate third-party rights.
              </p>
              <p className="text-cyan-400 font-semibold">
                You indemnify The Overmind Gallery against claims from your content or use.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 4: Auction Risks & Outbid Rewards */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">4.</span>
              <span>Auction Risks & Outbid Rewards</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The platform enables auction bidding with potential outbid rewards up to 10% of bid amount, per smart contract logic.
              </p>
              
              <Card className="bg-cyan-500/10 border border-cyan-400/20 p-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Rewards are not guaranteed and depend on auction conditions, smart contract execution, and network factors.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Rewards execute automatically via smart contracts; The Overmind Gallery does not intervene.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Smart contracts may have bugs, vulnerabilities, or unexpected behavior, despite audits (if any).</span>
                  </li>
                </ul>
              </Card>

              <p className="text-amber-400 font-semibold">
                You participate at your own risk.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 5: Competitive Bidding Warning */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">5.</span>
              <span>Competitive Bidding Warning</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Auction mechanics involve competitive bidding, which may encourage repeated or impulsive participation. You acknowledge potential for excessive use impacting finances or well-being.
              </p>
              <p>
                The Overmind Gallery is not responsible for losses from overuse. Practice responsible participation; seek support if needed.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 6: Market Volatility & Asset Risk */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">6.</span>
              <span>Market Volatility & Asset Risk</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                NFT prices are volatile, influenced by sentiment, liquidity, network activity, and external factors beyond our control. NFTs may become illiquid, valueless, or unsellable.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 7: Blockchain & Technical Risks */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">7.</span>
              <span>Blockchain & Technical Risks</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>You accept risks of blockchain technology, including:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Smart contract vulnerabilities</li>
                <li>Network congestion, failures, forks, or instability</li>
                <li>Irreversible transactions</li>
                <li>Public, permanent data</li>
              </ul>
              <p>
                The platform operates "as is" and "as available" without guarantees of uninterrupted or error-free service.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 8: Wallet & Security Responsibility */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">8.</span>
              <span>Wallet & Security Responsibility</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                You alone secure your wallet, private keys, and seeds. Verify transactions before signing and ensure network compatibility.
              </p>
              <p className="text-cyan-400 font-semibold">
                The Overmind Gallery never accesses private keys and cannot recover lost assets.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 9: Third-Party Services */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">9.</span>
              <span>Third-Party Services</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Integrations or links to third-party services (wallets, explorers, etc.) are uncontrolled by The Overmind Gallery. We bear no responsibility for their availability, security, or practices.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 10: Tax and Regulatory Compliance */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">10.</span>
              <span>Tax and Regulatory Compliance</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                You comply with all applicable laws, including tax obligations (NFT transactions may trigger taxable events). The Overmind Gallery may report as required by law.
              </p>
              <p>
                We implement measures for anti-money laundering (AML) compliance and may require verification or suspend accounts for suspicious activity. Use is prohibited in sanctioned jurisdictions.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 11: No Guarantees or Warranties */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">11.</span>
              <span>No Guarantees or Warranties</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The platform is provided "as is" and "as available." To the maximum extent permitted by law, The Overmind Gallery disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, title, non-infringement, accuracy, or reliability.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 12: Limitation of Liability and Indemnification */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">12.</span>
              <span>Limitation of Liability and Indemnification</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                To the fullest extent permitted by law (excluding gross negligence, willful misconduct, or mandatory protections), The Overmind Gallery, its affiliates, developers, and contributors shall not be liable for any losses (including financial, lost profits, digital assets, data, or emotional distress), indirect, incidental, consequential, or punitive damages arising from platform use.
              </p>
              <p>
                Your sole remedy for dissatisfaction is to stop using the platform. You indemnify and hold The Overmind Gallery harmless from claims arising from your use, violations, or third-party disputes.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 13: Governing Law and Dispute Resolution */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">13.</span>
              <span>Governing Law and Dispute Resolution</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                This Disclaimer is governed by the laws of the State of Delaware, USA, without regard to conflicts of law. Any disputes shall be resolved exclusively through binding arbitration in Delaware under American Arbitration Association (AAA) rules, with no class actions permitted.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 14: Changes to This Disclaimer */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">14.</span>
              <span>Changes to This Disclaimer</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                We may update this Disclaimer. Material changes will be notified via platform announcement or email (if provided). Continued use after 30 days constitutes acceptance.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 15: Contact Information */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">15.</span>
              <span>Contact Information</span>
            </h2>
            <div className="pl-8 space-y-4">
              <p className="text-gray-300 leading-relaxed">
                For questions:
              </p>
              <Card className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/20 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 border border-violet-400/30">
                    <Mail className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">The Overmind Gallery Legal Team</p>
                    <a 
                      href="mailto:legal@overmind.gallery" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      legal@overmind.gallery
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Final Notice */}
          <Card className="bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-amber-400/30 p-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                <FileWarning className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-400 mb-2 text-lg">Final Notice</h3>
                <p className="text-gray-300 leading-relaxed">
                  NFT auctions involve significant financial, emotional, technical, and regulatory risks. Participate only with funds you can afford to lose entirely.
                </p>
              </div>
            </div>
          </Card>

          {/* Effective Date */}
          <div className="text-center pt-8">
            <p className="text-gray-400 text-sm">
              Effective Date: January 1, 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}