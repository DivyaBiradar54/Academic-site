import React, { useEffect, useState } from 'react';
import RootLayout from '../components/RootLayout';
import styles from './Forum.module.css';
import { Link } from 'react-router-dom';

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/forum');
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setTopics(data);
        } else {
          setErrorMessage('Failed to load topics.');
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
        setErrorMessage('An unexpected error occurred.');
      }
    };

    fetchTopics();
  }, []);

  return (
    <RootLayout>
      <div className={styles.forumContainer}>
        <div className={styles.header}>
          <h1>Student Discussion Forum</h1>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.posts}>
          {topics.map((topic) => (
            <div key={topic.id} className={styles.post}>
              <div className={styles.postHeader}>
                <span className={styles.author}>{topic.author}</span> - Asked in{' '}
                <span className={styles.category}>{topic.category}</span>
              </div>
              <h3 className={styles.postTitle}>{topic.title}</h3>
              <p className={styles.postContent}>{topic.content}</p>
              <div className={styles.postFooter}>
                <span>👍 {topic.likes}</span>
                <span>💬 {topic.comments}</span>
                <Link
                  to={`/forumdiscussion/${topic.id}`}
                  className={styles.linkButton}
                >
                  
                  View Discussion
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default Forum;
