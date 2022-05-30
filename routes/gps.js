const express = require('express');
const { getLatLng } = require('../controllers/gps');

const router = express.Router();

router.get('/:digitalAddress', getLatLng);

module.exports = router;
