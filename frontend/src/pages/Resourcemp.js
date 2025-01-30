import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from './Resourcemp.module.css'; // Import CSS Module
import RootLayout from '../components/RootLayout';

const Resourcemp = () => {
  return (
    <RootLayout>
      <div className={styles.resourcesContainer}>
        <MentorshipSection />
      </div>
    </RootLayout>
  );
};

function MentorshipSection() {
  return (
    <div className={styles.mentorshipSection}>
      <h1>Mentorship Program</h1>
      <p>
        Our mentorship program focuses on building connections between students,
        alumni, and employers through an online platform. Having a mentor is one
        of the best ways to prepare for your future career. By partnering with a
        mentor, you can learn more about working in a professional environment,
        how to navigate the job search process, and important steps to take in
        your own career journey.
      </p>
      <p>
        If you are ready to join, contact us today so that a mentor is assigned
        to you and would guide you through the process.
      </p>
      <ContactButton />
    </div>
  );
}

function ContactButton() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleClick = () => {
    navigate('/mentorshipcontact'); // Redirect to mentorship contact page
  };

  return (
    <div className={styles.ContactButton}>
      <button onClick={handleClick}>Contact Us</button> {/* Add onClick event */}
    </div>
  );
}

export default Resourcemp;
