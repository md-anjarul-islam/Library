const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexController');
const validator = require('../middleware/validator');

router.get('/', indexController.getHome);
router.post('/login', validator.loginFormValidate, indexController.login);
router.post('/register', validator.regFormValidate, indexController.register);
router.get('/books', indexController.getAllBooks);
router.get('/books/:bookId', indexController.getSingleBook);

module.exports = router;