import nodemailer from "nodemailer";
import { user, pass } from "../env.js";

// Create a transporter for sending emails using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user,
        pass
    }
});

// Function to send the email
async function sendingEmail(mailOptions) {
    try {
        console.info("Sending email ...")
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}

export {
    sendingEmail
}
