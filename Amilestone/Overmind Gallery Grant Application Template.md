---
title: Overmind Gallery Grant Application Template



---

# Overmind Gallery Grant Application Template

## **1. Applicant & Project Overview**

### **Required**

* **Project Name**: **The Overmind Gallery**

* **Team / Individual Name(s)** Wolfgang, Paarroo, Zet, Saulo,

* **Links**
  Github: https://github.com/intuition-box/Overmind-Gallery.git
  Prototype UI: https://overmind-gallery.intuition.box

* **100-Word Summary**
  The Overmind Gallery is a next-generation NFT marketplace built entirely on a Bid-To-Earn auction model. Instead of traditional fixed-price listings, every NFT is sold through incentive-driven auctions where outbid participants earn up to 10% of their bid. This unlocks liquidity, increases marketplace activity, and encourages discovery while ensuring creators achieve real price discovery. Overmind integrates with Intuition to enable follower curves for creators and the use of $TRUST in auction settlement and incentives. The platform aims to become the leading NFT Marketplace experience within the Intuition ecosystem.

* **Project Category**

  * Consumer App
  * Bid-to-Earn NFT Auction Marketplace

### **Optional**

* Elevator Pitch
  An NFT marketplace where you earn even when you lose.
  The Overmind Gallery transforms NFT collecting with auctions that reward participation, not just winners.

* Origin story
  This project began after observing how static and unengaging traditional NFT marketplaces had become — you simply buy and leave. There's little excitement, and many pieces are instantly minted out, sometimes by bots, leaving real collectors behind. The Overmind Gallery introduces a model where every participant has a fair chance. Even if you don't end up with the winning bid, you still earn a percentage of your outbid offers, turning the entire experience into something rewarding, dynamic, and inclusive.

---

## **2. What You're Building**

### **Required**

* **Problem Statement**
  NFT marketplaces today suffer from low liquidity, poor engagement, and inaccurate pricing. Fixed-price listings often stagnate, and users have little incentive to participate unless they intend to buy. Creators struggle with visibility, and bidders rarely return after a loss. The result: low activity and weak community retention.

* **Proposed Solution**
  The Overmind Gallery replaces fixed-price sales with Bid-to-Earn auctions, where every bidder is rewarded for participating. This encourages continuous bidding, drives discovery, and grows liquidity. Integrating Intuition primitives allows users to follow creators through the bonding curve and use $TRUST in auctions — increasing activity and network value.

* **Stage of Development:** Prototype (UI built, in communications with GBMauctions for auction/bidding engine model)

### **Optional**

* Technical architecture overview
  The Overmind Gallery intends to integrate GBM Auctions' proven auction engine. GBMauctions has generated over $200 million in total on-chain bidding volume as of late 2025.
  The goal is to keep GBMauctions' auctioning model for core auction logic while adding Overmind-specific features like TRUST integration, outbid reward orchestration, creator following. etc

    * Frontend (consumer app): Next.js, wallet connection (MetaMask, WalletConnect); auction browsing, bid UX,
    * GBMauctions Engine: GBMauctions' audited smart contracts and backend will power bid ordering, price discovery, and final settlement. The Overmind gallery calls these contracts rather than re-implementing core auction mechanics.

* Integrations or dependencies (MCP, A2A, ERC-8004, x402, etc.)
  *    ERC-721 — NFTs supported by the marketplace.
  *    ERC-20 — $TRUST token for bids, rewards, and payouts.

<span style="color: green; font-weight: bold;">* **Auction Economics & Gameability Mitigation**</span>
<span style="color: green; font-weight: bold;">**Reward Calculation (10% max):**</span>
<span style="color: green; font-weight: bold;">```</span>
<span style="color: green; font-weight: bold;">R = min(10%, r × B_new) where r = (B_new - B_prev) / B_prev</span>
<span style="color: green; font-weight: bold;">```</span>
<span style="color: green; font-weight: bold;">- Reward proportional to relative increase</span>
<span style="color: green; font-weight: bold;">- 10% cap to prevent excessive farming</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Gameability Protection:**</span>
<span style="color: green; font-weight: bold;">- **Wash Trading**: Different DID verification, bid limits per hour</span>
<span style="color: green; font-weight: bold;">- **Sybil Attacks**: Reputation based on minimum TRUST staking</span>
<span style="color: green; font-weight: bold;">- **Farming**: Rewards decrease with monthly volume</span>

