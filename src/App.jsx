import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Host from './pages/Host/Host';
import Events from './pages/Events/Events';
import AddFriend from './pages/AddFriend';
import ChosenEvent from './pages/ChosenEvent/ChosenEvent';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="host" element={<PrivateRoute><Host /></PrivateRoute>} />

            <Route path="events" element={<PrivateRoute><Events /></PrivateRoute>} />
            <Route path="add-friends" element={<PrivateRoute><AddFriend /></PrivateRoute>} />
            <Route path="event/:id" element={<PrivateRoute><ChosenEvent /></PrivateRoute>} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
