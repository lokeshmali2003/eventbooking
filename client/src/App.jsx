import React from 'react'
import Home from "./pages/Home/Home.jsx";

import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import ForgotPassword from './pages/Login/ForgotPassword.jsx';

// Events
import Events from './pages/Events/Events.jsx';
import EventDetails from './pages/Events/EventDetails.jsx';
import Booking from './pages/Events/Booking.jsx';

import Profile from './pages/Profile/Profile.jsx';

// Admin 
import Dashboard from './pages/Admin/Dashboard.jsx';
import ManageEvents from './pages/Admin/ManageEvents.jsx';
import User from './pages/Admin/User.jsx';
import ManageBooking from './pages/Admin/ManageBooking.jsx';

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
      <Route path="/forgotpass" element={<ForgotPassword />}/>

      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/ManageEvents" element={<ManageEvents />}/>
      <Route path="/User" element={<User />}/>
      <Route path="/managebooking" element={<ManageBooking />}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App