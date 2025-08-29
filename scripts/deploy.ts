import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Overmind Gallery contracts...");

  // Deploy the NFT collection contract
  const OvermindNFT = await ethers.getContractFactory("OvermindNFT");
  const overmindNFT = await OvermindNFT.deploy("Overmind Gallery", "OMIND");

  await overmindNFT.waitForDeployment();

  console.log(`OvermindNFT deployed to: ${await overmindNFT.getAddress()}`);

  // Deploy the marketplace contract
  const Marketplace = await ethers.getContractFactory("OvermindMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();

  console.log(`Marketplace deployed to: ${await marketplace.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});