const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/ReminderController');

router.get('/', ReminderController.list);
router.get('/:id', ReminderController.get);
router.post('/', ReminderController.create);
router.put('/:id', ReminderController.update);
router.delete('/:id', ReminderController.delete);

module.exports = router;