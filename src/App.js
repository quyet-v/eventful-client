import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Host from './pages/Host/Host'
import Events from './pages/Events/Events'
import Friends from './pages/Friends'
import AddFriend from './pages/AddFriend'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
            <Route path='host' element={<PrivateRoute><Host></Host></PrivateRoute>} ></Route>
            
            <Route path='events' element={<PrivateRoute><Events></Events></PrivateRoute>} ></Route>
            <Route path='friends' element={<PrivateRoute><Friends></Friends></PrivateRoute>} ></Route>
            <Route path='add-friends' element={<PrivateRoute><AddFriend></AddFriend></PrivateRoute>} ></Route>
            
          </Route>
         


        </Routes>
      </div>
    </Router>
  )
}

export default App
