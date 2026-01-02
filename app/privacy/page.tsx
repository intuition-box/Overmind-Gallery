"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Database, Eye, FileText, Mail } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function PrivacyPage() {
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
          <Shield className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-violet-400/20 animate-pulse delay-1000">
          <Lock className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 text-cyan-400/10 animate-pulse delay-2000">
          <Database className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-violet-400/15 animate-pulse delay-3000">
          <Eye className="w-full h-full" />
        </div>
      </div>

      {/* Hero Section */}
      <header className="text-center relative z-10 py-16">
        <div className="container mx-auto px-6">
          {/* Central Shield Symbol */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-cyan-400/30 flex items-center justify-center">
                <Shield className="w-12 h-12 text-cyan-400" />
              </div>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="font-playfair text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6 md:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed font-mono text-lg">
            How Overmind Gallery collects, uses, and protects information in a decentralized environment.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16 relative z-10 max-w-4xl">
        <div className="space-y-12">
          {/* Blockchain Notice Callout */}
          <Card className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                <Database className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2 text-lg">Blockchain Transparency</h3>
                <p className="text-gray-300 leading-relaxed">
                  Blockchain transactions are public, immutable, and not controlled by Overmind Gallery. All wallet addresses, transaction hashes, and on-chain activity are permanently recorded on the Intuition Network.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 1: Introduction */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">1.</span>
              <span>Introduction</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Overmind Gallery ("Overmind," "we," "us," or "our") operates a blockchain-based NFT marketplace built on the Intuition Network (the "Platform"). Overmind Gallery enables users to auction NFTs, place bids, and participate in a reward mechanism where outbid participants may earn up to 10% of their bid amount, subject to smart contract rules.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard information when you access or use the Platform. By using Overmind Gallery, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 2: Scope */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">2.</span>
              <span>Scope of This Policy</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>This Privacy Policy applies to:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>The Overmind Gallery website and interface</li>
                <li>Smart contract interactions facilitated by the Platform</li>
                <li>Any related services, features, or communications</li>
              </ul>
              <p>
                This policy does <span className="text-violet-400 font-semibold">not</span> apply to third-party services, wallets, or blockchain explorers that you may use in connection with Overmind Gallery.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 3: Information We Collect */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">3.</span>
              <span>Information We Collect</span>
            </h2>
            
            <div className="pl-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">3.1 Information You Provide Directly</h3>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>
                    We do <span className="text-violet-400 font-semibold">not</span> require users to create traditional accounts. However, you may voluntarily provide:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Communications sent to us (support requests, feedback, inquiries)</li>
                    <li>Optional profile or display information (if enabled in future versions)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">3.2 Blockchain Information (Public by Nature)</h3>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>When you interact with the Platform, the following information may be processed:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Public wallet address</li>
                    <li>Transaction hashes</li>
                    <li>NFT metadata and ownership records</li>
                    <li>Bid amounts and auction activity</li>
                  </ul>
                  <p className="text-cyan-400 font-semibold mt-3">
                    Important: Blockchain data is public, immutable, and not controlled by Overmind Gallery.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">3.3 Automatically Collected Information</h3>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>We may collect limited technical data to improve the Platform, such as:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>IP address (may be anonymized or truncated)</li>
                    <li>Browser type and device information</li>
                    <li>Usage analytics (pages visited, interactions)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 4: How We Use Information */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">4.</span>
              <span>How We Use Information</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>We use collected information to:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Facilitate NFT auctions and bidding mechanics</li>
                <li>Display auction activity and results transparently</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Improve user experience and platform performance</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
              <p className="text-cyan-400 font-semibold mt-4">
                We do not sell personal data.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 5: Outbid Rewards & Smart Contracts */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">5.</span>
              <span>Outbid Rewards & Smart Contracts</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                The outbid reward mechanism (up to 10%) is executed via smart contracts deployed on the Intuition Network.
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Rewards are determined solely by smart contract logic</li>
                <li>Overmind Gallery does not manually control payouts</li>
                <li>All calculations and transactions are transparent and verifiable on-chain</li>
              </ul>
              <p className="text-violet-400 font-semibold mt-3">
                Users are responsible for understanding smart contract risks before participating.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 6: Cookies & Tracking */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">6.</span>
              <span>Cookies & Tracking Technologies</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>Overmind Gallery may use minimal cookies or similar technologies for:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Essential site functionality</li>
                <li>Analytics and performance monitoring</li>
              </ul>
              <p>You can control cookies through your browser settings.</p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 7: Data Sharing & Disclosure */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">7.</span>
              <span>Data Sharing & Disclosure</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>We may share information only in the following circumstances:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>To comply with applicable laws, regulations, or legal requests</li>
                <li>To protect the rights, safety, and integrity of Overmind Gallery or users</li>
                <li>With service providers that assist in platform operations (under confidentiality obligations)</li>
              </ul>
              <p className="text-cyan-400 font-semibold mt-3">
                We do not share private user data for advertising purposes.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 8: Data Security */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">8.</span>
              <span>Data Security</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                We implement reasonable administrative, technical, and organizational measures to protect information.
              </p>
              <p>However, you acknowledge that:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Blockchain transactions are irreversible</li>
                <li>No system is completely secure</li>
                <li>You are responsible for securing your wallet and private keys</li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 9: Data Retention */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">9.</span>
              <span>Data Retention</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Off-chain data is retained only as long as necessary for operational or legal purposes</li>
                <li>On-chain data is permanent and cannot be modified or deleted</li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 10: International Users */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">10.</span>
              <span>International Users</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Overmind Gallery is accessible globally. By using the Platform, you understand that data may be processed in jurisdictions with different data protection standards.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 11: Children's Privacy */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">11.</span>
              <span>Children's Privacy</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                Overmind Gallery is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 12: Your Rights */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">12.</span>
              <span>Your Rights</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>Depending on your jurisdiction, you may have rights to:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Request access to personal data</li>
                <li>Request correction or deletion of off-chain data</li>
                <li>Object to certain data processing activities</li>
              </ul>
              <p>Requests can be submitted via the contact details below.</p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

          {/* Section 13: Changes to This Policy */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">13.</span>
              <span>Changes to This Privacy Policy</span>
            </h2>
            <div className="pl-8 space-y-3 text-gray-300 leading-relaxed">
              <p>
                We may update this Privacy Policy periodically. Updates will be reflected by a revised effective date. Continued use of the Platform constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>

          {/* Section 14: Contact Information */}
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-bold text-card-foreground flex items-center space-x-3">
              <span className="text-violet-400">14.</span>
              <span>Contact Information</span>
            </h2>
            <div className="pl-8 space-y-4">
              <p className="text-gray-300 leading-relaxed">
                For questions or concerns regarding this Privacy Policy, contact:
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

          {/* Disclaimer */}
          <Card className="bg-black/30 backdrop-blur-md border-border/30 p-6 mt-12">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="font-semibold">Disclaimer:</span> This Privacy Policy is provided for transparency and informational purposes and does not constitute legal advice.
              </p>
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