const express=require("express");
const router=express.Router();
const email_verify=require("../controller/email_verify")
router.get("/email/verify/:token", email_verify);

module.exports=router;