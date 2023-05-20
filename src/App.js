import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Js/Home/Home.js';
import Make from './Js/Meeting/Make.js';
import Board from './Js/Meeting/Board.js';
import Check from './Js/Restaurant/Check.js';
import NotFound from './Js/NotFound/NotFound.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/make" element={<Make />}></Route>
        <Route path="/check" element={<Check />}></Route>
        <Route path="/board/:id" element={<Board />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
