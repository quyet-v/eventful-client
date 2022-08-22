import React, { useState } from 'react';

import Button from '@mui/material/Button';
import FriendRequestModal from './FriendRequestModal';

function FriendRequest() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    color: 'white',
    borderRadius: 5,
    backgroundColor: 'black',

  };

  return (
    <div>
      <Button sx={buttonStyle} onClick={handleOpen}>Friend Requests</Button>
      {open === true && <FriendRequestModal open={open} handleClose={handleClose} />}
    </div>
  );
}

export default FriendRequest;
