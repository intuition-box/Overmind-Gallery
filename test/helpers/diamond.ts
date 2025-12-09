const { ethers } = require("hardhat");

export async function deployDiamond(): Promise<{
  diamond: any;
  diamondCutFacet: any;
  facets: {
    diamondLoupeFacet: any;
    gbmFacet: any;
    gbmTrustFacet: any;
    ownershipFacet: any;
    settingsFacet: any;
  };
}> {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  // Deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
  const diamondCutFacet = await DiamondCutFacet.deploy();
  await diamondCutFacet.waitForDeployment();

  // Deploy Diamond
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(
    contractOwner.address,
    await diamondCutFacet.getAddress()
  );
  await diamond.waitForDeployment();

  // Deploy facets
  const DiamondLoupeFacet = await ethers.getContractFactory("DiamondLoupeFacet");
  const diamondLoupeFacet = await DiamondLoupeFacet.deploy();
  await diamondLoupeFacet.waitForDeployment();

  const GBMFacet = await ethers.getContractFactory("GBMFacet");
  const gbmFacet = await GBMFacet.deploy();
  await gbmFacet.waitForDeployment();

  const GBM_TRUSTFacet = await ethers.getContractFactory("GBM_TRUSTFacet");
  const gbmTrustFacet = await GBM_TRUSTFacet.deploy();
  await gbmTrustFacet.waitForDeployment();

  const OwnershipFacet = await ethers.getContractFactory("OwnershipFacet");
  const ownershipFacet = await OwnershipFacet.deploy();
  await ownershipFacet.waitForDeployment();

  const SettingsFacet = await ethers.getContractFactory("SettingsFacet");
  const settingsFacet = await SettingsFacet.deploy();
  await settingsFacet.waitForDeployment();

  // Build Cut struct
  const cut = [
    {
      facetAddress: await diamondLoupeFacet.getAddress(),
      action: 0, // Add
      functionSelectors: [
        "0xcdffacc6", // facetAddress(bytes4)
        "0x52ef6b2c", // facetAddresses()
        "0xadfca15e", // facetFunctionSelectors(address)
        "0x7a0ed627", // facets()
        "0x01ffc9a7", // supportsInterface(bytes4)
      ],
    },
    {
      facetAddress: await gbmFacet.getAddress(),
      action: 0, // Add
      functionSelectors: [
        "0x8da5cb5b", // owner()
        "0x73d4a13a", // erc20Currency()
        "0x4e71d92d", // getAuctionID(address,uint256)
        "0x8a8e7c0d", // getAuctionID(address,uint256,uint256)
        "0x3c846f8d", // getTokenId(uint256)
        "0xd4e932c6", // getContractAddress(uint256)
        "0x8a54f614", // getTokenKind(uint256)
        "0x9c4c3c4a", // getAuctionHighestBidder(uint256)
        "0x6248c696", // getAuctionHighestBid(uint256)
        "0x4b0c4c4e", // getAuctionDebt(uint256)
        "0x8b3c4c4e", // getAuctionDueIncentives(uint256)
        "0x4c8c4c4e", // getAuctionStartTime(uint256)
        "0x5c8c4c4e", // getAuctionEndTime(uint256)
        "0x6c8c4c4e", // getAuctionHammerTimeDuration(uint256)
        "0x7c8c4c4e", // getAuctionBidDecimals(uint256)
        "0x8c8c4c4e", // getAuctionStepMin(uint256)
        "0x9c8c4c4e", // getAuctionIncMin(uint256)
        "0xac8c4c4e", // getAuctionIncMax(uint256)
        "0xbc8c4c4e", // getAuctionBidMultiplier(uint256)
        "0x13d1aa0d", // commitBid(uint256,uint256,uint256,bytes)
        "0x4ffaabb8", // bid(uint256,uint256,uint256)
        "0x853828b6", // batchClaim(uint256[])
        "0x4e71e0c8", // claim(uint256)
        "0x8b8c4c4e", // registerAnAuctionContract(address)
        "0x9b8c4c4e", // setBiddingAllowed(address,bool)
        "0xab8c4c4e", // registerAnAuctionToken(address,uint256,bytes4,bool)
        "0xbb8c4c4e", // modifyAnAuctionToken(address,uint256,bytes4,bool,uint256,bool)
        "0xcb8c4c4e", // getAuctionInfo(uint256)
        "0xdb8c4c4e", // updatePlayerRewardsAddress(address)
        "0xeb8c4c4e", // registerMassERC721Each(address,bool,address,uint256[])
        "0xfb8c4c4e", // registerMassERC1155Each(address,bool,address,uint256,uint256,uint256)
        "0x150b7a02", // onERC721Received(address,address,uint256,bytes)
        "0xf23a6e61", // onERC1155Received(address,address,uint256,uint256,bytes)
        "0xbc197c81", // onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)
      ],
    },
    {
      facetAddress: await gbmTrustFacet.getAddress(),
      action: 0, // Add
      functionSelectors: [
        // GBM_TRUSTFacet functions - add as needed
      ],
    },
    {
      facetAddress: await ownershipFacet.getAddress(),
      action: 0, // Add
      functionSelectors: [
        "0x8da5cb5b", // owner()
        "0xf2fde38b", // transferOwnership(address)
      ],
    },
    {
      facetAddress: await settingsFacet.getAddress(),
      action: 0, // Add
      functionSelectors: [
        "0x4c8c4c4e", // getAuctionStartTime(uint256)
        "0x5c8c4c4e", // getAuctionEndTime(uint256)
        "0x6c8c4c4e", // getAuctionHammerTimeDuration(uint256)
        "0x7c8c4c4e", // getAuctionBidDecimals(uint256)
        "0x8c8c4c4e", // getAuctionStepMin(uint256)
        "0x9c8c4c4e", // getAuctionIncMin(uint256)
        "0xac8c4c4e", // getAuctionIncMax(uint256)
        "0xbc8c4c4e", // getAuctionBidMultiplier(uint256)
        // Add more settings functions
      ],
    },
  ];

  // Execute diamond cut
  const diamondCut = await ethers.getContractAt("IDiamondCut", await diamond.getAddress());
  const tx = await diamondCut.diamondCut(cut, ethers.ZeroAddress, "0x");
  await tx.wait();

  return {
    diamond,
    diamondCutFacet,
    facets: {
      diamondLoupeFacet,
      gbmFacet,
      gbmTrustFacet,
      ownershipFacet,
      settingsFacet,
    },
  };
}

