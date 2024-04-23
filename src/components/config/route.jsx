// router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../containers/home';
import Checkout from '../../containers/checkout/Chechout';
// import Checkout from '../../containers/checkout';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
