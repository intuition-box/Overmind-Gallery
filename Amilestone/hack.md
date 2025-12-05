# Overmind Gallery Grant Application Template

## **1. Applicant & Project Overview**

### **Required**

- **Project Name**: **The Overmind Gallery**

- **Team / Individual Name(s)** Wolfgang, Paarroo, Zet, Paul,

- **Links**
  Github: https://github.com/intuition-box/Overmind-Gallery.git
  Prototype UI: https://overmind-gallery.intuition.box

- **100-Word Summary**
  The Overmind Gallery is a next-generation NFT marketplace built entirely on a Bid-To-Earn auction model. Instead of traditional fixed-price listings, every NFT is sold through incentive-driven auctions where outbid participants earn up to 10% of their bid. This unlocks liquidity, increases marketplace activity, and encourages discovery while ensuring creators achieve real price discovery. Overmind integrates with Intuition to enable follower curves for creators and the use of $TRUST in auction settlement and incentives. The platform aims to become the leading NFT Marketplace experience within the Intuition ecosystem.

- **Project Category**
  - Consumer App
  - Bid-to-Earn NFT Auction Marketplace

### **Optional**

- Elevator Pitch
  An NFT marketplace where you earn even when you lose.
  The Overmind Gallery transforms NFT collecting with auctions that reward participation, not just winners.

- Origin story
  This project began after observing how static and unengaging traditional NFT marketplaces had become — you simply buy and leave. There’s little excitement, and many pieces are instantly minted out, sometimes by bots, leaving real collectors behind. The Overmind Gallery introduces a model where every participant has a fair chance. Even if you don’t end up with the winning bid, you still earn a percentage of your outbid offers, turning the entire experience into something rewarding, dynamic, and inclusive.

---

## **2. What You’re Building**

### **Required**

- **Problem Statement**
  NFT marketplaces today suffer from low liquidity, poor engagement, and inaccurate pricing. Fixed-price listings often stagnate, and users have little incentive to participate unless they intend to buy. Creators struggle with visibility, and bidders rarely return after a loss. The result: low activity and weak community retention.

- **Proposed Solution**
  The Overmind Gallery replaces fixed-price sales with Bid-to-Earn auctions, where every bidder is rewarded for participating. This encourages continuous bidding, drives discovery, and grows liquidity. Integrating Intuition primitives allows users to follow creators through the bonding curve and use $TRUST in auctions — increasing activity and network value.

- **Stage of Development:** Prototype (UI built, in communications with GBMauctions for auction/bidding engine)

### **Optional**

- Technical architecture overview
  The Overmind Gallery intends to integrate GBM Auctions' proven auction engine. GBMauctions has generated over $200 million in total on-chain bidding volume as of late 2025.
  The goal is to keep GBMauctions' auctioning model for core auction logic while adding Overmind-specific features like TRUST integration, outbid reward orchestration, creator following. etc

      * Frontend (consumer app): Next.js, wallet connection (MetaMask, WalletConnect); auction browsing, bid UX,
      * GBMauctions Engine: GBMauctions’ audited smart contracts and backend will power bid ordering, price discovery, and final settlement. The Overmind gallery calls these contracts rather than re-implementing core auction mechanics.

- Integrations or dependencies (MCP, A2A, ERC-8004, x402, etc.)
  - ERC-721 — NFTs supported by the marketplace.
  - ERC-20 — $TRUST token for bids, rewards, and payouts.

- Security considerations
  - The Overmind Gallery intends to rely on GBM’s audited logic for auction-critical paths. We are avoiding re-implementing core auction logic to minimize risk.
  - Access control and using battle-tested libraries.

---

## **3. Team & Execution Ability**

### **Required**

- **Team backgrounds**

- **Execution proof** (past products, repos, shipped work)

- **Commitment level** (full time)

### **Optional**

- **Team structure and roles**
  **Wolfgang:** UI/UX Developer
  **Paarroo:** Backend Developer

- **Advisors & collaborators**
  **Zet:** Advisor
  **Saulo:** Advisor
  **Paul:** Collaborator
  **GBMauctions:** Collaborator

- Expected future hiring

- Prior crypto / AI experience relevant to the project

---

## **4. Grant Request & Milestones**

### **Required**

- **Amount requested**: **$11,000**

Budget breakdown by milestones\*\*

- **Milestone 1 — Core Development (Month 1)**

**Budget: $8,000**
**Allocated to:**
Team members (smart contracts, Backend + Frontend)
2 months of full-time development

- **Milestone 2 — Final Refinements, Community Engagement, and Feedback (Month 2)**
  **Budget: $3,000**
  Allocated to: Treasury (For communtiy engagement incentives, communtiy management, marketing and campaigns)

- **Expected Timeline milestones you will deliver**

**Month 1**

- Begin technical onboarding with GBMauctions to access and prepare their smart contract and backend system for integration into The Overmind Gallery.

- Implement Bid-to-Earn reward logic (outbid incentives up to 10%)

- Integrate $TRUST token into bidding flow

- Finalize the Overmind Gallery auction UI

**Month 2**

- Deploy first version to testnet for internal testing

