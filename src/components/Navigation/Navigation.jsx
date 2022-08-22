/* eslint-disable react/prop-types */
import React from 'react';
import './Navigation.styles.css';

function Navigation({ children }) {
  return (
    <div className="navigation">
      {children}

    </div>
  );
}

export default Navigation;
