/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './AuthForm.styles.css';
import CircularProgress from '@mui/material/CircularProgress';

function AuthForm({
  buttonLabel,
  redirect,
  redirectMessage,
  redirectLinkMessage,
  isSignup,
  apiType,
}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleEmail = async (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = async (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = async (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="auth-form-container">
      {success === false && isSignup ? <h2 className="error-message">Signup failed</h2> : null}
      {success === false && !isSignup ? <h2 className="error-message">Wrong username/password</h2> : null}
      <form className="auth-form">
        {isSignup ? <input type="text" required placeholder="Email" className="auth-input" onChange={handleEmail} /> : null}
        <input type="text" required placeholder="Username" className="auth-input" onChange={handleUsername} />
        <input type="password" required placeholder="Password" className="auth-input" onChange={handlePassword} />

        <button
          type="submit"
          className="auth-button"
          onClick={(e) => {
            if (!isSignup) {
              apiType(username, password, e, setShowLoading, setSuccess);
            } else {
              apiType(email, username, password, e, setShowLoading, setSuccess);
            }
          }}
        >
          {showLoading && <CircularProgress size="30px" />}
          {!showLoading && buttonLabel}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
