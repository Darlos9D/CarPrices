'use strict'

const express = require('express');
const router = express.Router();
const cars = require('../controllers/carsController');

router.get('/makes', cars.makes);
router.get('/models/:make', cars.models);
router.get('/value/:make-:model-:age-months-:owners-owners', cars.value);

module.exports = router;
