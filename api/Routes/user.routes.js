const express = require("express");
const router = express.Router();
const { newUserController, login } = require("../Controller/signup.controller");
const upload = require("../middleware/multer");

router.post("/signup", upload.single("profileImage"), newUserController);
router.post("/login", login);

module.exports = router;
