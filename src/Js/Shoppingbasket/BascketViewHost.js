import React, { useEffect, useState } from "react";
import "../../Css/Shoppingbasket/Nav.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../Css/Shoppingbasket/BasketView.css";
import { call } from "../../Service/ApiService";
import * as AppStorage from "../../AppStorage";
//확인취소, 주문취소, 모두 주문
function BasketViewHost(props) {
  const [title, setTitle] = useState("장바구니 조회 (방장)");
  const [error, setError] = useState("");
  const [myInfo, setMyInfo] = useState({ email: "" });
  const [buttonText, setButtonText] = useState("입금 확인 모두 주문하기");
  const [res, setRes] = useState({ name: "", id: "" });
  const [orderInfo, setOrderInfo] = useState({});
  const [basket, setBasket] = useState([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const boardNo = props.boardNo;

  const cancleConfirmed = (list) => {
    var baskets = list;
    console.log(baskets);

    if (
      window.confirm("해당 사용자의 입금 확인여부를 변경 하시겠습니까?") == true
    ) {
      baskets.forEach((item) => {
        console.log(item);
        call(`/api/basket/completePayment/${item}`, "PUT", null)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  };
  const order = () => {
    if (window.confirm("주문하시겠습니까?") == true) {
      alert("입금 확인된 건을 모두 주문하였습니다.");
      setButtonText("주문이 완료되었습니다.");
    }
  };

  useEffect(() => {
    var myemail = AppStorage.getItem("email");
    setMyInfo({ email: myemail });
    const fetchOrderInfo = async () => {
      try {
        const response = await call(`/api/board/get/${boardNo}`, "GET", null);
        const orderTime = new Date(response.data.order_time);
        const resId = response.data.restaurant.restaurant_no;
        const hostEmail = response.data.member.email;
        setOrderInfo({
          resId: resId,
          orderTime: orderTime,
          hostEmail: hostEmail,
        });
      } catch (error) {
        console.log("Error fetching order information:", error);
      }
    };

    fetchOrderInfo();
  }, [boardNo]);
  useEffect(() => {
    if (orderInfo.resId) {
      console.log(orderInfo.resId);
      call(`/api/restaurant/get/${orderInfo.resId}`, "GET", null)
        .then((response) =>
          setRes({
            name: response.data.name,
          })
        )
        .catch((error) => {
          // alert(error.error);
        });
    }
  }, [orderInfo.resId]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (orderInfo.orderTime) {
        const now = new Date();
        const timeDiff = orderInfo.orderTime - now;

        if (timeDiff > 0) {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDiff / 1000) % 60);

          setHour(hours);
          setMinute(minutes);
          setSecond(seconds);
        } else {
          setHour(0);
          setMinute(0);
          setSecond(0);
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [orderInfo]);
  useEffect(() => {
    call(`/api/basket/byBoardId/${boardNo}`, "GET", null)
      .then((response) => setBasket(response.data))
      .catch((error) => {
        // alert(error.error);
        setError("장바구니 정보가 없습니다");
      });
  }, [basket]);

  const userlist = basket.reduce((acc, item) => {
    const existingGroup = acc.find(
      (group) => group.memberEmail === item.memberEmail
    );
    if (existingGroup) {
      const existingMenu = existingGroup.menulist.find(
        (menu) => menu.menuName === item.menuName
      );
      if (existingMenu) {
        existingMenu.quantity += item.quantity;
      } else {
        existingGroup.menulist.push({
          menuName: item.menuName,
          quantity: item.quantity,

          basketNo: item.basketNo,
          menuPrice: item.menuPrice,
        });
      }
      existingGroup.totalPrice += item.menuPrice * item.quantity;
      existingGroup.basketlist.push(item.basketNo);
    } else {
      acc.push({
        memberEmail: item.memberEmail,
        memberName: item.memberName,
        menulist: [
          {
            menuName: item.menuName,
            quantity: item.quantity,

            basketNo: item.basketNo,
            menuPrice: item.menuPrice,
          },
        ],
        confirmed: item.confirmed,
        basketlist: [item.basketNo],
        totalPrice: item.menuPrice * item.quantity,
      });
    }
    return acc;
  }, []);
  // console.log(userlist);
  var userlistitems = userlist.length > 0 && (
    // 전체
    <List className="bvlist">
      {userlist.map((user, idx) => (
        <>
          {/* 아이템 */}
          <ListItem
            id={user.id}
            key={user.id}
            alignItems="flex-start"
            secondaryAction={
              user.memberEmail === orderInfo.hostEmail ? (
                <></>
              ) : (
                // 버튼
                <div className="bvlistitem">
                  <Typography
                    variant="contained"
                    style={{
                      backgroundColor: "#7CA380",
                      color: user.confirmed ? "white" : "red",
                      fontSize: "12px",
                      width: 90,
                      lineHeight: "32px",
                      padding: 2,
                      margin: 6,
                      fontWeight: "bold",
                      borderRadius: "25px",
                    }}
                  >
                    {user.confirmed ? "입금 확인" : "입금 전"}
                  </Typography>

                  <Typography
                    variant="contained"
                    style={{
                      backgroundColor: "#7CA380",
                      color: user.confirmed ? "red" : "white",
                      lineHeight: "32px",
                      width: 90,
                      padding: 2,
                      margin: 6,
                      fontWeight: "bold",
                      fontSize: "12px",
                      borderRadius: "25px",
                    }}
                    onClick={() => cancleConfirmed(user.basketlist)}
                  >
                    {user.confirmed ? "확인 취소" : "입금 확인"}
                  </Typography>
                </div>
              )
            }
          >
            {/* user정보 */}
            <div className="userinfo">
              <div className="top">
                <AccountCircleIcon className="bvicon" />
                <p className="p">
                  {user.memberEmail === orderInfo.hostEmail
                    ? user.memberName + " (방장:나)"
                    : user.memberName}
                </p>
              </div>
              {user.menulist.map((menu, idx) => (
                <>
                  <p className="mqp" key={menu.id}>
                    {menu.menuName} {menu.quantity}개
                  </p>
                </>
              ))}

              <p className="pp">총 가격: {user.totalPrice}원</p>
            </div>
          </ListItem>
        </>
      ))}
    </List>
  );
  return (
    <div className="host">
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

        <h4>{title}</h4>
      </div>
      <div className="bvcontainer">
        <div className="bv-header">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <p className="resname">「 {res.name} 」</p>
            <p className="bvtext">
              주문 남은 시간 : {hour.toString().padStart(2, "0")}:
              {minute.toString().padStart(2, "0")}:
              {second.toString().padStart(2, "0")}
            </p>
            <RefreshIcon
              className="bvicon"
              onClick={() => {
                window.location.reload();
              }}
              style={{ color: "#7CA380", fontSize: "17px", marginLeft: "-5px"}}
            />
          </Stack>
        </div>
        <div className="bvdiv">
          <p>{error}</p>
        </div>
        {userlistitems}

        <div className="bv-footer">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <button variant="contained" className="bv-btt" onClick={order}>
              <p>{buttonText}</p>
            </button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default BasketViewHost;
