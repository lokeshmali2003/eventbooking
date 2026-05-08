const express = require("express");
const router = express.Router();

const { registerUser , getUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.get("/getUser", getUser);

module.exports = router;