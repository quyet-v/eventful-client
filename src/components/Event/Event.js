
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Event/Event.styles.css"
import styled from "styled-components"
import { postApiCall,deleteApiCall,getApiCall } from '../../utils/functions'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoadingBox } from '../../StyledComponents/Components.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';




const Event = ({name,host,eventID,isOwner,deleteEventUpdate,img,setIsActive,active,userEvents,user,setUser}) => {

	
	const [showLoading,setShowLoading] = useState(false);
	const [showModal,setShowModal] = useState(false);
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
      {headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`}})
      .then((res) => {
        setJoinedEvents(res.data.events);
      })
      .catch((error) => {
        console.log(error);
      })
  }
	
  	const sendMail = () => {
		axios.post(`${process.env.REACT_APP_HOST_URL}/api/email/send`)
		.then((res) => {

		})
		.catch(err => {

		})
	}
  

  return (
    <EventContainer image={img} onClick={(e) => e.stopPropagation()}>
        
        {showLoading && <LoadingBox>
        	<CircularProgress />
        </LoadingBox>}

        <InfoContainer>
          <Title>{name}</Title>
          <Title>Hosted by {host}</Title>
        </InfoContainer>
        
        <div className='more-container'>
			<ExpandMoreIcon className='more-icon' onClick={() => {
				if(active != eventID) {
					setShowMore(true)
				}else {
					setShowMore(!showMore)
				}
				setIsActive(eventID)
			
			}}/>
		
			<div className={active === eventID && showMore ? 'more-options show-more' : "more-options"}>
				<button className='more-button' onClick={handleView}>View</button>
				<button onClick={sendMail}>Send Mail</button>
				{joined ? <button disabled={loading ? true : false} className='more-button' onClick={leaveEvent} >{loading ? <CircularProgress size={"1.5rem"} className="loading" /> : "Leave" }</button> :
        		<button disabled={loading ? true : false} className='more-button' onClick={joinEvent}>{loading ? <CircularProgress size={"1.5rem"} className="loading" /> : "Join" }</button>
				}

				
				
        		{isOwner && <button className='more-button'>Delete <DeleteIcon></DeleteIcon></button>}
			</div>
        </div>

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