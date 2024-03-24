//import ethers from "ethers";
const ethers = require('ethers');
const GreenSync_ABI = require("./GreenSync-ABI");
//import { GreenSync_ABI } from "./GreenSync-ABI";

// GreenSync contract address - proxy address
const greenSyncAddress = "0x5b9D99037ccEc5868faa74098B7D11cBc4782d62"
class GreenSyncHelper {
    async getGreenSyncContract (signer) {
 
        return new ethers.Contract(greenSyncAddress, GreenSync_ABI, signer);
    }
}

module.exports = GreenSyncHelper;