const jwt=require("jsonwebtoken");
const user=require("../models/db");
const logout=async(req,res)=>{
    try{
        let token;
        let authheader=req.headers.Authorization;
        if(authheader&&authheader.statsWith("Bearer")){
            token=authheader.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message:"token is invalid"});
        }

        let decode=jwt.verify(token,process.env.JWT_SECRET);

        const data=await user.findById(decode.id);

        if(!data){
            return res.status(401).json({status:"no data is present"});
        }

        data.refreshtoken=null;

        return res.status(201).json({message:"Loguot Successfully!!!"});
    }
    catch(err){
        return res.status(401).json({message:"error occured"});
    }
}
module.exports=logout;