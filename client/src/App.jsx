import React from 'react'
import Home from "./pages/Home/Home.jsx";

import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';

// Events
import Events from './pages/Events/Events.jsx';
import EventDetails from './pages/Events/EventDetails.jsx';
import Booking from './pages/Events/Booking.jsx';

import Profile from './pages/Profile/Profile.jsx';

// Admin 
import Dashboard from './pages/Admin/Dashboard.jsx';
import ManageEvents from './pages/Admin/ManageEvents.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/eventsDetails" element={<EventDetails />}/>
      <Route path="/booking" element={<Booking />}/>

      <Route path="/profile" element={<Profile />}/>

      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>

      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/ManageEvents" element={<ManageEvents />}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App