/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FoundUser from '../FoundUser/FoundUser';
import './SearchFriends.styles.css';
import { getConfig } from '../../utils/functions';

function SearchFriends({ user }) {
  const [foundUsers, setFoundUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.value !== '') {
      axios.get(
        `${process.env.REACT_APP_HOST_URL}/api/users/find/${e.target.value}`,
        getConfig(sessionStorage.getItem('token')),
      )
        .then((res) => {
          const filteredUsers = res.data.result.filter((obj) => obj.username !== user.username);
          setFoundUsers(filteredUsers);
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="search">
      <SearchIcon className="search-icon" />
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div>
          <Tooltip
            open={open}
            disableHoverListener
            placement="bottom-start"
            title={(
              <div>
                {foundUsers && foundUsers.map((foundUser) => (
                  <FoundUser user={foundUser} key={foundUser._id} />
                ))}
              </div>
            )}
          >
            <input
              placeholder="Search for friends"
              className="search-input"
              onChange={handleChange}
            />
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default SearchFriends;
