import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from "./pages/Landing/Hero"
import About from "./pages/Landing/About"
import Final from "./pages/Landing/Final"

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
