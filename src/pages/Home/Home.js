import React, { useEffect, useRef, useState } from 'react'
import NavBar from "../../components/NavBar/NavBar"
import styled from 'styled-components'
import background from "../../assets/images/herologo2.png"
import "../Home/Home.styles.css"
import Image from "../../assets/images/Image(1).svg"
import Arrow from "../../assets/images/Arrow 1.svg"
import Login from '../auth/Login'
import Presents from "../../assets/images/Presents.svg"


const Home = () => {
	const [openLogin,setOpenLogin] = useState(false);
	const presentImg = useRef(null);

  

  return (
    <Wrapper>
		{openLogin && <Login showLoading={setOpenLogin}/>}
    	
		<NavBar showLoading={setOpenLogin}/>
		<div className='hero'>
			<Hero>
				<Title>Bring your events to life</Title>
				<Title>with |Eclipse|</Title>
				<PartyImg src={Presents}></PartyImg>
			</Hero>

			<div className='signup'>
				<form className='signup-form'>
					<input type={"text"} placeholder={"Email"} className="signup-input"></input>
					<input type={"text"} placeholder={"Username"} className="signup-input"></input>
					<input type={"password"} placeholder={"Password"} className="signup-input"></input>
					<button type={"submit"} className="signup-button">Signup</button>
				</form>

			</div>
		</div>


		
    </Wrapper>
  )
}

const Hero = styled.div `
  display: flex;
  flex-direction:column;
  background:white;
  
  border-radius:10px;
  padding:10px;
  width:700px;
  height:600px;


`
const Title = styled.h1 `
	
	font-family: 'Kumar One', cursive;
	font-size:2.7rem;
	text-shadow: 3px 3px rgba(0,0,0,0.2);

`

const PartyImg = styled.img `
  
  height:400px;
  
  filter:drop-shadow(13px 13px 10px rgba(0,0,0,0.2));
  display:block;
  
`

const PresentImg = styled.img `
  
  height:100px;
  
  
  display:block;
  transition:all 1s;
  :hover {
	transform: translateX(400px);
  }
  
`

const Wrapper = styled.div `
  
  display:flex;
  flex-direction:column;
  width:100vw;
  height:100vh;
  
`

export default Home