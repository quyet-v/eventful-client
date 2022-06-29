import React from 'react'
import NavBar from "../components/NavBar/NavBar"
import styled from 'styled-components'
import background from "../assets/images/herologo2.png"

const Home = () => {
  return (
    <Wrapper>
        <NavBar></NavBar>
        <Hero>
          <Title>Bring your events to life</Title>
          <PartyImg src={background} />
        </Hero>
    </Wrapper>
  )
}

const Hero = styled.div `
  display: flex;
  flex-direction:column;
  
  align-items:center;
  padding:40px;

`
const Title = styled.h1 `
  font-family: 'Inter', sans-serif;
  text-align:center;  
  font-size:55px;
  margin-bottom:40px;

`

const PartyImg = styled.img `
  width:500px;
  height:500px;
  
`

const Wrapper = styled.div `
  position:relative;
  
`

export default Home