<span style="color: green; font-weight: bold;">- **Cooldowns or other kind of protection mecanisme against farming bots ** found a souluce to avoir bot , moneys addiction gambling and at the same time to not frustrate peoples whos want to bid more …… </span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Economic Balance:**</span>
<span style="color: green; font-weight: bold;">- Testnet volume → measure real farming rate</span>
<span style="color: green; font-weight: bold;">- Parameter adjustment based on real data</span>

<span style="color: orange;">* Security considerations

   *    The Overmind Gallery intends to rely on GBM's audited logic for auction-critical paths. We are avoiding re-implementing core auction logic to minimize risk.
   *    Access  control and using battle-tested libraries.</span>

<span style="color: green; font-weight: bold;">* **Security Considerations**</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Security Architecture:**</span>
<span style="color: green; font-weight: bold;">- **GBM Integration**: Use of audited GBM contracts for core logic</span>
<span style="color: green; font-weight: bold;">- **Overmind Contracts**:</span>
<span style="color: green; font-weight: bold;">  - ReentrancyGuard on all transfers</span>
<span style="color: green; font-weight: bold;">  - Access control via Ownable + multi-sig</span>
<span style="color: green; font-weight: bold;">  - Emergency pause functionality</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Audit Plan:**</span>
<span style="color: green; font-weight: bold;">- Audit GBM contracts (already audited)</span>
<span style="color: green; font-weight: bold;">- Audit Overmind-specific logic (rewards, TRUST integration)</span>
<span style="color: green; font-weight: bold;">- Bug bounty pre-launch</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Identified Risks:**</span>
<span style="color: green; font-weight: bold;">- **Flash Loans**: Protection via timelocks on critical bids</span>
<span style="color: green; font-weight: bold;">- **Front-running**: Use commit-reveal scheme for large bids</span>
<span style="color: green; font-weight: bold;">- **TRUST Volatility**: Stable USD prices via oracles</span>

---

## **3. Team & Execution Ability**

### **Required**

* **Team backgrounds**

* **Execution proof** (past products, repos, shipped work)

* **Commitment level** (full time)

### **Optional**

* **Team structure and roles**
  **Wolfgang:** UI/UX Developer
  **Paarroo:** Backend Developer

* **Advisors & collaborators**
  **Zet:** Advisor
  **Saulo:** Advisor
  **Paul:** Collaborator
  **GBMauctions:** Collaborator

* Expected future hiring

* Prior crypto / AI experience relevant to the project

---

## **4. Grant Request & Milestones**

### **Required**

<span style="color: green; font-weight: bold;">* **Amount requested**: **$11,000**</span>



<span style="color: green; font-weight: bold;">**Budget Breakdown:**</span>
<span style="color: green; font-weight: bold;">* **Milestone 1 - Core Development (8 weeks)**: $8,000</span>
<span style="color: green; font-weight: bold;">  - Team compensation (2 developers × $2,000 each): $4,000</span>
<span style="color: green; font-weight: bold;">  - GBM integration + security: $2,000</span>
<span style="color: green; font-weight: bold;">  - UI/UX refinements: $1,500</span>
<span style="color: green; font-weight: bold;">  - Intuition primitives integration: $500</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">* **Milestone 2 - Testing & Launch (4 weeks)**: $3,000</span>
<span style="color: green; font-weight: bold;">  - Testnet deployment + QA: $1,000</span>
<span style="color: green; font-weight: bold;">  - Community testing incentives: $1,000</span>
<span style="color: green; font-weight: bold;">  - Marketing and documentation: $1,000</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">![Budget Breakdown](SCR-20251205-kifs.png)</span>

