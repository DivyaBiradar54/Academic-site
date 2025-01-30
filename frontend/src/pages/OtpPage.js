import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OtpPage.module.css'; // Import the CSS module
import RootLayout from '../components/RootLayout'; // Import RootLayout

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleOTPSubmit = async (event) => {
        event.preventDefault();

        // Directly navigate to the Reset Password page without verifying OTP
        setSuccessMessage('OTP entered successfully!');
        navigate('/resetpassword');
    };

    return (
        <RootLayout>
            <div className={styles.otpVerificationContainer}>
                <h1>OTP Verification</h1>
                <form onSubmit={handleOTPSubmit}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className={styles.otpInput}
                    />
                    <button type="submit" className={styles.otpSubmitButton}>Submit OTP</button>
                </form>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            </div>
        </RootLayout>
    );
};

export default OtpPage;
