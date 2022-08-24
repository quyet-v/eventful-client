/* eslint-disable no-tabs */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import './Dashboard.styles.css';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Navigation from '../Navigation/Navigation';
import NavigationItem from '../NavigationItem/NavigationItem';
import { getApiCall } from '../../utils/functions';

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getApiCall(`${process.env.REACT_APP_HOST_URL}/api/users/info`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUser(res);
        }
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

        <div className="search">
          <SearchIcon className="search-icon" />
          <input placeholder="Search for friends" className="search-input" />
        </div>

        <Navigation>

          {/* <Link to="/dashboard/host" className={"active"}><AddLocationAltTwoToneIcon /></Link>
<Link to={`/dashboard/myevents`} ><CalendarTodaySharpIcon /> </Link>
<Link to="/dashboard/allevents" ><EventNoteSharpIcon /> </Link>
<Link to="/dashboard/friends" ><PeopleAltTwoToneIcon /></Link>
<Link to="/dashboard/add-friends" ><GroupAddTwoToneIcon /></Link> */}

          <NavigationItem link="/dashboard/host" logo={<AddLocationAltTwoToneIcon />} info="Host" />
          <NavigationItem link="/dashboard/events" logo={<EventNoteSharpIcon />} info="Events" />
          <NavigationItem link="/dashboard/friends" logo={<PeopleAltTwoToneIcon />} info="Friends" />

        </Navigation>

        <div className="profile-container">
          <button type="button" className="profile" onClick={handleProfileClick}><AccountCircleIcon /></button>
          <div className={showProfile ? 'profile-options show-options' : 'profile-options'} onClick={handleProfileOptionsClick}>

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
	overflow-x:hidden;
  background-color: grey;
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
