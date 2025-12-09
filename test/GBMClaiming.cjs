const { expect } = require("chai");

describe("GBM Auction Claiming", function () {
  let gbmFacet;
  let erc20;
  let erc721;
  let owner;
  let bidder;

  beforeEach(async function () {
    [owner, bidder] = await ethers.getSigners();

    // Deploy mock tokens
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    erc20 = await MockERC20.deploy("MockToken", "MTK");
    await erc20.waitForDeployment();

    const MockERC721 = await ethers.getContractFactory("MockERC721");
    erc721 = await MockERC721.deploy("MockNFT", "MNFT");
    await erc721.waitForDeployment();

    // Deploy GBMFacet
    const GBMFacet = await ethers.getContractFactory("GBMFacet");
    gbmFacet = await GBMFacet.deploy();
    await gbmFacet.waitForDeployment();

    // Setup GBM
    await gbmFacet.registerAnAuctionContract(await erc721.getAddress());
    await gbmFacet.setBiddingAllowed(await erc721.getAddress(), true);

    // Mint NFT and register auction
    await erc721.mint(owner.address, 1);
    const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));
    await gbmFacet.registerAnAuctionToken(await erc721.getAddress(), 1, tokenKind, true);
  });

  describe("claim", function () {
    it("should transfer NFT to winner", async function () {
      const auctionId = await gbmFacet.getAuctionID(await erc721.getAddress(), 1);
      const bidAmount = ethers.parseEther("1");

      // Place bid
      await erc20.mint(bidder.address, bidAmount);
      await erc20.connect(bidder).approve(await gbmFacet.getAddress(), bidAmount);
      await gbmFacet.connect(bidder).bid(auctionId, bidAmount, 0);

      // Fast forward time past auction end
      await ethers.provider.send("evm_increaseTime", [3601]); // 1 hour + 1 second
      await ethers.provider.send("evm_mine");

      // Claim
      await gbmFacet.claim(auctionId);

      // Check NFT ownership
      expect(await erc721.ownerOf(1)).to.equal(bidder.address);
    });

    it("should distribute proceeds correctly", async function () {
      const auctionId = await gbmFacet.getAuctionID(await erc721.getAddress(), 1);
      const bidAmount = ethers.parseEther("100");

      // Place bid
      await erc20.mint(bidder.address, bidAmount);
      await erc20.connect(bidder).approve(await gbmFacet.getAddress(), bidAmount);
      await gbmFacet.connect(bidder).bid(auctionId, bidAmount, 0);

      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      // Record balances before claim
      const contractBalanceBefore = await erc20.balanceOf(await gbmFacet.getAddress());
      const pixelcraftBalanceBefore = await erc20.balanceOf(owner.address); // Assuming owner is pixelcraft

      // Claim
      await gbmFacet.claim(auctionId);

      // Check distributions (simplified - actual GBM has complex distribution)
      const contractBalanceAfter = await erc20.balanceOf(await gbmFacet.getAddress());
      expect(contractBalanceAfter).to.be.lt(contractBalanceBefore); // Funds should be distributed
    });

    it("should prevent double claiming", async function () {
      const auctionId = await gbmFacet.getAuctionID(await erc721.getAddress(), 1);
      const bidAmount = ethers.parseEther("1");

      // Place bid and claim
      await erc20.mint(bidder.address, bidAmount);
      await erc20.connect(bidder).approve(await gbmFacet.getAddress(), bidAmount);
      await gbmFacet.connect(bidder).bid(auctionId, bidAmount, 0);

      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      await gbmFacet.claim(auctionId);

      // Try to claim again
      try {
        await gbmFacet.claim(auctionId);
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("already been claimed");
      }
    });

    it("should reject claims before auction ends", async function () {
      const auctionId = await gbmFacet.getAuctionID(await erc721.getAddress(), 1);
      const bidAmount = ethers.parseEther("1");

      // Place bid
      await erc20.mint(bidder.address, bidAmount);
      await erc20.connect(bidder).approve(await gbmFacet.getAddress(), bidAmount);
      await gbmFacet.connect(bidder).bid(auctionId, bidAmount, 0);

      // Try to claim before end
      try {
        await gbmFacet.claim(auctionId);
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("not yet ended");
      }
    });

    it("should handle auctions with no bids", async function () {
      const auctionId = await gbmFacet.getAuctionID(await erc721.getAddress(), 1);

      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      // Claim with no bids
      await gbmFacet.claim(auctionId);

      // NFT should go to owner (or contract owner)
      expect(await erc721.ownerOf(1)).to.equal(owner.address);
    });
  });

  describe("batchClaim", function () {
    it("should claim multiple auctions", async function () {
      // Register second token
      await erc721.mint(owner.address, 2);
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));
      await gbmFacet.registerAnAuctionToken(await erc721.getAddress(), 2, tokenKind, true);

      const auctionId1 = await gbmFacet.getAuctionID(await erc721.getAddress(), 1);
      const auctionId2 = await gbmFacet.getAuctionID(await erc721.getAddress(), 2);

      // Place bids
      await erc20.mint(bidder.address, ethers.parseEther("2"));
      await erc20.connect(bidder).approve(await gbmFacet.getAddress(), ethers.parseEther("2"));
      await gbmFacet.connect(bidder).bid(auctionId1, ethers.parseEther("1"), 0);
      await gbmFacet.connect(bidder).bid(auctionId2, ethers.parseEther("1"), 0);

      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      // Batch claim
      await gbmFacet.batchClaim([auctionId1, auctionId2]);

      // Check both NFTs transferred
      expect(await erc721.ownerOf(1)).to.equal(bidder.address);
      expect(await erc721.ownerOf(2)).to.equal(bidder.address);
    });
  });
});