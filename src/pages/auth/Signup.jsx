/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pword, setPword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const data = {
      email,
      username,
      password: pword,
    };

    axios.post(`${process.env.REACT_APP_HOST_URL}/api/auth/signup`, data)
      .then((res) => {
        // navigate('/dashboard/events');
        sessionStorage.setItem('token', res.data.token);
        navigate('/dashboard/events');
      })
      .catch((err) => {
        setError(err);
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  return (
    <div className="signup">
      {error && <h3 className="error-message">Error while signing up</h3>}
      <form
        className="signup-form"
        onSubmit={handleSignup}
      >
        <input
          type="text"
          placeholder="Email"
          className="signup-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPword(e.target.value)}
          className="signup-input"
          required
        />
        <button
          type="submit"
          className="signup-button"
        >
          Sign up
        </button>
      </form>

    </div>
  );
}

export default Signup;
