// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {OathReceipt} from "../src/OathReceipt.sol";

contract OathReceiptTest is Test {
    OathReceipt receipt;

    function setUp() public {
        receipt = new OathReceipt();
    }

    function testRecordReceiptEmits() public {
        vm.expectEmit(true, true, false, true);
        emit OathReceipt.ReceiptRecorded(bytes32("oath"), bytes32("receipt"), "fulfilled", bytes32("evidence"), bytes32("reasoning"), bytes32("ledger"), block.timestamp);
        receipt.recordReceipt(bytes32("oath"), bytes32("receipt"), "fulfilled", bytes32("evidence"), bytes32("reasoning"), bytes32("ledger"));
    }
}
