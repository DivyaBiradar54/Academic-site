import React from 'react';
import RootLayout from '../components/RootLayout'; // Import the RootLayout component
import './home.module.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';
import styles from './home.module.css';

const Home = () => {
  return (
    <RootLayout>
      <div className={styles.homeContainer}>
        <WelcomeSection />
        <QuickLinks />
        <LatestNews />
      </div>
    </RootLayout>
  );
};

// Component for the Welcome message and conference details
function WelcomeSection() {
  return (
    <section className={styles.welcomeSection}>
      <h1 className={styles.welcomeTitle}>Welcome to the Academic Conference 2024</h1>
      <p className={styles.welcomeText}>
        We are excited to invite you to the Academic Networking Conference, a platform for scholars, researchers, and professionals to share their work, network, and collaborate. Join us for insightful presentations, workshops, and discussions across various disciplines.
      </p>
      <p className={styles.welcomeText}>
        Date: November 10-12, 2024<br />
        Location: Arlington, Texas<br />
        Hosted by: University of Texas at Arlington
      </p>
    </section>
  );
}

// Component for Quick Links to important sections (Call for Papers, Registration, Schedule)
function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
  <h2 className={styles.quickLinksTitle}>Quick Links</h2>
  <div className={styles.links}>
    <Link to="/callofpaper" className={styles.linkBox}>Call for Papers</Link>
    <Link to="/homeregistration" className={styles.linkBox}>Papers Registration</Link>
    <Link to="/conference" className={styles.linkBox}>Conference Schedule</Link>
  </div>
</section>

  );
}

// Component for Latest News and Announcements
function LatestNews() {
  return (
    <section className={styles.latestNews}>
  <h2 className={styles.latestNewsTitle}>Latest News & Announcements</h2>
  <ul className={styles.latestNewsList}>
    <li className={styles.latestNewsItem}>October 1, 2024: Deadline for paper submissions extended to October 15, 2024.</li>
    <li className={styles.latestNewsItem}>September 20, 2024: Early bird registration ends on October 5, 2024. Register now to get a discount!</li>
    <li className={styles.latestNewsItem}>August 30, 2024: Keynote speaker announced: Dr. Jane Doe, a leading expert in Artificial Intelligence and Ethics.</li>
  </ul>
</section>

  );
}

export default Home;
