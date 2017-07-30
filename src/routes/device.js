const express = require('express');

const device = require('../db/device');
const validate = require('../middleware/validate');
const router = express.Router();

router.get('/', validate.query(['userId']), (req, res, next) => device.find(req.query.userId, data => res.json(data), next));

router.post('/', validate.body(['userId']), (req, res, next) => device.new(req.body.userId, data => res.json(data), next));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => res.status(err.status ? err.status : 500).json({ error: err }));

module.exports = router;
