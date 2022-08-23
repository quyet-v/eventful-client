/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { postApiCall } from '../../utils/functions';

function Signup() {
  const navigate = useNavigate();

  const handleSingup = async (email, username, password, e, loading, success) => {
    if (email && username && password) {
      loading(true);
      e.preventDefault();
      const userSignupInfo = {
        email,
        username,
        password,
      };

      postApiCall(`${process.env.REACT_APP_HOST_URL}/api/auth/signup`, userSignupInfo)
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
    <Wrapper>
      <LoginContainer>
        <AuthForm
          heading="Signup"
          buttonLabel="Signup"
          redirect="login"
          redirectMessage="Already have account?"
          redirectLinkMessage="Login"
          isSignup
          apiType={handleSingup}
        />
      </LoginContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color:#2a2d34;
    display: flex;
    justify-content:center;
    align-items:center;

`;

const LoginContainer = styled.div`
    width:400px;
    height:400px;
    background-color:white;
    display:flex;
    flex-direction:column;
    padding-top:50px;
    align-items:center;
`;

export default Signup;
