/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import './Attendee.styles.css';

function Attendee({ username }) {
  return (
    <div data-testid="attendee-container" className="attendees-container">
      <p>{username}</p>
      <Button variant="contained">Message</Button>
    </div>
  );
}

export default Attendee;
