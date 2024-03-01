// Importing required libraries
const mongoose = require("mongoose");
const express = require("express");

// Getting the configuration values
const config = require("./configuration/config");

// Importing the routes
const userRoute = require("./routes/user");

// Initiating Express
const app = express();
const port = "5001";

app.use(express.json());
// Main route and the sub routes 
app.use("/user", userRoute);

// Verifying the connection to database and starting the server 
mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });