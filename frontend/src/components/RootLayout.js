// RootLayout.js
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../pages/Logo.png'; // Update the path to your logo image
import './RootLayout.css'; // Import the shared CSS

const RootLayout = ({ children }) => {
  return (
    <div className="root-container">
      <Header />
      <Navbar />
      <main className="content">{children}</main>
      
    </div>
  );
};

function Header() {
  return (
    <header className="header">
      <div className="logo-top-left">
        <img src={logoImage} alt="DB Logo" className="logo-image" />
        <h1 className="title">DB Academic Networking Site</h1>
      </div>
    </header>
  );
}

function Navbar() {
  return (
    <nav className="nav-center">
      <Link to="/home">Home</Link>
      <Link to="/login">Profile</Link>
      <Link to="/networking">Networking</Link>
      <Link to="/opportunities">Opportunities</Link>
      <Link to="/events">Events</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/contactus">Contact Us</Link>
    </nav>
  );
}

export default RootLayout;
