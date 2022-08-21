import React from 'react'
import "../Attendee/Attendee.styles.css"

const Attendee = ({username}) => {
  return (
    <div data-testid="attendee-container">
      {username}
      <button>Message</button>

    </div>
  )
}

export default Attendee