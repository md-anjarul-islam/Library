const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../util/multer-upload');
const auth = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');
const validator = require('../middleware/validator');
const access_control = require('../middleware/access_control');

router.use(auth);

router.get('/profile', userController.getProfile);
router.get('/books', userController.getUserBooks);
router.get('/books/:bookId', access_control.checkUserBook, userController.getUsersSingleBook);

router.post('/addbooks', upload.single('image'), validator.bookFormValidate, userController.postAddbook);

router.put('/updateprofile', userController.updateProfile);
router.put('/editbook/:bookId', access_control.checkUserBook, upload.single('image'), validator.bookFormValidate, userController.EditBook);

router.delete('/removebook/:bookId', access_control.checkUserBook, userController.RemoveBook);

module.exports = router;