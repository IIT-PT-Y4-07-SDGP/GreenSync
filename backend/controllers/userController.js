const { ethers } = require("ethers");
const RewardService = require("../Services/rewardService");
const UserService = require("../Services/userService");
const WalletService = require("../Services/walletService");
const userModel = require("../models/userModel");
const user = new UserService();
const wallet = new WalletService();
const reward = new RewardService();
class UserController{
    // User Registration
    static async userRegistration (req,res, next) {
        try{
            const newUserAccount = await user.userRegister(req.body, res);
            // wallet creation
            // Generate a new wallet using ethers wallet
            const EOAWallet = ethers.Wallet.createRandom();

            // Save the wallet address and private key to the user's account or database
            const savedWallet = await wallet.createWallet(newUserAccount._id, EOAWallet)
            return res.status(200).json({...newUserAccount,...savedWallet});
        }
        catch(error){
            res.status(400).json({error:error.message})
            next(error)
        }
    }

    static async updateUserDetails(req, res) {
        try {
            const {id} = req.params;
            const updatedDetails = req.body;

            // Call the updateUserDetails method from the UserService
            const updatedUser = await user.updateUser(id, updatedDetails);

            return res.status(200).json({ updatedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const {id} = req.params;

            // Call the updateUserDetails method from the UserService
            const deletedUser = await user.deleteUser(id);

            return res.status(200).json({ deletedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async redeemPoints(req, res, next) {
        try {
            const {userId} = req.body;
            const userData = await userModel.findById(userId);
            if(!userData){
                res.status(404).json({error: "User not found"})
            }
            // Call the redeemPoints method from the RewardService
            const redeemedPoints = await reward.redeemPoints(userId, userData.points);

            // Send the updated user details in the response
            return res.status(200).json({ redeemedPoints });
        } catch (error) {
            res.status(400).json({ error: error.message });
            next(error);
        }
    
    }
}

// Export the controller
module.exports = UserController;