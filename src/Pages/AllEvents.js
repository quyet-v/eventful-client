import React from 'react'
import {getApiCall,postApiCall} from "../utils/functions"
import "../Styles/MyEvents.css"
import Event from "../components/Event/Event"
import styled from "styled-components"
import { useState,useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Buffer } from 'buffer'
const AllEvents = () => {

  const [events,setEvents] = useState([])
  const [showLoading,setShowLoading] = useState(true)
  const [isActive,setIsActive] = useState("");
  
  useEffect(() => {
    
    getApiCall("http://localhost:4000/api/events/all")
    .then((res) => {
      
      return res.json();
    })
    .then(res => {
      setEvents(res.events)
      setShowLoading(false)
    })

  }, [])
   
  return (
    <Wrapper onClick={(e) => {
      setIsActive(null)
    }}>
      
      <EventContainer className={!showLoading && "show-loading-finished"}>
          {events.map((event) => {
              
              return <Event key={events.indexOf(event)} 
                eventID={event._id} 
                name={event.name} 
                host={event.host}
                img={`data:image/png;base64,${Buffer.from(event.img.data).toString("base64")}`}
                setIsActive={setIsActive}
                active={isActive}
                >
                
              </Event>
            })
          }

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




export default AllEvents