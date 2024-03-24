const DumpController = require("../controllers/dumpController");

const express = require("express");
const router = express.Router();

router.get("/find-all-dumps", DumpController.findAllDumps);

router.post("/create-dump/:dumpId", DumpController.createDump);

router.put("/update-dump/:dumpId", DumpController.updateDump);

//FROM DRIVER SIDE
router.patch("/delete-dump/:dumpId", DumpController.deleteDump);

module.exports = router;
