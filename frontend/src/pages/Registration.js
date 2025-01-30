import React, { useState } from 'react';
import RootLayout from '../components/RootLayout'; // Import RootLayout
import styles from './Registration.module.css'; // Import CSS Module

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Display success message
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const error = await response.json();
        alert(error.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <RootLayout>
      <div className={styles.registrationContainer}>
        <h2 className={styles.h2}>Registration</h2>
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputField}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
    </RootLayout>
  );
};

export default Registration;
