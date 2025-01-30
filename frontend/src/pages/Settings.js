import React, { useEffect, useState, useContext } from 'react';
import styles from './Settings.module.css'; // Import CSS Module
import RootLayout from '../components/RootLayout'; // Import RootLayout
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for dynamic userId
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Settings() {
  const { userId, isAuthenticated } = useContext(AuthContext); // Fetch dynamic userId and authentication status
  const [profileSettings, setProfileSettings] = useState(null); // State for user settings
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/settings?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileSettings(data);
        } else {
          const error = await response.json();
          setErrorMessage(error.message || 'Failed to load settings.');
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
        setErrorMessage('An unexpected error occurred while loading settings.');
      }
    };

    if (userId) {
      fetchSettings();
    }
  }, [userId]);

  const handleSaveSettings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/settings?userId=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileSettings),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Settings updated successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update settings.');
      }
    } catch (err) {
      console.error('Error updating settings:', err);
      alert('An unexpected error occurred while saving settings.');
    }
  };

  const handleInputChange = (field, value) => {
    setProfileSettings({ ...profileSettings, [field]: value });
  };

  const handleChangePassword = () => {
    navigate('/resetpassword'); // Navigate to Reset Password page
  };

  if (!isAuthenticated) {
    return (
      <RootLayout>
        <div className={styles.errorMessage}>
          <h2>You must be logged in to access account settings.</h2>
        </div>
      </RootLayout>
    );
  }

  if (!profileSettings) {
    return <div>Loading settings...</div>;
  }

  return (
    <RootLayout>
      <div className={styles.settingsContainer}>
        <h2>Account Settings</h2>
        <div>
          <label>
            Profile Privacy:
            <select
              value={profileSettings.profilePrivacy}
              onChange={(e) => handleInputChange('profilePrivacy', e.target.value)}
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Email Notifications:
            <select
              value={profileSettings.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.value)}
            >
              <option value="ENABLE">Enable</option>
              <option value="DISABLE">Disable</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Mobile Notifications:
            <select
              value={profileSettings.mobilePushNotifications}
              onChange={(e) => handleInputChange('mobilePushNotifications', e.target.value)}
            >
              <option value="ENABLE">Enable</option>
              <option value="DISABLE">Disable</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Academic Background:
            <input
              type="text"
              value={profileSettings.academicBackground || ''}
              onChange={(e) => handleInputChange('academicBackground', e.target.value)}
              placeholder="Enter academic background"
              className={styles.textInput}
            />
          </label>
        </div>
        <div>
          <label>
            Research Interests:
            <input
              type="text"
              value={profileSettings.researchInterests || ''}
              onChange={(e) => handleInputChange('researchInterests', e.target.value)}
              placeholder="Enter research interests"
              className={styles.textInput}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={profileSettings.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className={styles.textInput}
            />
          </label>
        </div>
        <div>
          <label>
            College Info:
            <input
              type="text"
              value={profileSettings.collegeInfo || ''}
              onChange={(e) => handleInputChange('collegeInfo', e.target.value)}
              placeholder="Enter college information"
              className={styles.textInput}
            />
          </label>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSaveSettings} className={styles.saveButton}>
            Save Settings
          </button>
          <button onClick={handleChangePassword} className={styles.changePasswordButton}>
            Change Password
          </button>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </RootLayout>
  );
}

export default Settings;
