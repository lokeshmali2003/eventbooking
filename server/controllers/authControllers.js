const User = require('../models/User');
const { sendOtpEmail } = require('../utils/email');

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