- Connect creator profiles to Intuition Portal

- Indexer Deployment

- Set up QA Environment

- Conduct closed test auctions with early testers

- Fix bugs and optimize auction flow

- Onboard initial creators and prepare launch campaign

- Finalize launch configuration for the first real auction

- **Success criteria for each milestone**
  - Milestone 1: Milestone 1 is successful when the core auction smart contracts, Bid-to-Earn logic, $TRUST token integration, and fully functional UI are completed, tested, and deployed on a development network.

  - Milestone 2 is successful when the system is deployed to testnet, creator profiles are integrated to the intuition portal, closed test auctions run smoothly, key bugs are resolved, and the platform is fully prepared for the first live auction.

### **Optional**

- Stretch goals

- Key dependencies

- Risk assessment

- **How this work compounds value for the network**
  The Overmind Gallery is built on the principle of incentivized participation, which naturally drives strong community engagement. Because bidders earn rewards even when they are outbid, users are encouraged to stay active and return frequently. This sustained activity compounds value for the Intuition Network by increasing user retention and on-chain interaction volume by extension pique thier interest in the technicalities of the Intuition Network.
  Also, the use of $TRUST as the bidding currency increases on-chain economic activity and keeps the $TRUST token actively circulating within the ecosystem. Over time, more creators, collectors, and communities integrate with Intuition primitives through The Overmind Gallery.

---

## **5. Intuition Ecosystem Alignment**

### **Required**

- **Why Intuition** (How you use the graph, registry, attestations, InfoFi, MCP, or AI context)

- **Which Intuition primitives you use** (Atoms, triples, signal, DID / agent registry, knowledge graph, InfoFi, MCP, AI context, etc.)

1. DID / Agent Registry
   The Decentralized Identifier (DID) / Agent Registry — users can follow creators directly in-gallery

2. $TRUST — Native currency to be used in The Overmind Gallery

- **Why it must be built on Intuition**

### **Optional**

- Data structure plan (atoms, triples, signal, schemas)

- **How do you plan to integrate TRUST, the native currency of Intuition Network**

$TRUST will be fully integrated as the bidding and reward currency within The Overmind Gallery. Every auction will require users to place bids in $TRUST, creating a direct on-chain utility for the token. When users are outbid, they automatically receive a percentage of their bid back in TRUST as a reward, incentivizing participation and repeated engagement.

Additionally, $TRUST will be used for:

- **Creator payouts:** Royalties will be paid to creators in $TRUST.

- **Marketplace transactions and rewards:** All economic activity and platform fees, will flow in $TRUST.

- **New schemas, patterns, or agent types you might introduce**

- How this increases network activity or knowledge density

---

## **6. Sustainability & Long-Term Vision**

### **Required**

- **Long-term vision (6–24 months)**
  Over 12–24 months, The Overmind Gallery becomes a primary hub of NFT discovery within Intuition Network — driving TRUST velocity, and community engagement.

- **Post-grant sustainability plan**
  The Overmind Gallery will sustain operations through a dynamic, volume-based marketplace fee model.
  This structure ensures higher fees only at early stages and naturally decreases as platform volume grows, making the marketplace increasingly creator and collector friendly over time.

**Fee Structure**

- <$100K volume:
  15% Overmind Gallery platform fee + GBM fees

- $100K – $500K volume:
  7% Overmind platform fee + GBM fees

- $500K – $1M volume:
  5% Overmind platform fee + GBM fees

- $1M – $10M volume:
  2% Overmind platform fee + GBM fees

- Above $100M volume:
  1% Overmind platform fee + GBM fees

### **Optional**

- Business or revenue model
  The Overmind Gallery operates on a standard marketplace fee structure, earning a maximum 15% commission on each successful NFT auction

- Go-to-market or distribution strategy
  - Creator onboarding campaigns
  - Community incentivised quests and tasks

- Competitive landscape
  - OpenSea, MagicEden — but none offer a marketplace built entirely on a Bid-to-Earn model

---

## **7. Additional Materials**

### **Required**

- Demo link, repo, or screenshots
  ![Screenshot (59)](https://hackmd.io/_uploads/SyRnXoRbbg.png)
  ![Screenshot (64)](https://hackmd.io/_uploads/r1cxXYkGbl.png)
  ![Screenshot (61)](https://hackmd.io/_uploads/B1KGNoRWZg.png)
  ![Screenshot (62)](https://hackmd.io/_uploads/r1u4Ns0bbg.png)
  ![Screenshot (63)](https://hackmd.io/_uploads/rJPgFb1GWg.png)

- Contact email + wallet address
  **email:** amadivictor1126@gmail.com
  **wallet address:** 0x9E9BAE867391eF072a14879D8BCBE08F43339E71

### **Optional**

- Loom walkthrough

- UX flows or mockups

- Product specs (if any)

- Any additional supporting material

---

## **8. Applicant Attestation**

I confirm that all information submitted is accurate and that I intend to deliver the listed milestones.

**Name:** Wolfgang, Paarroo

**Wallet Address:** 0x9E9BAE867391eF072a14879D8BCBE08F43339E71

**Date:** 4th December, 2025
