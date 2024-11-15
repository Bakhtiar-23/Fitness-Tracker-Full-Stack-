// src/services/authService.js

export const getProtectedData = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found');
    return null;
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
    return data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        alert('Invalid username or password');
      } else {
        alert(`Login failed: ${data.error || 'Unknown error'}`);
      }
      return;
    }

    console.log('Login successful:', data);
    localStorage.setItem('token', data.token); // Store token
    alert('Login successful!');
    // Redirect or handle after login
  } catch (error) {
    console.error('Error during login:', error);
    alert('Failed to connect to the server. Please try again later.');
  }
};
