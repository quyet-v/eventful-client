/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { getConfig } from '../../utils/functions';
import './FoundUser.styles.css';

function FoundUser({
  foundUser,
  user,
  setUser,
  sx,
}) {
  const checkFriendStatus = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]?._id === id) return true;
    }

    return false;
  };

  const isYourself = () => {
    if (foundUser.username === user.username) return true;
    return false;
  };

  const handleAddFriend = () => {
    axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/friends/requests/send/${foundUser._id}`,
      { id: foundUser._id },
      getConfig(sessionStorage.getItem('token')),
    )
      .then((res) => {
        setUser(res.data.doc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="found-user-container" style={sx}>
      <h3>{foundUser.username}</h3>
      {user && !isYourself() && !checkFriendStatus(user.friends, foundUser._id)
      && !checkFriendStatus(user.sentRequests, foundUser._id)
      && !checkFriendStatus(user.receivedRequests, foundUser._id) && (
        <button
          type="button"
          className="add-button"
          onClick={handleAddFriend}
        >
          Add
        </button>
      )}
      {user
        && !isYourself()
        && checkFriendStatus(user.receivedRequests, foundUser._id)
        && <h3>Respond</h3>}
      {user
        && !isYourself()
        && checkFriendStatus(user.sentRequests, foundUser._id)
        && <h3>Request Sent</h3>}
      {user
        && !isYourself()
        && checkFriendStatus(user.friends, foundUser._id)
        && <h3>Friends</h3>}
    </div>
  );
}

export default FoundUser;
