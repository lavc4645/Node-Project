const express = require("express");
const router = express.Router();
const controller = require("../contollers/inventoryController");

router.post("/updateInventory", controller.updateInventory);
module.exports = router;
