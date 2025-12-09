import { expect } from "chai";
import { deployMockTokens } from "./helpers/diamond";

declare const ethers: any;

describe("GBM Auction Registration", function () {
  let diamond: any;
  let owner: any;
  let user1: any;
  let erc20: any;
  let erc721: any;
  let erc1155: any;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    // Deploy mock tokens
    ({ erc20, erc721, erc1155 } = await deployMockTokens());

    // Deploy GBMFacet directly for testing (simplified)
    const GBMFacet = await ethers.getContractFactory("GBMFacet");
    diamond = await GBMFacet.deploy();
    await diamond.waitForDeployment();
  });

  describe("registerAnAuctionContract", function () {
    it("should register an auction contract with default settings", async function () {
      // Register the ERC721 contract
      await diamond.registerAnAuctionContract(await erc721.getAddress());

      // Check that bidding is allowed by default
      // TODO: Add getter for collection settings
      // expect(await diamond.getCollectionBiddingAllowed(await erc721.getAddress())).to.be.true;
    });

    it("should only allow owner to register contracts", async function () {
      let error: any;
      try {
        await diamond.connect(user1).registerAnAuctionContract(await erc721.getAddress());
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.undefined;
    });
  });

  describe("setBiddingAllowed", function () {
    beforeEach(async function () {
      await diamond.registerAnAuctionContract(await erc721.getAddress());
    });

    it("should allow owner to enable/disable bidding", async function () {
      // Disable bidding
      await diamond.setBiddingAllowed(await erc721.getAddress(), false);
      // TODO: Check bidding disabled

      // Re-enable bidding
      await diamond.setBiddingAllowed(await erc721.getAddress(), true);
      // TODO: Check bidding enabled
    });

    it("should only allow owner to set bidding allowed", async function () {
      let error: any;
      try {
        await diamond.connect(user1).setBiddingAllowed(await erc721.getAddress(), false);
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.undefined;
    });
  });

  describe("registerAnAuctionToken", function () {
    beforeEach(async function () {
      await diamond.registerAnAuctionContract(await erc721.getAddress());
      await diamond.setBiddingAllowed(await erc721.getAddress(), true);

      // Mint NFT to owner
      await erc721.mint(owner.address, 1);
    });

    it("should register an ERC721 token for auction", async function () {
      const tokenId = 1;
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));

      await diamond.registerAnAuctionToken(
        await erc721.getAddress(),
        tokenId,
        tokenKind,
        true // useInitiator
      );

      // Check auction was created
      const auctionId = await diamond.getAuctionID(await erc721.getAddress(), tokenId);
      expect(auctionId).to.not.equal(0);

      // Check token mapping
      expect(await diamond.getTokenId(auctionId)).to.equal(tokenId);
      expect(await diamond.getContractAddress(auctionId)).to.equal(await erc721.getAddress());
      expect(await diamond.getTokenKind(auctionId)).to.equal(tokenKind);
    });

    it("should fail if token is not owned by contract or owner", async function () {
      const tokenId = 999; // Non-existent token
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));

      let error: any;
      try {
        await diamond.registerAnAuctionToken(
          await erc721.getAddress(),
          tokenId,
          tokenKind,
          true
        );
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.undefined;
    });

    it("should only allow owner to register tokens", async function () {
      const tokenId = 1;
      const tokenKind = ethers.keccak256(ethers.toUtf8Bytes("ERC721"));

      let error: any;
      try {
        await diamond.connect(user1).registerAnAuctionToken(
          await erc721.getAddress(),
          tokenId,
          tokenKind,
          true
        );
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.undefined;
    });
  });
});