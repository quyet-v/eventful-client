/* eslint-disable react/prop-types */
import React from 'react';
import './Friend.styles.css';

function Friend({ friend, setOpenChat, setMessagedUser }) {
  // const handleMessageClick = () => {

  // };

  return (
    <div className="friend">
      <h3>{friend.username}</h3>
      <div>
        <button
          type="button"
          className="message-button"
          onClick={() => {
            setOpenChat(true);
            setMessagedUser(friend);
          }}
        >
          Message
        </button>
        <button
          type="button"
        >
          Unfriend
        </button>
      </div>
    </div>
  );
}

export default Friend;
