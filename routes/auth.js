const express=require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const refresh = require("../controller/refresh");
const logout = require("../controller/logout");
const router=express.Router();

router.post("/register",register);
router.post("/login",login );
router.post("/refresh",refresh);
router.post("/logout",logout);

module.exports=router;