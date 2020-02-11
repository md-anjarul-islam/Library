const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const path = require('path');
const upload = require('../util/multer-upload');
const auth = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');

router.use([auth, errorHandler]);
// router.use();

router.get('/profile', userController.getProfile);
router.get('/editprofile/:userId', userController.getEditProfile);
router.get('/addbooks', userController.getAddbook);
router.get('/dashboard', userController.getDashboard);

router.post('/saveprofile/:userId', userController.postSaveProfile);
router.post('/addbooks', upload.single('image'), userController.postAddbook);
router.post('/editbook/:bookId', upload.single('image'), userController.postEditBook);
router.get('/removebook/:bookId', userController.getRemoveBook);

module.exports = router;