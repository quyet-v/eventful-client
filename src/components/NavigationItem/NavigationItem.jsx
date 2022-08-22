/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.styles.css';
import Tooltip from '@mui/material/Tooltip';

function NavigationItem({ link, logo, info }) {
  return (
    <Tooltip title={info} arrow>
      <NavLink
        style={
          {
            textAlign: 'center',
            width: 100,
          }
        }
        to={link}
      >
        {logo}
      </NavLink>
    </Tooltip>
  );
}

export default NavigationItem;
