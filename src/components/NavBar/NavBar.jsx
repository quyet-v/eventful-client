/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/Logo.svg';
import './NavBar.styles.css';

function NavBar({ showLoading }) {
  return (
    <div className="wrapper">
      <img className="logo" alt="logo" src={Logo} />
      <Button onClick={() => showLoading(true)}>Login</Button>
    </div>
  );
}

const Button = styled.button`
  background:black;
  color:white;
  padding:5px;
  text-decoration:none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width:60px;
  height:90%;
  box-shadow: 3px 3px rgba(0,0,0,0.2);
  :hover {
    color: rgb(0, 102, 255);
  }
`;

export default NavBar;
