import React, { useEffect, useState } from 'react'
import UserLogo from "../assets/images/userlogo.png"
import { getApiCall } from '../utils/functions'


const UserInfo = () => {
  let [username,setUsername] = useState("Loading...")

 
 

  useEffect(() => {
    getApiCall("http://localhost:4000/api/users/info")
    .then((res) => {
      return res.json();
    })
    .then(res => {
      if(res) {
        setUsername(res.username)
      }
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