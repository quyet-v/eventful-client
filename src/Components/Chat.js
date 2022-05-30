import React, { useEffect,useRef,useState } from 'react'
import "../Styles/Friends.css"
import styled from "styled-components"
import {io} from "socket.io-client"
import { getApiCall } from '../utils/functions'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Chat = ({closeChat,user}) => {

  const [friends,setFriends] = useState()
  const [showLoading,setShowLoading] = useState(true)
  const [chatUser,setChatUser] = useState()
  const [chatUsername,setUsername] = useState("")
  const [socket,setSocket] = useState()
  const [message,setMessage] = useState();
  const [messageBack,setMessageBack] = useState();

  const inputBar = useRef(null)
  const messagesBox = useRef(null)
  const sendButton = useRef(null)

  useEffect(() => {
    let socket = io.connect("https://eventfuloflies.herokuapp.com/",{reconnection:false})
    setSocket(socket)

    socket.emit("join", {token: sessionStorage.getItem("token"),user})

    socket.on("returnmessages", data => {
      setMessageBack(data.roomFound.messages)
      setUsername(data.currentUsername.username)
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight
      setShowLoading(false)
    })
  
    socket.on("giveback", messages => {
      setMessageBack(messages.messages)
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight
    })     

    return (() => {
      socket.emit("closeconnection")
    })
     
  }, [])

  
  

  // const handleMessageOpen = (user) => {
    
  //   setChatUser(user)
    
    
    
   
  // }

  // const handleMessageClose = () => {
  //   setMessageBack(null);
    
  //   setChatUser(null)
  //   // if(socket) {
  //   //   socket.emit("closeconnection")
  //   // }
  // }

  const handleGetInputValue = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(inputBar.current.value != "") {
      inputBar.current.value = "";
      socket.emit("sendmessage", message);
      setMessage("");
    }
  }

  return (
    <>
      {<ChatContainer>
        <InfoDiv>
          {chatUsername != null && chatUsername}
          {showLoading && 
            "Loading..."
          }
          <CloseChatButton onClick={() => {closeChat()}}>X</CloseChatButton>
        </InfoDiv>
        
        <MessagesContainer ref={messagesBox} >
          {messageBack != null && messageBack.map((message) => {
            
            if(message) {
              return <Message key={Math.random()} > {`${message.sender}: ${message.message}`} </Message>
            }
          })}

          {showLoading && 
            <LoadingBox>
              <CircularProgress></CircularProgress>
            </LoadingBox>
          }
        </MessagesContainer>

        <ChatInput>
           
          <ChatInputBar placeholder='Enter Message...' onChange={handleGetInputValue} ref={inputBar}></ChatInputBar>
      
          <SendButton  ref={sendButton} onClick={handleSendMessage} type="submit">Send</SendButton>
           
          
        </ChatInput>
        
      </ChatContainer>}
    
    
    
    
    </>
  )
}

const Message = styled.h1 `
 
  margin-top:5px;
  font-size: medium;
  background-color:orange;
  border-radius:4px;
  width:max-content;
  padding:5px;
  max-width:100%;
  
  

`

const LoadingBox = styled(Box) `
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const Wrapper = styled.div `
  background-color: white;
  width: 500px;
  height: 500px;
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  margin: auto;
  border-radius: 5px;
  display:flex;
  flex-direction:column;
`;

const FriendsTitle = styled.h1 `
  text-align:center;
  border-bottom:1px solid black;
`;

const FriendsList = styled.div `
  background-color:white;
  flex-grow:1;
  display:grid;
  grid-template-columns: auto auto;
  grid-auto-rows: 50px;
  gap: 15px;
  padding: 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  } 


  -ms-overflow-style: none;  
   scrollbar-width: thin; 
  
`;

const Friend = styled.div `
  background-color: white;
  height: 40px;
  border-radius: 5px;
  border-bottom: 1px solid black;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 5px;
`;

const MessageButton = styled.button `
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  transition: all .5s;

  :hover {
    transform: scale(1.02);
    
  }

`;

const InfoDiv = styled.div `
  flex: 0.1;
  display:flex;
  align-items:center;
  height:20px;
  border-bottom: 2px solid black;
  padding:3px;

  > * {
    margin-left:5px;
  }
`;

const ChatContainer = styled.div `
  
  background-color: white;
  width: 30%;
  height: 300px;
  position: absolute;
  right:0;
  bottom:0;
  min-width:260px;
  border: 2px solid black;
  border-top-left-radius:4px;

  display:flex;
  flex-direction:column;
  


`;


const CloseChatButton = styled.button `
  border: none;
  width: 20px;
  background-color: red;
  cursor:pointer;

  :hover {
    background-color:darkred;


  }

`;

const ChatInput = styled.form `
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: white;
  display:flex;
  flex-direction:row;
  justify-content:center;
  background-color:green;
  border-top: 2px solid black;
  
`;

const ChatInputBar = styled.input `
  flex:.8;
  background-color:white;
  border:none;
  height: 100%;
  width:100px;
  border-right: 2px solid black;
  margin:0;
  outline:none;
  
 


`;

const SendButton = styled.button `
  flex:.2;
  border:none;
  height: 100%;
  margin:0;


`;

const MessagesContainer = styled.div `
  overflow-y: scroll;
  flex: 0.8;
  scroll-behavior: smooth;
  padding:5px;
  overflow-wrap:break-word;
  
 
  ::-webkit-scrollbar {
    scrollbar-width:thin;
  } 


  -ms-overflow-style: -ms-autohiding-scrollbar; 
  
   scrollbar-width: thin; 
  
  
`;


export default Chat