import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/Landing/About';
import Hero from './pages/Landing/Hero';
import Final from './pages/Landing/Final';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Footer from './components/Footer';
import Order from './pages/order/Order';
import Contact from './components/Contact';
import Booking from './pages/booking/Booking';
import RefreshHandler from './components/RefreshHandler';
import AgentDashboard from './components/AgentDashboard';
import AgentSignUp from './pages/auth/AgentSignUp';
import AgentLogin from './pages/auth/AgentLogin';
import AgentRefreshHandler from './components/AgentRefreshHandler';
import MechanicDashboard from './components/MechanicDashboard';
import MechanicLogin from './pages/auth/MechanicLogin';
import MechanicSignup from './pages/auth/MechanicSignup';
import Tracking from './pages/booking/Tracking';
import MechanicRefreshHandler from './components/MechanicRefreshHandler';
import MechanicBooking from './pages/booking/MechanicBooking';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAgentAuthenticated, setIsAgentAuthenticated] = useState(false);
  const [isMechAuthenticated, setIsMechAuthenticated] = useState(false);

  // Check if any user is authenticated
  const isAnyAuthenticated =
    isAuthenticated || isAgentAuthenticated || isMechAuthenticated;

  // Determine navbar text based on authentication status
  const navbarText = isAnyAuthenticated ? "Logout" : "Login";

  const PrivateRoute = ({ element, auth, redirect }) => {
    return auth ? element : <Navigate to={redirect} />;
  };

  return (
    <div>
      {/* Only render refresh handlers if no one is authenticated */}
      {!isAnyAuthenticated && (
        <>
          <AgentRefreshHandler setIsAuthenticated={setIsAgentAuthenticated} />
          <MechanicRefreshHandler setIsAuthenticated={setIsMechAuthenticated} />
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        </>
      )}

      {/* Navbar is always displayed and its content depends on auth */}
      <Navbar auth={navbarText} />

      <Routes>
        <Route
          path='/'
          element={
            <>
              <Hero />
              <About />
              <Final />
              <Footer />
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={
            <PrivateRoute auth={isAuthenticated} element={<Home />} redirect={'/login'} />
          }
        />
        <Route path='/about' element={<About />} />
        <Route
          path='/order'
          element={
            <PrivateRoute auth={isAuthenticated} element={<Order />} redirect={'/login'} />
          }
        />
        <Route path='/contact' element={<Contact />} />
        <Route
          path='/booking'
          element={
            <PrivateRoute auth={isAuthenticated} element={<Booking />} redirect={'/login'} />
          }
        />
        <Route
          path='/mbooking'
          element={
            <PrivateRoute
              auth={isAuthenticated}
              element={<MechanicBooking />}
              redirect={'/login'}
            />
          }
        />
        <Route
          path='/tracking'
          element={
            <PrivateRoute auth={isAuthenticated} element={<Tracking />} redirect={'/login'} />
          }
        />
        <Route
          path='/agent'
          element={
            <PrivateRoute
              auth={isAgentAuthenticated}
              element={<AgentDashboard />}
              redirect={'/agent/login'}
            />
          }
        />
        <Route path='/agent/signup' element={<AgentSignUp />} />
        <Route path='/agent/login' element={<AgentLogin />} />
        <Route
          path='/mechanic'
          element={
            <PrivateRoute
              auth={isMechAuthenticated}
              element={<MechanicDashboard />}
              redirect={'/mechanic/login'}
            />
          }
        />
        <Route path='/mechanic/signup' element={<MechanicSignup />} />
        <Route path='/mechanic/login' element={<MechanicLogin />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Final />
      <Footer />
    </>
  );
};

export default App;
