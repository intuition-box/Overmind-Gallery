# Overmind Gallery - Architecture Documentation

## Overview

The Overmind Gallery is a Web3 NFT marketplace that implements the **GBM (Gotta-Be-More) auction mechanism** from Aavegotchi. This sophisticated auction system replaces traditional buy/sell mechanics with dynamic, competition-driven pricing that rewards active participation.

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App] --> B[RainbowKit Wallet]
        A --> C[React Components]
        C --> D[Custom Hooks]
    end

    subgraph "Web3 Layer"
        B --> E[Wagmi Provider]
        E --> F[Contract Interactions]
    end

    subgraph "Smart Contract Layer"
        F --> G[GBM Diamond Contract]
        F --> H[OvermindNFT Contract]
        F --> I[OvermindMarketplace Contract]
    end

    subgraph "External Services"
        G --> J[Intuition Network]
        G --> K[IPFS/Arweave]
    end

    subgraph "Data Storage"
        H --> L[Blockchain State]
        I --> L
        G --> L
    end

    style A fill:#1f2937,color:#ffffff
    style G fill:#7c3aed,color:#ffffff
    style J fill:#06b6d4,color:#ffffff
```

### GBM Auction Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant G as GBM Contract
    participant N as NFT Contract
    participant T as TRUST Token

    U->>F: Initiate Auction
    F->>G: createAuction(nftId, startPrice, duration)
    G->>N: transferFrom(user, contract, nftId)
    N-->>G: NFT transferred
    G-->>F: Auction created
    F-->>U: Auction started

    U->>F: Place Bid
    F->>G: placeBid(auctionId, bidAmount)
    G->>T: transferFrom(bidder, contract, bidAmount)
    T-->>G: Tokens transferred

    alt New bid outbids previous
        G->>T: transfer(previousBidder, reward)
        T-->>G: Reward sent
        G-->>F: Bid placed with reward
    else First bid
        G-->>F: Bid placed
    end

    F-->>U: Bid confirmed

    Note over G: Auction duration expires

    U->>F: Claim NFT
    F->>G: claimNFT(auctionId)
    G->>N: transfer(winner, nftId)
    N-->>G: NFT transferred
    G->>T: transfer(creator, finalBid - fees)
    T-->>G: Payment sent
    G-->>F: Auction completed
    F-->>U: NFT claimed
```

## GBM Auction Mechanism

### Core Components

#### 1. GBM Diamond Contract
The main auction contract using the Diamond pattern for upgradeability:

- **GBMFacet**: Core auction logic (bidding, claiming, closing)
- **GBM_TRUSTFacet**: TRUST token specific functions
- **SettingsFacet**: Configuration management
- **OwnershipFacet**: Access control

#### 2. Auction Parameters
```solidity
struct Auction {
    uint256 auctionId;
    address nftContract;
    uint256 nftId;
    address seller;
    address highestBidder;
    uint256 highestBid;
    uint256 startingBid;
    uint256 endTime;
    bool claimed;
    AuctionState state;
}
```

#### 3. Dynamic Reward System
When a bidder is outbid, they receive a reward calculated as:
```
reward = min(10%, relative_increase) × new_bid_amount
```

Where `relative_increase = (new_bid - old_bid) / old_bid`

### Contract Interactions

#### Auction Creation Flow
```mermaid
flowchart TD
    A[User calls createAuction] --> B{Validate NFT ownership}
    B -->|Valid| C[Transfer NFT to contract]
    C --> D[Initialize auction struct]
    D --> E[Set auction parameters]
    E --> F[Emit AuctionCreated event]
    F --> G[Return auction ID]

    B -->|Invalid| H[Revert transaction]
```

#### Bidding Flow
```mermaid
flowchart TD
    A[User calls placeBid] --> B{Validate auction state}
    B -->|Active| C{Check bid amount}
    C -->|> current bid| D[Transfer tokens to contract]
    D --> E[Update highest bidder]
    E --> F{Calculate reward}
    F -->|Previous bidder exists| G[Send reward to previous bidder]
    G --> H[Emit BidPlaced event]
    F -->|First bid| H
    H --> I[Return success]

    B -->|Inactive| J[Revert: Auction not active]
    C -->|<= current bid| K[Revert: Bid too low]
```

#### Claiming Flow
```mermaid
flowchart TD
    A[User calls claimNFT] --> B{Validate caller is winner}
    B -->|Valid| C{Auction ended?}
    C -->|Yes| D{Not claimed?}
    D -->|Yes| E[Transfer NFT to winner]
    E --> F[Transfer payment to seller]
    F --> G[Mark as claimed]
    G --> H[Emit AuctionClaimed event]
    H --> I[Return success]

    B -->|Not winner| J[Revert: Not winner]
    C -->|No| K[Revert: Auction active]
    D -->|Already claimed| L[Revert: Already claimed]
```

## Data Structures

