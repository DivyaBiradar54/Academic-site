import corsMiddleware from '../../lib/cors'; // Enable CORS

let generatedOtp = null; // Use the same variable from send-otp.js

export default async function handler(req, res) {
    await corsMiddleware(req, res); // Enable CORS

    if (req.method === 'POST') {
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({ message: 'OTP is required.' });
        }

        try {
            if (otp === generatedOtp) {
                // OTP is valid
                generatedOtp = null; // Invalidate OTP after use
                res.status(200).json({ message: 'OTP verified successfully.' });
            } else {
                // OTP is invalid
                res.status(400).json({ message: 'Invalid OTP. Please try again.' });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
