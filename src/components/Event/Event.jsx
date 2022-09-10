/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Event.styles.css';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { getConfig } from '../../utils/functions';

function Event({
  event,
  id,
  isOwner,
  img,
  setIsActive,
  active,
  setViewingEvent,
  setOpen,
  setEventDelete,
}) {
  const [joined, setJoined] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // const handleLeave = () => {
  //   postApiCall(`${process.env.REACT_APP_HOST_URL}/event/${eventID}`)
  //     .then((res) => {
  //       setShowLoading(false);
  //       deleteEventUpdate(res.events);
  //     });
  // };

  // const handleView = () => {
  //   navigate(`/dashboard/event/${id}`);
  // };

  const checkJoinStatus = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === id) return true;
    }
    return false;
  };

  const joinEvent = () => {
    setLoading(true);
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/events/join`,
      { id },
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        setJoinedEvents(res.data.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const leaveEvent = () => {
    setLoading(true);
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/events/leave`,
      { id },
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        setJoinedEvents(res.data.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJoinedEvents = () => {
    axios.get(
      `${process.env.REACT_APP_HOST_URL}/api/users/info`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
    )
      .then((res) => {
        setJoinedEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJoinedEvents();
    setJoined(checkJoinStatus(joinedEvents));
  }, []);

  useEffect(() => {
    setJoined(checkJoinStatus(joinedEvents));
  }, [joinedEvents]);

  // const sendMail = (date, time) => {
  //   axios.post(
  //     `${process.env.REACT_APP_HOST_URL}/api/email/send`,
  //     { data: { date, time } },
  //   );
  // };

  const handleStart = () => {
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/events/${id}/start`,
      { id },
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <EventContainer image={img} onClick={(e) => e.stopPropagation()}>
      <div className="overlay">
        <InfoContainer>
          <h3 data-testid="event-name">{event.name}</h3>
          <p data-testid="event-host">
            Hosted by {event.host}
          </p>
        </InfoContainer>

        <ClickAwayListener onClickAway={() => setIsActive(null)}>
          <Tooltip
            data-testid="event-options"
            placement="bottom-end"
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
            open={id === active}
            title={(
              <div data-testid="options-container" style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  type="button"
                  className="more-button"
                  data-testid="view-button"
                  onClick={() => {
                    setViewingEvent(event);
                    setIsActive(null);
                  }}
                >
                  View
                </button>

                {joined && !isOwner(event)
                  && (
                  <button
                    type="button"
                    className="more-button"
                    disabled={!!loading}
                    onClick={leaveEvent}
                  >
                    {loading ? <CircularProgress size="1.5rem" className="loading" /> : 'Leave' }
                  </button>
                  )}

                {!joined && !isOwner(event)
                  && (
                  <button
                    type="button"
                    className="more-button"
                    disabled={!!loading}
                    onClick={joinEvent}
                  >
                    {loading ? <CircularProgress size="1.5rem" className="loading" /> : 'Join' }
                  </button>
                  )}
                {isOwner(event) && (
                <button
                  type="button"
                  className="more-button"
                  onClick={() => {
                    setEventDelete(id);
                    setOpen(true);
                  }}
                >
                  Delete
                  <DeleteIcon />
                </button>
                )}
                {isOwner(event) && !event.started && (
                  <button
                    type="button"
                    className="more-button"
                    onClick={handleStart}
                  >
                    Start
                  </button>
                )}
              </div>
            )}
          >
            <ExpandMoreIcon
              data-testid="options-button"
              onClick={() => {
                setIsActive(id);
              }}
              className="more-icon"
            />
          </Tooltip>
        </ClickAwayListener>
      </div>
    </EventContainer>
  );
}

const EventContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-size: 100% 100%;
  background-repeat:no-repeat;
  border-radius:5px;
  background-position:center;
  background-color: rgba(0,0,0,.5);
  position:relative;
  background-color:green;
  border:4px solid black;
  aspect-ratio: 1/1;
`;

const InfoContainer = styled.div`
  margin-top: 3px;
  flex-grow:1;
  position:absolute;

`;

export default Event;
