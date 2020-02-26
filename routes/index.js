const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");
const validator = require("../middleware/validator");
const { loginSchema, registrationSchema } = require("../models/validationSchema");

router.get("/", indexController.getHome);
router.post("/login", validator(loginSchema), indexController.login);
router.post("/register", validator(registrationSchema),indexController.register);
router.get("/books", indexController.getAllBooks);
router.get("/books/:bookId", indexController.getSingleBook);

module.exports = router;
