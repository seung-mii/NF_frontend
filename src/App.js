import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Js/Home/Home.js";
import Make from "./Js/Meeting/Make.js";
import Board from "./Js/Meeting/Board.js";
import Check from "./Js/Restaurant/Check.js";
import NotFound from "./Js/NotFound/NotFound.js";
import MenuView from "./Js/Shoppingbasket/MenuView";
import MenuDetail from "./Js/Shoppingbasket/MenuDetail";
import MyPosts from "./Js/Meeting/MyPosts";
import Login from "./Js/Member/Login";
import SignUp from "./Js/Member/SignUp";
import Basket from "./Js/Shoppingbasket/Basket";
import MyPage from "./Js/Member/MyPage";
import MakeMap from "./Js/Meeting/MakeMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/make" element={<Make />}></Route>
        <Route path="/check" element={<Check />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="*" element={<NotFound />}></Route>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/mypage" element={<MyPage />} /> */}

        <Route path="/myposts" element={<MyPosts />} />

        <Route path="/mypage" element={<MenuView />} />
        <Route path="/menuview" element={<MenuView />} />
        <Route
          path="/menudetail/:boardNo/:resname/:foodid"
          element={<MenuDetail />}
        />
        <Route path="/basket/:boardNo" element={<Basket />} />

        <Route path="/map" element={<MakeMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
