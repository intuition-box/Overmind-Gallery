const { ethers } = require("hardhat");

async function main() {
  console.log("🔒 Deploying Overmind Gallery contracts with security checks...");

  // Security check: Ensure we're not on mainnet without confirmation
  const network = await ethers.provider.getNetwork();
  if (network.chainId === 1) { // Ethereum Mainnet
    console.warn("⚠️  WARNING: Deploying to Ethereum Mainnet!");
    console.warn("This will cost real ETH. Make sure you want to proceed.");
    // In a real deployment, you might want to add a confirmation prompt
  }

  // Deploy the NFT collection contract
  console.log("📝 Deploying OvermindNFT...");
  const OvermindNFT = await ethers.getContractFactory("OvermindNFT");
  const overmindNFT = await OvermindNFT.deploy("Overmind Gallery", "OMIND");

  await overmindNFT.waitForDeployment();
  const nftAddress = await overmindNFT.getAddress();

  console.log(`✅ OvermindNFT deployed to: ${nftAddress}`);

  // Verify contract deployment
  const code = await ethers.provider.getCode(nftAddress);
  if (code === '0x') {
    throw new Error('❌ Contract deployment failed - no code at address');
  }

  // Deploy the marketplace contract
  console.log("🏪 Deploying OvermindMarketplace...");
  const Marketplace = await ethers.getContractFactory("OvermindMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();

  console.log(`✅ Marketplace deployed to: ${marketplaceAddress}`);

  // Verify marketplace deployment
  const marketplaceCode = await ethers.provider.getCode(marketplaceAddress);
  if (marketplaceCode === '0x') {
    throw new Error('❌ Marketplace deployment failed - no code at address');
  }

  console.log("🎉 All contracts deployed successfully!");
  console.log("📋 Summary:");
  console.log(`   OvermindNFT: ${nftAddress}`);
  console.log(`   Marketplace: ${marketplaceAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});