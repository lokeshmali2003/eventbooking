const User = require('../models/User');
const { sendOtpEmail } = require('../utils/email');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const {sendOtpEmail} = require('../utils/email')
const generateToken = (id, role)=>{
    return jwt.sign({id, role}, process.env, JWT_SECRET, {expiresIn: '7d'});
}

//register User

exports.registerUser = async (req, res)=>{
    const {name, email, Password }= req.body;

     let userExists = await User.findOne({email});
     if(userExists){
        return res.status(400).json({error: 'User Already Exists'});
     }

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(Password, salt);

    try{
        const user = new user.create ({name, email, Password: hashedPassword , role: 'user' , isVerified: false  });

         const otp = Math.floor(100000 + Math.random()*900000).toString();
         console.log(`OTP For ${email}: ${otp} `);
         await OTP.create({email, otp, action:'account_verification'});
         await sendOtpEmail(email, otp, 'account_verification');

          res.status(201).json({message:'user registered Successfuly. Please check Your Email for  OTP to Verify Your Account.',
           email: user.email

          });



    }catch (error){
        res.status(400).json({error: error.message});
    }
};

//Login User

exports.loginUser = async(req,res)=>{
    const  {email, password} = req.body;
     
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error:'Invalid Credentials, Please Signup '});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({error:'Invalid Credentials'});
    }

    if(!user.isVerified && user.role === 'user'){
        const otp = Math.floor(100000 + Math.random()*900000).toString();
        await OTP.deleteMany({email, action: 'account_verification'}); // Remove Old OTPs 
        await OTP.create({email, otp, action: 'account_verification'});
        await sendOtpEmail(email, otp, 'account_verification');
        return res.status(400).json({
            error:'Account Not Verified. A new Otp has been Sent to Your Email.'
        });
    }
    

    res.json({
        message: 'Login Successfully',
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    })
};

//Verify OTP
exports.verifyotp = async(req,res) =>{
    const {email, otp} = req.body;
    const otpRecord = await OTP.findOne({email, otp, action: 'account_verification'});

    if(!otpRecord){
        return res.status(400).json({error: 'Invalid or Expired OTP'}); 
    }
    const user = await User.findOneAndUpdate({email},{isVerified: true});
    await OTP.deleteMany({email, action: 'account_verification'});
    res.json({
        
        message:'Account Verified Successfully. You can now log in.',
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)

    });
};