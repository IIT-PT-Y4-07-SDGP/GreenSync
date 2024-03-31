const { ethers } = require('ethers');

const eventsModel = require('../models/eventsModel');
const userModel = require('../models/userModel');
const UserService = require('./userService');
const WalletService = require('./walletService');
const GreenSyncHelper = require('../blockchain/greensync-helper');


const userService = new UserService() 
const walletService = new WalletService()
const greenSyncHelper = new GreenSyncHelper()
class RewardService {
       
    // Reward points to user
    async redeemPoints(userId, points) {

        
        const userData = await userService.getUserById(userId)
        const wallet = await walletService.getWalletByUserId(userId);
        if(!wallet){
            throw new Error("Wallet not found");
        }
        if(!userData){
            throw new Error("User not found");
        }
        
        let remainder = userData.points % 100;
        let adjustedPoints = userData.points - remainder;

        if(userData.adjustedPoints < 100){
            throw new Error("Insufficient points");
        }

        // Blockchain call
        const provider = new ethers.JsonRpcProvider("https://public.stackup.sh/api/v1/node/polygon-mumbai");

        // Get the signer
         const signer = new ethers.Wallet(process.env.ADMIN_WALLET_PK, provider);
         console.log("Signer : ", signer.address)

         // Get the GreenSync contract
        const GreenSyncContract = await greenSyncHelper.getGreenSyncContract(signer);
        console.log("Minting Token");
        try {
            const feedata = await provider.getFeeData();

            //`https://mumbai.polygonscan.com/tx/${transactionHash}`  <--- frontend print this

            // Mint the token
            const mintToken = await GreenSyncContract.mint(wallet.publicKey, adjustedPoints);
       
            // If minting is successful, update the user's points and token balance
            if(mintToken){
                await mintToken.wait();
                console.log("Redeemed Transaction : ", mintToken);
                console.log(mintToken.hash);

                // Update the user's points and token balance
                const tokenBalance = await GreenSyncContract.balanceOf(wallet.publicKey);
                const GSCBalance = ethers.formatEther(tokenBalance)

                // Update the user's points and token balance
                await userModel.updateOne({_id: userId},{points: remainder, tokenBalance: GSCBalance})
                return {
                    message: "Points redeemed successfully",
                    points: remainder,
                    transactionHash: mintToken.hash
                }
            }
        } catch (error) {
            throw new Error( error);
        }
       


    }
}

module.exports = RewardService;