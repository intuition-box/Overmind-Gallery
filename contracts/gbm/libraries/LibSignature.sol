// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibSignature {
    function isValid(
        bytes32 messageHash,
        bytes memory signature,
        bytes memory pubKey
    ) internal pure returns (bool) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        if (signature.length != 65) {
            return false;
        }

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return false;
        }

        address recoveredAddress = ecrecover(messageHash, v, r, s);

        return (recoveredAddress == address(uint160(uint256(keccak256(pubKey)))));
    }
}