import React from 'react'
import "../Attendee/Attendee.styles.css"

const Attendee = ({username}) => {
  return (
    <div>
      {username}
      <button>Message</button>

    </div>
  )
}

export default Attendee