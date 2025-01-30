import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import RootLayout from "../components/RootLayout"; // Import RootLayout component
import styles from "./Eventdescription.module.css";

const EventDescription = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize navigate
  const eventId = searchParams.get("id"); // Get the event ID from the query parameter
  const [event, setEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          const error = await response.json();
          setErrorMessage(error.message || "Failed to load event details.");
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setErrorMessage("An unexpected error occurred while fetching event details.");
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleRegisterClick = () => {
    // Navigate to Eventregistration page with the eventId as a query parameter
    navigate(`/eventregistration?id=${eventId}`);
  };

  if (!event) {
    return (
      <RootLayout>
        <div className={styles.errorMessage}>
          <p>{errorMessage || "No event details available."}</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className={styles.eventDetails}>
        <h2>{event.name}</h2>
        <span className={styles.tag}>#{event.name.replace(/\s+/g, "")}</span>
        <p>{event.description}</p>
        <ul>
          <li>
          <strong>Date & Time:</strong>{" "}
{(() => {
  const eventDateTime = new Date(event.eventDate);
  
  // Extract components for formatted date
  let [year, month, day] = event.eventDate.split("-");
  let daynum = day.slice(0, 2);
  const monthName = new Date(event.eventDate).toLocaleString("en-US", {
    month: "short",
  });
  
  // Format time
  const formattedTime = eventDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${daynum} ${monthName} ${year} at ${formattedTime}`;
})()}

          </li>
          <li>
            <strong>Location:</strong> {event.location}
          </li>
          <li>
            <strong>Participation type:</strong> {event.participationType}
          </li>
          <li>
            <strong>Organizer:</strong> {event.organizerName}
          </li>
        </ul>
        <button
          className={styles.registerButton}
          onClick={handleRegisterClick}
        >
          Register Today
        </button>
      </div>
    </RootLayout>
  );
};

export default EventDescription;
