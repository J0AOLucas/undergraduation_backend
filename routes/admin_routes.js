var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../src/middlewares/AuthMiddleware');

router.use(authMiddleware);

router.get('/', AdminController.list);
router.get('/:id', AdminController.get);

module.exports = router;