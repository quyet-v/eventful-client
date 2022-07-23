import React, { useEffect, useState } from 'react'
import UserLogo from "../assets/images/userlogo.png"
import { getApiCall } from '../utils/functions'


const UserInfo = () => {
  let [user,setUser] = useState({})

 
 

  

  return (
    <div className='user-info'>
      <img src={UserLogo} alt="" className='user-logo' />
      <p className="username">{user.username}</p>
    </div>
  )
}

export default UserInfo