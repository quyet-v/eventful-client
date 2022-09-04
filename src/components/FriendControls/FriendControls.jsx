/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import Request from '../Request/Request';
import Friend from '../Friend/Friend';
import './FriendControls.styles.css';

function FriendControl({
  user,
  setUser,
  openChat,
  setOpenChat,
  setMessagedUser,
}) {
  return (
    <div className="friend-control-container">
      <Tooltip
        data-testid="requests-tooltip"
        title={(
          <>
            <h1 data-testid="requests-title">Requests</h1>
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
        <div
          className="request-bell-container"
          data-testid="bell-button"
        >
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
              && user.friends.map((friend) => (
                <Friend
                  key={friend._id}
                  friend={friend}
                  openChat={openChat}
                  setOpenChat={setOpenChat}
                  setMessagedUser={setMessagedUser}
                />
              ))}
            </div>
          </>
        )}
      >
        <button
          type="button"
          data-testid="friends-button"
          className="friends"
        >
          <PeopleAltTwoToneIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default FriendControl;
