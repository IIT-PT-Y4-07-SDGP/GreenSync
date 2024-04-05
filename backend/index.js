// Importing libraries
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middlewares/requireAuth");

// Getting the configuration values
const config = require("./configuration/config");

// Importing the routes
const userRoute = require("./routes/user");
const prcRoute = require("./routes/prc");
const eventsRoute = require("./routes/events");
const mcRoute = require("./routes/mc");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const dumpRouter = require("./routes/dump");
const pickupRouter = require("./routes/pickup");

// Importing Controllers and creating instance
const UserController = require("./controllers/userController");
const PRCController = require("./controllers/PRCController");
const MCController = require("./controllers/MCController");
require("./controllers/PRCDriverController");
// Initiating Express
const app = express();
const port = "5001";

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:4200", 
      "https://dev.greensync.com.lk", // Dev Environment 
      "https://greensync.com.lk", //  Prod Environment
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// These route section doesn't require token authentication
app.use("/auth", authRouter);
app.post("/user/registration", UserController.userRegistration);
app.post("/prc/registration", PRCController.PRCRegistration);
app.post("/mc/registration", MCController.MCRegistration);

// Main route and the sub routes
app.use("/admin", adminRouter);
app.use("/user", userRoute);
app.use("/prc", prcRoute);
app.use("/mc", mcRoute);
app.use("/events", eventsRoute);
app.use("/dump", dumpRouter);
app.use("/pickup", pickupRouter);
app.use(requireAuth);

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
