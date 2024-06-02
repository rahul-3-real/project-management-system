import nodemailer from "nodemailer";

import ApiError from "../utils/apiError.js";

// Transporter (Setting up SMTP details)
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Sending Welcome Email
export const sendWelcomeEmail = async (sendTo) => {
  try {
    // Read the content of the email template
    const htmlContent = `
        <h1>Welcome to ${process.env.COMPANY_NAME}</h1>
        <p>Congratulations! Your account has been successfully created by the admin of ${process.env.COMPANY_NAME}. You are now part of our team.</p>
        <p>Your login credentials:</p>
        <ul>
            <li>Login Url: ${process.env.FRONTEND_APP_URL}</li>
            <li>Email: ${sendTo}</li>
            <li>Temporary Password: ${process.env.DEFAULT_USER_PASSWORD}</li>
        </ul>
        <p>Please use the provided credentials to log in to your account. Upon logging in, you will be prompted to change your password.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team at ${process.env.CONTACT_EMAIL}.</p>
        <p>Welcome aboard!</p>
        <p>Best regards,</p>
        <p>${process.env.COMPANY_NAME} Team</p>
    `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sendTo,
      subject: `Welcome to ${process.env.COMPANY_NAME}`,
      html: htmlContent,
    });
    return info;
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error}`);
  }
};
