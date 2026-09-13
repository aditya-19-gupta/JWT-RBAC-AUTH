const nodemailer=require("nodemailer");
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD
    }
})
module.exports=transport;