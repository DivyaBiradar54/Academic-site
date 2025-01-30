// src/EmailPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EmailPage.module.css'; // Import the CSS module
import RootLayout from '../components/RootLayout'; // Import RootLayout component

const EmailPage = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Call backend API to send OTP
            const response = await fetch('http://localhost:3000/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`OTP has been sent to your email address: ${email}`);
                navigate('/OtpPage'); // Navigate to the OTP verification page
            } else {
                setErrorMessage(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <RootLayout>
            <div className={styles.emailVerificationContainer}>
                <h1>Email Verification</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Enter your email for OTP" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className={styles.emailInput}
                    />
                    <button type="submit" className={styles.otpButton}>
                        Get OTP
                    </button>
                </form>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </RootLayout>
    );
};

export default EmailPage;
