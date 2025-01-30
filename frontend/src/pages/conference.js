import React from "react";
import styles from "./conference.module.css"; // Import the CSS module
import RootLayout from "../components/RootLayout";

const importantDates = [
  { event: "Deadline for paper submission", date: "15th October - 2024" },
  { event: "Acceptance Intimation", date: "20th Oct - 2024" },
  { event: "Deadline for registration", date: "25th Oct - 2024" },
  { event: "Camera ready paper submission", date: "25th Oct - 2024" },
  { event: "Conference Date", date: "25-26th Nov - 2024" },
];

const ImportantDates = () => {
  return (
    <RootLayout>
      <div className={styles.importantDatesPage}>
        <h1 className={styles.title}>Important Dates</h1>

        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.activeTab}`}>
            Important Dates - Paper Submission
          </div>
        </div>

        <div className={styles.importantDatesList}>
          <h2 className={styles.listHeading}>IMPORTANT DATES</h2>
          <div className={styles.highlightedText}>* Extended dates.</div>

          <ul className={styles.list}>
            {importantDates.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <span className={styles.event}>{item.event} :</span>
                <span className={styles.date}>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RootLayout>
  );
};

export default ImportantDates;
