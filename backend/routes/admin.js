const AdminController = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.post("/registration", AdminController.adminRegistration);
router.put("/update/:id", AdminController.updateAdminDetails);
router.patch("/approve/business", AdminController.approveBusiness);
router.patch("/restrict/gp", AdminController.restrictGP);

module.exports = router;

