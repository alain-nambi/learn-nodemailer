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

// HTML template for the email body
const mailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        <title>Saying Hello</title>
        <style>
            body {
                font-family: "Inter", sans-serif;
                font-optical-sizing: auto;
                font-weight: 400; /* Adjust weight here */
                font-style: normal;
                font-variation-settings: "slnt" 0;
                margin: 0;
                padding: 0;
            }
            
            .mail-content {
                width: 90%;
                max-width: 400px; /* Adjust max-width as needed */
                margin: 50px auto;
                background-color: #fff; /* Content background color */
                outline: 1px solid #ccc;
                padding: 20px;
                border-radius: 8px; /* Rounded corners */
            }
            
            .mail__title {
                font-size: 1.5rem;
                color: #333; /* Title color */
                margin-bottom: 15px; /* Spacing below title */
            }
            
            .mail__description {
                font-size: 1rem;
                font-weight: bold;
                color: #b3b3b3; /* Description color */
                margin-bottom: 20px; /* Spacing below description */
            }
        </style>
    </head>
    <body>
        <div class="mail-content">
            <h1 class="mail__title">Hello,</h1>
            <p class="mail__description">How are you?</p>
            <p class="mail__description">Are you available tonight? We're organizing a small party at my place!</p>
        </div>
    </body>
    </html>
`

// Options for sending the email
const mailOptions = {
    from: '"Alain Nambii 👻" <alainnambi@gmail.com>', // Sender address
    to: ['alainnambi.work@gmail.com'], // List of recipients
    subject: 'Test Email', // Subject line
    html: mailTemplate // HTML content of the email body
};

// Function to send the email
async function sendEmail() {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}

// Call the sendEmail function to send the email
sendEmail();
