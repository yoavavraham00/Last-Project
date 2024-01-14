import React from 'react';
import {Route, Routes, } from 'react-router-dom';
import  Cards  from './Routes/Cards';
import  Card  from './Routes/Card';
import  Register  from './Routes/Register';
import  Login  from './Routes/Login';
import  NotFound  from './Routes/NotFound';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HeroSection from './Components/HeroSection';
import ProductDisplay from './Components/ProductDisplay';


function App() {
  return (
    <>
      <Header /> 
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <ProductDisplay />
          </>
        } />
        <Route path="/cards/:id" element={<Card />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
