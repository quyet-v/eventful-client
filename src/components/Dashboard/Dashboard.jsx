import React, { useEffect, useState,useRef } from 'react'
import UserInfo from '../UserInfo'
import { NavLink, useNavigate,Outlet } from 'react-router-dom'
import { getApiCall } from '../../utils/functions'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import {Button as LogoutButton} from "../../styledcomponents/Components.js"
import GroupIcon from '@mui/icons-material/Group';
import ".././Dashboard/Dashboard.styles.css"
import FriendRequest from '../FriendRequest'
import styled from "styled-components"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import NavigationItem from '../NavigationItem/NavigationItem';
import Navigation from '../Navigation/Navigation';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {

	const [user,setUser] = useState({})
	const [userID,setUserID] = useState("")
	const navigate = useNavigate()
	const [showProfile,setShowProfile] = useState(false);

	useEffect(() => {
		getApiCall(`${process.env.REACT_APP_HOST_URL}/api/users/info`)
		.then((res) => {
		  return res.json();
		})
		.then(res => {
		  if(res) {
			setUser(res)
		  }
		})
	  }, [])

  const nav = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate("/")
  }

  const handleProfileClick = (e) => {
	e.stopPropagation();
	setShowProfile(!showProfile)
  }

  const handleProfileOptionsClick = (e) => {
	e.stopPropagation();
  }
 
  return (
    <Wrapper onClick={() => setShowProfile(false)}>
		<DashboardContainer>

			<div className='search'>
				<SearchIcon className='search-icon' />
				<input placeholder='Search for friends' className="search-input" />
			</div>

			<Navigation>
				
				{/* <Link to="/dashboard/host" className={"active"}><AddLocationAltTwoToneIcon /></Link>
				<Link to={`/dashboard/myevents`} ><CalendarTodaySharpIcon /> </Link>
				<Link to="/dashboard/allevents" ><EventNoteSharpIcon /> </Link>
				<Link to="/dashboard/friends" ><PeopleAltTwoToneIcon /></Link>
				<Link to="/dashboard/add-friends" ><GroupAddTwoToneIcon /></Link> */}
				
				
				<NavigationItem link={"/dashboard/host"} logo={<AddLocationAltTwoToneIcon />} info={"Host"}></NavigationItem>
				<NavigationItem link={"/dashboard/events"} logo={<EventNoteSharpIcon />} info={"Events"}></NavigationItem>
				<NavigationItem link={"/dashboard/friends"} logo={<PeopleAltTwoToneIcon />} info={"Friends"}></NavigationItem>
				
			</Navigation>

			<div className='profile-container'>
				<button className='profile' onClick={handleProfileClick}><AccountCircleIcon></AccountCircleIcon></button>
				<div className={showProfile ? 'profile-options show-options' : "profile-options"} onClick={handleProfileOptionsClick}>
					
					<button className='profile-option'><AccountCircleIcon/>Profile</button>
					<button className='profile-option'><SettingsIcon/>Settings</button>
					<button className='profile-option' onClick={handleLogout}><LogoutIcon/>Logout</button>

				</div>
			</div>
			
			
		</DashboardContainer>

		<Outlet context={[user,setUser]}/>
    </Wrapper>
  )
}

const Wrapper = styled.div `
	display:flex;
	flex-direction:column;
	width:100vw;
	height:100vh;


`;

const Links = styled.div `

	display:flex;
	height:100%;
	width: 400px;
	
	
	

`


const Link = styled(NavLink) `
	font-size:10px;
	
	
  	padding:10px;
	width:100px;
	text-align:center;
	transition: all 0.2s;
  	:hover {
		background-color:white;
		border-radius: 10px;
	}
`




const DashboardContainer = styled.div `
    
	background-color: #E1E1E1;
	width:100%;
	height:60px;
	display:flex;
	align-items:center;
  	justify-content:space-between;
	padding-left:15px;
	padding-right:15px;
	padding-top:5px;
	padding-bottom:5px;
`

export default Dashboard