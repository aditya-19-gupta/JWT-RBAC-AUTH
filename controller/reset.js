const jwt=require("jsonwebtoken");
const user=require("../models/db");
const bcrypt=require("bcryptjs");
const reset=async(req,res)=>{
    try{
        let token;
        let authheader=req.headers.authorization||req.headers.Authorization;
        if(authheader&&authheader.startsWith("Bearer ")){
            token=authheader.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({status:"invalid token"});
        }
        let decode=jwt.verify(token,process.env.RESET_JWT_SECRET);
        if(!decode){
            return res.status(401).json({status:"invalid token"});
        }
        const body=req.body;
        if(decode.purpose!=="password-reset"){
            return res.status(401).json({status:"invalide purpose"});
        }
        const data=await user.findById(decode.id);
        if(data.resettoken!==token){
            return res.status(401).json({status:"token not valid"});
        }
        let newpassword=body.password;
        data.password=newpassword;
        data.resettoken=null;
        await data.save();
        return res.status(200).json({status:"password change",message:"new password"});
    }
    catch(err){
        return res.status(401).json({status:"error"});
    }
}
module.exports=reset;