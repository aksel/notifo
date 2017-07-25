const express = require('express');

const notification = require('../db/notification');

const router = express.Router();

router.get('/', (req, res, next) => notification.all(notifications => res.json({ notifications }), next));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => res.status(err.status ? err.status : 500).json({ error: err }));

module.exports = router;