### Key Storage Layout (AppStorage.sol)
```solidity
struct AppStorage {
    // GBM Auctions
    mapping(uint256 => Auction) auctions;
    mapping(address => uint256[]) userAuctions;
    mapping(uint256 => Bid[]) auctionBids;

    // Configuration
    GBMSettings settings;

    // ERC721 Integration
    mapping(address => bool) supportedNFTContracts;
}
```

### Auction States
```solidity
enum AuctionState {
    Active,     // Auction is running
    Ended,      // Time expired
    Cancelled,  // Seller cancelled
    Claimed     // NFT claimed by winner
}
```

## Integration Points

### Frontend Integration
- **useGBMAuction hook**: Manages auction state and interactions
- **useOvermindNFT hook**: NFT ownership and metadata
- **useOvermindMarketplace hook**: Legacy marketplace functions

### Intuition Network Integration
The GBM system integrates with the Intuition Knowledge Graph to:
- Track auction outcomes and reputation
- Store provenance data for NFTs
- Enable AI-driven insights on market trends

#### Intuition Integration Details

##### Data Structure Plan (Atoms, Triples, Signal, Schemas)

**Atoms to create:**
- `AuctionResult`: Result of an auction (winner, final_price, participants)
- `CreatorReputation`: Reputation score based on sales/attestations
- `BidHistory`: History of bids with timestamps
- `NFTProvenance`: Complete ownership chain of an NFT

**Triples to define:**
- `creator:reputation_score`: numeric value (0-100)
- `auction:outcome`: "successful"/"failed"/"cancelled"
- `bidder:participation_count`: number of auctions participated
- `nft:provenance_chain`: array of ownership transfers
- `auction:final_price`: TRUST amount in wei
- `creator:sales_volume`: total TRUST earned

**Attestations to write:**
- Successful sale: `(seller_did, buyer_did, nft_id, final_price, timestamp, auction_id)`
- Failed auction: `(auction_id, reason, participants_affected[], timestamp)`
- Creator reputation: `(creator_did, score, factors: {volume, success_rate, avg_price})`
- Bid participation: `(bidder_did, auction_id, bid_amount, position, timestamp)`

##### Knowledge Graph Enrichment Process

**How auction data feeds the Knowledge Graph:**
1. **Auction Creation**: Creates `AuctionResult` atom with initial metadata
2. **Bid Placement**: Updates `BidHistory` and participant counts
3. **Auction Completion**: Generates final attestations and reputation updates
4. **Signal Propagation**: Auction activity creates ripples in the Intuition network

**AI Consumption Patterns:**
- Agents can query "top_creators_by_reputation" for trending artists
- Market analysis AI analyzes "price_trends_by_category"
- Recommendation systems use "bidder_behavior_patterns"
- Risk assessment uses "auction_success_rates"

##### Integration Flow

```mermaid
sequenceDiagram
    participant G as GBM Contract
    participant I as Intuition Node
    participant K as Knowledge Graph
    participant A as AI Agents

    G->>I: Emit AuctionCompleted event
    I->>I: Generate attestations
    I->>K: Store triples (auction outcome, reputation)
    K->>A: Signal propagation to agents
    A->>K: Query enriched data
    A->>A: Generate insights/predictions
```

##### API Integration Points

**Contract Hooks:**
- `afterAuctionCreated()`: Initialize auction atoms
- `afterBidPlaced()`: Update bid history triples
- `afterAuctionClaimed()`: Generate final attestations

**Frontend Integration:**
- Display creator reputation scores from Intuition
- Show AI-powered price suggestions
- Enable social features based on network connections

**Data Synchronization:**
- Real-time updates via WebSocket to Intuition nodes
- Batch attestation submission for gas efficiency
- Conflict resolution for concurrent auction states

### Smart Contract Dependencies
- **Diamond Standard**: For modular contract architecture
- **ERC721**: NFT standard implementation
- **ERC20**: TRUST token for bidding
- **OpenZeppelin**: Security and utility libraries

## Security Considerations

### Access Control
- Only verified creators can list NFTs
- Auction parameters validated on creation
- Bid amounts checked against minimum increases

### Fund Safety
- Tokens held in contract during auction
- Automatic refunds for outbid participants
- Platform fees deducted before seller payment

### Upgradeability
- Diamond pattern allows facet upgrades
- Timelock for critical parameter changes
- Emergency pause functionality

## Performance Optimizations

### Gas Efficiency
- Batch operations for multiple bids
- Optimized storage layouts
- Efficient reward calculations

### Frontend Optimizations
- Real-time bid updates via WebSocket
- Cached auction data
- Lazy loading of bid history

## Future Enhancements

### Planned Features
- **Multi-token support**: Accept different ERC20 tokens for bidding
- **Dutch auction fallback**: Automatic price reduction if no bids
- **Flash loan integration**: Allow leveraged bidding
- **Cross-chain auctions**: Support for multiple blockchains

### Intuition AI Integration
- **Predictive pricing**: AI-driven starting price suggestions
- **Market analysis**: Trend prediction and insights
- **Automated bidding**: Smart contract-based bidding strategies

---

*This architecture documentation reflects the transition from simple marketplace to sophisticated GBM auction system, enabling dynamic pricing through competitive bidding.*