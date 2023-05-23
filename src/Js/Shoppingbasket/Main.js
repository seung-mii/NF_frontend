import React, { useState } from "react";
import Nav from "../../components/Nav";
import "../../Css/Shoppingbasket/Main.css";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Stack from "@mui/material/Stack";
function Main() {
  const [title, setTitle] = useState("공동 장바구니");
  const menuViewFunc = () => {
    window.location.href = "/menuview";
  };
  const basketViewFunc = () => {
    window.location.href = "/basketview";
  };
  return (
    <div>
      <Nav title={title} />
      <div className="mcontainer">
        <div className="mitem">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
            onClick={menuViewFunc}
          >
            <LocalDiningIcon className="micon" />
            <p className="text">메뉴 조회</p>
          </Stack>
        </div>
        <div class="mitem">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
            onClick={basketViewFunc}
          >
            <ShoppingBasketIcon className="micon" />
            <p className="text">장바구니 조회</p>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Main;
