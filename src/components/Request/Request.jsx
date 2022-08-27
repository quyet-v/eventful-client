/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { getConfig } from '../../utils/functions';
import './Request.styles.css';

function Request({ user, setUser, request }) {
  const handleAccept = () => {
    console.log(request._id);
    console.log(user._id);
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/friends/requests/accept/${request._id}`,
      { id: request._id },
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = () => {
    axios.post(`${process.env.REACT_APP_HOST_URL}/api/friends`, null, getConfig('token'))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="request">
      <h3>{user.username}</h3>
      <div className="request-control-container">
        <button
          type="button"
          className="accept-button"
          onClick={handleAccept}
        >
          <DoneIcon />
        </button>
        <button
          type="button"
          className="reject-button"
          onClick={handleReject}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default Request;
