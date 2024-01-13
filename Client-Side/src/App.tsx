import React from 'react';
import {Route, Routes, } from 'react-router-dom';
import Card from '../Routes/Card';
import Cards from '../Routes/Cards';
import Login from '../Routes/Login';
import NotFound from '../Routes/NotFound';
import Register from '../Routes/Register';



function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Cards />} />
    <Route path="/cards/:id" element={<Card />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
