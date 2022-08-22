import React, { useState } from 'react';
import UserLogo from '../assets/images/userlogo.png';

function UserInfo() {
  const [user] = useState({});

  return (
    <div className="user-info">
      <img src={UserLogo} alt="" className="user-logo" />
      <p className="username">{user.username}</p>
    </div>
  );
}

export default UserInfo;