* **Expected Timeline milestones you will deliver**

**Month 1**

* Begin technical onboarding with GBMauctions to access and prepare their smart contract and backend system for integration into The Overmind Gallery.

* Implement Bid-to-Earn reward logic (outbid incentives up to 10%)

* Integrate $TRUST token into bidding flow

* Finalize the Overmind Gallery auction UI

**Month 2**

* Deploy first version to testnet for internal testing

* Connect creator profiles to Intuition Portal

* Indexer Deployment

* Set up QA Environment

* Conduct closed test auctions with early testers

* Fix bugs and optimize auction flow

* Onboard initial creators and prepare launch campaign

* Finalize launch configuration for the first real auction

* **Success criteria for each milestone**
  * Milestone 1: Milestone 1 is successful when the core auction smart contracts, Bid-to-Earn logic, $TRUST token integration, and fully functional UI are completed, tested, and deployed on a development network.

  * Milestone 2 is successful when the system is deployed to testnet, creator profiles are integrated to the intuition portal, closed test auctions run smoothly, key bugs are resolved, and the platform is fully prepared for the first live auction.


### **Optional**

* Stretch goals

* Key dependencies

* Risk assessment (think about money risk/advises/adictrion etc …)

<span style="color: ;">* **How this work compounds value for the network**
The Overmind Gallery is built on the principle of incentivized participation, which naturally drives strong community engagement. Because bidders earn rewards even when they are outbid, users are encouraged to stay active and return frequently. This sustained activity compounds value for the Intuition Network by increasing user retention and on-chain interaction volume by extension pique thier interest in the technicalities of the Intuition Network.
Also, the use of $TRUST as the bidding currency increases on-chain economic activity and keeps the $TRUST token actively circulating within the ecosystem. Over time, more creators, collectors, and communities integrate with Intuition primitives through The Overmind Gallery.</span>

<span style="color: green; font-weight: bold;">* **Network Value Creation**</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Key Metrics:**</span>
<span style="color: green; font-weight: bold;">- **Activity**: +50% user retention vs traditional marketplaces</span>
<span style="color: green; font-weight: bold;">- **Graph Density**: 1000+ triples/auction (reputation, provenance)</span>
<span style="color: green; font-weight: bold;">- **TRUST Velocity**: $100k+ monthly volume after 3 months</span>
<span style="color: green; font-weight: bold;">- **AI Surface**: Reputation data consumable by Intuition agents</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Introduced Primitives:**</span>
<span style="color: green; font-weight: bold;">- New "AuctionOutcome" schema for standardized attestations</span>
<span style="color: green; font-weight: bold;">- Agent type "MarketAnalyzer" for price/reputation insights</span>

---

## **5. Intuition Ecosystem Alignment**

### **Required**

* **Why Intuition** (How you use the graph, registry, attestations, InfoFi, MCP, or AI context)

* **Which Intuition primitives you use** (Atoms, triples, signal, DID / agent registry, knowledge graph, InfoFi, MCP, AI context, etc.)

<span style="color: orange;">1. DID / Agent Registry
The Decentralized Identifier (DID) / Agent Registry — users can follow creators directly in-gallery

2. $TRUST — Native currency to be used in The Overmind Gallery</span>

<span style="color: green; font-weight: bold;">**Primitives Utilisées :**</span>
<span style="color: green; font-weight: bold;">1. **DID / Agent Registry** - Suivi créateurs via bonding curves</span>
<span style="color: green; font-weight: bold;">2. **$TRUST** - Monnaie d'enchères et récompenses</span>
<span style="color: green; font-weight: bold;">3. **Knowledge Graph** - Attestations réputation/activité</span>
<span style="color: green; font-weight: bold;">4. **Atoms & Triples** - Données provenance enchères</span>

* **Why it must be built on Intuition**

