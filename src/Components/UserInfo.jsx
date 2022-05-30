import React, { useEffect, useState } from 'react'
import UserLogo from "../images/userlogo.png"
import { getApiCall } from '../utils/functions'


const UserInfo = () => {
  let [username,setUsername] = useState("Loading...")

 
 

  useEffect(() => {
    getApiCall("https://eventfuloflies.herokuapp.com/getUserInfo")
    .then((res) => {
      setUsername(res.username)
    })
  }, [])

  return (
    <div className='user-info'>
      <img src={UserLogo} alt="" className='user-logo' />
      <p className="username">{username}</p>
    </div>
  )
}

export default UserInfo