import nodemailer from 'nodemailer';
import corsMiddleware from '../../lib/cors'; // Enable CORS

let generatedOtp = null; // Temporary storage for OTP (valid until the server restarts)

export default async function handler(req, res) {
    await corsMiddleware(req, res); // Enable CORS

    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        try {
            // Generate a 6-digit OTP
            generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

            // Create a transporter using nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Email content
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your OTP Code',
                text: `Your OTP code is: ${generatedOtp}`,
            };

            // Send email
            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'OTP sent successfully.' });
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ message: 'Failed to send OTP.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
