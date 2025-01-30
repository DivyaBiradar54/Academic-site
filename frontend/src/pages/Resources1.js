import React from "react";
import styles from './Resources1.module.css'; // Import CSS module
import RootLayout from "../components/RootLayout"; // Import RootLayout

const Resources1 = () => {
  return (
    <RootLayout>
      <div className={styles.resources1Container}>
        <StudentEmployment />
      </div>
    </RootLayout>
  );
};

function StudentEmployment() {
  return (
    <div className={styles.studentEmployment}>
      <h1>Student Employment</h1>
      <p>
        Student Employment at DB refers to the hiring and administration of temporary part-time jobs 
        in which the student earns an hourly wage. This includes all Student Assistant and Student Associate 
        positions, including work-study jobs, that are with an on-campus department. Student employee positions 
        are not eligible for tuition benefits or stipends as a form of compensation or work performed. 
        Student employment opportunities are available during an individual's time as a student at DB.
      </p>
      <ul>
        <li>Posting all available positions in Handshake portal in <a href="https://app.joinhandshake.com/login" target="_blank" rel="noopener noreferrer">https://app.joinhandshake.com/login</a></li>
        <li>Providing students resources to practice their interview skills.</li>
        <li>Assisting students in understanding how to articulate their transferable skills to a potential employer.</li>
        <li>Referring students to resources within our office and across the university.</li>
        <li>Helping students navigate questions throughout their time as student employees.</li>
      </ul>

      <div className={styles.contactInfo}>
        <h2>Contact Student Employment</h2>
        <p>
          <strong>Location:</strong> The Career Development Center is in the DB University Center.<br />
          550 W. Third Street, Suite 790S, Aubrey, TX 76070<br />
          <strong>Phone:</strong> 817-272-2932, Fax: 817-272-0268<br />
          <strong>Phone & Email:</strong> Call us between 8:00 a.m. and 5:00 p.m. Monday - Friday or email us at<br />
          <a href="mailto:studentemployment@db.edu">studentemployment@db.edu</a>
        </p>
      </div>
    </div>
  );
}

export default Resources1;
