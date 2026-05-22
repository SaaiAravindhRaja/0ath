// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {OathReceipt} from "../src/OathReceipt.sol";

contract DeployOathReceipt is Script {
    function run() external returns (OathReceipt receipt) {
        vm.startBroadcast();
        receipt = new OathReceipt();
        vm.stopBroadcast();
    }
}
