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
    email:{
        type:String,
        required:true,
    },
    refreshtoken:{
        type:String,
        default:null,
    },
    resettoken:{
        type:String,
        default:null,
    },
    emailtoken:{
        type:String,
        default:null,
    },
    emailverified:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
});

dbscheme.pre("save", async function(){
    const person = this;

    if(!person.isModified("password")){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(person.password, salt);

    person.password = hashedpassword;
});
module.exports = mongoose.model("User", dbscheme);