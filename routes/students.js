var express = require('express');
var router = express.Router();
const StudentController = require('../controllers/StudentController');

router.get('/', StudentController.list);
router.get('/:id', StudentController.get);
router.post('/', StudentController.create);
router.put('/:id', StudentController.update);

module.exports = router;


