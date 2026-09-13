const jwt=require("jsonwebtoken");
const user=require("../models/db");
const transport = require("../config/mail");
const email=async (req,res)=>{
    try{
        const data=await user.findById(req.user.id);

        if(!data){
            return res.status(401).json({status:"No data found"});
        }

        let emailverify=jwt.sign({id:data._id,purpose:"email-verification"},process.env.EMAIL_VERIFY_JWT_SECRET,
            {expiresIn:"10m"});
        
        data.emailtoken=emailverify;
        await data.save();
        const link = `http://localhost:8000/email/verify/${emailverify}`;

        await transport.sendMail({
            from:process.env.MY_EMAIL,
            to:data.email,
            subject:"verify your email",
            text:`click the link for verification:${link}`
        })

        return res.status(200).json({status: "verification token created"});
    }
    catch(err){
        return res.status(401).json({message:"error occured",error:err.message});
    }
}
module.exports=email;