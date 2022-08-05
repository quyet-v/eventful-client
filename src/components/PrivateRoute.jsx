import React, { useEffect,useState } from 'react'
import { Route,Navigate, useNavigate } from 'react-router-dom'
import {isAuthenticated} from "../utils/functions"
import { postCallNoBody } from '../utils/functions'

const PrivateRoute = ({children}) => {

  const [auth,setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated()
    .then(res => {
      setAuth(true);
    })
    .catch(err => {
      navigate("/");
    })
  },[])

  return auth ? children : null

}

export default PrivateRoute