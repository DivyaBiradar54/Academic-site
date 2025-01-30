import React, { useState } from "react";
import styles from "./Contactus.module.css"; // Import the CSS module
import RootLayout from "../components/RootLayout"; // Import RootLayout component

const Contactus = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ email: "", subject: "", message: "" }); // Clear form
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to send the message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <RootLayout>
      <div className={styles.contactus}>
        <div className={styles.contactDetails}>
          <h3>Contact Us</h3>
          <p>Email: info@db.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className={styles.contactForm}>
          <h3>Get in Touch</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>
            <label>
              Subject:
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject"
                required
              />
            </label>
            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />
            </label>
            <button type="submit">Send Message</button>
          </form>
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>

        <div className={styles.location}>
          <h3>Conference Location</h3>
          <p>123 Conference St, Fawkner VIC, Australia, 3060</p>
          <iframe
            title="Conference Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345099943!2d144.95373531531652!3d-37.81627997975147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0f47a7%3A0x5045675218cd1f0!2sConference%20Location!5e0!3m2!1sen!2sus!4v1620728342561!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </RootLayout>
  );
};

export default Contactus;
