const jwt=require("jsonwebtoken");
const verify=(req,res,next)=>{
    let token;
    let authheader=req.headers.Authorization||req.headers.authorization;

    if(authheader&&authheader.startsWith("Bearer")){
        token=authheader.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({status:"no token!! authorization is denied"})
    }

    try{
        let decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({status:"no permission"});
        }
        req.user=decode;
        return res.status(200).json(req.user);
        next();
    }
    catch(err){
        return res.status(401).json({status:"Token is not valid!! authorization is denied"})
    }

}
module.exports=verify;