const User = require('../models/User');

//register User

exports.registerUser = async (req, res)=>{
    const {name, email, Password }= req.body;
    try{
        const user = new user ({name, email, Password});
        await user.save();
        res.status(201).json({message:'user registered Successfuly'});
    }catch (error){
        res.status(400).json({error: error.message});
    }
};