"use client"

import { AlertTriangle, Shield, Lock, TrendingDown, FileWarning, Gavel, Scale, Mail } from "lucide-react"
import SiteHeader from "@/components/site-header"
import { Card } from "@/components/ui/card"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen page-gradient">
      {/* Decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 decorative-orb-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 decorative-orb-cyan rounded-full blur-3xl"></div>
      </div>

      <SiteHeader />

      {/* Floating mystical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 text-primary/20 animate-pulse">
          <AlertTriangle className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-secondary/20 animate-pulse delay-1000">
          <Shield className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-primary/10 animate-pulse delay-2000">
          <TrendingDown className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-secondary/15 animate-pulse delay-3000">
          <Scale className="w-full h-full" />
        </div>
      </div>

      {/* Hero Section */}
      <header className="text-center relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-destructive/30 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
              <div className="absolute inset-0 bg-destructive/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent mb-6 md:text-6xl">
            Disclaimer and Risk Disclosures
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed font-mono text-lg">
            Understanding the risks, limitations, and responsibilities of participating in blockchain-based NFT auctions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16 relative z-10 max-w-4xl">
        <div className="space-y-12">
          {/* Critical Warning Callout */}
          <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/30 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-2 text-lg">Critical Notice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  NFT auctions involve significant financial, emotional, technical, and regulatory risks. Participate only with funds you can afford to lose entirely. By using this platform, you acknowledge and accept all risks outlined below.
                </p>
              </div>
            </div>
          </Card>

          {/* Introduction */}
          <div className="space-y-4">
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                The Overmind Gallery ("the platform," "we," "us," or "our") is a decentralized, non-custodial platform that facilitates peer-to-peer NFT auctions via smart contracts on the Intuition Network. We do not hold funds, provide brokerage services, or act as a financial intermediary.
              </p>
              <p>
                The platform is currently developed and maintained by an unincorporated team and is not operated by a registered legal entity.
              </p>
              <p>
                By accessing or using the platform, you confirm that you are at least 18 years old (or the age of majority in your jurisdiction) and that you fully understand and accept this Disclaimer, together with our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 1: General Information Only */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">1.</span>
              <span>General Information Only</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                All content, information, and services provided on the platform are for informational and entertainment purposes only. They do not constitute financial, investment, legal, tax, or any other professional advice.
              </p>
              <p>
                You are solely responsible for evaluating all risks and for independently verifying any information before acting on it.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 2: No Securities or Investment Advice */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">2.</span>
              <span>No Securities or Investment Advice</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>NFTs and participation in blockchain auctions are highly speculative and carry substantial risk.</p>
              
              <Card className="bg-secondary/10 border border-secondary/20 p-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span>We provide no investment recommendations or financial advice of any kind.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span>No aspect of the platform — including bids, auctions, or outbid reward mechanisms — constitutes a promise of profit, return, or value appreciation.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span>Past results are not indicative of future performance.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span>NFTs offered on the platform are not intended to be securities or investment contracts.</span>
                  </li>
                </ul>
              </Card>

              <p className="text-destructive font-semibold mt-4">
                You should consult qualified professionals in your jurisdiction before making any decisions involving value or risk.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 3: Intellectual Property Rights */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">3.</span>
              <span>Intellectual Property Rights</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Purchasing an NFT grants only a limited, non-exclusive, non-transferable license to display the associated digital asset for personal, non-commercial use, unless the creator explicitly states otherwise.
              </p>
              <p>
                We make no representations or warranties regarding ownership, authenticity, or non-infringement of underlying intellectual property. You are responsible for ensuring that your actions do not violate third-party rights.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 4: Auction Risks & Outbid Rewards */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">4.</span>
              <span>Auction Risks & Outbid Rewards</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Certain auctions may include automated outbid rewards of up to 10% of a bid amount, executed solely by smart contracts.
              </p>
              
              <Card className="bg-primary/10 border border-primary/20 p-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Rewards are not guaranteed and depend entirely on auction conditions and smart contract execution.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>We have no control over or ability to intervene in reward calculations or payouts.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Smart contracts may contain bugs or behave unexpectedly.</span>
                  </li>
                </ul>
              </Card>

              <p className="text-destructive font-semibold mt-4">
                All auction participation is at your own risk.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 5: Competitive Bidding Warning */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">5.</span>
              <span>Competitive Bidding Warning</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Competitive auction mechanics may encourage repeated or impulsive bidding. You acknowledge the potential for excessive use to affect your finances or well-being.
              </p>
              <p>
                We are not responsible for any losses resulting from overuse. Please participate responsibly and seek help if needed.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 6: Market Volatility & Asset Risk */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">6.</span>
              <span>Market Volatility & Asset Risk</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                NFT values are highly volatile and may be affected by factors entirely outside our control. NFTs can become illiquid, lose substantial value, or become worthless.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 7: Blockchain & Technical Risks */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">7.</span>
              <span>Blockchain & Technical Risks</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>By using the platform, you accept inherent risks of blockchain technology, including:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Smart contract vulnerabilities or exploits</li>
                <li>Network congestion, failures, forks, or upgrades</li>
                <li>Irreversible transactions</li>
                <li>Public and permanent on-chain data</li>
              </ul>
              <p className="mt-3">
                The platform is provided "as is" with no guarantee of availability or error-free operation.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 8: Wallet & Security Responsibility */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">8.</span>
              <span>Wallet & Security Responsibility</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                You are solely responsible for securing your wallet, private keys, and seed phrases. Always verify transaction details before confirming.
              </p>
              <p className="text-primary font-semibold">
                We never have access to your private keys and cannot recover lost or stolen assets.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 9: Third-Party Services */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">9.</span>
              <span>Third-Party Services</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                The platform may connect to or display third-party services (wallets, block explorers, etc.). We do not control and are not responsible for their functionality, security, or availability.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 10: Tax and Regulatory Compliance */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">10.</span>
              <span>Tax and Regulatory Compliance</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                You are solely responsible for determining and complying with all laws, regulations, and tax obligations that apply to you in your jurisdiction, including any reporting requirements related to NFT transactions.
              </p>
              <p>
                Laws regarding digital assets vary widely and are evolving. Access or use from jurisdictions where such activity is restricted or illegal is prohibited.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 11: No Guarantees or Warranties */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">11.</span>
              <span>No Guarantees or Warranties</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                The platform is provided strictly "as is" and "as available." To the maximum extent permitted by applicable law, we disclaim all warranties of any kind, whether express or implied.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 12: Limitation of Liability */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">12.</span>
              <span>Limitation of Liability</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                To the fullest extent permitted by applicable law, we, our developers, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform.
              </p>
              <p>
                Your sole remedy for any dissatisfaction is to cease using the platform.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 13: Dispute Resolution */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">13.</span>
              <span>Dispute Resolution</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Any disputes arising from or relating to your use of the platform shall be resolved in accordance with the laws of your jurisdiction, to the extent required by mandatory local law.
              </p>
              <p>
                Where permissible, we encourage informal resolution through direct communication. You may contact us at the email address below.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Section 14: Changes to This Disclaimer */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">14.</span>
              <span>Changes to This Disclaimer</span>
            </h2>
            <div className="pl-8 space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We may update this Disclaimer from time to time. Material changes will be announced on the platform. Your continued use after any changes indicates acceptance of the updated terms.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>

          {/* Section 15: Contact Information */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-foreground flex items-center space-x-3">
              <span className="text-secondary">15.</span>
              <span>Contact Information</span>
            </h2>
            <div className="pl-8 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding this Disclaimer:
              </p>
              <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">The Overmind Gallery Team</p>
                    <a 
                      href="mailto:legal@overmind.gallery" 
                      className="text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      legal@overmind.gallery
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Final Notice */}
          <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/30 p-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30">
                <FileWarning className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-2 text-lg">Final Notice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Participation in NFT auctions carries substantial risk. Only use funds you can afford to lose completely. You assume full responsibility for your actions on the platform.
                </p>
              </div>
            </div>
          </Card>

          {/* Effective Date */}
          <div className="text-center pt-8">
            <p className="text-muted-foreground text-sm">
              Effective Date: January 02, 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}