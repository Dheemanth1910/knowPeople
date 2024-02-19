const nodemailer = require("nodemailer");
const {username,pwd} = require('../credentials/gmail.cred');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: pwd,
  },
});
function generateOtp(){
    const first = Math.floor(Math.random() * 10) 
    const second = Math.floor(Math.random() * 10)
    const third = Math.floor(Math.random() * 10)
    const fourth = Math.floor(Math.random() * 10) 
    return first.toString() + second.toString() + third.toString() + fourth.toString() ;
}


function sendMail(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex))
        throw new Error('Not a valid Email');
    const otp = generateOtp()
    async function main(otp) {  
      const info = await transporter.sendMail({
        from: username, 
        to: email, 
        subject: "Password Change OTP", 
        text: `The OTP for changing your password is : ${otp}`, 
      },(err,info)=>{
        if(err){
          console.log(err);
          return
        }
        console.log("Message sent: %s", info.messageId);
        
      });
    }
    main(otp).catch(console.error);  
    return otp;
}


module.exports = {
  transporter,
  sendMail
};
