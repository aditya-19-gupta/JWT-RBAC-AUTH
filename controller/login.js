const user=require("../models/db");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const login=async(req,res)=>{
    try{
        const{username,password}=req.body;
        const data=await user.findOne({username});
        if(!data){
            return res.status(404).json({message:"not user found"});
        }
        const ismatch=await bcrypt.compare(password,data.password);
        if(!ismatch){
            return res.status(404).json({status:"password invalid"});
        }

        const token=jwt.sign({id:data._id,role:data.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        return res.status(200).json({ token });
    }
    catch(err){
        return res.status(401).json({message:"error occured",error:err.message});
    }

}
module.exports=login;