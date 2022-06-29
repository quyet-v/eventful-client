import React, { Component, useEffect, useState } from 'react'
import "../Styles/Host.css"
import Dashboard from '../components/Dashboard/Dashboard'
import { postApiCall } from '../utils/functions'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {Button as HostButton, LoadingBox} from "../StyledComponents/Components.js"
import CircularProgress from '@mui/material/CircularProgress';


const Host = () => {
    
    let autocomplete;
   

    // useEffect(() => {
    //     loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCg1mB3Pz7A1lLtnywFZkq6CLrzeEcoCqc&libraries=places",handleLoadScript);
        
    // }, [])

    // const loadScript = (url,callback) => {
    //     let script = document.createElement("script");
    //     script.type = "text/javascript";

    //     script.onload = () => {
    //         callback()
    //     }

    //     script.src = url;
    //     document.body.appendChild(script);
    // }

    // function handleLoadScript() {
    //     console.log("hi")
    //     autocomplete = new window.google.maps.places.Autocomplete(document.getElementById("autocomplete"), {
    //         types: ["(cities)"], componentRestrictions: { country: "us" } 
    //    })
    // }
    
    



    
    let navigate = useNavigate()
    const [showLoading,setShowLoading] = useState(false)
    let [host,setHost] = useState("")
    let [name,setName] = useState("")
    let [description,setDescription] = useState("")
    let [date,setDate] = useState("")
    let [time,setTime] = useState("")
    let [location,setLocation] = useState("")
    let [charRemaining, setCharRemaining] = useState(25)
    let [keyPress,setKeyPress] = useState()

    const handleInputs = (e) => {
        
        
        
        switch(e.target.className) {
            case "event-name":
                setName(e.target.value)
                break

            case "event-description":
                setDescription(e.target.value)
                if(keyPress === "Backspace" && charRemaining >= 0) {
                    setCharRemaining(charRemaining + 1)
                }else {
                    setCharRemaining(charRemaining - 1)
                }
                
                
                break

            case "event-date":
                setDate(e.target.value)
                break

            case "event-time":
                setTime(e.target.value)
                break

            case "event-location":
                
                setLocation(e.target.value)
                break
        }
    }

    const handleClick = async (e) => {
        
        if(name != "" && description != "" && date != "" && time != "" && location != "") {
            setShowLoading(true)
            e.preventDefault()
        
            let hostInfo = {
                host: sessionStorage.getItem("user-info"),
                name: name,
                description: description,
                date: date,
                time: time,
                location: location
            }        
            
            let hostApiCall = await postApiCall("https://eventfuloflies.herokuapp.com/createEvent",hostInfo)

            if(hostApiCall) {
                console.log(hostApiCall)
                navigate(`/dashboard/myevents`)
            }
        }
    }




  return (
        <HostContainer>
            <HostForm>
                <div className="input-block">
                    <label htmlFor='event-name-id' >Event Name</label>
                    <input type="text" id='event-name-id' className="event-name" onChange={handleInputs} required />
                </div>

                <div className="input-block">
                    
                    <div className="description-titles">
                        
                        <label >Event Description</label>
                        <span className="max-char-display">({charRemaining} chars remaining)</span>
                    </div>

                    <input type="text" required maxLength="25"  className="event-description" onKeyDown={(event) => setKeyPress(event.key)} onChange={handleInputs} />
                    
                </div>

                <div className="input-block">
                    <label >Event Date</label>
                    <input type="date" required className="event-date" onChange={handleInputs} />
                </div>

                <div className="input-block">
                    <label >Event Time</label>
                    <input type="time" required className="event-time" onChange={handleInputs} />
                </div>

                <div className="input-block">
                    <label >Event Location</label>
                    <input type="text" id='autocomplete' required className="event-location"  onChange={handleInputs}/>
                </div>

                {/* <button type="submit" className="create-event-btn" onClick={handleClick}>Create Event</button> */}
                <HostButton color={"rgb(229,2,59)"} type={"submit"} shadowColor={"rgb(162,0,54)"} onClick={handleClick}>
                    {!showLoading && "Host"}
                    {showLoading && <LoadingBox>
                        <CircularProgress size={"20px"} />   
                    </LoadingBox>}
                </HostButton>
                
            </HostForm>
        
        
        </HostContainer>
  )
}

const HostContainer = styled.div `
    flex-grow:1;
    background: -webkit-linear-gradient(to top, #ad5389, #3c1053); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #ad5389, #3c1053);
    position:relative;

`;

const HostForm = styled.form `
    background-color:white;
    width: 80%;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;


`;

export default Host