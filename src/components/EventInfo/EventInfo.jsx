/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './EventInfo.styles.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Buffer } from 'buffer';
import axios from 'axios';
import EventImage from '../EventImage/EventImage';
import FoundUser from '../FoundUser/FoundUser';
import { getConfig } from '../../utils/functions';

const EventInfo = ({
  show,
  setShow,
  user,
  setUser,
}) => {
  const [attendees, setAttendees] = useState([]);
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState(null);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [pictures, setPictures] = useState();
  const video = useRef(null);
  const canvas = useRef(null);

  const getTimeFormat = (time) => {
    const parsedTime = parseInt(time.substr(0, 2), 10);
    if (parsedTime > 12) {
      return `${(parsedTime - 12).toString() + time.substr(2)} pm`;
    }
    return `${time} am`;
  };

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_HOST_URL}/api/events/info/${show._id}`,
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        setAttendees(res.data.users);
        setPictures(res.data.pictures);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTakePicture = () => {
    setPictureTaken(true);
    const ctx = canvas.current.getContext('2d');
    ctx.drawImage(video.current, 0, 0, 200, 200);
    const data2 = canvas.current.toDataURL('image/png');
    setData(data2);
  };

  const handleCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (video && canvas) {
          video.current.srcObject = stream;
          video.current.play();
          setTrack(stream);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disableCamera = () => {
    track.getTracks().forEach((t) => {
      t.stop();
    });
  };

  const handleSavePicture = () => {
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/events/image/add`,
      { id: show._id, img: data },
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        setOpen(false);
        setPictures(res.data.pictures);
        disableCamera();
        setPictureTaken(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={show ? 'chosen-event flex-grow' : null}>
      <div className="event-info-nav">
        <button
          className="close-button"
          onClick={() => setShow(null)}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        className="flex-grow"
        style={{
          margin: 10,
        }}
      >
        <div className="event-info-upper">
          <div>
            <img
              src={`data:image/png;base64,${Buffer.from(show.img.data).toString('base64')}`}
              alt="john"
              style={{
                width: 250,
                height: 250,
                border: '4px solid black',
              }}
            />
            {show.started && (
            <Button
              sx={{
                display: 'block',
                width: '100%',
              }}
              onClick={() => {
                setOpen(true);
                handleCamera();
              }}
              variant="contained"
            >
              Open Camera
            </Button>
            )}
          </div>
          <div className="event-info-details">
            <h1>{show.name}</h1>
            <h3>
              Hosted by:
              {' '}
              {show.host}
            </h3>
            <div>
              <h3>Date & Time</h3>
              <p>
                {new Date(show.date).toDateString()}
                -
                {getTimeFormat(show.time)}
              </p>
            </div>
            <div>
              <h3>Location</h3>
              <p>
                {show.location}
              </p>
            </div>
            <p>
              {show.description}
            </p>
          </div>
          <div className="attendees">
            {attendees && attendees.map((attendee) => {
              return (
                <FoundUser
                  key={attendee._id}
                  foundUser={attendee}
                  user={user}
                  setUser={setUser}
                />
              );
            })}
          </div>
        </div>
        <div className="event-images">
          {pictures && pictures.map((picture) => {
            return (
              <EventImage
                className="ev-image"
                key={Math.random()}
                imgSrc={`data:image/png;base64,${Buffer.from(picture.buffer.data).toString('base64')}`}
              />
            );
          })}
        </div>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            disableCamera();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="video-feedback">
              {!pictureTaken && (
              <video ref={video} width="200" height="200">
                <source src="movie.mp4" type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
              )}
              <canvas ref={canvas} className="myCanvas" width="200" height="200" />
              {pictureTaken && <img src={data} alt="selfie" />}
            </div>
            <div>
              {!pictureTaken && <Button variant="contained" type="button" onClick={handleTakePicture}>Take Picture</Button>}
              {pictureTaken && (
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  setPictureTaken(false);
                  handleCamera();
                }}
              >
                Retake
              </Button>
              )}
              {pictureTaken && (
                <Button
                  variant="contained"
                  type="button"
                  onClick={handleSavePicture}
                >
                  Done
                </Button>
              )}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EventInfo;
