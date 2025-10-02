var express = require('express');
var router = express.Router();
const StudentController = require('../controllers/StudentController');
const authMiddleware = require('../src/middlewares/AuthMiddleware');

// Apply authentication to all routes
router.use(authMiddleware);

router.get('/', StudentController.list);
router.get('/:id', StudentController.get);
router.post('/', StudentController.create);
router.put('/:id', StudentController.update);

module.exports = router;


