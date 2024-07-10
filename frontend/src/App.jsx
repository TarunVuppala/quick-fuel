import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/Landing/About';
import Hero from './pages/Landing/Hero';
import Final from './pages/Landing/Final';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Footer from './components/Footer';
import RefreshHandler from './components/RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div>
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
          <PrivateRoute element={
            <Home />
          } />
        } />
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
