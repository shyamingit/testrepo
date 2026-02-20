const express = require('express');
const auth = require('../middleware/auth');
const { summarizeDailyLog } = require('../controllers/aiController');

const router = express.Router();

router.post('/summarize-log', auth, summarizeDailyLog);

module.exports = router;
