const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexController');
const validator = require('../middleware/validator');

router.get('/', indexController.getHome);
// router.get('/login', indexController.getLogin);
// router.get('/logout', indexController.getLogout);
// router.get('/register', indexController.getRegister);

router.post('/login', validator.loginFormValidate, indexController.postLogin);
router.post('/register', validator.regFormValidate, indexController.postRegister);
// router.post('/searchbook', indexController.postSearchBook);

module.exports = router;