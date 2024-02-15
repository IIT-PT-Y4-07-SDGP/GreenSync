const config = require("./configuration/config")
const express = require("express");
const app = express();


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})