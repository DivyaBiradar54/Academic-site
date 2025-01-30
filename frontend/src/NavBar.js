import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(page); // Navigate to the selected page
  };

  return (
    <nav className="nav-center">
      <button onClick={() => handleNavigation('/home')}>Home</button>
      <button onClick={() => handleNavigation('/profile')}>Profile</button>
      <button onClick={() => handleNavigation('/login')}>Login</button>
      <button onClick={() => handleNavigation('/divyaprofile')}>Divyaprofile</button>
      <button onClick={() => handleNavigation('/elizabeth')}>Elizabeth</button>
      <button onClick={() => handleNavigation('/Registration')}>Registration</button>
      <button onClick={() => handleNavigation('/rahulprofile')}>Rahulprofile</button>
      <button onClick={() => handleNavigation('/privatemessages')}>Privatemessages</button>
      <button onClick={() => handleNavigation('/groupmessages')}>Groupmessages</button>
      <button onClick={() => handleNavigation('/networking')}>Networking</button>
      <button onClick={() => handleNavigation('/forum')}>Forum</button>
      <button onClick={() => handleNavigation('/forumdiscussion/${topicId}')}>ForumDiscussion</button>
      <button onClick={() => handleNavigation('/opportunities')}>Opportunities</button>
      <button onClick={() => handleNavigation('/opportunities1')}>Opportunities1</button>
      <button onClick={() => handleNavigation('/resources')}>Resources</button>
      <button onClick={() => handleNavigation('/events')}>Events</button>
      <button onClick={() => handleNavigation('/eventdescription')}>Eventdescription</button>
      <button onClick={() => handleNavigation('/eventregistration')}>Eventregistration</button>
      <button onClick={() => handleNavigation('/callofpaper')}>CallForPaper</button>
      <button onClick={() => handleNavigation('/homeRegistration')}>HomeRegistration</button>
      <button onClick={() => handleNavigation('/conference')}>Conference</button>
      <button onClick={() => handleNavigation('/EmailPage')}>ForgotPassword</button>
      <button onClick={() => handleNavigation('/otppage')}>OtpPage</button>
      <button onClick={() => handleNavigation('/resources1')}>Resources1</button>
      <button onClick={() => handleNavigation('/successstories')}>Successstories</button>
      <button onClick={() => handleNavigation('/resourcesccp')}>Resourcesccp</button>
      <button onClick={() => handleNavigation('/resourcesemcp')}>Resourcesemp</button>
      <button onClick={() => handleNavigation('/mentorshipcontact')}>Resourcesemp</button>
      <button onClick={() => handleNavigation('/settings')}>Settings</button>
      <button onClick={() => handleNavigation('/settings1')}>Settings1</button>
      <button onClick={() => handleNavigation('/user-profile')}> UserProfile</button>
      <button onClick={() => handleNavigation('/user-profile1')}>UserProfile1</button>
      <button onClick={() => handleNavigation('/user-profile2')}>UserProfile2</button>
      <button onClick={() => handleNavigation('/user-profile3')}>UserProfile3</button>
      <button onClick={() => handleNavigation('/resetpassword')}>ResetPassword</button>
      </nav>
  );
};

export default NavBar;