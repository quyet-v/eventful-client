/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './EventInfo.styles.css';

const EventInfo = ({ show, setShow }) => {
  return (
    <div className={show ? 'chosen-event flex-grow' : null}>
      <button
        className="close-button"
        onClick={() => setShow(null)}
        type="button"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default EventInfo;
