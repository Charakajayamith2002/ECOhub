// routes/diseaseRoutes.js
const express = require('express');
const multer = require('multer');
const {detectDisease} = require('../Controllers/disease.controller');

const router = express.Router();
const upload = multer();  // Multer middleware for handling file uploads

router.post('/detect-disease', upload.single('image'), detectDisease);

module.exports = router;
