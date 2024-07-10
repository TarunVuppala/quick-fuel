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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAgentAuthenticated, setIsAgentAuthenticated] = useState(false);

  const PrivateRoute = ({ element, auth,redirect }) => {
    return auth ? element : <Navigate to={redirect} />
  }

  return (
    <div>
      <AgentRefreshHandler setIsAuthenticated={setIsAgentAuthenticated} />
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={
          <>
            <Navbar auth={"Login"} />
            <Hero />
            <About />
            <Final />
            <Footer />
          </>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={
          <PrivateRoute auth={isAuthenticated} element={
            <Home />
          } 
          redirect={'/login'}
          />
        } />
        <Route path='/about' element={<About />} />
        <Route path='/order' element={<Order />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/agent' element={
          <PrivateRoute auth={isAgentAuthenticated} element={
            <AgentDashboard />
          } 
          redirect={'/agent/login'}
          
          />
        } />
        <Route path='/agent/signup' element={<AgentSignUp />} />
        <Route path='/agent/login' element={<AgentLogin />} />
      </Routes>
    </div>
  );

}

const Home = () => {
  return (
    <>
      <Navbar auth={"Logout"} />
      <Hero />
      <About />
      <Final />
      <Footer />
    </>
  )
}

export default App;
