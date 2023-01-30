import React, { useEffect } from 'react'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import Landing from './pages/Landing';
import Error from './pages/Error'
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute'
import Home from './pages/Home'
import Profile from './pages/Profile';
import AllJobs from './pages/AllJobs'
import AddJob from './pages/Addjob'
import Stats from './pages/Stats'
function App() {

  return (


    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/landing"
            element={
              <Landing></Landing>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/error"
            element={
              <Error></Error>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/register"
            element={
              <Register></Register>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/"
            element={
              <Home />}
          >
            <Route path='profile' element={<Profile />} />
            <Route path='all-jobs' element={<AllJobs />} />
            <Route path='add-job' element={<AddJob />} />
            <Route index element={<Stats />} />
          </Route>
        </Routes>


      </div>
    </Router>

  );
}

export default App;