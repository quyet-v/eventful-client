import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import '../../styles/style.css'
import Logo from "../../assets/images/Logo.svg"



const NavBar = ({showLoading}) => {
  

  return (
    <Wrapper>
        
        
        <img src={Logo}></img>
        <ButtonWrapper>
          <Button onClick={() =>showLoading(true)}>Login</Button>
        </ButtonWrapper>

        
        
      
      </Wrapper>
  )
}

const Wrapper = styled.div `
  width:100%;
  
  height:80px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding:20px;
  
  
  

`

const ButtonWrapper = styled.div `
  display:flex;
  width:120px;
 
  justify-content:space-between;
  
  
`

const Button = styled.button `
  background:black;
  color:white;
  padding:5px;
  text-decoration:none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width:60px;
  box-shadow: 3px 3px rgba(0,0,0,0.2);

  :hover {
    color: rgb(0, 102, 255);
  }

`

export default NavBar