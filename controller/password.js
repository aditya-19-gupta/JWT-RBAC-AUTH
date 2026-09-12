const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const user=require("../models/db");

const change=async (req,res)=>{
    try{
        let token;
        const authheader=req.headers.Authorization||req.headers.authorization;
        if(authheader&&authheader.startsWith("Bearer ")){
            token=authheader.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({status:"invalid token"});
        }

        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const data=await user.findById(decode.id);
        if(!data){
            return res.status(401).json({status:"invalid token"});
        }
        

        const body=req.body;

        const ismatch = await bcrypt.compare(body.oldpassword,data.password);

        if(!ismatch){
            return res.status(401).json({
                status:"invalid password"
            });
        }

        data.password=body.newpassword;

        await data.save();

        return res.status(200).json({status:"password reset"});
        



    }
    catch(err){
        return res.status(401).json({status:"error",error:err.message});
    }
}
module.exports=change;