import React from 'react'
import { useQuery } from 'react-query'
import styled from "styled-components"
import "../../styles/style.css"
import { NavLink,useNavigate } from 'react-router-dom'
import CenteredContainer from '../../components/CenteredContainer/CenteredContainer'
import AuthForm from '../../components/AuthForm/AuthForm'
import { postApiCall } from '../../utils/functions'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'

const Login = ({showLoading}) => {

    const navigate = useNavigate();
    const [formClicked,setFormClicked] = useState(false)
    const [status,setStatus] = useState("")

    
    
    
    const handleClick = async (username,password,e,loading,success) => {
        if(username && password) {
            loading(true);
            e.preventDefault();
            
            postApiCall(`${process.env.REACT_APP_HOST_URL}/api/auth/login`,{
                username: username,
                password: password
            })
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }
                else {
                    success(false);
                    loading(false);
                 
                }
            })
            .then(res => {
                if(res) {
                    sessionStorage.setItem("token",res.token);
                    navigate("/dashboard");
                }
            })

           
            
        }
      
      
    }

    const login = () => {

    }



  return (
    
    <Wrapper onClick={() => showLoading(false)}>
        <LoginContainer onClick={(e) => e.stopPropagation()}>
            <Button onClick={() => showLoading(false)}>{<CloseIcon />}</Button>
           
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
    background-color: rgba(42,55,52,0.5);
    display: flex;
    justify-content:center;
    align-items:center;
    position: absolute;
  


`

const Button = styled.button `
    position:absolute;    
    top:0;
    right:0;
    margin-top:10px;
    margin-right:10px;
    cursor:pointer;
    background-color:transparent;
    border:none;
    padding:5px;
    border-radius:10px;
    transition:all 0.2s;
    :hover {
        background-color:#D9D9D9;
    }

`

const LoginContainer = styled.div `
    width:400px;
    height:400px;
    background-color:white;
    display:flex;
    flex-direction:column;
    padding-top:50px;
    align-items:center;
    z-index:100;
    position:relative;
    
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