### **Optional**

<span style="color: green; font-weight: bold;">* **Data Structure Plan (Atoms, Triples, Signal, Schemas)**</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Atoms created:**</span>
<span style="color: green; font-weight: bold;">- `AuctionResult`: Auction result (winner, final_price, participants)</span>
<span style="color: green; font-weight: bold;">- `CreatorReputation`: Reputation score based on sales/attestations</span>
<span style="color: green; font-weight: bold;">- `BidHistory`: Auction history with timestamps</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Defined triples:**</span>
<span style="color: green; font-weight: bold;">- `creator:reputation_score` → numeric value</span>
<span style="color: green; font-weight: bold;">- `auction:outcome` → "successful"/"failed"/"cancelled"</span>
<span style="color: green; font-weight: bold;">- `bidder:participation_count` → number of auctions</span>
<span style="color: green; font-weight: bold;">- `nft:provenance_chain` → property/transaction history</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**Written attestations:**</span>
<span style="color: green; font-weight: bold;">- Successful sale: `(seller, buyer, nft_id, final_price, timestamp)`</span>
<span style="color: green; font-weight: bold;">- Auction failure: `(auction_id, reason, participants_affected)`</span>
<span style="color: green; font-weight: bold;">- Creator reputation: `(creator_did, score, factors: volume/success_rate)`</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">**How to enrich the Knowledge Graph:**</span>
<span style="color: green; font-weight: bold;">- Each auction creates reputation/activity triples</span>
<span style="color: green; font-weight: bold;">- Agents can consume "top creators" or "trending NFTs"</span>
<span style="color: green; font-weight: bold;">- Intuition AI can analyze price/reputation patterns</span>

* **How do you plan to integrate TRUST, the native currency of Intuition Network**

$TRUST will be fully integrated as the bidding and reward currency within The Overmind Gallery. Every auction will require users to place bids in $TRUST, creating a direct on-chain utility for the token. When users are outbid, they automatically receive a percentage of their bid back in TRUST as a reward, incentivizing participation and repeated engagement.

**Detailed $TRUST Integration:**

1. **"$TRUST will be fully integrated as the bidding and reward currency"**
   - Primary transaction medium: All marketplace activities use $TRUST exclusively
   - Dual-purpose token: Serves both as payment method and incentive mechanism
   - Ecosystem alignment: Strengthens Intuition's native token utility across applications

2. **"Every auction will require users to place bids in $TRUST"**
   - Mandatory requirement: All auctions exclusively accept $TRUST bids
   - No alternative currencies: Neither ETH, USD, nor stablecoins accepted
   - Direct utility creation: Generates real demand for $TRUST token holding

3. **"creating a direct on-chain utility for the token"**
   - Blockchain-native functionality: All transactions recorded on Intuition network
   - Transparent economics: Every bid and reward visible on-chain
   - Token velocity: Encourages $TRUST circulation through auction participation

4. **"When users are outbid, they automatically receive a percentage of their bid back in TRUST as a reward"**
   - Bid-to-Earn mechanism: Participants earn rewards even when losing auctions
   - Automatic calculation: Smart contract computes rewards up to 10% of outbid amount
   - Immediate redistribution: Rewards credited instantly to participant wallets

5. **"incentivizing participation and repeated engagement"**
   - Lower participation barriers: Users can start with small $TRUST amounts
   - Learning through participation: Educational approach to auction mechanics
   - Community building: Creates loyal user base through consistent rewards

**Economic Impact on Intuition Ecosystem:**

6. **Token Demand Generation**
   - Acquisition incentive: Users need $TRUST to participate in auctions
   - Holding benefit: Staking small amounts yields potential rewards
   - Network effect: More auctions drive more $TRUST acquisition

7. **Sustainable Reward Distribution**
   - Closed-loop economy: Rewards come from new bids, not external funding
   - Inflation control: Reward percentage caps prevent excessive dilution
   - Merit-based distribution: Higher engagement yields higher rewards

