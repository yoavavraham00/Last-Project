import React, { useState, useEffect } from 'react';
import {Route, Routes, } from 'react-router-dom';
import axios from 'axios';
// import './themed-bootstrap.scss';
import  Card  from './Routes/Card';
import  Register  from './Routes/Register';
import  Login  from './Routes/Login';
import  NotFound  from './Routes/NotFound';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HeroSection from './Pages/LandingPage';
import ProductDisplay from './Components/ProductDisplay';
import { ICard } from './DB/Types/models.d';

function App() {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  return (
   <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection cards={cards} />        
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
