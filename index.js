import { sendingEmail } from "./send_mail/index.js";
import { htmlTemplate } from "./utilities/html-mail-template.js";

const mailOptions = {
    from: '"Alain Nambii 👻" <alainnambi@gmail.com>', // Sender address
    to: ['alainnambi.work@gmail.com'], // List of recipients
    subject: 'Test Email', // Subject line
    html: htmlTemplate // HTML content of the email body
};

await sendingEmail(mailOptions)