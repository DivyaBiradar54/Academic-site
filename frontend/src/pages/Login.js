import React, { useState, useContext } from 'react';
import styles from './Login.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';
import RootLayout from '../components/RootLayout'; // Import the RootLayout component
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
        login(data.userId); // Save the userId in AuthContext
        navigate('/profile'); // Navigate to the Profile page
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/Registration'); // Navigate to Registration page
  };

  const handleForgotPasswordClick = () => {
    navigate('/EmailPage'); // Navigate to Email page for password recovery
  };

  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        <LoginContainer
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          handleRegisterClick={handleRegisterClick}
          handleForgotPasswordClick={handleForgotPasswordClick}
        />
      </div>
    </RootLayout>
  );
};

function LoginContainer({ handleLogin, setUsername, setPassword, handleRegisterClick, handleForgotPasswordClick }) {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.loginInputField}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.loginInputField}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.forgotPassword}>
            <button
              type="button"
              className={styles.forgotPasswordLink}
              onClick={handleForgotPasswordClick}
            >
              Forgot Password
            </button>
          </div>
          <div className={styles.rememberMe}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.loginButton}>Login</button>
            <button
              type="button"
              className={styles.registerButton}
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
