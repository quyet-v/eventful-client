/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import '../styles/Friends.css';
import styled from 'styled-components';
import { io } from 'socket.io-client';

function Chat({ closeChat, user }) {
  const [chatUsername, setUsername] = useState('');
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState();
  const [messageBack, setMessageBack] = useState();

  const inputBar = useRef(null);
  const messagesBox = useRef(null);
  const sendButton = useRef(null);

  useEffect(() => {
    const s = io.connect('https://eventfuloflies.herokuapp.com/', { reconnection: false });
    setSocket(s);

    socket.emit('join', { token: sessionStorage.getItem('token'), user });

    socket.on('returnmessages', (data) => {
      setMessageBack(data.roomFound.messages);
      setUsername(data.currentUsername.username);
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    });

    socket.on('giveback', (messages) => {
      setMessageBack(messages.messages);
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    });

    return (() => {
      socket.emit('closeconnection');
    });
  }, []);

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
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputBar.current.value !== '') {
      inputBar.current.value = '';
      socket.emit('sendmessage', message);
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      <InfoDiv>
        {chatUsername != null && chatUsername}

        <CloseChatButton onClick={() => { closeChat(); }}>X</CloseChatButton>
      </InfoDiv>

      <MessagesContainer ref={messagesBox}>
        {messageBack != null && messageBack.map((message) => {
          if (message) {
            return (
              <Message key={Math.random()}>
                {' '}
                {`${message.sender}: ${message.message}`}
                {' '}
              </Message>
            );
          }
        })}

      </MessagesContainer>

      <ChatInput>
        <ChatInputBar placeholder="Enter Message..." onChange={handleGetInputValue} ref={inputBar} />
        <SendButton ref={sendButton} onClick={handleSendMessage} type="submit">Send</SendButton>
      </ChatInput>
    </ChatContainer>
  );
}

const Message = styled.h1`
 
  margin-top:5px;
  font-size: medium;
  background-color:orange;
  border-radius:4px;
  width:max-content;
  padding:5px;
  max-width:100%;
  
  

`;

const InfoDiv = styled.div`
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

const ChatContainer = styled.div`
  
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

const CloseChatButton = styled.button`
  border: none;
  width: 20px;
  background-color: red;
  cursor:pointer;

  :hover {
    background-color:darkred;


  }

`;

const ChatInput = styled.form`
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

const ChatInputBar = styled.input`
  flex:.8;
  background-color:white;
  border:none;
  height: 100%;
  width:100px;
  border-right: 2px solid black;
  margin:0;
  outline:none;
  
 


`;

const SendButton = styled.button`
  flex:.2;
  border:none;
  height: 100%;
  margin:0;


`;

const MessagesContainer = styled.div`
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

export default Chat;
