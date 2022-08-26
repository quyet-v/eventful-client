/* eslint-disable react/prop-types */
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import './Request.styles.css';

function Request({ username }) {
  return (
    <div className="request">
      <h3>{username}</h3>
      <div className="request-control-container">
        <button
          type="button"
          className="accept-button"
          // onClick={() => { handleMessageOpen(friend.id); }}
        >
          <DoneIcon />
        </button>
        <button
          type="button"
          className="reject-button"
          // onClick={() => { handleMessageOpen(friend.id); }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default Request;
