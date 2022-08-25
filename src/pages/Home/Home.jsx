import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import './Home.styles.css';
import Login from '../auth/Login';
import Presents from '../../assets/images/Presents.svg';
import { isAuthenticated } from '../../utils/functions';

function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pword, setPword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        navigate('/dashboard/events');
      });
  }, []);

  const data = {
    email,
    username,
    password: pword,
  };

  const handleSignup = (e) => {
    e.preventDefault();
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
    <Wrapper>
      {openLogin && <Login showLoading={setOpenLogin} />}

      <NavBar showLoading={setOpenLogin} />
      <div className="hero-container">
        <div className="hero">
          <Hero>
            <Title>Bring your events to life</Title>
            <Title>with Eclipse</Title>
            <PartyImg src={Presents} />
          </Hero>

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
        </div>
      </div>

    </Wrapper>
  );
}

const Hero = styled.div`
  display: flex;
  flex-direction:column;
  border-radius:10px;
  padding:10px;
  
`;
const Title = styled.h1`
  font-family: 'Kumar One', cursive;
  font-size:2.7rem;
  text-shadow: 3px 3px rgba(0,0,0,0.2);
`;

const PartyImg = styled.img`
  filter:drop-shadow(13px 13px 10px rgba(0,0,0,0.2));
  display:block;
`;

const Wrapper = styled.div`
  
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
  
`;

export default Home;
