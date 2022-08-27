/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import Request from '../components/Request/Request';
import Friend from '../components/Friend/Friend';
import './FriendControls.styles.css';

function FriendControl({ user, setUser }) {
  return (
    <div className="friend-control-container">
      <Tooltip
        title={(
          <>
            <h1>Requests</h1>
            {user
            && user.receivedRequests.map((request) => (
              <Request
                key={request._id}
                user={user}
                setUser={setUser}
                request={request}
              />
            ))}
          </>
        )}
      >
        <div className="request-bell-container">
          {user && user.receivedRequests.length > 0 && (
            <div className="request-amount">
              <h4>{user.receivedRequests.length}</h4>
            </div>
          )}
          <button
            type="button"
            className="requests"
          >
            <NotificationsIcon />
          </button>
        </div>
      </Tooltip>

      <Tooltip
        title={(
          <>
            <h1>Friends</h1>
            <div className="friend-container">
              {user
              && user.friends.map((friend) => <Friend key={friend._id} friend={friend} />)}
            </div>
          </>
        )}
      >
        <button
          type="button"
          className="friends"
        >
          <PeopleAltTwoToneIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default FriendControl;
