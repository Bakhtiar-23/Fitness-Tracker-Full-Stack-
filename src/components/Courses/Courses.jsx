import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseImage from '../../assets/images/courseImage.jpg'; // Replace with your actual image path
import '../../styles/Courses.css';

const Courses = () => {
  const [userInfo, setUserInfo] = useState({
    gender: '',
    fitnessLevel: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = {
    men: {
      beginner: {
        title: "Men's Beginner Course",
        details: "3 workouts per week focusing on building a strong foundation through full-body exercises and basic strength training.",
        duration: "6 months",
      },
      intermediate: {
        title: "Men's Intermediate Course",
        details: "4 workouts per week aimed at improving strength, endurance, and muscle definition. Includes progressive overload techniques.",
        duration: "6 months",
      },
      advanced: {
        title: "Men's Advanced Course",
        details: "5-6 workouts per week focusing on advanced strength training, hypertrophy, and performance enhancement.",
        duration: "6 months",
      },
    },
    women: {
      beginner: {
        title: "Women's Beginner Course",
        details: "3 workouts per week focusing on toning, endurance, and improving overall fitness with light resistance training.",
        duration: "6 months",
      },
      intermediate: {
        title: "Women's Intermediate Course",
        details: "4 workouts per week incorporating moderate resistance training and functional exercises to increase strength and flexibility.",
        duration: "6 months",
      },
      advanced: {
        title: "Women's Advanced Course",
        details: "5-6 high-intensity sessions per week, focusing on functional strength, advanced cardio, and sculpting exercises.",
        duration: "6 months",
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const displayCourse = () => {
    if (!userInfo.gender || !userInfo.fitnessLevel) {
      setSelectedCourse('Please fill in gender and fitness level to display a course.');
      return;
    }

    const { title, details, duration } = courses[userInfo.gender][userInfo.fitnessLevel];
    setSelectedCourse(
      <>
        <h4>{title}</h4>
        <p>{details}</p>
        <p><strong>Duration:</strong> {duration}</p>
      </>
    );
  };

  const subscribeToCourse = () => {
    alert('You have successfully subscribed to the course!');
  };

  return (
    <div className="exercise-log">
      <h2>Our Courses</h2>
      <p>
        Subscribe to your personalized course here. For professional guidance, visit our <Link to="/team-members">Team Members</Link> and connect with our expert Personal Trainers.
      </p>

      <form>
        <label>
          Select Gender:
          <select name="gender" value={userInfo.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </label>
        <br />

        <label>
          Select Fitness Level:
          <select name="fitnessLevel" value={userInfo.fitnessLevel} onChange={handleChange}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <br />

        <label>
          Enter Age:
          <input type="number" name="age" value={userInfo.age} onChange={handleChange} placeholder="Age" />
        </label>
        <br />

        <label>
          Enter Height (cm):
          <input type="number" name="height" value={userInfo.height} onChange={handleChange} placeholder="Height in cm" />
        </label>
        <br />

        <label>
          Enter Weight (kg):
          <input type="number" name="weight" value={userInfo.weight} onChange={handleChange} placeholder="Weight in kg" />
        </label>
        <br />

        <label>
          Select Goal:
          <select name="goal" value={userInfo.goal} onChange={handleChange}>
            <option value="">Select</option>
            <option value="fitness">Fitness</option>
            <option value="weight loss">Weight Loss</option>
            <option value="gain muscles">Gain Muscles</option>
            <option value="bodybuilding">Bodybuilding</option>
          </select>
        </label>
        <br />

        <button type="button" onClick={displayCourse} className="display-course-button">
          Display Course
        </button>
      </form>

      <div className="course-image">
        <img src={CourseImage} alt="Fitness Course" />
      </div>

      <div className="course-details">
        <h3>Your Course:</h3>
        <p>{selectedCourse || 'Please complete the form to view your personalized course.'}</p>
        {selectedCourse && (
          <button className="subscribe-button" onClick={subscribeToCourse}>
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
};

export default Courses;
