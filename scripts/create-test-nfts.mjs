// Script to create test NFTs for development
import { ethers } from "ethers";

// Connect to local Hardhat
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = await provider.getSigner();

// Contract ABI (simplified for minting)
const nftAbi = [
  "function mintRelic(address to, string memory uri, uint256 power) public returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function getCreator(uint256 tokenId) public view returns (address)",
  "function getPower(uint256 tokenId) public view returns (uint256)"
];

// Try to find the deployed contract
async function findContract() {
  // Get all accounts
  const accounts = await provider.listAccounts();
  console.log("Available accounts:", accounts);

  // Check common deployment addresses
  const possibleAddresses = [
    "0x5FbDB2315678afecb367f032d93F642f64180aa3", // From config
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Marketplace
    "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", // Common Hardhat address
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"  // Another common
  ];

  for (const address of possibleAddresses) {
    try {
      const contract = new ethers.Contract(address, nftAbi, provider);
      const code = await provider.getCode(address);
      if (code !== '0x') {
        console.log(`✅ Contract found at ${address}`);
        return { contract: contract.connect(signer), address };
      }
    } catch (error) {
      // Continue
    }
  }

  console.log("❌ No contract found at expected addresses");
  return null;
}

// Create test NFTs
async function createTestNFTs() {
  const result = await findContract();
  if (!result) {
    console.log("No contract found. Please deploy contracts first.");
    return;
  }

  const { contract, address } = result;
  const signerAddress = await signer.getAddress();

  console.log(`Using contract at ${address}`);
  console.log(`Signer: ${signerAddress}`);

  try {
    // Mint some test NFTs
    const testNFTs = [
      { uri: "ipfs://QmMock1", power: 50 },
      { uri: "ipfs://QmMock2", power: 75 },
      { uri: "ipfs://QmMock3", power: 100 }
    ];

    for (const nft of testNFTs) {
      console.log(`Minting NFT with power ${nft.power}...`);
      const tx = await contract.mintRelic(signerAddress, nft.uri, nft.power);
      await tx.wait();
      console.log(`✅ Minted NFT`);
    }

    // Check balance
    const balance = await contract.balanceOf(signerAddress);
    console.log(`User has ${balance} NFTs`);

    console.log("🎉 Test NFTs created successfully!");
  } catch (error) {
    console.error("Error creating NFTs:", error);
  }
}

createTestNFTs();