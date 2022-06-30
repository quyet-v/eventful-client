import React from 'react'
import styled from "styled-components"
import "../../Styles/style.css"
import { NavLink,useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm/AuthForm'
import { postApiCall } from '../../utils/functions'

const Signup = () => {
    
    const navigate = useNavigate();

    const handleSingup = async (email,username,password,e,loading,success) => {
        if(email,username,password) {
            loading(true);
            e.preventDefault();
            let userSignupInfo = {
                email: email,
                username: username,
                password: password
            }

            postApiCall("http://localhost:4000/api/auth/signup",userSignupInfo)
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }else {
                    success(false);
                    loading(false);
                    return;
                }
            })
            .then(res => {
                if(res) {
                    sessionStorage.setItem("token", res.token);
                    navigate("/dashboard")
                }
            })
            
        }
    }



  return (
    <Wrapper>
        <LoginContainer>
            <AuthForm 
                heading={"Signup"} 
                buttonLabel="Signup" 
                redirect={"login"}
                redirectMessage="Already have account?"
                redirectLinkMessage="Login"
                isSignup={true}
                apiType={handleSingup}
            />
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