const jwt=require("jsonwebtoken");
const user=require("../models/db");
const verify=async (req,res)=>{
    try{
        const token=req.params.token;
        if(!token){
            return res.status(401).json({status:"no token recieve"});
        }
        const decode=jwt.verify(token,process.env.EMAIL_VERIFY_JWT_SECRET);

        if (decode.purpose !== "email-verification") {
            return res.status(401).json({
                message: "Invalid verification token"
            });
        }

        const data=await user.findById(decode.id);

        if(!data){
            return res.status(401).json({status:"no data present"});
        }

        if(data.emailtoken!==token){
            return res.status(401).json({status:"no token recieve"});
        }
        data.emailtoken=null;
        data.emailverified=true;
        await data.save();
        return res.status(200).json({status:"email verified"});
    }
    catch(err){
        return res.status(401).json({status:"error occured"});
    }
}
module.exports=verify;