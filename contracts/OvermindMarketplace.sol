// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OvermindMarketplace
 * @dev Sacred marketplace for trading digital relics
 */
contract OvermindMarketplace is ReentrancyGuard, Ownable {
    
    struct Listing {
        uint256 tokenId;
        address nftContract;
        address seller;
        uint256 price;
        bool active;
        uint256 listedAt;
    }
    
    // Marketplace fee (in basis points, 250 = 2.5%)
    uint256 public marketplaceFee = 250;
    
    // Mapping from listing ID to listing details
    mapping(uint256 => Listing) public listings;
    
    // Counter for listing IDs
    uint256 private _listingCounter;
    
    // Events
    event RelicListed(
        uint256 indexed listingId,
        uint256 indexed tokenId,
        address indexed nftContract,
        address seller,
        uint256 price
    );
    
    event RelicSold(
        uint256 indexed listingId,
        uint256 indexed tokenId,
        address indexed nftContract,
        address seller,
        address buyer,
        uint256 price
    );
    
    event ListingCancelled(uint256 indexed listingId);
    event MarketplaceFeeUpdated(uint256 newFee);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev List a relic for sale
     * @param nftContract The address of the NFT contract
     * @param tokenId The token ID to list
     * @param price The price in wei
     */
    function listRelic(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "You don't own this relic");
        require(
            nft.getApproved(tokenId) == address(this) || 
            nft.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved to transfer relic"
        );
        
        _listingCounter++;
        uint256 listingId = _listingCounter;
        
        listings[listingId] = Listing({
            tokenId: tokenId,
            nftContract: nftContract,
            seller: msg.sender,
            price: price,
            active: true,
            listedAt: block.timestamp
        });
        
        emit RelicListed(listingId, tokenId, nftContract, msg.sender, price);
        
        return listingId;
    }
    
    /**
     * @dev Buy a listed relic
     * @param listingId The ID of the listing
     */
    function buyRelic(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Cannot buy your own relic");
        
        IERC721 nft = IERC721(listing.nftContract);
        require(nft.ownerOf(listing.tokenId) == listing.seller, "Seller no longer owns the relic");
        
        // Mark listing as inactive
        listing.active = false;
        
        // Calculate fees
        uint256 fee = (listing.price * marketplaceFee) / 10000;
        uint256 sellerProceeds = listing.price - fee;
        
        // Transfer NFT to buyer
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Transfer payment to seller
        (bool sellerSuccess, ) = payable(listing.seller).call{value: sellerProceeds}("");
        require(sellerSuccess, "Payment to seller failed");
        
        // Transfer fee to contract owner
        if (fee > 0) {
            (bool feeSuccess, ) = payable(owner()).call{value: fee}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        // Refund excess payment
        if (msg.value > listing.price) {
            uint256 refund = msg.value - listing.price;
            (bool refundSuccess, ) = payable(msg.sender).call{value: refund}("");
            require(refundSuccess, "Refund failed");
        }
        
        emit RelicSold(
            listingId,
            listing.tokenId,
            listing.nftContract,
            listing.seller,
            msg.sender,
            listing.price
        );
    }
    
    /**
     * @dev Cancel a listing
     * @param listingId The ID of the listing to cancel
     */
    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        
        require(listing.active, "Listing not active");
        require(listing.seller == msg.sender || msg.sender == owner(), "Only seller or owner can cancel");
        
        listing.active = false;
        
        emit ListingCancelled(listingId);
    }
    
    /**
     * @dev Update marketplace fee (only owner)
     * @param newFee The new fee in basis points
     */
    function setMarketplaceFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee cannot exceed 10%");
        marketplaceFee = newFee;
        emit MarketplaceFeeUpdated(newFee);
    }
    
    /**
     * @dev Get listing details
     * @param listingId The ID of the listing
     */
    function getListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }
    
    /**
     * @dev Get current listing counter
     */
    function getListingCounter() external view returns (uint256) {
        return _listingCounter;
    }
    
    /**
     * @dev Check if a listing is active
     * @param listingId The ID of the listing
     */
    function isListingActive(uint256 listingId) external view returns (bool) {
        return listings[listingId].active;
    }
    
    /**
     * @dev Emergency withdraw (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}