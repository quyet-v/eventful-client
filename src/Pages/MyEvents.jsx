import React, { useEffect, useState } from 'react'
import "../Styles/MyEvents.css"
import { getApiCall,postApiCall,deleteApiCall } from '../utils/functions'
import Event from "../Components/Event"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from "styled-components"

const MyEvents = () => {
   
    const [events,setEvents] = useState([])
    const [showMessage,setShowMessage] = useState(false)
    const [showLoading,setShowLoading] = useState(true)
    

    useEffect(() => {

      getApiCall("https://eventfuloflies.herokuapp.com/getUserEvents")
      .then((res) => {
        setEvents(res.events)
        setShowLoading(false)
        if(res.events.length <= 0) {
          setShowMessage(true)
        }
      })

    }, [])

    const deleteEventUpdate = (events) => {
      setEvents(events)
    }

    const noEventTitle = {
      width: 100,
      textAlign: 'center',
      backgroundColor: 'green'


    }

   
    
  return (
    <Container>
      
      <EventsContainer className={showLoading == false && showMessage == false && "show-loading-finished"}>
        {showMessage && <NoEventTitle>No Events Found...</NoEventTitle>}
        {
          events.map((element) => {
            return <Event 
              key={events.indexOf(element)} 
              eventID={element._id} 
              name={element.name} 
              host={element.host}
              isOwner={true}
              deleteEventUpdate={deleteEventUpdate}>
            </Event>
          })
        }

        {showLoading == true && 
          <LoadingBox >
            <CircularProgress />
          </LoadingBox>
        }
          
      </EventsContainer>
    </Container>
  )
}

const Container = styled.div `
  flex-grow:1;
  background-color:#2a2d34;
  position:relative;
`;



const LoadingBox = styled(Box) `
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const NoEventTitle = styled.h1 `
  width:100%;
  height:100%;
 
  display:flex;
  justify-content:center;
  align-items:center;
`

const EventsContainer = styled.div `
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
  
  padding:10px;
  gap:10px;
  overflow-y: scroll;
  scroll-behavior:smooth;
 
  -ms-overflow-style: none;  
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display:none;
  }

  

  
`;

export default MyEvents