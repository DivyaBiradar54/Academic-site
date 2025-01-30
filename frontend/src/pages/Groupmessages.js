// Groupmessages.js
import React, { useState } from "react";
import RootLayout from "../components/RootLayout"; // Import RootLayout
import styles from "./Groupmessages.module.css"; // Import CSS module

const Groupmessages = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyToIndex, setReplyToIndex] = useState(null); // Index of the comment being replied to
  const emojis = ["😀", "😂", "👍", "❤️", "🎉"]; // 5 emojis to choose from

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji); // Set selected emoji
  };

  // Handle comment input
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle reply input
  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  // Submit a new comment
  const handleCommentSubmit = () => {
    if (newComment) {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment(""); // Clear comment input
    }
  };

  // Submit a reply to a comment
  const handleReplySubmit = (index) => {
    if (newReply) {
      const updatedComments = [...comments];
      updatedComments[index].replies.push(newReply);
      setComments(updatedComments);
      setNewReply(""); // Clear reply input
      setReplyToIndex(null); // Reset the reply index
    }
  };

  return (
    <RootLayout> {/* Wrap content with RootLayout */}
      <main>
        <section className={styles.groupChats}>
          <h2 className={styles.heading}>Group Chats</h2>

          {/* First Message */}
          <div className={styles.chatMessage}>
            <div className={styles.chatHeader}>
              <div className={styles.userInitial}>RD</div>
              <p className={styles.timestamp}>19/09/2024 14:36</p>
            </div>
            <p className={styles.messageContent}>
              Guys, we are hosting our 2nd GBM with industry guest Burns and McDonnell 
              Fort Worth substation group. I encourage you all to come learn about their 
              company and the opportunities they have for you. I will be attaching an RSVP, 
              so sign up!!!
            </p>
            <div className={styles.actions}>
              <div className={styles.emojiPicker}>
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    style={{ fontSize: "24px", cursor: "pointer", margin: "5px" }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              {selectedEmoji && <span>You selected: {selectedEmoji}</span>}
              <button className={styles.actionButton}>Comment</button>
            </div>
          </div>

          {/* Second Message */}
          <div className={styles.chatMessage}>
            <div className={styles.chatHeader}>
              <div className={styles.userInitial}>BB</div>
              <p className={styles.timestamp}>20/09/2024 08:35</p>
            </div>
            <p className={styles.messageContent}>
              Thanks for the invite! Looking forward to attending and learning more 
              about the opportunities at Burns and McDonnell.
            </p>
            <div className={styles.actions}>
              <div className={styles.emojiPicker}>
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    style={{ fontSize: "24px", cursor: "pointer", margin: "5px" }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              {selectedEmoji && <span>You selected: {selectedEmoji}</span>}
              <button className={styles.actionButton}>Comment</button>
            </div>
          </div>

          {/* Comments Section */}
          <div className={styles.commentInput}>
            <input
              type="text"
              placeholder="Add Your Comments..."
              value={newComment}
              onChange={handleCommentChange}
              className={styles.inputField}
            />
            <button
              onClick={handleCommentSubmit}
              className={styles.commentButton}
            >
              Add Comment
            </button>
          </div>

          {/* Display Comments */}
          <div className={styles.commentsSection}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <div className={styles.commentText}>{comment.text}</div>
                <button
                  onClick={() => setReplyToIndex(index)}
                  className={styles.replyButton}
                >
                  Reply
                </button>
                
                {/* Display Replies */}
                {replyToIndex === index && (
                  <div className={styles.replyInput}>
                    <input
                      type="text"
                      placeholder="Reply..."
                      value={newReply}
                      onChange={handleReplyChange}
                      className={styles.inputField}
                    />
                    <button
                      onClick={() => handleReplySubmit(index)}
                      className={styles.commentButton}
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
                <div className={styles.repliesSection}>
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className={styles.reply}>
                      {reply}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </RootLayout>
  );
};

export default Groupmessages;
