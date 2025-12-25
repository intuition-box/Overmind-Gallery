// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OvermindNFT
 * @dev Sacred relics of the digital realm - NFT collection for The Overmind Gallery
 */
contract OvermindNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId = 1;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) public tokenCreator;
    
    // Mapping from creator to their verified status
    mapping(address => bool) public verifiedCreators;
    
    // Mapping from token ID to relic power (mystical attribute)
    mapping(uint256 => uint256) public relicPower;
    
    // Events
    event RelicMinted(uint256 indexed tokenId, address indexed creator, address indexed to, string uri);
    event CreatorVerified(address indexed creator);
    event RelicPowerSet(uint256 indexed tokenId, uint256 power);
    
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {
        // Set the contract deployer as verified creator
        verifiedCreators[msg.sender] = true;
    }
    
    /**
     * @dev Mint a new sacred relic (only verified creators or owner)
     * @param to The address to receive the relic
     * @param uri The metadata URI for the relic
     * @param power The mystical power level of the relic (0-1000)
     */
    function mintRelic(
        address to,
        string memory uri,
        uint256 power
    ) public returns (uint256) {
        require(to != address(0), "Cannot mint to zero address");
        require(bytes(uri).length > 0, "URI cannot be empty");
        require(verifiedCreators[msg.sender] || msg.sender == owner(), "Only verified creators can mint relics");
        require(power <= 1000, "Power level cannot exceed 1000");
        
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, uri);
        
        tokenCreator[newTokenId] = msg.sender;
        relicPower[newTokenId] = power;
        
        emit RelicMinted(newTokenId, msg.sender, to, uri);
        emit RelicPowerSet(newTokenId, power);
        
        return newTokenId;
    }
    
    /**
     * @dev Verify a creator (only owner can verify)
     * @param creator The address to verify
     */
    function verifyCreator(address creator) public onlyOwner {
        verifiedCreators[creator] = true;
        emit CreatorVerified(creator);
    }
    
    /**
     * @dev Revoke creator verification (only owner can revoke)
     * @param creator The address to revoke verification from
     */
    function revokeCreatorVerification(address creator) public onlyOwner {
        verifiedCreators[creator] = false;
    }
    
    /**
     * @dev Get the creator of a relic
     * @param tokenId The token ID to query
     */
    function getCreator(uint256 tokenId) public view returns (address) {
        require(_ownerOf(tokenId) != address(0), "Relic does not exist");
        return tokenCreator[tokenId];
    }
    
    /**
     * @dev Get the power level of a relic
     * @param tokenId The token ID to query
     */
    function getPower(uint256 tokenId) public view returns (uint256) {
        require(_ownerOf(tokenId) != address(0), "Relic does not exist");
        return relicPower[tokenId];
    }
    
    /**
     * @dev Check if a creator is verified
     * @param creator The address to check
     */
    function isVerifiedCreator(address creator) public view returns (bool) {
        return verifiedCreators[creator];
    }
    
    /**
     * @dev Get the total number of relics minted
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }
    
    /**
     * @dev Override tokenURI to support IPFS and custom metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Relic does not exist");
        return super.tokenURI(tokenId);
    }
}