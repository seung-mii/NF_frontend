import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import "../../Css/Shoppingbasket/MenuDetail.css";
function MenuDetail() {
  const [title, setTitle] = useState("메뉴 조회");
  // id를 이용하여 음식정보를 가져오는 method 필요
  // 가져온 임시데이터 아래
  const food = {
    name: "우돌돌피자",
    price: "15000",
    id: "1",
    src: "https://ldb-phinf.pstatic.net/20200908_256/1599494234060B5s40_JPEG/TebGb1il2yj38iY1vZ_F_ONM.jpg",
  };
  //내가 가지고 있으면서 백엔드에게 주어야하는정보는 사용자가 장바구니에 담은 (메뉴의 이름, 수량, 가격) > 총가격 INSERT
  const [quantity, setQuantity] = useState(1);
  const { resname } = useParams();
  const { foodid } = useParams();
  const [totalCost, setTotalCost] = useState(food.price * quantity);
  const [buttonText, setButtonText] = useState(totalCost + "원 담기");
  useEffect(() => {
    setTotalCost(food.price * quantity);
    setButtonText(totalCost + "원 담기");
    console.log(
      quantity +
        "개 의 " +
        food.price +
        " 가격의" +
        food.name +
        " 주문하여 총 가격은 " +
        totalCost +
        "원"
    );
  }, [quantity, totalCost]);
  const delFunc = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addFunc = () => {
    setQuantity(quantity + 1);
  };
  const insertMenu = () => {
    window.location.href = "/menuview";
    setButtonText("공동 장바구니에 메뉴를 추가했습니다.");
  };
  return (
    <div className="mdcontainer">
      <Nav title={title} />

      <div className="md-header">
        <p className="mdtext">{resname}</p>

        <img className="image" alt={foodid} src={food.src} />
        <div className="fnbox">
          <p>{food.name}</p>
        </div>
        <div className="fpbox">
          <p className="p">{food.price}원</p>
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
