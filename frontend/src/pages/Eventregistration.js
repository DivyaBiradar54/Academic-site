import React, { useEffect, useState } from "react";
import RootLayout from "../components/RootLayout"; 
import styles from './Eventregistration.module.css';
import { useSearchParams } from "react-router-dom";

const Eventregistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [eventName, setEventName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    eventId: "",
  });
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("id"); // Get eventId from URL
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch event details by eventId to populate the event name
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEventName(eventData.name); // Set the event name
          setFormData((prev) => ({ ...prev, eventId })); // Pre-fill eventId in formData
        } else {
          setErrorMessage("Failed to load event details.");
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setErrorMessage("An unexpected error occurred while fetching event details.");
      }
    };

    if (eventId) fetchEventDetails();
  }, [eventId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/eventregistration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsRegistered(true);
        setErrorMessage("");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const closePopup = () => setIsRegistered(false);

  return (
    <RootLayout>
      <div className={styles.registrationContainer}>
        <div className={styles.registrationBox}>
          <h2>Event Registration</h2>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <form onSubmit={handleRegister}>
            <InputField
              label="Event Name"
              type="text"
              value={eventName}
              disabled // Event name should not be editable
            />
            <InputField
              label="Name"
              type="text"
              name="name"
              placeholder="Enter your Name"
              onChange={handleChange}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
            <InputField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              placeholder="Enter your Phone number"
              onChange={handleChange}
            />
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.registerButton}>
                Register
              </button>
            </div>
          </form>
        </div>

        {isRegistered && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <span className={styles.closeButton} onClick={closePopup}>&times;</span>
              <p>Registration successful!</p>
            </div>
          </div>
        )}
      </div>
    </RootLayout>
  );
};

const InputField = ({ label, type, name, placeholder, value, disabled, onChange }) => (
  <div className={styles.inputField}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      required
    />
  </div>
);

export default Eventregistration;
