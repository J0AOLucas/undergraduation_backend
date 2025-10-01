const express = require('express');
const router = express.Router();
const InteractionController = require('../controllers/InteractionController');

router.get('/', InteractionController.list);
router.get('/:id', InteractionController.get);

module.exports = router;