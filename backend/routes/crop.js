const express = require("express");
const router = express.Router();
const cropController = require("../Controllers/crop.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); 

router.post("/create", upload.single("cropImage"), cropController.createCrop);

router.put('/edit-crops/:id', upload.single('cropImage'), cropController.editCrop);


router.get("/crop/:id", cropController.getCropById);


router.get("/all-crops", cropController.getAllCrops);

router.delete("/delete-crop/:id", cropController.deleteCrop);

module.exports = router;