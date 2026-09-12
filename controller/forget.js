const jwt=require("jsonwebtoken");
const user=require("../models/db");
const forget=async(req,res)=>{
    try{
        const {username}=req.body;
        const data=await user.findOne({username});

        if(!data){
            return res.status(401).json({status:"no user name found"});
        }
        let token=jwt.sign({id:data._id,purpose:"password-reset"}
            ,process.env.RESET_JWT_SECRET,{expiresIn:"10m"});
        
        data.resettoken=token;
        await data.save();
        return res.status(200).json({status:"reset link created",token})
    }
    catch(err){
        return res.status(401).json({status:"error"});
    }
}
module.exports=forget;