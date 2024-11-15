// src/components/SignOut/SignOut.jsx
import React from 'react';

const SignOut = () => {
  const handleSignOut = () => {
    // Handle sign-out logic (e.g., clearing user data, redirecting, etc.)
    console.log('Signed out');
  };

  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
