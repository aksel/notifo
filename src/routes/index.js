const express = require('express');

const ping = require('./ping');
const notification = require('./notification');
const device = require('./device');

const router = express.Router();

router.use('/ping', ping);
router.use('/notification', notification);
router.use('/device', device);

module.exports = router;
