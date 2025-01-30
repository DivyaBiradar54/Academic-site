import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css'; // Import the CSS module
import RootLayout from '../components/RootLayout'; // Import RootLayout

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset successfully!');
        alert('Password reset successfully!');
        navigate('/login'); // Redirect to login page
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <RootLayout>
      <div className={styles.resetPasswordContainer}>
        <h1>Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.resetButton}>
            Reset Password
          </button>
        </form>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </div>
    </RootLayout>
  );
};

export default ResetPassword;
