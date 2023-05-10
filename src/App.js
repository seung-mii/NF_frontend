import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home.js';
import Make from './Pages/Meeting/Make.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/make" element={<Make />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
