# The Overmind Gallery - Web3 NFT Marketplace

Sacred digital artifacts marketplace built with Next.js, Scaffold-ETH 2, and mystical aesthetics.

## Features

- **Web3 Integration**: RainbowKit wallet connection with multi-chain support
- **Smart Contracts**: Custom NFT contracts with mystical power system and marketplace
- **Mystical Design**: Dark theme with cosmic aesthetics and animated elements
- **Responsive UI**: Mobile-first design with elegant components
- **Real-time Data**: Balance display, network info, and blockchain interactions

The Overmind Gallery is an art-first, auction-driven gallery built on the Intuition Network. Every sale is a live auction designed to let time, attention, and competition discover value.
Each artifact is listed with a starting price and an auction duration. Collectors place bids using $TRUST. When a new bid outbids the previous bidder, the previous bidder receives a dynamic outbid reward.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Web3**: Wagmi, RainbowKit, Viem
- **Smart Contracts**: Hardhat, Solidity 0.8.20, OpenZeppelin
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Blockchain**: Ethereum, Sepolia testnet, Hardhat local

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MetaMask or compatible Web3 wallet

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Overmind-Gallery
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your WalletConnect project ID if needed
   ```

4. Compile smart contracts
   ```bash
   npx hardhat compile
   ```

## Usage

### Development Mode

Start the development server:
```bash
npm run dev
```

Access the application at http://localhost:3000

### Smart Contract Deployment

1. Start local Hardhat network:
   ```bash
   npx hardhat node
   ```

2. Deploy contracts:
   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

3. Update contract addresses in `hooks/overmind/useDeployedContracts.ts`

### Production Build

```bash
npm run build
npm start
```

## Smart Contracts

### OvermindNFT
- ERC721 token with mystical power system (0-1000)
- Creator verification system
- Metadata URI storage for IPFS integration

### OvermindMarketplace
- Buy/sell sacred relics with ETH
- Configurable marketplace fees
- Secure listing and transaction handling

## Project Structure

```
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui base components
│   ├── web3/              # Web3-specific components
│   └── providers/         # Context providers
├── contracts/             # Smart contracts
├── hooks/                 # Custom React hooks
│   ├── scaffold-eth/      # Scaffold-ETH style hooks
│   └── overmind/          # Project-specific hooks
├── lib/                   # Utilities and configurations
├── scripts/               # Deployment scripts
├── ARCHITECTURE.md        # System architecture and GBM documentation
└── README.md             # This file
```

## Architecture

For detailed information about the system architecture, GBM auction mechanism, and contract interactions, see [ARCHITECTURE.md](./ARCHITECTURE.md).

The Overmind Gallery implements the sophisticated GBM (Gotta-Be-More) auction system from Aavegotchi, featuring dynamic pricing through competitive bidding with reward mechanisms for outbid participants.

## Web3 Features

- **Multi-chain Support**: Mainnet, Sepolia, Hardhat local
- **Wallet Integration**: RainbowKit with custom dark theme
- **Real-time Balance**: ETH balance display with automatic updates
- **Network Detection**: Automatic network switching and display
- **Smart Contract Interaction**: Read/write operations with error handling

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/mystical-enhancement`)
3. Commit changes (`git commit -m 'Add mystical enhancement'`)
4. Push to branch (`git push origin feature/mystical-enhancement`)
5. Create Pull Request

## Environment Variables

```bash
# Required for wallet connections
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional RPC URLs (uses public endpoints if not provided)  
NEXT_PUBLIC_MAINNET_RPC_URL=your_mainnet_rpc
NEXT_PUBLIC_SEPOLIA_RPC_URL=your_sepolia_rpc

# Private key for contract deployment (testnet/mainnet only)
PRIVATE_KEY=your_private_key
```
## Deployment

Project is live at:

**[The Overmind Gallery](https://overmind-gallery.intuition.box)**


## Reward Mechanism

When you are outbid, you can receive a reward. That reward increases when the new bidder jumps the price by a larger margin and is smaller for tiny increases. The reward cannot exceed 10% of the new bid.

Let:
B_prev = previous (outbid) bid amount (in $TRUST)
B_new = new winning bid amount (in $TRUST)
r = relative increase
MAX_P = maximum reward percent = 0.10 (10%)
p = reward percent
R = reward amount in $TRUST

Where:
MAX_P = 0.10 (10%)
r = (B_new - B_prev) / B_prev
p = (MAX_P * r)
R = (p * B_new)

## 👥 Authors

**Paarroo** - Lead Developer, Smart Contract Specialist & UX Designer
**ChiefAmadi** - Co-Lead Developer, Full-Stack Engineer & Project Architect

*Built by the Intuition.box team for the Web3 community.*

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

```
Copyright (c) 2024-2026 The Overmind Gallery

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

*Where ancient wisdom meets digital artistry. The Overmind watches over all sacred relics.*
