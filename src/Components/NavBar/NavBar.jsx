import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import '../../Styles/style.css'

const NavBar = () => {
  return (
    <Wrapper>
        
        <h1 className="logo">EVENTful</h1>
        <ButtonWrapper>
          <Button to="/login">Login</Button>
          <Button to="/signup">Sign up</Button>
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
  
  
  border-bottom:1px solid black;

`

const ButtonWrapper = styled.div `
  display:flex;
  width:120px;
 
  justify-content:space-between;
  
  
`

const Button = styled(NavLink) `
  background:black;
  color:white;
  padding:5px;
  text-decoration:none;
  transition: all 0.2s;

  :hover {
    color: rgb(0, 102, 255);
  }

`

export default NavBar