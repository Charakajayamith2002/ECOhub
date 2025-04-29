const express = require('express');
const { getDiseaseDetails } = require('../Controllers/moreDetails.controller');

const router = express.Router();

router.post('/more-details', getDiseaseDetails);

module.exports = router;
