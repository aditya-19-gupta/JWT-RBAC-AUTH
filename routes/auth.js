const express=require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const refresh = require("../controller/refresh");
const router=express.Router();

router.post("/register",register);
router.post("/login",login );
router.post("/refresh",refresh);

module.exports=router;