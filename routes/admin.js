const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const auth = require('../middleware/auth');
const {checkAdmin} = require('../middleware/access_control');

router.use([auth, checkAdmin]);

router.get('/users', adminController.getAllUser);
router.get('/users/:userId', adminController.getSingleUser);
router.get('/books', adminController.getAllBook);
router.get('/books/:bookId', adminController.getSingleBook);

router.delete('/users/:userId', adminController.RemoveUser);
router.delete('/books/:bookId', adminController.RemoveBook);

module.exports = router;