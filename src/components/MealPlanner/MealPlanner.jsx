import React from 'react';
import { Link } from "react-router-dom";

const MealPlanner = () => {
  return (
    <main>
      <section className="dashboard-overview">
        <h2>Meal Planner</h2>
        <p>Stay on top of your nutrition with our easy-to-use meal planning tool. Plan your meals for the week!</p>
      </section>

      {/* Additional content for Meal Planner can go here */}
      <section className="dashboard-sections">
        <div className="section">
          <h3>Plan Your Meals</h3>
          <p>Customize your meals for the week with nutrition tracking and suggested recipes.</p>
          <Link to="/create-meal-plan" className="cta-button">Create Meal Plan</Link>
        </div>
        {/* Add more meal-planning content here */}
      </section>
    </main>
  );
};

export default MealPlanner;
