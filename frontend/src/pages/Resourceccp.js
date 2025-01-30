import React from "react";
import styles from './Resourceccp.module.css'; // Import the CSS module
import RootLayout from '../components/RootLayout';

const Resourceccp = () => {
  return (
    <RootLayout>
      <div className={styles.resourcesContainer}>
        <CourseraCareerProgram />
      </div>
    </RootLayout>
  );
};

function CourseraCareerProgram() {
  return (
    <div className={styles.careerProgram}>
      <h1>Coursera Career Program</h1>
      <p>
        Start your career journey with industry-leading, skills-first training that gets you job ready.
        No experience required. For career starters or switchers looking for in-demand, entry-level jobs.
        Explore and train for the most in-demand careers. Join thousands of learners, and get on the
        fast track to a successful career in these high-growth areas.
      </p>
      <a href="https://coursera.org" target="_blank" rel="noopener noreferrer" className={styles.courseraLink}>
        COURSERA | ONLINE COURSES & CREDENTIALS FROM TOP EDUCATORS. JOIN FOR FREE
      </a>
    </div>
  );
}

export default Resourceccp;
