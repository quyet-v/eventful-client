import styled from "styled-components"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const LoadingBox = styled(Box) `
  width: 100%;
  height:100%;
  position:absolute;
  background-color: rgba(0,0,0,.5);
  display:flex;
  justify-content:center;
  align-items:center;
  top:0;
  left:0;
`


const Button = styled.button `
  position:relative;
  height: 35px;
  width:80px;
  cursor:pointer;
  border-radius:7px;
  background-color: ${props => props.color};
  border: 2px solid black;
  box-shadow: 0px 3px ${props => props.shadowColor};
  transition: all .2s;

  :hover {
    transform: translateY(-2px);
    box-shadow: 0px 5px rgb(162,0,54);
  }

  :active {
    transform:translateY(2px);
    box-shadow: 0px 1px rgb(162,0,54);
  }

`

export {Button,LoadingBox}