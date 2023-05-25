import React, { useEffect, useState } from "react";
import "../../Css/Shoppingbasket/Nav.css";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../Css/Shoppingbasket/BasketView.css";
import { call } from "../../Service/ApiService";
import * as AppStorage from "../../AppStorage";
function BasketView(props) {
  const [title, setTitle] = useState("장바구니 조회 (일반)");
  const [error, setError] = useState("");
  const [myInfo, setMyInfo] = useState({ email: "" });
  const [res, setRes] = useState({ name: "", id: "" });
  const [orderInfo, setOrderInfo] = useState({});
  const [basket, setBasket] = useState([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const boardNo = props.boardNo;
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
        setError("장바구니 정보가 없습니다");
      });
  }, [basket]);
  // 모든 basket의 confirmed 여부가 통일되도록 변경되었다 > 코드 변경 필요
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

        existingMenu.confirmed = item.confirmed;
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
  const cancleOrder = () => {
    if (window.confirm("주문을 취소하시겠습니까?") == true) {
      call(
        `/api/basket/deleteMyBasketList/byBoradNo/${boardNo}`,
        "DELETE",
        null
      )
        .then((response) => {
          console.log(response);
          alert("주문이 취소되었습니다.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  var userlistitems = userlist.length > 0 && (
    <List className="bvlist">
      {userlist.map((user, idx) => (
        <>
          <ListItem
            id={user.id}
            key={user.id}
            alignItems="flex-start"
            secondaryAction={
              user.memberEmail === orderInfo.hostEmail ? (
                <></>
              ) : (
                <div className="bvlistitem">
                  <Typography
                    variant="contained"
                    style={{
                      backgroundColor: "#7CA380",
                      color: user.confirmed ? "#ff99cc" : "white",
                      lineHeight: "32px",
                      width: 90,
                      padding: 2,
                      margin: 6,
                      fontWeight: "bold",
                      fontSize: "12px",
                      borderRadius: "25px",
                    }}
                  >
                    {user.confirmed ? "입금 확인" : "입금 전"}
                  </Typography>
                  {!user.confirmed && user.memberEmail === myInfo.email && (
                    <Typography
                      variant="contained"
                      style={{
                        backgroundColor: "#7CA380",
                        color: "#ff99cc",
                        lineHeight: "32px",
                        width: 90,
                        padding: 2,
                        margin: 6,
                        fontWeight: "bold",
                        fontSize: "12px",
                        borderRadius: "25px",
                      }}
                      onClick={cancleOrder}
                    >
                      주문 취소
                    </Typography>
                  )}
                </div>
              )
            }
          >
            <div className="userinfo">
              <div className="top">
                <AccountCircleIcon className="bvicon" />
                <p className="p">
                  {user.memberEmail === orderInfo.hostEmail
                    ? user.memberName + " (방장)"
                    : user.memberEmail == myInfo.email
                    ? user.memberName + " (나)"
                    : user.memberName}
                </p>
              </div>
              {user.menulist.map((menu, idx) => (
                <p className="mqp" key={menu.id}>
                  {menu.menuName} {menu.quantity}개
                </p>
              ))}

              <p className="pp">총 가격: {user.totalPrice}원</p>
            </div>
          </ListItem>
        </>
      ))}
    </List>
  );
  return (
    <>
      <div className="navbar">
        <span
          class="material-symbols-rounded"
          onClick={() => (window.location.href = `/menuview/${boardNo}`)}
          style={{
            float: "left",
            marginLeft: "20px",
            fontWeight: "900",
            color: "#7CA380",
          }}
        >
          chevron_left
        </span>

        <h4 style={{ marginRight: "45px" }}>{title}</h4>
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
              주문 남은 시간 {hour.toString().padStart(2, "0")}:
              {minute.toString().padStart(2, "0")}:
              {second.toString().padStart(2, "0")}
            </p>
            <RefreshIcon
              className="bvicon"
              style={{ color: "#7CA380", fontSize: "17px", marginLeft: "-5px"}}
              onClick={() => {
                window.location.reload();
              }}
            />
          </Stack>
        </div>
        <hr className="hr" />
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
            {/* //나의 id랑 userlist의 id랑 같은걸 찾아서 나의 status 나타내기 */}
            {/* 입금전이면 장바구니 음식을 삭제할 수 있게, 입금확인이면 취소불가 */}
          </Stack>
        </div>
      </div>
    </>
  );
}

export default BasketView;
