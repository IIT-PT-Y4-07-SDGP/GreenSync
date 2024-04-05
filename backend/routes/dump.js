const DumpController = require("../controllers/dumpController");

const express = require("express");
const router = express.Router();

router.get("/find-by-id/:dumpId", DumpController.findDumpById);

router.get("/find-all-dumps", DumpController.findAllDumps);

router.post("/create-dump", DumpController.createDump);

router.put("/update-dump/:dumpId", DumpController.updateDump);

//FROM DRIVER SIDE
router.patch("/delete-dump/:dumpId", DumpController.deleteDump);

router.post(
  "/find-price-by-qty/:dumpName",
  DumpController.findDumpPriceByQTYAndName
);

module.exports = router;
