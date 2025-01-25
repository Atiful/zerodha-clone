
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAILPORT,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPASS,
    },
  });
  
  const maildetials = async (username , type , senderMail , otp) => {
    try{
    const info = await transporter.sendMail({
      from: `"Welcome!! ${username}👻" ${process.env.MAIL}`, // sender address
      to: `${senderMail}`, // list of receivers
      subject: "Welcome to InvestWise website!",
      text: `Hello ${username},\n\nWelcome to InvestWise!\n\nWe're thrilled to have you on board. Explore the amazing features we offer and let us know if you have any questions.\n\nBest regards,\nThe TradX Team`,
      html : `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #0056b3;
    }
    .content {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to TradX!</h1>
    </div>
    <div class="content">
      <p>Hello ${username},</p>
      <hr>
      <h1>${otp}</h1>
      <p>We’re thrilled to have you on board! Explore the amazing features we offer and start your journey with us.</p>
      <p>If you have any questions, feel free to reply to this email. We’re here to help!</p>
    </div>
    <div class="footer">
      <p>Best regards,<br>The TradX Team</p>
    </div>
  </div>
</body>
</html>`

    });
    console.log("Message sent: %s", info.messageId);
  }catch(error){
    console.log(error);
  }
  }



  module.exports = maildetials;

  