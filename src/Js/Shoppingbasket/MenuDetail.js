import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import "../../Css/Shoppingbasket/MenuDetail.css";
import { call } from "../../Service/ApiService";
import * as AppStorage from "../../AppStorage";
import M from "../../native";
function MenuDetail() {
  const [title, setTitle] = useState("메뉴 조회");
  const [quantity, setQuantity] = useState(1);
  const { resname } = useParams();
  const { foodid } = useParams();
  const [menu, setMenu] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [buttonText, setButtonText] = useState(totalCost + "원 담기");
  const { boardNo } = useParams();

  const boardno = 1;
  useEffect(() => {
    if (menu.menu_no) {
      setTotalCost(menu.price * quantity);
      setButtonText(totalCost + "원 담기");
      console.log(
        quantity +
          "개 의 " +
          menu.price +
          " 가격의" +
          menu.name +
          " 주문하여 총 가격은 " +
          totalCost +
          "원"
      );
    }
  }, [menu.menu_no, quantity, totalCost]);
  useEffect(() => {
    call(`/api/menu/${foodid}`, "GET", null).then((response) =>
      setMenu({
        menu_no: response.data.menu_no,
        name: response.data.name,
        price: response.data.price,
      })
    );
  }, []);
  const delFunc = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addFunc = () => {
    setQuantity(quantity + 1);
  };
  const insertMenu = () => {
    var BasketDTO = {
      email: AppStorage.getItem("email"),
      boardNo: boardNo,
      menuNo: menu.menu_no,
      quantity: quantity,
    };
    console.log(BasketDTO);

    call("/api/basket/create", "POST", BasketDTO)
      .then((response) => {
        if (response.data) {
          setButtonText("공동 장바구니에 메뉴를 추가했습니다.");
          window.location.href = "/menuview";
        }
      })
      .catch((error) => {
        alert(error.error);
        return Promise.reject(error.error);
      });
  };
  return (
    <div className="mdcontainer">
      <Nav title={title} />

      <div className="md-header">
        <p className="mdtext">{resname}</p>

        <img className="image" alt={menu.menu_no} src={menu.src} />
        <div className="fnbox">
          <p>{menu.name}</p>
        </div>
        <div className="fpbox">
          <p className="p">{menu.price}원</p>
        </div>
        <div className="fqbox">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <RemoveIcon onClick={delFunc} className="qicon" />
            <p>{quantity}개</p>
            <AddIcon onClick={addFunc} className="qicon" />
          </Stack>
        </div>
      </div>
      {/* <hr /> */}
      <div className="footer-container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Button variant="contained" className="btt" onClick={insertMenu}>
            {buttonText}
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default MenuDetail;
