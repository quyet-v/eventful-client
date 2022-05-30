

import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/login' element={<Login></Login>} ></Route>
          <Route path='/signup' element={<Signup></Signup>} ></Route>


        </Routes>
      </div>
    </Router>
  )
}

export default App
