import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import { NavLink, useNavigate,Outlet } from 'react-router-dom'
import { getApiCall } from '../utils/functions'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import {Button as LogoutButton} from "../StyledComponents/Components.js"

import "../Styles/DashBoard.css"
import FriendRequest from './FriendRequest'
import styled from "styled-components"

const Dashboard = () => {

  const [username,setUsername] = useState("")
  const [userID,setUserID] = useState("")
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate("/")
  }
 
  return (
    <Wrapper>
      <DashboardContainer>
        <HudContainer>
          <InfoContainer>
            <UserInfo />
            <FriendRequest />
          </InfoContainer>
          
          <LogoutButton color={"rgb(229,2,59)"} shadowColor={"rgb(162,0,54)"} onClick={handleLogout}><LogoutTwoToneIcon /></LogoutButton>
        </HudContainer>
        
        <Links>
          <Link to="/dashboard/host" ><AddLocationAltTwoToneIcon />HOST</Link>
          <Link to={`/dashboard/myevents`} ><CalendarTodaySharpIcon />MY EVENTS</Link>
          <Link to="/dashboard/allevents" ><EventNoteSharpIcon />ALL EVENTS</Link>
          <Link to="/dashboard/friends" ><PeopleAltTwoToneIcon />FRIENDS</Link>
          <Link to="/dashboard/add-friends" ><GroupAddTwoToneIcon />ADD FRIEND</Link>
        </Links>
      </DashboardContainer>

      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div `
  display: flex;



`;

const Links = styled.div `

  display:flex;
  flex-direction:column;
  
  flex-grow:1;
  justify-content:space-evenly;
  align-items:center;


`


const InfoContainer = styled.div `

  display:flex;
  flex-direction:column;
 
  align-items:center;

  > * {
    margin-bottom: 5px;
  }


`

const Link = styled(NavLink) `
  color:white;
  text-decoration:none;
  background-color:#2a2d34;
  box-shadow: 0px 5px black;
  padding:10px;
  transition: all .2s;
  display:flex;
  
  align-items:center;
  justify-content:space-between;

  > * {
    margin-right: 4px;
  }

  :hover {
    transform:translateY(-3px);
    box-shadow: 0px 8px black;
  }

  :active {
    transform:translateY(2px);
    box-shadow: 0px 5px black;
  }

`



const HudContainer = styled.div `
  width: 100%;
  background:#2a2d34;
  border-bottom: 4px solid black;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:20px;


`


const DashboardContainer = styled.div `
  
  height:100vh;
  flex:.3;
  min-width: 300px;
  display:flex;
  flex-direction:column;
  border-right: 4px solid black;


`

export default Dashboard