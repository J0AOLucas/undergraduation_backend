var express = require('express');
var router = express.Router();
const UniversityController = require('../controllers/UniversityController');

router.get('/', UniversityController.list);
router.get('/:id', UniversityController.get);

module.exports = router;