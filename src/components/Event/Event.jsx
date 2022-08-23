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
import { postApiCall } from '../../utils/functions';

function Event({
  event,
  id,
  isOwner,
  img,
  setIsActive,
  active,
  setViewingEvent,
}) {
  const [joined, setJoined] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // const handleDelete = () => {
  //   setShowLoading(true);
  //   deleteApiCall(`https://eventfuloflies.herokuapp.com/event/${eventID}`)
  //     .then((res) => {
  //       setShowLoading(false);
  //       deleteEventUpdate(res.events);
  //     });
  // };

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
    postApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/join`, { id })
      .then((res) => res.json())
      .then((res) => {
        setJoinedEvents(res.data.events);
        setLoading(false);
      }).catch((err) => {
        throw err.message;
      });
  };

  const leaveEvent = () => {
    setLoading(true);
    postApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/leave`, { id })
      .then((res) => res.json())
      .then((res) => {
        setJoinedEvents(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        throw err.message;
      });
  };

  const getJoinedEvents = () => {
    axios.get(
      `${process.env.REACT_APP_HOST_URL}/api/users/info`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
    ).then((res) => {
      setJoinedEvents(res.data.events);
    })
      .catch((err) => {
        throw err.message;
      });
  };

  useEffect(() => {
    getJoinedEvents();
    setJoined(checkJoinStatus(joinedEvents));
  }, []);

  useEffect(() => {
    setJoined(checkJoinStatus(joinedEvents));
  }, [joinedEvents]);

  // const sendMail = () => {
  //   axios.post(
  //     `${process.env.REACT_APP_HOST_URL}/api/email/send`,
  //     { data: { date, time } },
  //   );
  // };

  return (
    <EventContainer image={img} onClick={(e) => e.stopPropagation()}>

      <InfoContainer>
        <p>{event.name}</p>
        <p>
          Hosted by
          {event.host}
        </p>
      </InfoContainer>

      <ClickAwayListener onClickAway={() => setIsActive(null)}>
        <Tooltip
          placement="bottom-end"
          PopperProps={{
            disablePortal: true,
          }}
          arrow
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={id === active}
          title={(
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                type="button"
                className="more-button"
                onClick={() => {
                  setViewingEvent(event);
                  setIsActive(null);
                }}
              >
                View
              </button>

              {joined && !isOwner
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

              {!joined && !isOwner
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

              {isOwner && (
              <button type="button" className="more-button">
                Delete
                <DeleteIcon />
              </button>
              )}
            </div>
          )}
        >
          <ExpandMoreIcon
            onClick={() => {
              console.log(active);
              setIsActive(id);
            }}
            className="more-icon"
          />
        </Tooltip>
      </ClickAwayListener>
    </EventContainer>
  );
}

const EventContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-size: 100% 100%;
  background-repeat:no-repeat;
  border-radius:5px;
  background-position:center;
  position:relative;
  background-color:green;
  
  
  border:2px solid black;
`;

const InfoContainer = styled.div`
  margin-top: 3px;
  flex-grow:1;
  position:absolute;

`;

export default Event;
