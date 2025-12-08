// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

/**
    @title ERC-1155 Multi Token Receiver
    @dev See https://eips.ethereum.org/EIPS/eip-1155
*/
interface IERC1155TokenReceiver {
    /**
        @dev Handles the receipt of a single ERC1155 token type. This function is
        called at the end of a `safeTransferFrom` after the balance has been updated.
        To accept the transfer, this must return
        `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
        (i.e. 0xf23a6e61, or its own function selector).
        @param _operator The address which initiated the transfer (i.e. msg.sender)
        @param _from The address which previously owned the token
        @param _id The ID of the token being transferred
        @param _value The amount of tokens being transferred
        @param _data Additional data with no specified format
        @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
    */
    function onERC1155Received(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external returns (bytes4);

    /**
        @dev Handles the receipt of a multiple ERC1155 token types. This function
        is called at the end of a `safeBatchTransferFrom` after the balances have
        been updated. To accept the transfer(s), this must return
        `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
        (i.e. 0xbc197c81, or its own function selector).
        @param _operator The address which initiated the batch transfer (i.e. msg.sender)
        @param _from The address which previously owned the token
        @param _ids An array containing ids of each token being transferred (order and length must match _values array)
        @param _values An array containing amounts of each token being transferred (order and length must match _ids array)
        @param _data Additional data with no specified format
        @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
    */
    function onERC1155BatchReceived(
        address _operator,
        address _from,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external returns (bytes4);
}