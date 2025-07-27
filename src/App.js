import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import MyTeam from './components/pages/MyTeam';
import WorkExperience from './components/pages/WorkExperience';
import Contact from './components/Contact';
import QRBanking from './components/pages/QRBanking';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-team" element={<MyTeam/>} />
        <Route path="/products" element={<WorkExperience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/qrbank" element={< QRBanking />} />
      </Routes>
    </Router>
  );
}

export default App;
