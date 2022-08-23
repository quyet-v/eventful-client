/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import AuthForm from '../../components/AuthForm/AuthForm';
import { postApiCall } from '../../utils/functions';

function Login({ showLoading }) {
  const navigate = useNavigate();

  const handleClick = async (username, password, e, loading, success) => {
    if (username && password) {
      loading(true);
      e.preventDefault();

      postApiCall(`${process.env.REACT_APP_HOST_URL}/api/auth/login`, {
        username,
        password,
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          success(false);
          loading(false);
        })
        .then((res) => {
          if (res) {
            sessionStorage.setItem('token', res.token);
            navigate('/dashboard');
          }
        });
    }
  };

  return (

    <Wrapper onClick={() => showLoading(false)}>
      <LoginContainer onClick={(e) => e.stopPropagation()}>
        <Button onClick={() => showLoading(false)}><CloseIcon /></Button>

        <AuthForm
          heading="Login"
          buttonLabel="Log in"
          redirect="signup"
          redirectMessage="No Account?"
          redirectLinkMessage="Create one"
          isSignup={false}
          apiType={handleClick}
        />
      </LoginContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(42,55,52,0.5);
    display: flex;
    justify-content:center;
    align-items:center;
    position: absolute;
`;

const Button = styled.button`
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

`;

const LoginContainer = styled.div`
    width:400px;
    height:400px;
    background-color:white;
    border-radius: 10px;
    display:flex;
    flex-direction:column;
    padding-top:50px;
    align-items:center;
    z-index:100;
    position:relative;
    
`;

export default Login;
