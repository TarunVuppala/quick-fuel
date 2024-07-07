import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import order from './pages/order/order';
function App() {
  return (
    <div>
      <Navbar/>
      <order/>
      <Footer/>
    </div>
  );
}

export default App;
