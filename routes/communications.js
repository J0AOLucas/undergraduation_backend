const express = require('express');
const router = express.Router();
const CommunicationController = require('../controllers/CommunicationController');

router.get('/', CommunicationController.list);
router.get('/:id', CommunicationController.get);
router.post('/', CommunicationController.create);
router.put('/:id', CommunicationController.update);
router.delete('/:id', CommunicationController.delete);
module.exports = router;