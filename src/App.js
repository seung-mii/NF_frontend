import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home.js';
import Make from './Pages/Meeting/Make.js';
import Board from './Pages/Meeting/Board.js';
import Check from './Pages/Restaurant/Check.js';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/make" element={<Make />}></Route>
        <Route path="/check" element={<Check />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
