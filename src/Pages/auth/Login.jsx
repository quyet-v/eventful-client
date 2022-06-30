import React from 'react'
import styled from "styled-components"
import "../../Styles/style.css"
import { NavLink,useNavigate } from 'react-router-dom'
import CenteredContainer from '../../components/CenteredContainer/CenteredContainer'
import AuthForm from '../../components/AuthForm/AuthForm'
import { postApiCall } from '../../utils/functions'

const Login = () => {

    const navigate = useNavigate();

    const handleClick = async (username,password,e,loading,success) => {
        if(username && password) {
            loading(true);
            e.preventDefault();
            
            postApiCall("http://localhost:4000/api/auth/login",{
                username: username,
                password: password
            })
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }else if(res.status === 400) {
                    success(false);
                    loading(false);
                    return;
                }
            })
            .then(res => {
                if(res) {
                    sessionStorage.setItem("token",res.token);
                    console.log(res)
                    navigate("/dashboard");
                }
            })

           
            
        }
      
      
    }



  return (
    
    <Wrapper>
        <LoginContainer>
            <AuthForm 
                heading={"Login"} 
                buttonLabel="Login" 
                redirect={"signup"} 
                redirectMessage="No Account?"
                redirectLinkMessage="Create one"
                isSignup={false}
                apiType={handleClick}
                
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


export default Login