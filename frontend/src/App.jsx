import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';

import ForgotPassword from './pages/ForgotPassword';
import WhatsAppChatWidget from './components/WhatsAppChatWidget';
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <WhatsAppChatWidget />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
