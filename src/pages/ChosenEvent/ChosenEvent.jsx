/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChosenEvent.styles.css';
import { Buffer } from 'buffer';
import axios from 'axios';
import Attendee from '../../components/Attendee/Attendee';
import { getConfig } from '../../utils/functions';

function ChosenEvent() {
  const { id } = useParams();
  const [validId, setValidId] = useState(true);
  const [event, setEvent] = useState();

  useEffect(() => {
    if (id.length < 24 || id.length > 24) {
      setValidId(false);
      return;
    }

    axios.get(`${process.env.REACT_APP_HOST_URL}/api/events/info/${id}`, getConfig(sessionStorage.getItem('token')))
      .then((res) => {
        setEvent(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {validId ? (
        <div className="container">
          <div className="event-info">
            <div className="contact">
              {event && (
                <div>
                  <img
                    alt="event"
                    className="event-image"
                    src={`data:image/png;base64,${Buffer.from(event.img.data).toString('base64')}`}
                  />
                  <h1>Contact host</h1>
                  <button type="button">Message</button>
                </div>
              )}
            </div>

            <div className="info">
              {event && <h1>{event.name}</h1>}
              {event && (
              <p>
                Hosted at
                <b>{event.location}</b>
              </p>
              )}
              {event && (
              <p>
                Hosted by
                <b>{event.host}</b>
              </p>
              )}
              <br />
              <hr />
              <br />
              {event && <p>{event.description}</p>}
            </div>
          </div>
          <div className="event-members">
            {event
            && event.users.map((user) => <Attendee key={user._id} username={user.username} />)}

          </div>
        </div>
      ) : <h1>No event found</h1>}

    </>
  );
}

export default ChosenEvent;
