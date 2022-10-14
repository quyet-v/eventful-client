/* eslint-disable react/prop-types */
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './EventImage.styles.css';

function EventImage({ imgSrc }) {
  return (
    <div className="event-image-container">
      <img
        alt="cool"
        src={imgSrc}
        className="actual-image"
      />
      <div className="favourite-container">
        <p>0</p>
        <FavoriteIcon className="favourite" />
      </div>
    </div>
  );
}

export default EventImage;