export async function deployMockTokens(): Promise<{
  erc20: any;
  erc721: any;
  erc1155: any;
}> {
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const erc20 = await MockERC20.deploy("MockToken", "MTK");
  await erc20.waitForDeployment();

  const MockERC721 = await ethers.getContractFactory("MockERC721");
  const erc721 = await MockERC721.deploy("MockNFT", "MNFT");
  await erc721.waitForDeployment();

  const MockERC1155 = await ethers.getContractFactory("MockERC1155");
  const erc1155 = await MockERC1155.deploy("https://mock.uri/{id}.json");
  await erc1155.waitForDeployment();

  return { erc20, erc721, erc1155 };
}

export async function initializeGBM(diamond: any, erc20Address: string): Promise<void> {
  const accounts = await ethers.getSigners();
  const owner = accounts[0];

  // Set backend pubkey (mock)
  const mockPubKey = "0x" + "04".repeat(64); // Mock 64-byte public key

  // Initialize GBM settings
  const initiatorInfo = {
    startTime: Math.floor(Date.now() / 1000) + 60, // Start in 1 minute
    endTime: Math.floor(Date.now() / 1000) + 3600, // End in 1 hour
    hammerTimeDuration: 300, // 5 minutes
    bidDecimals: 1000000, // 1e6
    stepMin: 10000, // 1%
    incMin: 10000, // 1%
    incMax: 50000, // 5%
    bidMultiplier: 200000, // 20%
  };

  // Set contract addresses
  const contractAddresses = {
    pixelcraft: owner.address,
    playerRewards: owner.address,
    daoTreasury: owner.address,
    erc20Currency: erc20Address,
  };

  // Call initialization functions (assuming they exist in facets)
  // This will need to be adjusted based on actual facet functions
}