const wellComeMailTemplet = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>This is welcome mail template</h1>
</body>
</html>`;

const forgotPassEmailVerifyTemplate = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
      .container{
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      padding: 20px;
      }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Forgot Verification Email </h1>
    <div>
      <p>Hello,</p>
      <p>You recently requested to reset your password. Use the code below to reset it:</p>
      <h2>{verifyCode}</h2>
      <h5>Your Code Expire in {verifyCodeExpMail} minutes</h5>
      <p>If you didn’t request this, please ignore this email or contact support if you have concerns.</p>
    </div>
    <div>
      <a href="{verificationLink}">Get Verify Code</a>
    </div>
    <div>
      <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
      <p>{verificationLink}</p>
      <p>Thank you,<br>Your Company Team</p>
    </div>
  </div>
</body>
</html>
`;

const contactFormSubmitTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Contact Form Message</title>
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
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4caf50;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 10px 0;
      line-height: 1.6;
    }
    .footer {
      background-color: #f1f1f1;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888;
    }
    .footer a {
      color: #4caf50;
      text-decoration: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Message from Portfolio</h1>
    </div>
    <div class="content">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong>{email}</p>
      <p><strong>Message:</strong>{message}</p>
    </div>
    <div class="footer">
      <p>Thank you for using the contact form on your portfolio.</p>
      <a href="http://localhost:8000/portfolio/api/v1" target="_blank">Visit Portfolio</a>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  wellComeMailTemplet,
  forgotPassEmailVerifyTemplate,
  contactFormSubmitTemplate,
};
