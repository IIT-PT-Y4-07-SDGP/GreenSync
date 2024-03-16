const AdminController = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.post("/registration", AdminController.adminRegistration);
router.put("/update/:id", AdminController.updateAdminDetails);
router.post("/approve/business", AdminController.approveBusiness);

module.exports = router;

