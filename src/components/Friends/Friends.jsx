import React, { useEffect, useState } from 'react';
import './Friends.styles.css';
import axios from 'axios';
import { getConfig } from '../../utils/functions';
import Chat from '../Chat';

function Friends() {
  const [friends, setFriends] = useState([{}]);
  const [open, setOpen] = useState();
  const [chatUser, setChatUser] = useState();
  const [finishedLoading, setFinishedLoading] = useState(false);

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

    axios.get(`${process.env.REACT_APP_HOST_URL}/api/friends`, getConfig(sessionStorage.getItem('token')))
      .then((res) => {
        setFriends(res.content);
        setFinishedLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });

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
  }, []);

  const closeChat = () => {
    setOpen(false);
    setChatUser(null);
  };

  const handleMessageOpen = (user) => {
    setOpen(true);
    setChatUser(user);
  };

  return (

    <div className="right-container">

      <div className="wrapper">
        <h1>Current Friends</h1>
        <div className="friend-list">
          {finishedLoading && friends.map((friend) => (
            <div className="friend" key={friend.id + 1}>
              {friend.username}
              <button type="button" className="message-button" onClick={() => { handleMessageOpen(friend.id); }}>Message</button>
            </div>
          ))}

        </div>
      </div>

      {open && <Chat closeChat={closeChat} user={chatUser} />}

    </div>

  );
}

export default Friends;
