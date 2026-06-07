// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OathReceipt {
    address public immutable recorder;

    event ReceiptRecorded(
        bytes32 indexed oathHash,
        bytes32 indexed receiptHash,
        string status,
        bytes32 evidenceHash,
        bytes32 reasoningHash,
        bytes32 ledgerHash,
        uint256 timestamp
    );

    error UnauthorizedRecorder(address caller);

    constructor(address authorizedRecorder) {
        recorder = authorizedRecorder == address(0) ? msg.sender : authorizedRecorder;
    }

    function recordReceipt(
        bytes32 oathHash,
        bytes32 receiptHash,
        string calldata status,
        bytes32 evidenceHash,
        bytes32 reasoningHash,
        bytes32 ledgerHash
    ) external {
        if (msg.sender != recorder) revert UnauthorizedRecorder(msg.sender);
        emit ReceiptRecorded(oathHash, receiptHash, status, evidenceHash, reasoningHash, ledgerHash, block.timestamp);
    }
}
