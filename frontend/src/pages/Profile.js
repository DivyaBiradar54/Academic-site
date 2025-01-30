import React, { useEffect, useState, useContext } from 'react';
import styles from './Profile.module.css'; // Import CSS Module
import RootLayout from '../components/RootLayout'; // Import RootLayout
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for dynamic userId

function Profile() {
  const { userId, logout } = useContext(AuthContext); // Fetch dynamic userId and logout function
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          const error = await response.json();
          console.error('Error fetching profile:', error.message);
          navigate('/login'); // Redirect to login if not logged in
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/login');
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', { 
        method: 'POST' ,
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        logout(); // Call logout from AuthContext
        navigate('/login');
      } else {
        const error = await response.json();
        console.error('Logout failed:', error.message);
        console.log(response)
        alert('Logout failed. Please try again.');

      }
    } catch (err) {
      console.error('Error during logout:', err);
      alert('An unexpected error occurred during logout.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        <h2>{profile.name}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Academic Background:</strong> {profile.academicBackground}</p>
        <p><strong>Research Interests:</strong> {profile.researchInterests}</p>
        <p><strong>College Info:</strong> {profile.collegeInfo}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </RootLayout>
  );
}

export default Profile;
