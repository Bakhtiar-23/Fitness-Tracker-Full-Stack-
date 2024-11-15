import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function loginUser(username, password) {
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token); // Store token
        alert('Login successful!');
        navigate('/get-started/account'); // Redirect to dashboard
      } else {
        console.error('Login failed:', data.error);
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData.username, formData.password);
  };

  return (
    <div className="sign-in-form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
