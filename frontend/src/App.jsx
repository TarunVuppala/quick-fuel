import React from 'react';
import Hero from './pages/Hero';
import Navbar from './components/Navbar';
import About from './pages/About';
import Final from './pages/Final';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Final/>
      <Footer/>
    </div>
  );
}

export default App;
