import React, { useState, useEffect, useContext } from "react";
import RootLayout from "../components/RootLayout"; // Import RootLayout
import styles from "./Privatemessages.module.css"; // Import the CSS module
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const socket = new WebSocket("ws://localhost:3001"); // WebSocket server for real-time chat

function Privatemessages() {
  const { isAuthenticated, userId } = useContext(AuthContext); // Get auth status and userId

  // Redirect if user is not authenticated
  if (!isAuthenticated) {
    return (
      <RootLayout>
        <div className={styles.errorMessage}>
          <h2>You must be logged in to access private messages.</h2>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className={styles.formContainer}>
        <PrivateMessagesPage userId={userId} />
      </div>
    </RootLayout>
  );
}

function PrivateMessagesPage({ userId }) {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    emailTo: "",
    message: "",
  });
  const [userDetails, setUserDetails] = useState({ email: "", name: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Fetch logged-in user's email and name
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users?id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetails({ email: data.email, name: data.name });
        } else {
          throw new Error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Fetch messages between the current user and recipient
  const fetchMessages = async () => {
    if (!formData.emailTo) return;

    setLoadingMessages(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/message?emailFrom=${userDetails.email}&emailTo=${formData.emailTo}`
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setErrorMessage("");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to load messages.");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch messages when `emailTo` changes
  useEffect(() => {
    fetchMessages();
  }, [formData.emailTo]);

  // WebSocket setup for real-time updates
  useEffect(() => {
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (
        (receivedMessage.emailFrom === userDetails.email && receivedMessage.emailTo === formData.emailTo) ||
        (receivedMessage.emailFrom === formData.emailTo && receivedMessage.emailTo === userDetails.email)
      ) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    return () => {
      socket.close(); // Clean up WebSocket connection
    };
  }, [userDetails.email, formData.emailTo]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!formData.message.trim()) {
      setErrorMessage("Message cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailFrom: userDetails.email,
          emailTo: formData.emailTo,
          message: formData.message,
          Name: userDetails.name,
        }),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        socket.send(JSON.stringify(sentMessage.newMessage)); // Send message to WebSocket server
        setMessages((prev) => [...prev, sentMessage.newMessage]);
        setFormData({ ...formData, message: "" });
        setSuccessMessage("Message sent successfully!");
        setErrorMessage("");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to send your message.");
        setSuccessMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setErrorMessage("An unexpected error occurred.");
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Chat Messages */}
      <div className={styles.messages}>
        {loadingMessages ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className={styles.message}>
              <strong>{msg.emailFrom === userDetails.email ? "You" : "Recipient"}:</strong>
              <p>{msg.message}</p>
            </div>
          ))
        ) : (
          <p>No messages yet. Start a conversation!</p>
        )}
      </div>

      {/* Input Fields */}
      <div className={styles.inputContainer}>
        <input
          type="email"
          name="emailTo"
          value={formData.emailTo}
          onChange={handleInputChange}
          placeholder="Recipient's Email"
          className={styles.textInput}
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Type your message"
          className={styles.textArea}
          required
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>

      {/* Success/Failure Messages */}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default Privatemessages;
