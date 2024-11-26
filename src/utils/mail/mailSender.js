const transporter = require("../../config/mail/mailConfig");
require("dotenv").config();
const mailSender = async function (recever, code, exp) {
  // send mail with defined transport object
  const resetCode = code;
  const resetCodeExp = Math.round((exp - Date.now()) / 1000 / 60);
  //
  const resetLink = "https://www.facebook.com/shak.sakil.96"; // Generate dynamically
  const emailHTML = `
  <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      padding: 20px;
    }
    .header {
      text-align: center;
      color: #4CAF50;
    }
    .content {
      text-align: left;
      color: #333333;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .reset-button {
      background-color: #4CAF50;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .reset-button:hover {
      background-color: #45a049;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
  <h1 class="header">
  Portfolio
  </h1>
    <h2 class="header">Password Reset code verification</h2>
    <div class="content">
      <p>Hello,</p>
      <p>You recently requested to reset your password. Use the code below to reset it:</p>
      <h2 style="text-align: center; color: #4CAF50;">{RESET_CODE}</h2>
      <p>Your Verification Code Expire After {reset_CodeExp} minutes</p>
      <p>If you didn’t request this, please ignore this email or contact support if you have concerns.</p>
    </div>
    <div class="button-container">
      <a href="{RESET_LINK}" class="reset-button">Reset Password</a>
    </div>
    <div class="footer">
      <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
      <p>{RESET_LINK}</p>
      <p>Thank you,<br>ShakilDevZone</p>
    </div>
  </div>
</body>
</html>
`;
  const mailOptions = {
    from: process.env.OWNER_GMAIL,
    to: recever,
    subject: "Password Reset Code verification",
    html: emailHTML
      .replace(`{reset_CodeExp}`, resetCodeExp)
      .replace(`{RESET_CODE}`, resetCode)
      .replace(/{RESET_LINK}/g, resetLink),
  };
  //
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return false;
  }
};
module.exports = mailSender;
