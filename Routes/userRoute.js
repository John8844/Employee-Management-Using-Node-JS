const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");

//const { addUserValidation } = require("../Validation/employeeValidation");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;