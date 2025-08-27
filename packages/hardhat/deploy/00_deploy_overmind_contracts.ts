import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploy script for Overmind Gallery contracts
 */
const deployOvermindContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy OvermindGallery NFT contract
  const overmindGallery = await deploy("OvermindGallery", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // Deploy OvermindGalleryCollections contract
  const overmindGalleryCollections = await deploy("OvermindGalleryCollections", {
    from: deployer,
    args: [overmindGallery.address],
    log: true,
    autoMine: true,
  });

  // Get the deployed contracts
  const galleryContract = await hre.ethers.getContract<Contract>("OvermindGallery", deployer);
  const collectionsContract = await hre.ethers.getContract<Contract>("OvermindGalleryCollections", deployer);

  console.log("✅ OvermindGallery deployed to:", overmindGallery.address);
  console.log("✅ OvermindGalleryCollections deployed to:", overmindGalleryCollections.address);

  // Mint some initial relics for testing
  if (hre.network.name === "localhost" || hre.network.name === "hardhat") {
    console.log("🎨 Minting initial relics for testing...");

    const initialRelics = [
      {
        title: "The Obsidian Codex",
        tokenURI: "ipfs://QmObsidianCodex",
        imageURI: "/dark-mystical-obsidian-codex-ancient-book-glowing-.png",
        price: hre.ethers.parseEther("2.5"),
      },
      {
        title: "Ethereal Void Walker",
        tokenURI: "ipfs://QmEtherealVoidWalker",
        imageURI: "/ethereal-void-walker-dark-figure-glowing-eyes-myst.png",
        price: hre.ethers.parseEther("1.8"),
      },
      {
        title: "Neon Sigil of Power",
        tokenURI: "ipfs://QmNeonSigil",
        imageURI: "/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png",
        price: hre.ethers.parseEther("3.2"),
      },
    ];

    for (const relic of initialRelics) {
      await galleryContract.mintRelic(relic.title, relic.tokenURI, relic.imageURI, relic.price);
      console.log(`  ✨ Minted: ${relic.title}`);
    }

    // Create an initial collection
    await collectionsContract.createCollection(
      "Ancient Codex Archive",
      "Sacred texts from the digital realm",
      "/ancient-library-with-glowing-books-and-mystical-at.png",
    );
    console.log("  📚 Created collection: Ancient Codex Archive");
  }
};

export default deployOvermindContracts;

deployOvermindContracts.tags = ["OvermindContracts"];
