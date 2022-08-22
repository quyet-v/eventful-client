/* eslint-disable react/prop-types */
import React from 'react';
import './Attendee.styles.css';

function Attendee({ username }) {
  return (
    <div data-testid="attendee-container">
      {username}
      <button type="button">Message</button>

    </div>
  );
}

export default Attendee;
