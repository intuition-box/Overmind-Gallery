// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../libraries/AppStorage.sol";
import "../libraries/LibDiamond.sol";

/**
 * @title EmergencyFacet
 * @dev Emergency pause functionality for the GBM Diamond contract
 * Provides global pause controls and emergency withdrawal capabilities
 */
contract EmergencyFacet is Modifiers {

    // Events
    event EmergencyPaused(address indexed caller);
    event EmergencyUnpaused(address indexed caller);
    event EmergencyWithdraw(address indexed token, address indexed recipient, uint256 amount);

    /**
     * @dev Emergency pause all bidding and claiming operations
     * Can only be called by contract owner
     */
    function emergencyPause() external onlyOwner {
        s.paused = true;
        emit EmergencyPaused(msg.sender);
    }

    /**
     * @dev Resume normal operations after emergency pause
     * Can only be called by contract owner
     */
    function emergencyUnpause() external onlyOwner {
        s.paused = false;
        emit EmergencyUnpaused(msg.sender);
    }

    /**
     * @dev Check if the contract is currently paused
     */
    function paused() external view returns (bool) {
        return s.paused;
    }

    /**
     * @dev Emergency withdrawal of accidentally sent tokens
     * Only callable by owner, requires proof of accidental transfer
     * @param token The token contract address (use address(0) for ETH)
     * @param recipient The address to send tokens to
     * @param amount The amount to withdraw
     */
    function emergencyWithdraw(
        address token,
        address recipient,
        uint256 amount
    ) external onlyOwner {
        require(recipient != address(0), "emergencyWithdraw: cannot send to zero address");
        require(amount > 0, "emergencyWithdraw: amount must be greater than 0");

        if (token == address(0)) {
            // ETH withdrawal
            (bool success,) = payable(recipient).call{value: amount}("");
            require(success, "emergencyWithdraw: ETH transfer failed");
        } else {
            // ERC20 withdrawal
            (bool success,) = token.call(
                abi.encodeWithSignature("transfer(address,uint256)", recipient, amount)
            );
            require(success, "emergencyWithdraw: token transfer failed");
        }

        emit EmergencyWithdraw(token, recipient, amount);
    }

    /**
     * @dev Get contract ETH balance (for emergency monitoring)
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get token balance of contract (for emergency monitoring)
     * @param token The token contract address
     */
    function getTokenBalance(address token) external view returns (uint256) {
        (bool success, bytes memory data) = token.staticcall(
            abi.encodeWithSignature("balanceOf(address)", address(this))
        );
        require(success, "getTokenBalance: balance check failed");
        return abi.decode(data, (uint256));
    }

    // Receive function for ETH transfers
    receive() external payable {}
}