8. **Market Discovery Enhancement**
   - True price discovery: Bid-to-earn removes fear of overpaying
   - Increased liquidity: More participants create more competitive markets
   - Creator benefits: Higher final prices due to increased bidder confidence

**Technical Implementation:**

9. **Smart Contract Integration**
   - Automated reward calculation: Formula-based percentage computation
   - Instant execution: Rewards distributed immediately upon outbid
   - Gas optimization: Efficient contract calls minimize transaction costs

10. **User Experience Design**
    - Transparent reward display: Clear indication of potential earnings
    - Progressive disclosure: Educational tooltips explain reward mechanics
    - Wallet integration: Seamless $TRUST transactions within auction flow

Additionally, $TRUST will be used for:

* **Creator payouts:** Royalties will be paid to creators in $TRUST (based on GBM mecanisms)

* **Marketplace transactions and rewards:** All economic activity and platform fees, will flow in $TRUST.



* How this increases network activity or knowledge density

---

## **6. Sustainability & Long-Term Vision**

### **Required**

* **Long-term vision (6–24 months)**
  Over 12–24 months, The Overmind Gallery becomes a primary hub of NFT discovery within Intuition Network — driving TRUST velocity, and community engagement.

* **Post-grant sustainability plan**
  The Overmind Gallery will sustain operations through a dynamic, volume-based marketplace fee model.
  This structure ensures higher fees only at early stages and naturally decreases as platform volume grows, making the marketplace increasingly creator and collector friendly over time.

<span style="color: orange;">**Fee Structure**



<span style="color: green; font-weight: bold;">**Fee Structure **</span>
<span style="color: green; font-weight: bold;"></span>
<span style="color: green; font-weight: bold;">+ <$100K volume: 10% Overmind Gallery platform fee + GBM fees</span>
<span style="color: green; font-weight: bold;">+ $100K – $500K volume: 5% Overmind platform fee + GBM fees</span>
<span style="color: green; font-weight: bold;">+ $500K – $1M volume: 3% Overmind platform fee + GBM fees</span>
<span style="color: green; font-weight: bold;">+ $1M – $10M volume: 2% Overmind platform fee + GBM fees</span>
<span style="color: green; font-weight: bold;">+ Above $10M volume: 1% Overmind platform fee + GBM fees</span>

### **Optional**

* Business or revenue model
  The Overmind Gallery operates on a standard marketplace fee structure, earning fees based on GBM smart contract and audited mechanisms

* Go-to-market or distribution strategy
  * Creator onboarding campaigns
  * Community incentivised quests and tasks

* Competitive landscape
  * OpenSea, MagicEden — but none offer a marketplace built entirely on a Bid-to-Earn model

---

## **7. Additional Materials**

### **Required**

* Demo link, repo, or screenshots
  ![Screenshot (59)](https://hackmd.io/_uploads/SyRnXoRbbg.png)
  ![Screenshot (64)](https://hackmd.io/_uploads/r1cxXYkGbl.png)
  ![Screenshot (61)](https://hackmd.io/_uploads/B1KGNoRWZg.png)
  ![Screenshot (62)](https://hackmd.io/_uploads/r1u4Ns0bbg.png)
  ![Screenshot (63)](https://hackmd.io/_uploads/rJPgFb1GWg.png)



* Contact email + Overmind-Gallery wallet address 
  **email:** amadivictor1126@gmail.com
  **wallet address:** 0x9E9BAE867391eF072a14879D8BCBE08F43339E71

---

## **8. Applicant Attestation**

I confirm that all information submitted is accurate and that I intend to deliver the listed milestones.

**Name:** Wolfgang, Paarroo

**Wallet Address:** 0x9E9BAE867391eF072a14879D8BCBE08F43339E71

**Date:** 4th December, 2025</content>
<parameter name="filePath">/Users/toto/Desktop/Code/Intuition/Overmind-Gallery/Amilestone/Overmind Gallery Grant Application Template.md