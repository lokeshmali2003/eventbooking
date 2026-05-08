const express = require("express");
const router = express.Router();

const { registerUser ,loginUser, getUser, updateUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.get("/getUser",protect, getUser);
router.post("/login", loginUser); 
router.put("/updateUser/:id", updateUser); 

module.exports = router;