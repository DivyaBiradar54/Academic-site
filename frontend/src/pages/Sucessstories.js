import React from "react";
import styles from './Sucessstories.module.css'; // Importing the CSS module
import user1 from './user1.png';
import user2 from './user2.png';
import user3 from './user3.png';
import RootLayout from '../components/RootLayout';

const Successstories = () => {
  return (
    <RootLayout>
      <div className={styles.SuccessstoriesContainer}>
        <SuccessStories />
      </div>
    </RootLayout>
  );
};

function SuccessStories() {
  return (
    <div className={styles.successStories}>
      <h1>Success Stories</h1>
      <div className={styles.testimonialContainer}>
        <TestimonialCard
          quote="Amazing Support!"
          description="Secured my dream job through strategic networking and career development Successstories."
          name="Olivia Wilson"
          role="Data Engineer at Microsoft"
          image={user1}
        />
        <TestimonialCard
          quote="Super Cool!"
          description="I'm very happy to find my first full-time job by applying to opportunities posted on the site."
          name="Matt Zhang"
          role="Software Engineer at Google"
          image={user2}
        />
        <TestimonialCard
          quote="Out of this world!"
          description="Achieved a significant career milestone by leveraging the career Successstories and job board."
          name="Hannah Morales"
          role="Senior Software Engineer at ValueLabs"
          image={user3}
        />
      </div>
    </div>
  );
}

function TestimonialCard({ quote, description, name, role, image }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.quoteIcon}>“</div>
      <h2>{quote}</h2>
      <p>{description}</p>
      <div className={styles.stars}>★★★★★</div>
      <div className={styles.userInfo}>
        <img src={image} alt={`${name}'s profile`} />
        <div>
          <div className={styles.userName}>{name}</div>
          <div className={styles.userRole}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export default Successstories;
