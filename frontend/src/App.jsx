import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import booking from './pages/booking/booking';

function App() {
  return (
    <div>
      <Navbar/>
      <booking />

      <Footer/>
    </div>
  );
}

export default App;
