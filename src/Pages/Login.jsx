import React from 'react'
import styled from "styled-components"
import "../Styles/style.css"

const Login = () => {
  return (
    <Wrapper>
        <LoginContainer>
            <h1>Login</h1>
            <LoginForm>
                <TextInput placeholder='Username'></TextInput>
                <TextInput type="password" placeholder='Password' ></TextInput>
                <SubmitButton>Login</SubmitButton>
                <SignupLink>
                <h2>No Account?</h2>
                <button>Signup</button>
                </SignupLink>
            </LoginForm>
            

        </LoginContainer>


    </Wrapper>
  )
}

const Wrapper = styled.div `
    width: 100vw;
    height: 100vh;
    background-color:#2a2d34;;
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
    height:150px;
    width:80%;
    
    

    > * {
        margin-top: 10px;
        width:100%;
        height:100px;
    }

    > input {
        padding:5px;
    }
`

const TextInput = styled.input `
    
`

const SubmitButton = styled.button `
    
`

const SignupLink = styled.div `
    display:flex;
    justify-content:space-between;
    width:100%;
`



export default Login