const { expect } = require("chai");

describe("GBM Auction Registration", function () {
  let gbmFacet;
  let erc721;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    // Deploy mock NFT
    const MockERC721 = await ethers.getContractFactory("MockERC721");
    erc721 = await MockERC721.deploy("MockNFT", "MNFT");
    await erc721.waitForDeployment();

    // Deploy GBMFacet directly for testing
    const GBMFacet = await ethers.getContractFactory("GBMFacet");
    gbmFacet = await GBMFacet.deploy();
    await gbmFacet.waitForDeployment();
  });

  describe("registerAnAuctionContract", function () {
    it("should register an auction contract", async function () {
      await gbmFacet.registerAnAuctionContract(await erc721.getAddress());
      // Test passes if no revert
      expect(true).to.be.true;
    });

    it("should only allow owner to register contracts", async function () {
      try {
        await gbmFacet.connect(user1).registerAnAuctionContract(await erc721.getAddress());
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("Must be contract owner");
      }
    });
  });

  describe("setBiddingAllowed", function () {
    beforeEach(async function () {
      await gbmFacet.registerAnAuctionContract(await erc721.getAddress());
    });

    it("should allow owner to enable/disable bidding", async function () {
      await gbmFacet.setBiddingAllowed(await erc721.getAddress(), false);
      await gbmFacet.setBiddingAllowed(await erc721.getAddress(), true);
      expect(true).to.be.true;
    });

    it("should only allow owner to set bidding allowed", async function () {
      try {
        await gbmFacet.connect(user1).setBiddingAllowed(await erc721.getAddress(), false);
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("Must be contract owner");
      }
    });
  });

  describe("registerAnAuctionToken", function () {
    beforeEach(async function () {
      await gbmFacet.registerAnAuctionContract(await erc721.getAddress());
      await gbmFacet.setBiddingAllowed(await erc721.getAddress(), true);
      await erc721.mint(owner.address, 1);
    });

    it("should register an ERC721 token for auction", async function () {
      const tokenId = 1;
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));

      await gbmFacet.registerAnAuctionToken(await erc721.getAddress(), tokenId, tokenKind, true);

      const auctionId = await gbmFacet.getAuctionID(await erc721.getAddress(), tokenId);
      expect(auctionId).to.not.equal(0);

      expect(await gbmFacet.getTokenId(auctionId)).to.equal(tokenId);
      expect(await gbmFacet.getContractAddress(auctionId)).to.equal(await erc721.getAddress());
      expect(await gbmFacet.getTokenKind(auctionId)).to.equal(tokenKind);
    });

    it("should fail if token is not owned", async function () {
      const tokenId = 999;
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));

      try {
        await gbmFacet.registerAnAuctionToken(await erc721.getAddress(), tokenId, tokenKind, true);
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("cannot be auctioned");
      }
    });

    it("should only allow owner to register tokens", async function () {
      const tokenId = 1;
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));

      try {
        await gbmFacet.connect(user1).registerAnAuctionToken(await erc721.getAddress(), tokenId, tokenKind, true);
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("Must be contract owner");
      }
    });
  });
});