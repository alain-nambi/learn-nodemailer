export const htmlTemplate = `
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
                color: #868585; /* Description color */
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
`;
