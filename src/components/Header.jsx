import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="logo">Fitness Tracker</div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/dashboard" className="nav-button">Dashboard</Link>
        <Link to="/courses" className="nav-button">Courses</Link>
        <Link to="/progress-stats" className="nav-button">Progress Stats</Link>
        <Link to="/team-members" className="nav-button">Team Members</Link>
        <Link to="/settings" className="nav-button">Settings</Link>
      </div>
    </header>
  );
}

export default Header;
