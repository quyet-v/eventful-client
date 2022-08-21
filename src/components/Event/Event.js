import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Event/Event.styles.css"
import styled from "styled-components"
import { postApiCall,deleteApiCall,getApiCall } from '../../utils/functions'
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingBox } from '../../styledcomponents/Components.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Event = ({name,time,date,host,eventID,isOwner,deleteEventUpdate,img,setIsActive,active,userEvents,user,setUser}) => {

	const [showLoading,setShowLoading] = useState(false);
	const [currentlyOpened,setCurrentlyOpened] = useState({});
	const [showMore,setShowMore] = useState(false);
	const [joined,setJoined] = useState(false);
  const [joinedEvents,setJoinedEvents] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    getJoinedEvents();
    setJoined(checkJoinStatus(joinedEvents))
  },[])

	useEffect(() => {
		setJoined(checkJoinStatus(joinedEvents));
	},[joinedEvents])
	
  const ViewStyle = {
    color:'white',
    backgroundColor:'black',
    textDecoration:'none',
    borderRadius:5,
    padding: 5
  }

  const handleDelete = ()  => {
    setShowLoading(true)
    deleteApiCall(`https://eventfuloflies.herokuapp.com/event/${eventID}`)
    .then((res) => {
      setShowLoading(false)
      deleteEventUpdate(res.events)
    })
  }

  const handleLeave = () => {
    postApiCall(`${process.env.REACT_APP_HOST_URL}/event/${eventID}`)
    .then((res) => {
      setShowLoading(false)
      deleteEventUpdate(res.events)
    })
  }

  const handleView = () => {
    navigate(`/dashboard/event/${eventID}`)
  }

  const checkJoinStatus = (array) => {
    for(let i = 0; i < array.length; i++) {
      if(array[i]._id === eventID) return true;
    }
    return false;
  }

  const joinEvent = () => {
    setLoading(true)
    postApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/join`,{eventID})
    .then((res) => {
      return res.json();
    })
    .then(res => {
      setJoinedEvents(res.data.events)
      setLoading(false);
    })
    .catch(err => {

    })
  }

  const leaveEvent = () => {
    setLoading(true)
    postApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/leave`,{eventID})
    .then((res) => {
      return res.json();
    })
    .then(res => {
      setJoinedEvents(res.data.events)
      setLoading(false);
    })
    .catch(err => {

    })
    
  }

  const getJoinedEvents = () => {
	axios.get(`${process.env.REACT_APP_HOST_URL}/api/users/info`,
	{headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`}}
	)
	.then((res) => {
		setJoinedEvents(res.data.events);
	})
	.catch((error) => {
		console.log(error);
		console.log("hi")
	})
  }
	
  const sendMail = () => {
    axios.post(`${process.env.REACT_APP_HOST_URL}/api/email/send`,
      {data: {date: date, time: time}}
    )}
  
  return (
    <EventContainer image={img} onClick={(e) => e.stopPropagation()}>
      {showLoading && <LoadingBox>
        <CircularProgress />
      </LoadingBox>}

      <InfoContainer>
        <Title>{name}</Title>
        <Title>Hosted by {host}</Title>
      </InfoContainer>
        
      <ClickAwayListener onClickAway={() => setShowMore(false)}>
        <Tooltip 
          placement='bottom-end'
          PopperProps={{
            disablePortal: true,
          }}
          arrow
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={eventID === active}
          title={
            <div style={{display: "flex",flexDirection:"column"}}>
              <button className='more-button' onClick={handleView}>View</button>
              <button className='more-button' onClick={sendMail}>Send Mail</button>
              {joined ? 
                <button className='more-button' disabled={loading ? true : false} onClick={leaveEvent} >{loading ? <CircularProgress size={"1.5rem"} className="loading" /> : "Leave" }</button> :
                <button className='more-button' disabled={loading ? true : false} onClick={joinEvent}>{loading ? <CircularProgress size={"1.5rem"} className="loading" /> : "Join" }</button>
              }
              {isOwner && <button className='more-button'>Delete<DeleteIcon></DeleteIcon></button>}
            </div>
          }>
            <ExpandMoreIcon 
              onClick={() => {
                setShowMore(true)
                setIsActive(eventID)
              }} 
              className='more-icon'
            />
        </Tooltip>
      </ClickAwayListener>
    </EventContainer>
  )
}

const EventContainer = styled.div `
  background-image: url(${props => props.image});
  width:150px;
  height:150px;
  background-size: 100% 100%;
  background-repeat:no-repeat;
  border-radius:5px;
  background-position:center;
  position:relative;
  
  > div {
    padding:5px;
  }
  
 
  border:2px solid black;
`;



const HoverModal = styled.div `
  position:absolute;
  background-color:black;
  width:100%;
  height: 40px;
  color:white;
  margin-top:5px;
  border-radius:5px;
  display:flex;
  align-items:center;
  justify-content:center;
  animation: fadeIn .2s linear;
  @keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;;
  }
}


`

const DeleteEventButton = styled.button `
  cursor:pointer;
  background-color:red;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
 
  
  

  :hover {
    background-color:darkred;
  }


`


const InfoContainer = styled.div `
  margin-top: 3px;
  flex-grow:1;
  position:absolute;

`;


const Title = styled.p `


`

const JoinButton = styled.button `
  color:white;
  background-color:black;
  border:none;
  padding:5px;
  border-radius:5px;
  cursor:pointer;
  font-style:bold;

`

const ButtonWrapper = styled.div `
  display:inline-flex;
  width:100%;
  justify-content:space-between;
  
  
  

`

export default Event