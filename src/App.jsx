import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartContext from './components/contexts/cart';
import AppRouter from './components/config/route';
// import AppRouter from './components/config/AppRouter';

export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData); // Set cart initially with localStorage data
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Router>
        <AppRouter />
      </Router>
    </CartContext.Provider>
  );
}
