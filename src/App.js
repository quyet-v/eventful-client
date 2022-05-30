


import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Components/Dashboard'
import PrivateRoute from './Components/PrivateRoute'
import Host from './Pages/Host'
import MyEvents from './Pages/MyEvents'
import AllEvents from './Pages/AllEvents'
import Friends from './Pages/Friends'
import AddFriend from './Pages/AddFriend'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/login' element={<Login></Login>} ></Route>
          <Route path='/signup' element={<Signup></Signup>} ></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
            <Route path='host' element={<PrivateRoute><Host></Host></PrivateRoute>} ></Route>
            <Route path='myevents' element={<PrivateRoute><MyEvents></MyEvents></PrivateRoute>} ></Route>
            <Route path='allevents' element={<PrivateRoute><AllEvents></AllEvents></PrivateRoute>} ></Route>
            <Route path='friends' element={<PrivateRoute><Friends></Friends></PrivateRoute>} ></Route>
            <Route path='add-friends' element={<PrivateRoute><AddFriend></AddFriend></PrivateRoute>} ></Route>
            
          </Route>
         


        </Routes>
      </div>
    </Router>
  )
}

export default App
