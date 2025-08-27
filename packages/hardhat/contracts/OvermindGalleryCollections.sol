// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./OvermindGallery.sol";

/**
 * @title OvermindGalleryCollections
 * @dev Manage curated collections of sacred relics from The Overmind Gallery
 */
contract OvermindGalleryCollections {
    struct Collection {
        string name;
        string description;
        address creator;
        uint256[] tokenIds;
        bool isActive;
        string coverImage;
    }
    
    mapping(uint256 => Collection) public collections;
    mapping(address => uint256[]) public creatorCollections;
    
    uint256 public collectionCounter;
    OvermindGallery public relicContract;
    
    event CollectionCreated(uint256 indexed collectionId, address indexed creator, string name);
    event RelicAddedToCollection(uint256 indexed collectionId, uint256 indexed tokenId);
    event CollectionUpdated(uint256 indexed collectionId);
    
    constructor(address _relicContract) {
        relicContract = OvermindGallery(_relicContract);
    }
    
    /**
     * @dev Create a new collection
     */
    function createCollection(
        string memory _name,
        string memory _description,
        string memory _coverImage
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        uint256 collectionId = collectionCounter++;
        
        collections[collectionId] = Collection({
            name: _name,
            description: _description,
            creator: msg.sender,
            tokenIds: new uint256[](0),
            isActive: true,
            coverImage: _coverImage
        });
        
        creatorCollections[msg.sender].push(collectionId);
        
        emit CollectionCreated(collectionId, msg.sender, _name);
        
        return collectionId;
    }
    
    /**
     * @dev Add a relic to a collection
     */
    function addRelicToCollection(uint256 _collectionId, uint256 _tokenId) public {
        require(_collectionId < collectionCounter, "Collection does not exist");
        require(collections[_collectionId].isActive, "Collection is not active");
        require(collections[_collectionId].creator == msg.sender, "Not collection owner");
        
        // Verify the sender owns the NFT
        require(relicContract.ownerOf(_tokenId) == msg.sender, "Not relic owner");
        
        collections[_collectionId].tokenIds.push(_tokenId);
        
        emit RelicAddedToCollection(_collectionId, _tokenId);
    }
    
    /**
     * @dev Get collection details
     */
    function getCollection(uint256 _collectionId) public view returns (
        string memory name,
        string memory description,
        address creator,
        uint256[] memory tokenIds,
        bool isActive,
        string memory coverImage
    ) {
        Collection memory collection = collections[_collectionId];
        return (
            collection.name,
            collection.description,
            collection.creator,
            collection.tokenIds,
            collection.isActive,
            collection.coverImage
        );
    }
    
    /**
     * @dev Get all collections
     */
    function getAllCollections() public view returns (uint256[] memory) {
        uint256[] memory allCollectionIds = new uint256[](collectionCounter);
        
        for (uint256 i = 0; i < collectionCounter; i++) {
            allCollectionIds[i] = i;
        }
        
        return allCollectionIds;
    }
    
    /**
     * @dev Get active collections
     */
    function getActiveCollections() public view returns (uint256[] memory) {
        uint256 count = 0;
        
        // Count active collections
        for (uint256 i = 0; i < collectionCounter; i++) {
            if (collections[i].isActive) {
                count++;
            }
        }
        
        uint256[] memory activeIds = new uint256[](count);
        uint256 index = 0;
        
        // Populate array
        for (uint256 i = 0; i < collectionCounter; i++) {
            if (collections[i].isActive) {
                activeIds[index] = i;
                index++;
            }
        }
        
        return activeIds;
    }
    
    /**
     * @dev Update collection metadata
     */
    function updateCollection(
        uint256 _collectionId,
        string memory _name,
        string memory _description,
        string memory _coverImage
    ) public {
        require(_collectionId < collectionCounter, "Collection does not exist");
        require(collections[_collectionId].creator == msg.sender, "Not collection owner");
        
        collections[_collectionId].name = _name;
        collections[_collectionId].description = _description;
        collections[_collectionId].coverImage = _coverImage;
        
        emit CollectionUpdated(_collectionId);
    }
    
    /**
     * @dev Deactivate a collection
     */
    function deactivateCollection(uint256 _collectionId) public {
        require(_collectionId < collectionCounter, "Collection does not exist");
        require(collections[_collectionId].creator == msg.sender, "Not collection owner");
        
        collections[_collectionId].isActive = false;
    }
}