const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const upload = require("../util/multer-upload");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");
const { userUpdateSchema,  bookSchema,  bookupDateSchema } = require("../models/validationSchema");
const { verify_user, verify_modifier } = require("../middleware/access_control");

router.use(auth);

router.get("/:userId", verify_user, userController.getProfile);
router.patch("/:userId", verify_user, validator(userUpdateSchema), userController.updateProfile);
router.get("/:userId/books", verify_user, userController.getUserBooks);
router.get("/:userId/books/:bookId", verify_user, verify_modifier, userController.getUsersSingleBook);
router.post("/:userId/books", verify_user, upload.single("image"), validator(bookSchema), userController.postAddbook);
router.patch("/:userId/books/:bookId", verify_user, verify_modifier, upload.single("image"),validator(bookupDateSchema), userController.EditBook);
router.delete("/:userId/books/:bookId",verify_user,verify_modifier,userController.RemoveBook);

module.exports = router;
