const user=require("../models/db");
const register=async (req,res)=>{
    try{
        const{username,password,role}=req.body;
        const newuser=new user({username,password,role});

    await newuser.save();
    console.log("data recieved");
    res.status(201).json({status:"new user added"});
    }catch(err){
        res.status(404).json({message:"error occur"});
    }
}
module.exports=register;