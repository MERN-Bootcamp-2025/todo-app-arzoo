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
  <h2>Welcome to TodoBuddy!</h2>
    <p>You have been invited to join TodoBuddy.</p>
    <p><strong>Login credentials:</strong></p>
    <ul>
      <li>Email: ${to}</li>
      <li>Password: ${password}</li>
    </ul>
    <p><a href="${appLink}">Go to TodoBuddy</a></p>
  `;

  await transporter.sendMail({
    from: `"TodoBuddy" <${process.env.SUPER_ADMIN_EMAIL}>`,
    to,
    subject:"You're invited to TodoBuddy",
    html,
  })
};
