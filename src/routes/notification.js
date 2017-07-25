const express = require('express');

const notification = require('../db/notification');
const validate = require('../middleware/validate');
const router = express.Router();

router.get('/', validate.query(['destination']), (req, res, next) => notification.find(req.query, data => res.json(data), next));

router.get('/all', (req, res, next) => notification.all(notifications => res.json({ notifications }), next));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => res.status(err.status ? err.status : 500).json({ error: err }));

module.exports = router;
