const config = require("./configuration/config");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const port = "5001";
    
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