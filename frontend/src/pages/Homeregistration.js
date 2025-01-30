import React from 'react';
import styles from './Homeregistration.module.css';
import RootLayout from '../components/RootLayout';

const registrationData = [
  { particular: 'IEEE Member', indianFee: 'Rs. 6000/-', foreignFee: 'USD 200' },
  { particular: 'Non-IEEE Member', indianFee: 'Rs 8000/-', foreignFee: 'USD 250' },
  { particular: 'Student - IEEE Member', indianFee: 'Rs 4000/-', foreignFee: 'USD 100' },
  { particular: 'Student- Non-IEEE Member', indianFee: 'Rs 5000/-', foreignFee: 'USD 150' },
  { particular: 'Attendee', indianFee: 'Rs 2000/-', foreignFee: 'USD 50' },
];

const RegistrationTable = () => (
  <div className={styles.registrationTable}>
    <h2 className={styles.tableHeading}>Conference Registration Fees</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>Particulars</th>
          <th className={styles.tableHeader}>Indian Delegates</th>
          <th className={styles.tableHeader}>Foreign Delegates</th>
        </tr>
      </thead>
      <tbody>
        {registrationData.map((row, index) => (
          <tr key={index}>
            <td className={styles.tableCell}>{row.particular}</td>
            <td className={styles.tableCell}>{row.indianFee}</td>
            <td className={styles.tableCell}>{row.foreignFee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PaperRegistration = () => (
  <div className={styles.sideSection}>
    <h3 className={styles.sideSectionHeading}>Paper Registration:</h3>
    <ul className={styles.sideSectionList}>
      <li className={styles.sideSectionItem}>
        Registration fee includes a conference kit, e-Conference Proceedings in PEN drive, lunch, and high tea for both days.
      </li>
      <li className={styles.sideSectionItem}>
        Last date of registration for attendees is the same as for the author, and no conference kit will be provided to the accompanying person.
      </li>
      <li className={styles.sideSectionItem}>
        Certificate of Conference Participation/Presentation will be provided.
      </li>
    </ul>
  </div>
);

const PresentationGuidelines = () => (
  <div className={styles.sideSection}>
    <h3 className={styles.sideSectionHeading}>Presentation Guidelines:</h3>
    <ul className={styles.sideSectionList}>
      <li className={styles.sideSectionItem}>
        Presentation will be for a maximum of 8-10 minutes followed by Q&A session.
      </li>
      <li className={styles.sideSectionItem}>
        All presentations must be done using MS PowerPoint Presentation.
      </li>
      <li className={styles.sideSectionItem}>
        All participants have to join 15 minutes prior to the scheduled time slot.
      </li>
      <li className={styles.sideSectionItem}>
        Further information will be updated from time to time on the conference website.
      </li>
    </ul>
  </div>
);

const RegistrationsPage = () => {
  return (
    <RootLayout>
      <div className={styles.registrationsPage}>
        <h1 className={styles.heading}>Registrations</h1>
        <div className={styles.registrationContent}>
          <RegistrationTable />
          <div className={styles.sideSections}>
            <PaperRegistration />
            <PresentationGuidelines />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default RegistrationsPage;
