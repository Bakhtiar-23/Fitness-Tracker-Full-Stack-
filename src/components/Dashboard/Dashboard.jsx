import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css';

async function getProtectedData() {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch protected data');
    }

    const data = await response.json();
    console.log('Protected data:', data);
  } catch (error) {
    console.error('Error fetching protected data:', error);
  }
}

const Dashboard = () => {
  useEffect(() => {
    getProtectedData();
  }, []); // Runs once when the component mounts

  return (
    <div className="dashboard">
      <div className="sub-header">
        <h1>Welcome to Your Fitness Tracker</h1>
      </div>

      <main>
        {/* Overview Section */}
        <section className="dashboard-overview">
          <h2>Your Fitness Journey Starts Here</h2>
          <p>Track your workouts, meals, and progress all in one place. Stay motivated and achieve your goals!</p>
        </section>

        {/* Dashboard Sections */}
        <section className="dashboard-sections">
          <div className="section">
            <h3>View Workouts</h3>
            <p>Browse through your workout plans or create new ones to track your fitness progress.</p>
            <Link to="/workouts" className="cta-button">View Workouts</Link>
          </div>

          <div className="section">
            <h3>Meal Planner</h3>
            <p>Stay on top of your nutrition with our easy-to-use meal planning tool. Plan your meals for the week!</p>
            <Link to="/meal-planner" className="cta-button">Create Meal Plan</Link>
          </div>

          <div className="section">
            <h3>Weekly Workout Plan</h3>
            <p>Plan your workouts for the entire week and stay consistent with your fitness goals. Get suggestions based on your fitness level.</p>
            <Link to="/weekly-workout-plan" className="cta-button">Weekly Plan</Link>
          </div>

          <div className="section">
            <h3>Notifications</h3>
            <p>Stay updated with reminders, progress notifications, and new workout recommendations.</p>
            <Link to="/notifications" className="cta-button">Check Notifications</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
