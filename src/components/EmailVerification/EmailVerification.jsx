import React, { useState } from 'react';

const EmailVerification = ({ setEmailVerified }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleVerifyClick = async () => {
    if (!email) {
      setError('bakhtiarismail34@gmail.com');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      // Send the email verification request to the backend
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Verification email sent! Please check your inbox.');
        setEmailVerified(true); // Update the parent component with email verification status
      } else {
        setError('Error sending verification email. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        disabled={loading}
      />
      <button onClick={handleVerifyClick} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmailVerification;
