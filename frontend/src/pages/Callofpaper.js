import React from "react";
import styles from "./Callofpaper.module.css"; // Import the CSS module
import RootLayout from "../components/RootLayout"; // Import RootLayout

// Data for the tracks
const tracksData = [
  {
    title: "Track 1: Intelligent System and Applications",
    topics: [
      "Process Automation",
      "Human-Robot Interfaces",
      "Smart Cities",
      "Adaptive Learning",
      "Photonics Instrumentation",
      "Data-Driven Fuzzy Systems",
      "Immersive Learning",
    ],
  },
  {
    title: "Track 2: Computational Intelligence",
    topics: [
      "Augmented and Virtual Reality",
      "Cloud Computing",
      "Block Chain",
      "Cybersecurity",
      "Contemporary Business",
      "Digital Marketing",
      "Bio-Inspired Systems",
    ],
  },
  {
    title: "Track 3: Electrical Systems",
    topics: [
      "Renewable Energy systems",
      "Control System",
      "Green Building",
      "Power Generation, Transmission & Distribution",
      "Smart Grid",
      "Material Science and Material Development",
    ],
  },
  {
    title: "Track 4: Biomedical Instrumentation",
    topics: [
      "Non-Invasive Laser",
      "Brain-Machine Interface",
      "Robotic Surgery",
      "Medical Robots and Systems",
      "Pharmaceutical Biotechnology",
      "Drug Discovery and Development",
    ],
  },
  {
    title: "Track 5: AI in Interdisciplinary fields",
    topics: [
      "Deep Fake",
      "Smart Agriculture",
      "Health Care",
      "Business Intelligence - E-business",
      "Digital Literacy and Citizenship",
      "Social Emotional Learning (SEL)",
    ],
  },
];

// Component for each individual track
const Track = ({ title, topics }) => (
  <div className={styles.track}>
    <h3 className={styles.trackTitle}>{title}</h3>
    <ul className={styles.trackList}>
      {topics.map((topic, index) => (
        <li key={index} className={styles.trackListItem}>
          {topic}
        </li>
      ))}
    </ul>
  </div>
);

// Main component for Call for Papers
const CallForPapers = () => {
  return (
    <RootLayout>
      <div className={styles.callForPapers}>
        <h1 className={styles.title}>Call for Papers</h1>
        <div className={styles.tracksContainer}>
          {tracksData.map((track, index) => (
            <Track key={index} title={track.title} topics={track.topics} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default CallForPapers;
