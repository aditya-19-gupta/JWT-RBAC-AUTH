const jwt=require("jsonwebtoken");
const user=require("../models/db");
const bcrypt=require("bcryptjs");
const refresh=async(req,res)=>{
    try{
        let token;
        let authheader =
        req.headers.Authorization || req.headers.authorization;

        if(authheader&&authheader.startsWith("Bearer")){
            token=authheader.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({message:"token is invalid"});
        }    
        let decode=jwt.verify(token,process.env.REFERESH_JWT_SECRET);
        const data=await user.findById(decode.id);

        if(!data){
            return res.json({message:"user no found"});
        }
        let newtoken=jwt.sign({id:data._id,role:data.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        return res.status(201).json({newtoken});
    }
    catch(err){
        return res.status(401).json({status:"error occured"});
    }
}
module.exports=refresh;