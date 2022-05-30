import React from 'react'
import styled from "styled-components"
import "../Styles/style.css"
import { NavLink } from 'react-router-dom'

const Signup = () => {
  return (
    <Wrapper>
        <LoginContainer>
            <h1>Signup</h1>
            <LoginForm>
                <TextInput placeholder='Username'></TextInput>
                <TextInput type="password" placeholder='Password' ></TextInput>
                <SubmitButton>Login</SubmitButton>
                <SignupLink>
                    <p>Already have an account?</p>
                    <SignupButton to={"/signup"}>Login</SignupButton>
                </SignupLink>
            </LoginForm>
            

        </LoginContainer>


    </Wrapper>
  )
}

const Wrapper = styled.div `
    width: 100vw;
    height: 100vh;
    background-color:#2a2d34;
    display: flex;
    justify-content:center;
    align-items:center;



`

const LoginContainer = styled.div `
    width:400px;
    height:400px;
    background-color:white;
    display:flex;
    flex-direction:column;
    padding-top:50px;
    align-items:center;
`

const LoginForm = styled.form `
    display:flex;
    flex-direction:column;
    align-items:center;
    height:250px;
    width:80%;
    
    

    

    
`

const TextInput = styled.input `
    margin-top: 10px;
    width:100%;
    height:40px;
    padding:5px;
`

const SubmitButton = styled.button `
    margin-top: 10px;
    width:100%;
    height:50px;
    background-color:#2a2d34;
    color:white;
    border:none;
    cursor: pointer;

    :hover {
        background:black;
    }

`

const SignupLink = styled.div `
    display:flex;
    justify-content:space-between;
    width:100%;
    margin-top: 10px;
    align-items:center;
`

const SignupButton = styled(NavLink) `
    
`


export default Signup