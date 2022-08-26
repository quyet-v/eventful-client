/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { getConfig } from '../../utils/functions';
import './FoundUser.styles.css';

function FoundUser({ user }) {
  const handleAddFriend = () => {
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/friends/requests/send/${user._id}`,
      { id: user._id },
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="found-user-container">
      <h1>{user.username}</h1>
      <button
        type="button"
        className="add-button"
        onClick={handleAddFriend}
      >
        Add
      </button>
    </div>
  );
}

export default FoundUser;
