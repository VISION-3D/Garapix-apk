// src/routes/statistics.routes.js
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const auth = require('../middleware/auth');

router.get('/', auth, statisticsController.getStatistics);
router.get('/export', auth, statisticsController.exportStatistics);

module.exports = router;