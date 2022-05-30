import React from 'react'
import { Route,Navigate } from 'react-router-dom'
import {isAuthenticated} from "../utils/functions"

const PrivateRoute = ({children}) => {
  return isAuthenticated() ? children : <Navigate to="/login" />

}

export default PrivateRoute