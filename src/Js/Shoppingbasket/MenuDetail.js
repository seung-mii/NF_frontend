import React, { useEffect, useState } from "react";
import "../../Css/Shoppingbasket/Nav.css";
import Stack from "@mui/material/Stack";
// import noodle from "../../Images/김치말이국수.webp";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import "../../Css/Shoppingbasket/MenuDetail.css";
import { call, callIMG } from "../../Service/ApiService";
import * as AppStorage from "../../AppStorage";
function MenuDetail() {
  const [title, setTitle] = useState("메뉴 조회");
  const [quantity, setQuantity] = useState(1);
  const { resname } = useParams();
  const { foodid } = useParams();
  const [menu, setMenu] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [buttonText, setButtonText] = useState(totalCost + "원 담기");
  const { boardNo } = useParams();
  const [image, setImage] = useState();
  //member의 해당 board의 confirmed 여부를 확인하고 confirmed이 true일 경우 버튼을 비활성화한다.

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
    call(`/api/menu/${foodid}`, "GET", null)
      .then((response) =>
        setMenu({
          menu_no: response.data.menu_no,
          name: response.data.name,
          price: response.data.price,
        })
      )
      .catch((error) => {
        alert(error.error);
      });
  }, []);
  useEffect(() => {
    callIMG(`/api/menu/image/${menu.menu_no}`, "GET", null)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImage({
          image: imageUrl,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [menu.menu_no]);

  const ImageComponent = () => {
    if (!image) {
      return <div>Loading image...</div>;
    }
    console.log(image.image);
    return (
      <img
        src={image.image}
        alt={`Restaurant ${menu.menu_no}`}
        className="image"
      />
    );
  };
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
          window.location.href = `/menuview/${boardNo}`;
        }
      })
      .catch((error) => {
        if (
          error.error === "입금확인된 사용자는 장바구니를 추가할 수 없습니다"
        ) {
          setButtonText("이미 입금이 확인되어 메뉴를 담을 수 없습니다");
          // alert(error.error);
        }
      });
  };
  return (
    <>
      <div className="navbar">
        <span
          class="material-symbols-rounded"
          onClick={() => (window.location.href = `/menuview/${boardNo}`)}
          style={{
            float: "left",
            fontWeight: "900",
            color: "#7CA380",
          }}
        >
          chevron_left
        </span>

        <h4 style={{ marginRight: "45px" }}>{title}</h4>
      </div>
      <div className="mdcontainer">
        <div className="md-header">
          <p className="mdtext">「 {resname} 」</p>

          {/* <img className="image" alt={menu.menu_no} src={menu.src} /> */}
          <ImageComponent />
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
            <button
              variant="contained"
              className="detail_btt"
              onClick={insertMenu}
            >
              {buttonText}
            </button>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default MenuDetail;
