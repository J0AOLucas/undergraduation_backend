const express = require('express');
const router = express.Router();
const InternalNoteController = require('../controllers/InternalNoteController');

router.get('/', InternalNoteController.list);
router.get('/:id', InternalNoteController.get);
router.post('/', InternalNoteController.create);
router.put('/:id', InternalNoteController.update);
router.delete('/:id', InternalNoteController.delete);

module.exports = router;