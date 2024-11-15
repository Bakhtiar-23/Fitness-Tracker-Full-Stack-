import React from 'react';

const WeeklyWorkoutPlan = () => {
  return (
    <main>
      <section className="dashboard-overview">
        <h2>Weekly Workout Plan</h2>
        <p>Plan your workouts for the entire week and stay consistent with your fitness goals. Get suggestions based on your fitness level.</p>
      </section>

      {/* Additional content for Weekly Workout Plan can go here */}
      <section className="dashboard-sections">
        <div className="section">
          <h3>Build Your Weekly Plan</h3>
          <p>Organize your workouts for the entire week to stay on track with your fitness goals.</p>
          <Link to="/create-weekly-plan" className="cta-button">Create Weekly Plan</Link>
        </div>
        {/* Add more weekly workout plan content here */}
      </section>
    </main>
  );
};

export default WeeklyWorkoutPlan;
