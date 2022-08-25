/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Host.styles.css';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
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
  const [imgSrc, setImgSrc] = useState();

  fileReader.addEventListener('load', () => {
    setImgSrc(fileReader.result);
  });

  const handleInputs = (e) => {
    const inputName = e.target.id;
    switch (inputName) {
      case 'event-name':
        setName(e.target.value);
        break;
      case 'event-description':
        setDescription(e.target.value);
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

  const handleClick = (e) => {
    e.preventDefault();
    setShowLoading(true);
    const hostInfo = {
      name,
      description,
      date,
      time,
      location,
      img: imgSrc,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    };

    const hostApiCall = axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/events/create`,
      hostInfo,
      headers,
    ).then((res) => {
      console.log(res);
    })
      .catch((err) => {
        throw new Error(err);
      });

    if (hostApiCall) {
      navigate('/dashboard/events');
    }
  };

  const handleFile = (e) => {
    setImgSrc(e.target.files[0]);
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <form
      className="host"
      onSubmit={handleClick}
    >
      <div className="text-input">
        <div className="input-block">
          <TextField
            id="event-name-id input"
            label="Event Name"
            variant="filled"
            onChange={handleInputs}
            required
          />
        </div>

        <div className="input-block">
          {/* <div className="description-titles">
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
          </div> */}
          <TextField
            id="event-name-id"
            label="Event Description"
            variant="filled"
            multiline
            required
            maxRows={2}
            onChange={handleInputs}
          />
        </div>

        <div className="input-block">
          {/* <label htmlFor="event-date">
            Event Date
            <input
              id="event-date"
              type="date"
              required
              className="event-input event-date"
              onChange={handleInputs}
            />
          </label> */}
          <TextField
            id="event-name-id"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            label="Event Name"
            variant="filled"
            onChange={handleInputs}
          />
        </div>

        <div className="input-block">
          {/* <label htmlFor="event-time">
            Event Time
            <input
            type="time"
            required id="event-time"
            className="event-input event-time"
            onChange={handleInputs} />
          </label> */}
          <TextField
            id="event-name-id"
            type="time"
            InputLabelProps={{ shrink: true }}
            label="Event Time"
            variant="filled"
            required
            onChange={handleInputs}
          />
        </div>

        <div className="input-block">
          {/* <label htmlFor="autocomplete">
            Event Location
            <input
            type="text"
            id="autocomplete"
            required
            className="event-input event-location"
            onChange={handleInputs}
            />
          </label> */}
          <TextField
            id="event-location-id"
            type="text"
            label="Event Location"
            variant="filled"
            required
            onChange={handleInputs}
          />
        </div>

        {/* <button
          type="submit"
          onClick={handleClick}
        >
          {!showLoading && 'Host'}
          {showLoading && (
            <CircularProgress size="20px" />
          )}
        </button> */}

        <Button
          type="submit"
          variant="contained"
        >
          {!showLoading ? 'Host' : <CircularProgress size="20px" />}
        </Button>
      </div>
      <div className="img-input">
        <img className="host-img" alt="event logo" src={imgSrc} />
        <input
          type="file"
          placeholder="Choose"
          required
          className="img-input"
          accept={'image/*'}
          onChange={handleFile}
        />
      </div>
    </form>
  );
}

export default Host;
