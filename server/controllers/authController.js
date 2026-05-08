const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    // user check karo
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // password match karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // token banao
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async(req,res) =>{
    try{
        console.log("PUT Request")
        const {id} = req.params;
        const {firstName, lastName , email, phone,Company ,JobTitle } = req.body;

        const updateUser = await User.findByIdAndUpdate(id,{firstName, lastName , email, phone,Company ,JobTitle}, {new:true});

        if(!updateUser){
            return res.status(404).json({
                success: false,
                message:"cannot find User"
            })
        }

        res.status(200).json({
            success: true,
            User: updateUser
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: err.message
        })
    }
}