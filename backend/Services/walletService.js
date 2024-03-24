const Wallet = require('../models/walletModel');
const User = require('../models/userModel');
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

// Import required modules
class WalletService {
// Create a new wallet
async createWallet (userId, EOAWallet) {
    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Create a new wallet
        const wallet = new Wallet({
            userId: user._id,
            privateKey: EOAWallet.privateKey,
            publicKey: EOAWallet.address,
        });

        // Save the wallet
        await wallet.save();

        return wallet;
    } catch (error) {
        throw new Error(`Failed to create wallet: ${error.message}`);
    }
};

// Get a wallet by user ID
async getWalletByUserId (userId) {
    try {
        // Find the wallet associated with the user
        const wallet = await Wallet.findOne({ userId: userId });

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        return wallet;
    } catch (error) {
        throw new Error(`Failed to get wallet: ${error.message}`);
    }
};



// Delete a wallet by ID
async deleteWallet (walletId) {
    try {
        // Find the wallet by ID and delete it
        const wallet = await Wallet.findByIdAndDelete(walletId);

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        return wallet;
    } catch (error) {
        throw new Error(`Failed to delete wallet: ${error.message}`);
    }
};
}


module.exports = WalletService