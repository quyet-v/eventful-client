import React, { useEffect,useRef,useState } from 'react'
import "../Styles/Friends.css"
import styled from "styled-components"
import {io} from "socket.io-client"
import { getApiCall } from '../utils/functions'
import Chat from '../Components/Chat'

const Friends = () => {

  const [friends,setFriends] = useState()
  const [open,setOpen] = useState()
  const [chatUser,setChatUser] = useState()
  const [socket,setSocket] = useState()
  const [message,setMessage] = useState();
  const [messageBack,setMessageBack] = useState();

  const inputBar = useRef(null)
  const messagesBox = useRef(null)
  const sendButton = useRef(null)
  
  useEffect(() => {
    
  //   let socket = io.connect("https://eventfuloflies.herokuapp.com/",{autoConnect:false,reconnection:false})
  //   setSocket(socket)

  //   socket.on("returnmessages", messages => {
  //     setMessageBack(messages.messages)
  //   })
  
  //   socket.on("giveback", messages => {
  //     setMessageBack(messages.messages)
  //     messagesBox.current.scrollTop = messagesBox.current.scrollHeight
  //   })
    
    getApiCall("https://eventfuloflies.herokuapp.com/getFriends")
    .then((res) => {
      setFriends(res.friends)
    })      
     
  // }, [])

  
  

  // const handleMessageOpen = (user) => {
  //   setOpen(true)
  //   setChatUser(user)
    
  //   socket.connect()
  //   socket.emit("join", {token: sessionStorage.getItem("token"),user})
   
  // }

  // const handleMessageClose = () => {
  //   setMessageBack(null);
  //   setOpen(false);
  //   setChatUser(null)
  //   if(socket) {
  //     socket.emit("closeconnection")
  //   }
  // }

  // const handleGetInputValue = (e) => {
  //   setMessage(e.target.value)
  // }

  // const handleSendMessage = (e) => {
  //   e.preventDefault()
  //   if(inputBar.current.value != "") {
  //     inputBar.current.value = "";
  //     socket.emit("sendmessage", message);
  //     setMessage("");
  //   }
  // }

  // const closeMessage = () => {
  //   setOpen(false)
  // }

  }, [])
 
  const closeChat = () => {
    setOpen(false)
    setChatUser(null);
  }


  const handleMessageOpen = (user) => {
    setOpen(true)
    setChatUser(user)
  }

  return (

    <div className="right-container">

      <Wrapper>
        <FriendsTitle>Current Friends</FriendsTitle>
        <FriendsList>
          
          {friends != null && friends.map((friend) => {
              return <Friend key={friend._id}>
              {friend.username}
              <MessageButton onClick={() => {handleMessageOpen(friend._id)}}>Message</MessageButton>
            </Friend>
          })}

        </FriendsList>
      </Wrapper>
            
      {open && <Chat closeChat={closeChat} user={chatUser} />}



      {/* {open == true &&
      <ChatContainer>
        <InfoDiv>
          {chatUser}
          <CloseChatButton onClick={handleMessageClose}>X</CloseChatButton>
        </InfoDiv>
        
        <MessagesContainer ref={messagesBox}>
          {messageBack != null && messageBack.map((message) => {
            
            return <h1 key={message._id}>{`${message.sender}: ${message.message}`}</h1>
          })}
        </MessagesContainer>

        <ChatInput>
           
          <ChatInputBar placeholder='Enter Message...' onChange={handleGetInputValue} ref={inputBar}></ChatInputBar>
      
          <SendButton  ref={sendButton} onClick={handleSendMessage} type="submit">Send</SendButton>
           
          
        </ChatInput>
        
      </ChatContainer>} */}

    </div>
    
  )

}


const Wrapper = styled.div `
  background-color: white;
  width: 70%;
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
  border: 4px solid black;
`;

const FriendsTitle = styled.h1 `
  text-align:center;
  border-bottom:1px solid black;
`;

const FriendsList = styled.div `
  background-color:white;
  flex-grow:1;
  display:grid;
  grid-template-columns:  repeat(auto-fill,minmax(150px,1fr));
  grid-template-rows: repeat(auto-fill,minmax(40px,1fr));
  justify-items: center;
  gap: 15px;
  padding: 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }


  -ms-overflow-style: none;  
  scrollbar-width: none; 
  
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
  > * {
    margin:10px;
  }
`;

const MessageButton = styled.button `
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  transition: all .1s;

  :hover {
    transform: scale(1.02);
    
  }

`;

const InfoDiv = styled.div `
  flex: 0.1;
`;

const ChatContainer = styled.div `
  
  background-color: white;
  width: 400px;
  height: 300px;
  position: absolute;
  right:0;
  bottom:0;
  border: 2px solid black;
  border-radius: 5px;
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
  -ms-overflow-style: none;  
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
  
`;




export default Friends