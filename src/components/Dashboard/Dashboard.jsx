/* eslint-disable array-callback-return */
/* eslint-disable no-tabs */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import './Dashboard.styles.css';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import NavigationItem from '../NavigationItem/NavigationItem';
import FriendControls from '../../FriendControls/FriendControls';
import SearchFriends from '../SearchFriends/SearchFriends';
import { getConfig } from '../../utils/functions';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST_URL}/api/users/info`, getConfig(sessionStorage.getItem('token')))
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowProfile(!showProfile);
  };

  const handleProfileOptionsClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={() => setShowProfile(false)}>
      <DashboardContainer>
        <SearchFriends user={user} setUser={setUser} />

        <Navigation>
          <NavigationItem link="/dashboard/host" logo={<AddLocationAltTwoToneIcon />} info="Host" />
          <NavigationItem link="/dashboard/events" logo={<EventNoteSharpIcon />} info="Events" />
        </Navigation>

        <div className="profile-container">
          <div className="button-container">
            <FriendControls user={user} setUser={setUser} />

            <button
              type="button"
              className="profile"
              onClick={handleProfileClick}
            >
              <AccountCircleIcon />
            </button>
          </div>

          <div
            className={showProfile ? 'profile-options show-options' : 'profile-options'}
            onClick={handleProfileOptionsClick}
          >
            {user && <h3>{user.username}</h3>}
            <button type="button" className="profile-option">
              <AccountCircleIcon />
              Profile
            </button>
            <button type="button" className="profile-option">
              <SettingsIcon />
              Settings
            </button>
            <button type="button" className="profile-option" onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </DashboardContainer>

      <Outlet context={[user, setUser]} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
	display:flex;
	flex-direction:column;
	height:100vh;
  background-color: grey;
  overflow-y: hidden;
`;

const DashboardContainer = styled.div`
	background-color: #E1E1E1;
	width: 100%;
	height:60px;
  padding: 20px;
	display:flex;
	align-items:center;
  justify-content:space-between;
`;

export default Dashboard;
