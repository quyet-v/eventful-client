import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './Home.styles.css';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Presents from '../../assets/images/Presents.svg';
import { isAuthenticated } from '../../utils/functions';

function Home() {
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        navigate('/dashboard/events');
      });
  }, []);

  return (
    <Wrapper>
      {openLogin && <Login showLoading={setOpenLogin} />}

      <NavBar showLoading={setOpenLogin} />
      <div className="hero-container">
        <Hero>
          <Title>Bring your events to life</Title>
          <Title>with Eclipse</Title>
          <PartyImg src={Presents} />
        </Hero>

        <Signup className="john" />
      </div>

    </Wrapper>
  );
}

const Hero = styled.div`
  display: flex;
  flex-direction:column;
  border-radius:10px;
  text-align: center;  
  margin-right: 20px;
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-family: 'Kumar One', cursive;
  font-size:2.7rem;
  text-shadow: 3px 3px rgba(0,0,0,0.2);
`;

const PartyImg = styled.img`
  filter:drop-shadow(13px 13px 10px rgba(0,0,0,0.2));
  display:block;
  width: 100%;
  height: 100%
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  overflow-x: hidden;
  height: 100vh;
  
`;

export default Home;
