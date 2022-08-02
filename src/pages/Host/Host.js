import React, { Component, useEffect, useRef, useState } from 'react'
import "../Host/Host.styles.css"
import Dashboard from '../../components/Dashboard/Dashboard'
import { postApiCall } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {Button as HostButton, LoadingBox} from "../../styledcomponents/Components.js"
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
    
    


    let image = useRef(null)
    let fileReader = new FileReader();
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
    let [imgSrc,setImgSrc] = useState();

    fileReader.addEventListener("load", () => {
        setImgSrc(fileReader.result);
        
    })

    const handleInputs = (e) => {
        
        const inputName = e.target.className.split(' ');
        
        switch(inputName[1]) {
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
                console.log(e.target.value)
                break

            case "event-location":
                
                setLocation(e.target.value)
                break
        }
    }

    const handleClick = async (e) => {
        console.log(name)
        if(name != "" && description != "" && date != "" && time != "" && location != "") {
            setShowLoading(true)
            e.preventDefault();
        
            let hostInfo = {
                name: name,
                description: description,
                date: date,
                time: time,
                location: location,
                img: imgSrc
            }        
            
            let hostApiCall = await postApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/create`,hostInfo)

            if(hostApiCall) {
                console.log(hostApiCall)
                navigate(`/dashboard/myevents`)
            }
        }
    }

    const handleFile = (e) => {
        fileReader.readAsDataURL(e.target.files[0]);
        
    }



    return (
        <Wrapper>
            <HostContainer>
                <HostForm>
                    <div className="input-block">
                        <label htmlFor='event-name-id' >Event Name</label>
                        <input type="text" id='event-name-id' className="event-input event-name" onChange={handleInputs} required />
                    </div>

                    <div className="input-block">
                        
                        <div className="description-titles">
                            
                            <label >Event Description</label>
                            <span className="max-char-display">({charRemaining} chars remaining)</span>
                        </div>

                        <input type="text" required maxLength="25"  className="event-input event-description" onKeyDown={(event) => setKeyPress(event.key)} onChange={handleInputs} />
                        
                    </div>

                    <div className="input-block">
                        <label >Event Date</label>
                        <input type="date" required className="event-input event-date" onChange={handleInputs} />
                    </div>

                    <div className="input-block">
                        <label >Event Time</label>
                        <input type="time" required className="event-input event-time" onChange={handleInputs} />
                    </div>

                    <div className="input-block">
                        <label >Event Location</label>
                        <input type="text" id='autocomplete' required className="event-input event-location"  onChange={handleInputs}/>
                    </div>

                    {/* <button type="submit" className="create-event-btn" onClick={handleClick}>Create Event</button> */}
                    <HostButton color={"rgb(229,2,59)"} type={"submit"} shadowColor={"rgb(162,0,54)"} onClick={handleClick}>
                        {!showLoading && "Host"}
                        {showLoading && <LoadingBox>
                            <CircularProgress size={"20px"} />   
                        </LoadingBox>}
                    </HostButton>
                    
                </HostForm>
                
                <ImageUpload>
                    
                    <ChosenImage src={imgSrc}></ChosenImage>
                   
                    <ChooseImageInput type={"file"} placeholder="Choose" accept={"image/*"} onChange={handleFile}></ChooseImageInput>

                </ImageUpload>
            
            </HostContainer>
        </Wrapper>
    )
}

const HostContainer = styled.div `
   
    background-color: white;
    margin:40px;
    width:80%;
    display:flex;

`;

const Wrapper = styled.div `
    flex-grow:1;
    background-color: #2A2D34;
    display:flex;
    justify-content:center;


`

const ChosenImage = styled.img `
    
    object-fit:cover;
    width:300px;
    height:300px;
   
    
    border: 2px solid black;

    
`

const ChooseImageInput = styled.input `
    background-color:grey;
    padding:10px;
   
    margin-top:10px;
   
    text-align:center;
    border-radius:10px;


`

const HostForm = styled.form `
    
    width: 50%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-right: 3px solid black;
   


`;

const ImageUpload = styled.div `
    
    flex-grow:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

`

export default Host