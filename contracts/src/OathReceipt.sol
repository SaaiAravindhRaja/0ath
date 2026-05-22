// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OathReceipt {
    event ReceiptRecorded(
        bytes32 indexed oathHash,
        bytes32 indexed receiptHash,
        string status,
        bytes32 evidenceHash,
        bytes32 reasoningHash,
        bytes32 ledgerHash,
        uint256 timestamp
    );

    function recordReceipt(
        bytes32 oathHash,
        bytes32 receiptHash,
        string calldata status,
        bytes32 evidenceHash,
        bytes32 reasoningHash,
        bytes32 ledgerHash
    ) external {
        emit ReceiptRecorded(oathHash, receiptHash, status, evidenceHash, reasoningHash, ledgerHash, block.timestamp);
    }
}
