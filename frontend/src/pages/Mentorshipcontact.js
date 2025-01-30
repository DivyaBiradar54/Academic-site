import React, { useState } from "react";
import styles from './Mentorshipcontact.module.css'; // Import the CSS module
import RootLayout from '../components/RootLayout';

function Mentorshipcontact() {
  return (
    <RootLayout>
      <div className={styles.registrationContainer}>
        <MentorshipcontactPage />
      </div>
    </RootLayout>
  );
}

function MentorshipcontactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/mentorship-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to send your message.");
      }
    } catch (err) {
      console.error("Error submitting mentorship form:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.registrationBox}>
      <h2>Contact Us for Mentorship Program</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className={styles.inputField}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className={styles.inputField}>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter your Message"
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.registerButton}>Send</button>
        </div>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Mentorshipcontact;
