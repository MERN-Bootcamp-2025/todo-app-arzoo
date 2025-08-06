import nodemailer from "nodemailer";

export const sendInvitationEmail = async (to: string, password: string) => {
  //using nodemailer to send mail for invitation

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const appLink = process.env.APP_LINK;

  const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to TodoBuddy</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .email-header {
      background-color: #0073CF;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .email-body {
      padding: 20px;
      color: #333333;
    }
    .email-body p {
      margin: 10px 0;
      line-height: 1.6;
    }
    .credentials-box {
      background-color: #e0f7fa;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .credentials-box p {
      margin: 8px 0;
    }
    .login-button {
      display: inline-block;
      padding: 12px 20px;
      background-color: #ADD8E6;
      color: #e0f7fa;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 10px;
    }
    .email-footer {
      background-color: #003085;
      color: white;
      text-align: center;
      padding: 15px;
      font-size: 12px;
    }

  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Welcome to TodoBuddy!
    </div>
    <div class="email-body">
      <p>Hi</p>
      <p>
        You have been invited to join <strong>TodoBuddy</strong> by <strong>ADMIN</strong>.<br>
        Please use the login credentials below to access your account.
      </p>
      <div class="credentials-box">
        <p><strong>Email:</strong> ${to}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>
      <a href=${appLink} class="login-button">Login to TodoBuddy</a>
 
    </div>
    <div class="email-footer">
      If you did not expect this invitation, you can safely ignore this email.<br>
      &copy; 2025 TodoBuddy
    </div>
  </div>
</body>
</html>


  `;

  await transporter.sendMail({
    from: `"TodoBuddy" <${process.env.SUPER_ADMIN_EMAIL}>`,
    to,
    subject:"You're invited to TodoBuddy",
    html,
  })
};
