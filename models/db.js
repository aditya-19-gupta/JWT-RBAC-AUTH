const { timeStamp } = require("node:console");
const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const dbscheme=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        enum:["admin","manager","user"],
    },
    refreshtoken:{
        type:String,
        default:null,
    }
},{
    timestamps:true
});

dbscheme.pre("save",async function(next){
    const person=this;

    if(!person.isModified('password')){
        return next();
    }

    try{
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(person.password,salt);
        person.password=hashedpassword;
    }
    catch(err){
        next(err);
    }
})
module.exports = mongoose.model("User", dbscheme);