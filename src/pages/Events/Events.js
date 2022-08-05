import React from 'react'
import {getApiCall,postApiCall} from "../../utils/functions"
import "../Events/Events.styles.css"
import Event from "../../components/Event/Event"
import styled from "styled-components"
import { useState,useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Buffer } from 'buffer'
import { useOutletContext } from 'react-router-dom'

const Events = () => {
	const [user,setUser] = useOutletContext();
	const [chosenEvents,setChosenEvents] = useState([])
	const [showLoading,setShowLoading] = useState(true)
	const [isActive,setIsActive] = useState("");
	const [userEvents,setUserEvents] = useState([]);
	const [allEvents,setAllEvents] = useState([]);
	const [joinedEvents,setJoinedEvents] = useState([]);
  
	useEffect(() => {

		getApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/user`)
		.then((res) => {
			return res.json();
		})
		.then(res => {
			setUserEvents(res.events)
		})

		getApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/all`)
		.then((res) => {
			
			return res.json();
		})
		.then(res => {
			setAllEvents(res.events)
			setShowLoading(false)
			setChosenEvents(res.events)
		})
	}, [])

  const handleSelect = (e) => {
	if(e.target.value === "My Events") {
		setChosenEvents(userEvents)
	}else if(e.target.value === "All Events") {
		setChosenEvents(allEvents);
	}
  }

  const checkOwner = (event) => {
	for(let i = 0; i < userEvents.length; i++) {
		if(userEvents[i]._id === event) {
			return true;
		}
	}
	return false;
  }
   
  return (
    <Wrapper onClick={(e) => {
      setIsActive(null)
    }}>
		<EventContainer className={!showLoading && "show-loading-finished"}>
			{!showLoading && <div className='event-filters'>
				
				<select onChange={handleSelect} name='event-filter' placeholder='Select filter:' className='filter-options'>
					<option className='option'>All Events</option>
					<option className='option'>My Events</option>
					
				</select>

			</div>}
			
			<div className='events'>
				{chosenEvents.map((event) => {
					console.log(event)
					return <Event key={chosenEvents.indexOf(event)} 
						eventID={event._id} 
						name={event.name} 
						host={event.host}
						date={event.date}
						time={event.time}
						img={`data:image/png;base64,${Buffer.from(event.img.data).toString("base64")}`}
						setIsActive={setIsActive}
						active={isActive}
						isOwner={checkOwner(event._id)}
						user={user}
						setUser={setUser}
						>
					
					</Event>
				})
				
				}
			</div>

		{showLoading == true && 
			<LoadingBox >
				<CircularProgress />
			</LoadingBox>
		}
		</EventContainer>

      
    </Wrapper>
  )
}


const Wrapper = styled.div `
  flex-grow:1;
  background-color:#2a2d34;
  position:relative;
 
  
  
`
const LoadingBox = styled(Box) `
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;


const EventContainer = styled.div `
  background-color:white;
  width:80%;
  height: 500px;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  margin:auto;
  border-radius:5px;
  border:2px solid black;
  display: ${props => props.showLoading ? "block" : "grid"};
  display:flex;
  flex-direction:column;
  padding:10px;
  gap:10px;
  overflow-y: scroll;
  scroll-behavior:smooth;

  -ms-overflow-style: none;  
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display:none;
  }




`




export default Events