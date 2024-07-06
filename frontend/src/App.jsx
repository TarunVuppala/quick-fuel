import React from 'react';
import Hero from './pages/Hero';
import Navbar from './components/Navbar';
import About from './pages/About';

function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
    </div>
  );
}

export default App;
