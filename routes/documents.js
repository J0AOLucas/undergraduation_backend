var express = require('express');
var router = express.Router();
const DocumentController = require('../controllers/DocumentController');

router.get('/', DocumentController.list);
router.get('/:id', DocumentController.get);

module.exports = router;