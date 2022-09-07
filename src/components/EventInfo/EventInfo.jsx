/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './EventInfo.styles.css';
import { Buffer } from 'buffer';
import axios from 'axios';
import FoundUser from '../FoundUser/FoundUser';
import { getConfig } from '../../utils/functions';

const EventInfo = ({
  show,
  setShow,
  user,
  setUser,
}) => {
  const [attendees, setAttendees] = useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <img
            src={`data:image/png;base64,${Buffer.from(show.img.data).toString('base64')}`}
            alt="john"
            style={{
              width: 250,
              height: 250,
              border: '4px solid black',
            }}
          />
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
      </div>
    </div>
  );
};

export default EventInfo;
