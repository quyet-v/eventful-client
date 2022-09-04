/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import './Events.styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { Buffer } from 'buffer';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { getConfig } from '../../utils/functions';
import Event from '../../components/Event/Event';
import EventInfo from '../../components/EventInfo/EventInfo';

function Events() {
  const [user, setUser] = useOutletContext();
  const [chosenEvents, setChosenEvents] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [isActive, setIsActive] = useState('');
  const [userEvents, setUserEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventDelete, setEventDelete] = useState(null);
  //const [allEvents, setAllEvents] = useState([]);
  const [viewingEvent, setViewingEvent] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST_URL}/api/events/all`, getConfig(sessionStorage.getItem('token')))
      .then((res) => {
        //setAllEvents(res.events);
        setShowLoading(false);
        setChosenEvents(res.data.events);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  // const handleSelect = (e) => {
  //   if (e.target.value === 'My Events') {
  //     setChosenEvents(userEvents);
  //   } else if (e.target.value === 'All Events') {
  //     setChosenEvents(allEvents);
  //   }
  // };

  const handleCloseConfirmation = () => {
    setOpen(false);
  };

  const handleDeletePress = () => {
    setIsActive(null);
    setOpen(true);
  };

  const handleDeleteEvent = () => {
    setOpen(false);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };

    axios.delete(`${process.env.REACT_APP_HOST_URL}/api/events/${eventDelete}`, config)
      .then((res) => {
        setChosenEvents(res.data);
      });
  };

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
      <Dialog
        open={open}
      >
        <DialogTitle>
          Are you sure you want to delete this event?
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={handleCloseConfirmation}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteEvent}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className="grid-wrapper"
        onClick={() => {
          setIsActive(null);
        }}
      >
        {chosenEvents && chosenEvents.map((event) => (
          <Event
            key={chosenEvents.indexOf(event)}
            id={event._id}
            event={event}
            img={`data:image/png;base64,${Buffer.from(event.img.data).toString('base64')}`}
            setIsActive={setIsActive}
            active={isActive}
            isOwner={checkOwner(event._id)}
            setOpen={handleDeletePress}
            setEventDelete={setEventDelete}
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
      // <div className={viewingEvent ? 'chosen-event flex-grow' : null}>
      //   <button
      //     className="close-button"
      //     onClick={() => setViewingEvent(null)}
      //     type="button"
      //   >
      //     <CloseIcon />
      //   </button>
      // </div>

        <EventInfo
          data-testid="event-info"
          show={viewingEvent}
          setShow={setViewingEvent}
        />
      ) : null}
    </div>
  );
}

export default Events;
