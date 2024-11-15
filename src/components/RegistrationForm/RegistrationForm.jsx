import React, { useState } from 'react';
import "../../styles/RegistrationForm.css";
import EmailVerification from '../EmailVerification/EmailVerification'; // Import the EmailVerification component

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    calorieNeed: '', // This could be calculated dynamically based on inputs
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Success message state
  const [emailVerified, setEmailVerified] = useState(false); // Email verification state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation and submission logic
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // Send POST request to backend to register user
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        // If registration was successful, show success message
        setRegistrationSuccess(true);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="registration-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>E-Mail Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password (Again):</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Please choose</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Goal:</label>
          <input
            type="text"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Activity Level:</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="">Please choose</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Very Active">Very Active</option>
            <option value="Super Active">Super Active</option>
          </select>
        </div>

        <div>
          <label>Daily Calorie Need:</label>
          <input
            type="number"
            name="calorieNeed"
            value={formData.calorieNeed}
            onChange={handleChange} // This allows manual changes
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {registrationSuccess && (
        <div className="success-message">
          <p>Registration successful! Check your email for confirmation.</p>
        </div>
      )}

      {/* Show the email verification component after registration success */}
      {registrationSuccess && !emailVerified && (
        <EmailVerification setEmailVerified={setEmailVerified} />
      )}
    </div>
  );
};

export default RegistrationForm;
