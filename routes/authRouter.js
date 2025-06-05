const express = require("express");
const router = express.Router();
const controllers = require("./../controllers/authController");

router.route("/signup").post(controllers.signup);

module.exports = router;
