

import nodemailer from 'nodemailer';

// Configure your Nodemailer transporter using Gmail with hardcoded credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS  
    },
});

// Handling POST requests
export async function POST(req: Request) {
    const { firstName, lastName, email, phone, companyName, companyTitle, industry, country, hearAboutUs } = await req.json();

    try {
        // Email content for admin
        const adminMailOptions = {
            from:  process.env.GMAIL_USER,
            to: process.env.ADMIN_EMAIL, // Replace with admin email address
            subject: 'New Meeting Request',
            text: `
                First Name: ${firstName}
                Last Name: ${lastName}
                Email: ${email}
                Phone: ${phone}
                Company Name: ${companyName}
                Company Title: ${companyTitle}
                Industry: ${industry}
                Country: ${country}
                Heard About Us: ${hearAboutUs}
            `,
        };

        // Send email to admin
        await transporter.sendMail(adminMailOptions);

        // Send confirmation to the user
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email, 
            subject: 'We received your meeting request!',
            text: `Thank you for reaching out! We'll get back to you soon.`,
        });

        return new Response(JSON.stringify({ message: 'Emails sent successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
