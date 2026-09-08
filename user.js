const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT;
const auth = require("./routes/auth.js");
const role=require("./routes/role.js");
const  {connectToMongoDb}  = require("./connect/connect.js");
connectToMongoDb("mongodb://127.0.0.1:27017/role_db")
.then(() => console.log("Connection established"));



app.use(express.json());
app.use("/auth",auth)
app.use("/role",role)




app.listen(PORT,()=>{console.log("server started")});

