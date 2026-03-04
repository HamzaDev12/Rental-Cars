import nodemailer from "nodemailer";
import "dotenv/config";

export const sentNotification = async (to: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Hargeisa Drive",
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
