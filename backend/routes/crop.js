const express = require("express");
const router = express.Router();
const cropController = require("../Controllers/crop.controller");

router.post("/create", cropController.createCrop);

router.put("/edit-crops/:id", cropController.editCrop);

router.get("/all-crops", cropController.getAllCrops);

router.delete("/delete-crop/:id", cropController.deleteCrop);

module.exports = router;