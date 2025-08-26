// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title OvermindRelic
 * @dev Sacred NFT artifacts from the digital realm
 */
contract OvermindRelic is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    struct Relic {
        string title;
        address creator;
        uint256 price;
        bool isForSale;
        string imageURI;
    }
    
    mapping(uint256 => Relic) public relics;
    mapping(address => bool) public verifiedCreators;
    mapping(address => uint256[]) public creatorTokens;
    
    uint256 public constant CREATOR_ROYALTY = 250; // 2.5%
    uint256 public constant PLATFORM_FEE = 250; // 2.5%
    
    event RelicMinted(uint256 indexed tokenId, address indexed creator, string title, uint256 price);
    event RelicListed(uint256 indexed tokenId, uint256 price);
    event RelicPurchased(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event CreatorVerified(address indexed creator);
    
    constructor() ERC721("OvermindRelic", "RELIC") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new sacred relic
     */
    function mintRelic(
        string memory _title,
        string memory _tokenURI,
        string memory _imageURI,
        uint256 _price
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_tokenURI).length > 0, "Token URI cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        relics[tokenId] = Relic({
            title: _title,
            creator: msg.sender,
            price: _price,
            isForSale: true,
            imageURI: _imageURI
        });
        
        creatorTokens[msg.sender].push(tokenId);
        
        emit RelicMinted(tokenId, msg.sender, _title, _price);
        emit RelicListed(tokenId, _price);
        
        return tokenId;
    }
    
    /**
     * @dev Purchase a sacred relic
     */
    function purchaseRelic(uint256 _tokenId) public payable {
        require(_exists(_tokenId), "Token does not exist");
        Relic storage relic = relics[_tokenId];
        require(relic.isForSale, "Relic is not for sale");
        require(msg.value >= relic.price, "Insufficient payment");
        require(ownerOf(_tokenId) != msg.sender, "Cannot buy your own relic");
        
        address seller = ownerOf(_tokenId);
        uint256 creatorRoyalty = (msg.value * CREATOR_ROYALTY) / 10000;
        uint256 platformFee = (msg.value * PLATFORM_FEE) / 10000;
        uint256 sellerProceeds = msg.value - creatorRoyalty - platformFee;
        
        // Transfer NFT to buyer
        _transfer(seller, msg.sender, _tokenId);
        relic.isForSale = false;
        
        // Distribute payments
        payable(relic.creator).transfer(creatorRoyalty);
        payable(owner()).transfer(platformFee);
        payable(seller).transfer(sellerProceeds);
        
        emit RelicPurchased(_tokenId, msg.sender, msg.value);
    }
    
    /**
     * @dev List a relic for sale
     */
    function listRelic(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "Token does not exist");
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(_price > 0, "Price must be greater than 0");
        
        relics[_tokenId].price = _price;
        relics[_tokenId].isForSale = true;
        
        emit RelicListed(_tokenId, _price);
    }
    
    /**
     * @dev Cancel listing
     */
    function cancelListing(uint256 _tokenId) public {
        require(_exists(_tokenId), "Token does not exist");
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        
        relics[_tokenId].isForSale = false;
    }
    
    /**
     * @dev Verify a creator
     */
    function verifyCreator(address _creator) public onlyOwner {
        verifiedCreators[_creator] = true;
        emit CreatorVerified(_creator);
    }
    
    /**
     * @dev Get all relics
     */
    function getAllRelics() public view returns (uint256[] memory) {
        uint256 totalSupply = _tokenIdCounter.current();
        uint256[] memory tokenIds = new uint256[](totalSupply);
        
        for (uint256 i = 0; i < totalSupply; i++) {
            tokenIds[i] = i;
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Get relics for sale
     */
    function getRelicsForSale() public view returns (uint256[] memory) {
        uint256 totalSupply = _tokenIdCounter.current();
        uint256 count = 0;
        
        // Count relics for sale
        for (uint256 i = 0; i < totalSupply; i++) {
            if (relics[i].isForSale && _exists(i)) {
                count++;
            }
        }
        
        uint256[] memory forSale = new uint256[](count);
        uint256 index = 0;
        
        // Populate array
        for (uint256 i = 0; i < totalSupply; i++) {
            if (relics[i].isForSale && _exists(i)) {
                forSale[index] = i;
                index++;
            }
        }
        
        return forSale;
    }
    
    /**
     * @dev Get creator's tokens
     */
    function getCreatorTokens(address _creator) public view returns (uint256[] memory) {
        return creatorTokens[_creator];
    }
    
    /**
     * @dev Check if a token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    /**
     * @dev Get current token counter
     */
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}