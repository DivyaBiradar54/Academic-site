import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import styles from './ForumDiscussion.module.css';
import { AuthContext } from '../context/AuthContext';

const Discussion = () => {
  const { topicId } = useParams(); // Get topic ID from URL
  const { isAuthenticated } = useContext(AuthContext); // Access authentication status
  const [comments, setComments] = useState([]);
  const [topic, setTopic] = useState({});
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscussionData = async () => {
      try {
        const topicResponse = await fetch(`http://localhost:3000/api/forum?id=${topicId}`);
        const commentResponse = await fetch(`http://localhost:3000/api/discussion?topicId=${topicId}`);

        if (topicResponse.ok && commentResponse.ok) {
          const topicData = await topicResponse.json();
          const commentData = await commentResponse.json();
          setTopic(topicData);
          setComments(commentData);
        } else {
          setErrorMessage('Failed to load topic or comments.');
        }
      } catch (error) {
        console.error('Error fetching topic/comments:', error);
        setErrorMessage('An unexpected error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussionData();
  }, [topicId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setErrorMessage('Comment cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/discussion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, author: 'You', text: newComment }),
      });
      //console.log(response);
      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prev) => [newCommentData, ...prev]); // Add new comment to the top
        setNewComment(''); // Clear the input field
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to add comment.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };
  const handleLikeComment = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/api/discussion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId: id }), // Use 'commentId' to match the backend
      });
  
      if (response.ok) {
        const updatedComment = await response.json();
  
        // Update the likes count in the frontend
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === updatedComment.id
              ? { ...comment, likes: updatedComment.likes }
              : comment
          )
        );
      } else {
        setErrorMessage('Failed to like the comment.');
      }
    } catch (error) {
      console.error('Error liking the comment:', error);
      setErrorMessage('An unexpected error occurred while liking the comment.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <RootLayout>
      <div className={styles.discussionContainer}>
        <div className={styles.topic}>
          <h2>{topic.title}</h2>
          <p>{topic.content}</p>
          <p>
            <strong>Author:</strong> {topic.author}
          </p>
          <p>
            <strong>Category:</strong> {topic.category}
          </p>
        </div>
        <div className={styles.comments}>
          <h3>Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <p>{comment.text}</p>
                <span>
                  <strong>By:</strong> {comment.author}
                </span>
                <div className={styles.likeSection}>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={styles.likeButton}
                  >
                    👍 {comment.likes} Likes
                  </button>
                  </div>  
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
          {isAuthenticated ? (
            <>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={styles.textarea}
          />
          <button onClick={handleAddComment} className={styles.submitButton}>
            Submit
          </button>
          </>) : (
            <p className={styles.loginMessage}>You need to login to add a comment.</p>
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default Discussion;
