const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexController');

router.get('/', indexController.getHome);
router.get('/login', indexController.getLogin);
router.get('/logout', indexController.getLogout);
router.get('/register', indexController.getRegister);

router.post('/login', indexController.postLogin);
router.post('/register', indexController.postRegister);
router.post('/searchbook', indexController.postSearchBook);

module.exports = router;