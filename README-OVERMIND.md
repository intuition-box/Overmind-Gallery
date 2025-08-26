# 🔮 The Overmind Gallery - Web3 NFT Marketplace

A mystical NFT marketplace built with Scaffold-ETH 2, featuring sacred digital artifacts and a beautiful dark UI.

## 🌟 Features

- **NFT Minting**: Create sacred relics as ERC-721 tokens
- **Marketplace**: Buy and sell NFTs with ETH
- **Collections**: Organize NFTs into curated collections
- **Creator System**: Verified creators with royalties
- **Beautiful UI**: Dark mystical theme with gradient effects
- **Web3 Integration**: Full wallet connectivity with RainbowKit
- **Smart Contracts**: Solidity contracts for NFTs and marketplace

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Yarn or npm
- Git

### Installation

1. **Navigate to the project directory:**
```bash
cd /Users/toto/Desktop/THP/overmind-scaffold
```

2. **Install dependencies:**
```bash
yarn install
```

3. **Start a local blockchain:**
In a new terminal:
```bash
yarn chain
```

4. **Deploy smart contracts:**
In another terminal:
```bash
yarn deploy
```

5. **Start the frontend:**
```bash
yarn start
```

Your dApp will be running at `http://localhost:3000`

## 📁 Project Structure

```
overmind-scaffold/
├── packages/
│   ├── hardhat/
│   │   ├── contracts/
│   │   │   ├── OvermindRelic.sol      # NFT Contract
│   │   │   └── OvermindCollections.sol # Collections Manager
│   │   └── deploy/
│   │       └── 00_deploy_overmind_contracts.ts
│   └── nextjs/
│       ├── app/
│       │   ├── page.tsx               # Home (with mock data)
│       │   ├── explore-web3/          # Web3 Explore Page
│       │   ├── mint/                  # NFT Minting Page
│       │   ├── collections/           # Collections
│       │   └── creators/              # Creators
│       ├── components/
│       │   ├── ui/                    # Radix UI Components
│       │   ├── Web3RelicCard.tsx      # Web3 NFT Card
│       │   └── scaffold-eth/          # Scaffold Components
│       └── hooks/
│           └── scaffold-eth/          # Web3 Hooks
```

## 🎨 Pages Overview

### Home Page (`/`)
- Original landing page with mock data
- Beautiful hero section with mystical theme
- Featured collections and curated relics

### Web3 Explore (`/explore-web3`)
- **Live blockchain data**
- Display NFTs for sale
- Purchase functionality with ETH
- Real-time updates

### Mint Page (`/mint`)
- Create new NFTs
- Set price in ETH
- Upload metadata
- Preview before minting

## 🔧 Smart Contract Functions

### OvermindRelic.sol

**Main Functions:**
- `mintRelic()` - Create a new NFT
- `purchaseRelic()` - Buy an NFT with ETH
- `listRelic()` - List NFT for sale
- `cancelListing()` - Remove from marketplace
- `getRelicsForSale()` - Get all available NFTs

**Features:**
- 2.5% creator royalties
- 2.5% platform fee
- Verified creator system

### OvermindCollections.sol

**Functions:**
- `createCollection()` - Create a new collection
- `addRelicToCollection()` - Add NFT to collection
- `getActiveCollections()` - Get all active collections

## 💻 Development Commands

```bash
# Start local blockchain
yarn chain

# Deploy contracts
yarn deploy

# Start frontend
yarn start

# Run tests
yarn hardhat:test

# Compile contracts
yarn compile

# Generate contract types
yarn generate
```

## 🌐 Network Configuration

Default network: **Localhost**

To deploy to testnets:
1. Add your private key to `.env`
2. Configure network in `hardhat.config.ts`
3. Deploy: `yarn deploy --network sepolia`

## 🎯 Testing the dApp

1. **Connect Wallet**: Click the connect button (top right)
2. **Get Test ETH**: Use local faucet or testnet faucet
3. **Mint NFT**: Go to `/mint` and create your first relic
4. **Explore**: View all NFTs at `/explore-web3`
5. **Purchase**: Buy NFTs from other creators
6. **List for Sale**: List your NFTs on the marketplace

## 🔮 Features Roadmap

- [ ] IPFS integration for decentralized storage
- [ ] Advanced search and filtering
- [ ] Auction functionality
- [ ] Batch minting
- [ ] Social features (following, likes)
- [ ] Analytics dashboard
- [ ] Multi-chain support

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Custom dark theme
- **Web3**: Wagmi, Viem, RainbowKit
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Testing**: Hardhat tests, Ethers.js

## 📝 Environment Variables

Create `.env.local` in `packages/nextjs/`:
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_id
```

## 🚢 Deployment

### Deploy to Vercel
```bash
yarn vercel
```

### Deploy to IPFS
```bash
yarn ipfs
```

## 🐛 Troubleshooting

**Issue**: "Module not found" errors
**Solution**: Run `yarn install` in the root directory

**Issue**: "Contract not deployed"
**Solution**: Make sure to run `yarn deploy` after starting the chain

**Issue**: "No NFTs showing"
**Solution**: Mint some NFTs first at `/mint` page

## 📄 License

MIT

## 🙏 Credits

Built with [Scaffold-ETH 2](https://scaffoldeth.io)

---

**The Overmind watches over all** 👁️

*Created with mystical powers and blockchain magic*