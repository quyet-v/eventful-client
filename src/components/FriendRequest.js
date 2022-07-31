import React, { useEffect,useState } from 'react'

import Button from '@mui/material/Button';
import FriendRequestModal from './FriendRequestModal';


const FriendRequest = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    


    
    
      const buttonStyle = {
        color: "white",
        borderRadius: 5,
        backgroundColor: "black"


      }


  return (
    <div>
        <Button sx={buttonStyle} onClick={handleOpen}>Friend Requests</Button>
        {open == true && <FriendRequestModal open={open} handleClose={handleClose}></FriendRequestModal>}
    </div>
  )
}

export default FriendRequest