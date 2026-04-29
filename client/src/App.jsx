import React from 'react'
import Home from "./pages/Home/Home.jsx";
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App