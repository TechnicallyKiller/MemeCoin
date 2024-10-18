// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "forge-std/Scripts.sol";
import {MemeCoinNFT}  from "../src/contract1.sol";

contract deploySmartContract is Script {
    function run() external returns (FundMe) {
        vm.startBroadcast();
        MemeCoinNFT memcoin= new MemeCoinNFT();
        
        vm.stopBroadcast();
        return fundme;
    }

}