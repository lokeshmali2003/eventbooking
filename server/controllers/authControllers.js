const User = require('../models/User');

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
        const user = new user ({name, email, Password});
        await user.save();
        res.status(201).json({message:'user registered Successfuly'});

         const otp = Math.floor(100000 + Math.random()*900000).toString();
         console.log(`OTP For ${email}: ${otp} `);


    }catch (error){
        res.status(400).json({error: error.message});
    }
};