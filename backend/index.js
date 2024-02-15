const config = require("./configuration/config")
const express = require("express");
const app = express();


app.listen(config.PORT, () => {
    console.log("Server is up and running on port 5001");
})