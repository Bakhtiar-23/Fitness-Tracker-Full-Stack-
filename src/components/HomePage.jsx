import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Ensure the path is correct

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        {/* Video Background */}
        <div className="video-background">
          <iframe
            title="Background Video"
            className="youtube-video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/UUwmlaDT-hM?autoplay=1&mute=1&loop=1&playlist=UUwmlaDT-hM"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1>Welcome to Fitness Tracker</h1>
          <p>Track your fitness journey and stay motivated!</p>
          <Link to="/get-started" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature-item">
            <h3>Track Your Workouts</h3>
            <p>Log your workouts easily and monitor progress.</p>
            <Link to="/track-your-workouts">
              <button>Go to Track Your Workouts</button>
            </Link>
          </div>
          
          <div className="feature-item">
            <h3>Monitor Nutrition</h3>
            <p>Keep an eye on your diet and make healthier choices.</p>
          </div>
          <div className="feature-item">
            <h3>Set Goals</h3>
            <p>Set fitness goals and stay motivated to achieve them.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Fitness Tracker is designed to help you achieve your fitness goals.
          Whether you're a beginner or an expert, we offer tools to track your
          workouts, nutrition, and goals, all in one place.
        </p>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to start your fitness journey?</h2>
        <Link to="/get-started" className="cta-button">
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
