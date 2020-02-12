const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const auth = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');

router.use([auth, errorHandler]);

router.get('/alluser', adminController.getAllUser);
router.get('/allbook', adminController.getAllBook);
router.get('/removeuser/:userId', adminController.getRemoveUser);
router.get('/removebook/:bookId', adminController.getRemoveBook);

module.exports = router;