import React, { useState, useEffect } from "react";
import RootLayout from "../components/RootLayout"; // Import RootLayout
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Events.module.css"; // Import the CSS Module

const Events = () => {
  const [eventsData, setEventsData] = useState({});
  const [currentMonth, setCurrentMonth] = useState("November");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (response.ok) {
          const data = await response.json();
          setEventsData(data); // Ensure `data` matches the grouped structure expected
        } else {
          const error = await response.json();
          setErrorMessage(error.message || "Failed to load events.");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setErrorMessage("An unexpected error occurred while fetching events.");
      }
    };
  
    fetchEvents();
  }, []);
  

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === "November" ? "December" : "November");
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === "December" ? "November" : "December");
  };

  return (
    <RootLayout>
      <div className={styles.calendarContainer}>
        <h2 className={styles.heading}>{currentMonth} Events</h2>

        <div className={styles.buttonContainer}>
          <button
            onClick={handlePrevMonth}
            disabled={currentMonth === "November"}
          >
            Previous Month
          </button>
          <button
            onClick={handleNextMonth}
            disabled={currentMonth === "December"}
          >
            Next Month
          </button>
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        {eventsData[currentMonth] ? (
          <div className={styles.calendarGrid}>
            {eventsData[currentMonth].map((event) => (
              <div className={styles.calendarCell} key={event.id}>
                <h4>
                  {(() => {
                    let [year, month, day] = event.eventDate.split("-");
                    let daynum = day.slice(0, 2);
                    const monthName = new Date(event.eventDate).toLocaleString("en-US", {
                      month: "short",
                    });
                    return `${daynum} ${monthName} ${year}`;
                  })()}
                </h4>
                <Link
                  to={{
                    pathname: "/eventdescription", // Specify the path without query parameters
                    search: `?id=${event.id}`, // Add the query parameter here
                    state: { event }, // Pass the event object in the state
                  }}
                  className={styles.eventLink}
                >
                  <p>{event.name}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No events available for this month.</p>
        )}
      </div>
    </RootLayout>
  );
};

export default Events;
