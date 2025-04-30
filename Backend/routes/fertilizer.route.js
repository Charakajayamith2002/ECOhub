// routes/fertilizerRoutes.js

//Import required modules
const express = require('express');
const multer = require('multer');
const {
    addFertilizer,
    getAllFertilizers,
    updateFertilizer,
    deleteFertilizer,
    getFertilizerById,
} = require('../Controllers/fertilizerController');

const router = express.Router();//Create an Express router
const upload = multer({ dest: 'uploads/' }); // Temporary storage

router.post('/fertilizers', upload.single('image'), addFertilizer);
router.get('/getsingleFertilizer/:id', getFertilizerById)
router.get('/fertilizers', getAllFertilizers);
router.put('/fertilizers/:id', upload.single('image'), updateFertilizer);
router.delete('/fertilizers/:id', deleteFertilizer);

module.exports = router;
