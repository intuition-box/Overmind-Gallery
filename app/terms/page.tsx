"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Shield, Lock, UserCheck, Gavel, Scale, AlertCircle, Mail } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function TermsPage() {
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
          <FileText className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-violet-400/20 animate-pulse delay-1000">
          <Scale className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-cyan-400/10 animate-pulse delay-2000">
          <Gavel className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-violet-400/15 animate-pulse delay-3000">
          <Shield className="w-full h-full" />
        </div>
      </div>

      {/* Hero Section */}
      <header className="text-center relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Central Document Symbol */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-violet-400/30 flex items-center justify-center">
                <FileText className="w-12 h-12 text-violet-400" />
              </div>
              <div className="absolute inset-0 bg-violet-400/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6 md:text-6xl">
            Terms of Service
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed font-mono text-lg">
            The legal framework governing your use of Overmind Gallery and participation in blockchain-based NFT auctions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16 relative z-10 max-w-4xl">
        <div className="space-y-12">
          {/* Agreement Notice Callout */}
          <Card className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/30 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 border border-violet-400/30">
                <UserCheck className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="font-semibold text-violet-400 mb-2 text-lg">Binding Agreement</h3>
                <p className="text-gray-300 leading-relaxed">
                  By accessing, browsing, connecting a wallet to, or otherwise using the Platform, you affirm that you are at least 18 years old (or the age of majority in your jurisdiction), have full legal capacity, and affirmatively agree to be bound by these Terms of Service, together with our Privacy Policy and Disclaimer. If you do not agree, you must immediately cease all use of the Platform.
                </p>
              </div>
            </div>
          </Card>

          {/* Introduction */}
          <div className="space-y-4">
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Overmind Gallery ("Overmind," "the Platform," "we," "us," or "our") is a decentralized, blockchain-based NFT auction marketplace operating on the Intuition Network. The Platform facilitates peer-to-peer interactions via smart contracts and does not provide custodial, brokerage, or financial services.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 1: Platform Nature */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">1.</span>
              <span>Platform Nature</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The Platform is a non-custodial, decentralized application interfacing with blockchain smart contracts. It is currently developed and maintained by a startup team without a formally registered legal entity in any jurisdiction.
              </p>
              <p>
                Nothing in these Terms creates a partnership, agency, joint venture, fiduciary, or employment relationship.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 2: Eligibility */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">2.</span>
              <span>Eligibility</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>You represent and warrant that:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>You are at least 18 years old or the age of majority in your jurisdiction.</li>
                <li>You have full legal capacity to enter binding agreements.</li>
                <li>You are not located in, or a resident of, any sanctioned jurisdiction or prohibited under applicable laws from using the Platform.</li>
                <li>You are not using the Platform for any unlawful purpose.</li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 3: Wallet Connection and User Responsibility */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">3.</span>
              <span>Wallet Connection and User Responsibility</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Interaction requires connecting a compatible blockchain wallet. You are solely responsible for:
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Securing your wallet, private keys, seed phrases, and credentials.</li>
                <li>Verifying all transaction details before confirmation.</li>
              </ul>
              <p className="text-cyan-400 font-semibold">
                Overmind never has access to your private keys and cannot reverse, cancel, recover funds, or assist with lost assets.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 4: User Profiles */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">4.</span>
              <span>User Profiles</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                You may optionally create a profile (profile picture, display name, biography). No KYC or identity verification is required.
              </p>
              <p>
                You warrant that your profile content is lawful, non-infringing, and does not violate third-party rights. You indemnify Overmind against claims arising from your profile content.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 5: NFTs, Listings, and Content */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">5.</span>
              <span>NFTs, Listings, and Content</span>
            </h2>
            
            <div className="pl-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">5.1 Creator Warranties</h3>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>Creators listing NFTs represent and warrant that they:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Own or possess all necessary rights to mint, list, and transfer the NFTs.</li>
                    <li>Do not infringe third-party intellectual property, privacy, or other rights.</li>
                    <li>Comply with all applicable laws.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">5.2 Buyer License</h3>
                <div className="text-gray-300 leading-relaxed">
                  <p>
                    Purchase of an NFT grants only a limited, non-exclusive, non-transferable (except with the NFT), royalty-free license for personal, non-commercial display and use of the associated digital asset, unless the creator explicitly grants broader rights. No additional intellectual property rights are transferred.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">5.3 Platform Role</h3>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>Overmind:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Does not own, curate, verify, or endorse listed NFTs.</li>
                    <li>Makes no representations regarding authenticity, legality, originality, metadata permanence, or value.</li>
                    <li>Bears no responsibility for NFT content or associated rights.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 6: Auctions and Bidding */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">6.</span>
              <span>Auctions and Bidding</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Auctions are governed exclusively by on-chain smart contracts. Once live:
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Auctions cannot be canceled or modified.</li>
                <li>NFT metadata cannot be altered.</li>
              </ul>
              <p>
                All bids are final, irreversible, and executed on-chain. You are responsible for reviewing gas fees, transaction details, and auction terms before bidding.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 7: Outbid Rewards */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">7.</span>
              <span>Outbid Rewards</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Certain auctions may include an automated incentive where outbid users receive up to 10% of their bid amount via smart contract logic. You acknowledge:
              </p>
              
              <Card className="bg-violet-500/10 border border-violet-400/20 p-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>Rewards are not guaranteed and depend entirely on auction conditions and smart contract execution.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>Rewards are incentives only—not interest, yield, profit, or investment return.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    <span>Overmind has no control, discretion, or ability to intervene in calculations or payouts.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 8: Fees and Royalties */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">8.</span>
              <span>Fees and Royalties</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Transactions may incur marketplace fees, creator royalties, protocol fees, or network gas costs, disclosed via the Platform interface or smart contracts at the time of interaction.
              </p>
              <p>
                We reserve the right to introduce, modify, or adjust fees with notice via the Platform.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 9: Prohibited Conduct */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">9.</span>
              <span>Prohibited Conduct</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>You agree not to:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Engage in wash trading, market manipulation, front-running, or fraudulent activity.</li>
                <li>Use bots, scripts, or automation to abuse the Platform.</li>
                <li>Exploit bugs, vulnerabilities, or UI inconsistencies.</li>
                <li>Attempt to circumvent fees, restrictions, or safeguards.</li>
                <li>Violate any applicable laws or third-party rights.</li>
                <li>Upload harmful code, malware, or disruptive content.</li>
              </ul>
              <p>
                We may restrict frontend access, hide content, or take other measures to enforce these rules without affecting on-chain state.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 10: Platform Modifications and Rights */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">10.</span>
              <span>Platform Modifications and Rights</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>We reserve the right to:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Modify, pause, or discontinue features (including future reputation systems, social features, or auction mechanics).</li>
                <li>Restrict or block frontend access to wallets or content for security, compliance, or integrity reasons.</li>
                <li>Update the Platform or smart contracts (subject to blockchain governance, if applicable).</li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 11: No Advice */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">11.</span>
              <span>No Advice</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Nothing on the Platform constitutes financial, investment, legal, tax, or professional advice. You are solely responsible for your decisions and compliance with laws.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 12: Third-Party Services */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">12.</span>
              <span>Third-Party Services</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The Platform may integrate or link to third-party services (wallets, explorers, oracles, etc.). We do not control, endorse, or assume responsibility for their availability, security, accuracy, or practices.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 13: Disclaimers of Warranties */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">13.</span>
              <span>Disclaimers of Warranties</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The Platform is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, title, non-infringement, security, or uptime.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 14: Limitation of Liability and Indemnification */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">14.</span>
              <span>Limitation of Liability and Indemnification</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                To the fullest extent permitted by applicable law (excluding liability for gross negligence, willful misconduct, or mandatory consumer protections), Overmind, its developers, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages, including loss of funds, digital assets, profits, data, or opportunities, arising from Platform use—even if advised of the possibility.
              </p>
              <p>
                Your sole remedy for dissatisfaction is to discontinue use. You agree to indemnify and hold harmless Overmind and its contributors from claims, losses, or liabilities arising from your use, content, or breach of these Terms.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 15: Regulatory Compliance */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">15.</span>
              <span>Regulatory Compliance</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                You are solely responsible for compliance with all laws applicable to your use, including tax reporting, anti-money laundering, and sanctions.
              </p>
              <p>
                We may implement compliance measures (e.g., blocking access from certain regions) and suspend interactions if required by law.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 16: Governing Law and Dispute Resolution */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">16.</span>
              <span>Governing Law and Dispute Resolution</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                These Terms shall be governed by the laws of the British Virgin Islands (BVI), without regard to conflict-of-law principles.
              </p>
              <p>
                Any dispute arising from these Terms or Platform use shall be resolved exclusively through binding arbitration in the BVI under the rules of the BVI International Arbitration Centre. No class actions or representative proceedings are permitted.
              </p>
              <p>
                If arbitration is unenforceable in your jurisdiction, disputes shall be resolved in BVI courts.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 17: Changes to Terms */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">17.</span>
              <span>Changes to Terms</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                We may update these Terms at any time. Material changes will be announced via the Platform or associated communication channels. Continued use after 30 days constitutes acceptance of the revised Terms.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 18: Severability and Entire Agreement */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">18.</span>
              <span>Severability and Entire Agreement</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                If any provision is held invalid, the remainder shall continue in full force. These Terms, together with the Privacy Policy and Disclaimer, constitute the entire agreement between you and Overmind.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 19: Contact Information */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">19.</span>
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
                    <p className="font-semibold text-card-foreground mb-1">Overmind Gallery Legal Team</p>
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
          <Card className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-cyan-400/30 p-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <AlertCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2 text-lg">Final Notice</h3>
                <p className="text-gray-300 leading-relaxed">
                  Participation in Overmind Gallery involves significant financial, technical, regulatory, and emotional risks. Use only funds you can afford to lose entirely. You assume full responsibility for all actions taken on the Platform.
                </p>
              </div>
            </div>
          </Card>

          {/* Effective Date */}
          <div className="text-center pt-8">
            <p className="text-gray-400 text-sm">
              Effective Date: January 2, 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}