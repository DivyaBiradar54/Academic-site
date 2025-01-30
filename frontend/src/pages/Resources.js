import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RootLayout from '../components/RootLayout';
import styles from './Resources.module.css'; // Import the CSS Module

const Resources = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <RootLayout>
      <div className={styles.careerDevelopment}>
        <h1>Career Development</h1>

        <div className={styles.resourcesGrid}>
          <div className={styles.leftColumn}>
            <section className={styles.resourceSection}>
              <h2>Student Employment</h2>
              <p>Our office is here to support you with on-campus student employment.</p>
              <button
                className={styles.resourceButton}
                onClick={() => navigate('/resources1')} // Navigate to Resources1
              >
                Student Employment <span className={styles.arrow}>→</span>
              </button>
            </section>

            <section className={styles.resourceSection}>
              <h2>Mentorship Program</h2>
              <p>Mentoring is a brain to pick, an ear to listen, and a push in the right direction.</p>
              <button
                className={styles.resourceButton}
                onClick={() => navigate('/resourcesemp')} // Navigate to Resources1
              >
                Mentorship Programs <span className={styles.arrow}>→</span>
              </button>
            </section>
          </div>

          <div className={styles.rightColumn}>
            <section className={styles.resourceSection}>
              <h2>Coursera Career Academy</h2>
              <p>Add an industry skills credential to your degree with the Coursera Career Academy.</p>
              <button
                className={styles.resourceButton}
                onClick={() => navigate('/resourcesccp')} // Navigate to Resources1
              >
                Coursera Programs <span className={styles.arrow}>→</span>
              </button>
            </section>

            <section className={styles.resourceSection}>
              <h2>Success Stories</h2>
              <p>Nothing is impossible, the word itself says 'I'm possible'!</p>
              <button
                className={styles.resourceButton}
                onClick={() => navigate('/successstories')} // Navigate to Resources1
              >
                Explore Success Stories <span className={styles.arrow}>→</span>
              </button>
            </section>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Resources;
