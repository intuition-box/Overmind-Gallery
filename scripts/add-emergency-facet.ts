const { ethers } = require("hardhat");

async function main() {
  console.log("Adding EmergencyFacet to GBM Diamond...");

  // Get the deployed Diamond contract address
  // This should be updated with the actual deployed address
  const diamondAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Local Hardhat address

  // Get DiamondCutFacet for adding the new facet
  const diamondCutFacet = await ethers.getContractAt("IDiamondCut", diamondAddress);

  // Deploy EmergencyFacet
  console.log("Deploying EmergencyFacet...");
  const EmergencyFacet = await ethers.getContractFactory("EmergencyFacet");
  const emergencyFacet = await EmergencyFacet.deploy();
  await emergencyFacet.waitForDeployment();
  const emergencyFacetAddress = await emergencyFacet.getAddress();
  console.log(`EmergencyFacet deployed to: ${emergencyFacetAddress}`);

  // Define function selectors for EmergencyFacet
  const selectors = [
    "emergencyPause()",
    "emergencyUnpause()",
    "paused()",
    "emergencyWithdraw(address,address,uint256)",
    "getContractBalance()",
    "getTokenBalance(address)"
  ];

  // Get function selectors
  const functionSelectors = [];
  for (const selector of selectors) {
    const sig = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(selector)).slice(0, 10);
    functionSelectors.push(sig);
  }

  // Add EmergencyFacet to Diamond
  const facetCut = {
    facetAddress: emergencyFacetAddress,
    action: 0, // Add
    functionSelectors: functionSelectors
  };

  console.log("Adding EmergencyFacet to Diamond...");
  const tx = await diamondCutFacet.diamondCut([facetCut], ethers.constants.AddressZero, "0x");
  await tx.wait();

  console.log("✅ EmergencyFacet successfully added to GBM Diamond!");
  console.log(`📍 Diamond address: ${diamondAddress}`);
  console.log(`📍 EmergencyFacet address: ${emergencyFacetAddress}`);

  // Verify the facet was added
  const diamondLoupe = await ethers.getContractAt("IDiamondLoupe", diamondAddress);
  const facets = await diamondLoupe.facets();

  console.log("\n📋 Diamond facets after update:");
  for (const facet of facets) {
    console.log(`- ${facet.facetAddress}: ${facet.functionSelectors.length} functions`);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});