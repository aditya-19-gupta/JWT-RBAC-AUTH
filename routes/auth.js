const express=require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const refresh = require("../controller/refresh");
const logout = require("../controller/logout");
const change = require("../controller/password");
const forget=require("../controller/forget");
const reset = require("../controller/reset");
const router=express.Router();

router.post("/register",register);
router.post("/login",login );
router.post("/refresh",refresh);
router.post("/logout",logout);
router.post("/password",change);
router.post("/forget",forget);
router.post("/reset",reset);
module.exports=router;