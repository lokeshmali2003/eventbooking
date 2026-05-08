const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ DB me check karo user exist karta hai ya nahi
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      req.user = decoded.id;
      next();

    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};

module.exports = protect;