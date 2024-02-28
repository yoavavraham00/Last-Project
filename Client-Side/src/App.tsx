import React, { useState, useEffect } from 'react';
import {Route, Routes, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import  Card  from './Routes/Card';
import register from './Pages/RegisterPage';
import  Login  from './Routes/Login';
import  NotFound  from './Routes/NotFound';
import Footer from './Components/Footer';
import HeroSection from './Pages/LandingPage';
import { ICard, IUser } from './DB/Types/models';
import { NavBarHeader } from './Components/NavbarHeader';
import ProductDisplay from './Components/ProductDisplay';
import AboutPage from './Pages/AboutPage';
import Registrationpage from './Pages/RegisterPage';
import BusinessCardForm from './Components/BusinessCardForm';
import { SavedCardsPage } from './Pages/FAVItems';
import LoginForm from './Routes/Login';



function App() {

  const [cards, setCards] = useState<ICard[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  setIsBusiness(false);  
  navigate('/'); // Redirect to home after logout
};
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => console.error('Error fetching cards:', error));
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true); // setUserRole based on the token payload or an API response
      }
    }, []);

  return (
   <>
   <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
   <NavBarHeader key={isLoggedIn ? 'logged-in' : 'logged-out'} darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} handleLogout={handleLogout} IsBusiness={isBusiness}/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection cards={cards} isLoggedIn={isLoggedIn} isBusiness={isBusiness} />        
          </>
        } />
        <Route path="/cards/:id" element={<Card />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/register" element={<Registrationpage />} />
        <Route path="/create-card" element={<BusinessCardForm />} />
        <Route path="/saved-cards" element={<SavedCardsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
