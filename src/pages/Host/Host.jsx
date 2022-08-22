import React, { useState } from 'react';
import './Host.styles.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { postApiCall } from '../../utils/functions';

function Host() {
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
  //         types: ["(cities)"], componentRestrictions: { country: "us" }
  //    })
  // }

  const fileReader = new FileReader();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [charRemaining, setCharRemaining] = useState(25);
  const [keyPress, setKeyPress] = useState();
  const [imgSrc, setImgSrc] = useState();

  fileReader.addEventListener('load', () => {
    setImgSrc(fileReader.result);
  });

  const handleInputs = (e) => {
    const inputName = e.target.className.split(' ');

    switch (inputName[1]) {
      case 'event-name':
        setName(e.target.value);
        break;

      case 'event-description':
        setDescription(e.target.value);
        if (keyPress === 'Backspace' && charRemaining >= 0) {
          setCharRemaining(charRemaining + 1);
        } else {
          setCharRemaining(charRemaining - 1);
        }

        break;

      case 'event-date':
        setDate(e.target.value);
        break;

      case 'event-time':
        setTime(e.target.value);
        break;

      case 'event-location':

        setLocation(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleClick = async (e) => {
    if (name !== '' && description !== '' && date !== '' && time !== '' && location !== '') {
      setShowLoading(true);
      e.preventDefault();

      const hostInfo = {
        name,
        description,
        date,
        time,
        location,
        img: imgSrc,
      };

      const hostApiCall = await postApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/create`, hostInfo);

      if (hostApiCall) {
        navigate('/dashboard/events');
      }
    }
  };

  const handleFile = (e) => {
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Wrapper>
      <HostContainer>
        <HostForm>
          <div className="input-block">
            <label htmlFor="event-name-id">
              Event Name
              <input type="text" id="event-name-id" className="event-input event-name" onChange={handleInputs} required />
            </label>
          </div>

          <div className="input-block">
            <div className="description-titles">
              <label htmlFor="event-desc">
                Event Description
                <input
                  id="event-desc"
                  type="text"
                  required
                  maxLength="25"
                  className="event-input event-description"
                  onKeyDown={(event) => setKeyPress(event.key)}
                  onChange={handleInputs}
                />
              </label>
              <span className="max-char-display">
                (
                {charRemaining}
                {' '}
                chars remaining)
              </span>
            </div>
          </div>

          <div className="input-block">
            <label htmlFor="event-date">
              Event Date
              <input
                id="event-date"
                type="date"
                required
                className="event-input event-date"
                onChange={handleInputs}
              />
            </label>
          </div>

          <label htmlFor="event-time">
            Event Time
            <input type="time" required id="event-time" className="event-input event-time" onChange={handleInputs} />
          </label>

          <div className="input-block">
            <label htmlFor="autocomplete">
              Event Location
              <input type="text" id="autocomplete" required className="event-input event-location" onChange={handleInputs} />
            </label>
          </div>

          <button
            type="submit"
            onClick={handleClick}
          >
            {!showLoading && 'Host'}
            {showLoading && (
              <CircularProgress size="20px" />
            )}
          </button>

          <div>
            <img alt="event logo" src={imgSrc} />
            <input type="file" placeholder="Choose" accept={'image/*'} onChange={handleFile} />
          </div>
        </HostForm>

      </HostContainer>
    </Wrapper>
  );
}

const HostContainer = styled.div`
   
    background-color: white;
    margin:40px;
    width:80%;
    display:flex;

`;

const Wrapper = styled.div`
    flex-grow:1;
    background-color: #2A2D34;
    display:flex;
    justify-content:center;


`;

const HostForm = styled.form`
    
  width: 50%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border-right: 3px solid black;
`;

export default Host;
