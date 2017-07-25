const express = require('express');

const ping = require('./ping');
const notification = require('./notification');

const router = express.Router();

router.use('/ping', ping);
router.use('/notification', notification);

module.exports = router;
