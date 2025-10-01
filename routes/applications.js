const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');

router.get('/', ApplicationController.list);
router.get('/:id', ApplicationController.get);

module.exports = router;