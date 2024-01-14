import React from 'react';
import {Route, Routes, } from 'react-router-dom';
import  Cards  from '../Routes/Cards';
import  Card  from '../Routes/Card';
import  Register  from '../Routes/Register';
import  Login  from '../Routes/Login';
import  NotFound  from '../Routes/NotFound';



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
