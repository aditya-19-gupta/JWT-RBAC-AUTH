const express=require("express");
const verify=require("../middleware/authentication");
const router=express.Router();

router.get("/admin",verify,(req,res)=>{
    res.json("welcome admin"); 
})
router.get("/manager",(req,res)=>{
   res.json("welcome admin"); 
})
router.get("/user",(req,res)=>{
   res.json("welcome admin"); 
})
module.exports=router;