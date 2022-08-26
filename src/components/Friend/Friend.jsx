/* eslint-disable react/prop-types */
import React from 'react';
import './Friend.styles.css';

function Friend({ username }) {
  return (
    <div className="friend">
      <h3>{username}</h3>
      <button
        type="button"
        className="message-button"
        // onClick={() => { handleMessageOpen(friend.id); }}
      >
        Message
      </button>
    </div>
  );
}

export default Friend;
