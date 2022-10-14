/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import './Host.styles.css';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Spinner from 'react-spinkit';

function Host() {
  const fileReader = new FileReader();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [imgSrc, setImgSrc] = useState();

  const locationInput = useRef();

  function handleLoadScript() {
    const autoComplete = new window.google.maps.places.Autocomplete(
      locationInput.current,
      { componentRestrictions: { country: 'nz' } },
    );
    autoComplete.addListener('place_changed', (e) => {
      const selectedPlace = autoComplete.getPlace();

      const chosenLocation = {
        name: selectedPlace.formatted_address,
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };

      setLocation(chosenLocation);
    });
  }

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      handleLoadScript,
    );
  }, []);

  const loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = () => {
      callback();
    };

    script.src = url;
    document.body.appendChild(script);
  };

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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };

    setTimeout(() => {
      axios.post(`${process.env.REACT_APP_HOST_URL}/api/events/create`, hostInfo, config)
        .then((res) => {
          navigate('/dashboard/events');
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
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
            id="event-name"
            label="Event Name"
            variant="filled"
            onChange={handleInputs}
            required
          />
        </div>

        <div className="input-block">
          <TextField
            id="event-description"
            label="Event Description"
            variant="filled"
            multiline
            required
            maxRows={2}
            onChange={handleInputs}
          />
        </div>

        <div className="input-block">
          <TextField
            id="event-date"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            label="Event Date"
            variant="filled"
            onChange={handleInputs}
          />
        </div>

        <div className="input-block">
          <TextField
            id="event-time"
            type="time"
            InputLabelProps={{ shrink: true }}
            label="Event Time"
            variant="filled"
            required
            onChange={handleInputs}
          />
        </div>

        <div className="input-block">
          {/* <TextField
            id="event-location"
            type="text"
            label="Event Location"
            variant="filled"
            required
            onChange={handleInputs}
          /> */}
          <input type="text" required ref={locationInput} />
        </div>

        {!showLoading
          ? (
            <Button
              type="submit"
              variant="contained"
            >
              Host
            </Button>
          ) : <Spinner name="three-bounce" />}
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
