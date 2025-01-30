import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Networking.module.css"; // Import the CSS module
import RootLayout from "../components/RootLayout"; // Import RootLayout

const Networking = () => {
  return (
    <RootLayout>
      <div className={styles.networkingContainer}>
        <NetworkingSection />
      </div>
    </RootLayout>
  );
};

function NetworkingSection() {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Handlers for button clicks
  const handlePrivateMessagesClick = () => {
    navigate("/privatemessages"); // Navigate to Private Messages page
  };

  const handleGroupChatsClick = () => {
    navigate("/groupmessages"); // Navigate to Group Messages page
  };

  const handleForumClick = () => {
    navigate("/forum"); // Navigate to Forum page
  };

  return (
    <main className={styles.content}>
      <div className={styles.networkingSection}>
        <p>
          Academic Networking on the DB Academic Networking Site involves the
          development and sustenance of relationships through which information,
          ideas, and experiences in learners’ and academics’ professional
          development can be shared. Besides enabling users to find and connect
          with other professionals and alumni through private messaging, group
          messaging, and forums, it brings real dialogue and collaboration. On
          the site created for academic professionals, researchers, and
          students, it is possible to share discoveries and develop discussions
          in academic forums and groups. It also has mentorship, which involves
          finding a professional to help students and young researchers
          throughout their academic process. As the entrance to one’s academic
          events, webinars, and job openings, or internship or scholarship
          listings, it offers everything regarding academic progression. A
          database of research papers, as well as a communication and
          project-sharing platform, adds value by allowing collaborative work
          on projects, proposals, and studies. The DB Academic Networking Site
          establishes an international environment where students and professors
          share their views on challenges and solve those issues using
          interdisciplinary methods.
        </p>
      </div>

      <div className={styles.buttonSection}>
        <button className={styles.btn} onClick={handlePrivateMessagesClick}>
          Private Messages
        </button>
        <button className={styles.btn} onClick={handleGroupChatsClick}>
          Group Chats
        </button>
        <button className={styles.btn} onClick={handleForumClick}>
          Forums
        </button>
      </div>
    </main>
  );
}

export default Networking;
