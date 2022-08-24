/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import './Events.styles.css';
import styled from 'styled-components';

import CircularProgress from '@mui/material/CircularProgress';
import { Buffer } from 'buffer';
import { useOutletContext } from 'react-router-dom';
import { getApiCall } from '../../utils/functions';
import Event from '../../components/Event/Event';

function Events() {
  const [user, setUser] = useOutletContext();
  const [chosenEvents, setChosenEvents] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [isActive, setIsActive] = useState('');
  const [userEvents, setUserEvents] = useState([]);
  //const [allEvents, setAllEvents] = useState([]);
  const [viewingEvent, setViewingEvent] = useState(null);

  useEffect(() => {
    getApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/user`)
      .then((res) => res.json())
      .then((res) => {
        setUserEvents(res.events);
      });

    getApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/all`)
      .then((res) => res.json())
      .then((res) => {
        //setAllEvents(res.events);
        setShowLoading(false);
        setChosenEvents(res.events);
      });
  }, []);

  // const handleSelect = (e) => {
  //   if (e.target.value === 'My Events') {
  //     setChosenEvents(userEvents);
  //   } else if (e.target.value === 'All Events') {
  //     setChosenEvents(allEvents);
  //   }
  // };

  const checkOwner = (event) => {
    for (let i = 0; i < userEvents.length; i++) {
      if (userEvents[i]._id === event) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="events-wrapper">
      <div
        className="grid-wrapper"
        onClick={() => {
          setIsActive(null);
        }}
      >
        {chosenEvents.map((event) => (
          <Event
            key={chosenEvents.indexOf(event)}
            id={event._id}
            event={event}
            img={`data:image/png;base64,${Buffer.from(event.img.data).toString('base64')}`}
            setIsActive={setIsActive}
            active={isActive}
            isOwner={checkOwner(event._id)}
            user={user}
            setUser={setUser}
            setViewingEvent={setViewingEvent}
          />
        ))}

        {showLoading === true && (
          <CircularProgress />
        )}

      </div>
      {viewingEvent != null ? (
        <div className={viewingEvent ? 'chosen-event flex-grow' : null}>
          <button onClick={() => setViewingEvent(null)} type="button">X</button>
        </div>
      ) : null}
    </div>
  );
}

export default Events;
