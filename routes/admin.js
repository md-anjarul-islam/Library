const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const auth = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');
const access_control = require('../middleware/access_control');

router.use([auth, access_control.checkAdmin, errorHandler]);

router.get('/users', adminController.getAllUser);
router.get('/users/:userId', adminController.getSingleUser);
router.get('/books', adminController.getAllBook);
router.get('/books/:bookId', adminController.getSingleBook);

router.delete('/removeuser/:userId', adminController.RemoveUser);
router.delete('/removebook/:bookId', adminController.RemoveBook);

module.exports = router;