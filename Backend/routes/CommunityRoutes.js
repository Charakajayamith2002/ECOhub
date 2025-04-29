const express = require("express");
const router = express.Router();


//Insert Controller
const InventoryController = require("../Controllers/CommunityControllers");

router.get("/", InventoryController.getAllInventory);
router.post("/", InventoryController.addInventory);
router.get("/:id", InventoryController.getById);
router.put("/:id", InventoryController.updateInventory);
router.delete("/:id", InventoryController.deleteInventory);

//export
module.exports = router;