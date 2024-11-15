// src/components/GetStartedPage/GetStartedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/GetStartedPage.css";

const GetStartedPage = () => {
  return (
    <div>
      <h1>Welcome to Get Started!</h1>
      <div>
        <Link to="/get-started/registration">
          <button>Register</button>
        </Link>
      </div>
      <div>
        <Link to="/get-started/sign-in">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default GetStartedPage;
