import nodemailer from "nodemailer";
import { config } from "dotenv";

// Load environment variables
config({ path: './config/config.env' });

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    secure: false,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
