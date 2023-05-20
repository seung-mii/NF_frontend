import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
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
function BasketViewHost() {
  const [title, setTitle] = useState("장바구니 조회");
  const [myInfo, setMyInfo] = useState({ email: "" });
  const [buttonText, setButtonText] = useState("입금 확인 모두 주문하기");
  const [res, setRes] = useState({ name: "구미가당김", id: "1" });
  const [orderInfo, setOrderInfo] = useState({});
  // const [userlist, setUserList] = [];
  const board_no = 2;
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const cancleOrder = () => {
    if (window.confirm("해당 사용자의 주문을 취소하시겠습니까?") == true) {
      //true는 확인버튼을 눌렀을 때 코드 작성
      alert("주문이 취소되었습니다.");
      //해당 사용자의 음식 공동 장바구니에서 삭제
    }
    // console.log("주문이 취소되었습니다.");
    // //해당 사용자의 음식 공동 장바구니에서 삭제
  };
  const cancleConfirmed = () => {
    if (window.confirm("해당 사용자의 입금 확인을 취소하시겠습니까?") == true) {
      //true는 확인버튼을 눌렀을 때 코드 작성
      alert("확인이 취소되었습니다.");
      //해당 사용자의 입금여부 취소
    }

    // console.log("확인이 취소되었습니다.");
    // //해당 사용자의 입금여부 취소
  };
  const order = () => {
    if (window.confirm("주문하시겠습니까?") == true) {
      alert("입금 확인된 건을 모두 주문하였습니다.");
      setButtonText("주문이 완료되었습니다.");
    }
  };
  const userlist_new = [
    {
      name: "홍길동",
      name: "알리오올리오",
      quantity: 2,
      price: 22000,
      id: "1",
      email: "12@naver.com",
      totalPrice: 22000,
      confirmed: true,
      isHost: false,
    },
    //id가 이메일로 변경되어야함.
    //total price 프론트에서 계산
    //menulist - > food_no & quantity
    //isHost 계산
    {
      name: "홍길동",
      id: "1",
      name: "명란크림 리조또",
      quantity: 1,
      price: 15000,
      email: "12@naver.com",
      totalPrice: 15000,
      confirmed: false,
      isHost: false,
    },
    {
      name: "유재석",
      id: "2",
      name: "명란크림 리조또",
      quantity: 1,
      price: 15000,
      email: "123@naver.com",
      totalPrice: 15000,
      confirmed: false,
      isHost: false,
    },
  ];
  const userlist = [
    {
      name: "홍길동",
      menulist: [{ name: "알리오올리오", quantity: 2, price: 22000 }],
      id: "1",
      email: "1@naver.com",
      totalPrice: 22000,
      confirmed: true,
      isHost: false,
    },
    //id가 이메일로 변경되어야함.
    //total price 프론트에서 계산
    //menulist - > food_no & quantity
    //isHost 계산
    {
      name: "이순신",
      menulist: [{ name: "명란크림 리조또", quantity: 1, price: 15000 }],
      id: "2",
      email: "12@naver.com",
      totalPrice: 15000,
      confirmed: false,
      isHost: false,
    },
    {
      name: "황진이",
      menulist: [
        { name: "까르보나라", quantity: 1, price: 15000 },
        { name: "우돌돌피자", quantity: 1, price: 15000 },
        { name: "명란크림 리조또", quantity: 2, price: 15000 },
      ],
      id: "3",
      email: "13@naver.com",
      totalPrice: 60000,
      confirmed: true,
      isHost: false,
    },
    {
      name: "유재석",
      menulist: [
        { name: "까르보나라", quantity: 1, price: 15000 },
        { name: "명란크림 리조또", quantity: 1, price: 15000 },
      ],
      id: "4",
      email: "14@naver.com",
      totalPrice: 30000,
      confirmed: false,
      isHost: false,
    },
    {
      name: "강호동",
      menulist: [
        { name: "까르보나라", quantity: 1, price: 15000 },
        { name: "우돌돌피자", quantity: 1, price: 15000 },
      ],
      id: "5",
      email: "hong@naver.com",
      totalPrice: 30000,
      confirmed: true,
      isHost: true,
    },
  ];
  useEffect(() => {
    var myemail = AppStorage.getItem("email");
    setMyInfo({ email: myemail });
    const fetchOrderInfo = async () => {
      try {
        const response = await call(`/api/board/get/${board_no}`, "GET", null);
        const orderTime = new Date(response.data.order_time);
        const resId = response.data.restaurant.restaurant_no;
        setOrderInfo({ resId: resId, orderTime: orderTime });
      } catch (error) {
        console.log("Error fetching order information:", error);
      }
    };

    fetchOrderInfo();
  }, [board_no]);
  useEffect(() => {
    if (orderInfo.resId) {
      console.log(orderInfo.resId);
      call(`/api/restaurant/get/${orderInfo.resId}`, "GET", null).then(
        (response) =>
          setRes({
            name: response.data.name,
          })
      );
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
          // Time has expired
          setHour(0);
          setMinute(0);
          setSecond(0);
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [orderInfo]);
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
              user.isHost ? (
                <></>
              ) : (
                // 버튼
                <div className="bvlistitem">
                  <Typography
                    variant="contained"
                    style={{
                      backgroundColor: "#7ca380",
                      color: user.confirmed ? "white" : "#00FF00",
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
                      backgroundColor: "#7ca380",
                      color: user.confirmed ? "#00FF00" : "white",
                      lineHeight: "32px",
                      width: 90,
                      padding: 2,
                      margin: 6,
                      fontWeight: "bold",
                      fontSize: "12px",
                      borderRadius: "25px",
                    }}
                    onClick={user.confirmed ? cancleConfirmed : cancleOrder}
                  >
                    {user.confirmed ? "확인 취소" : "주문 취소"}
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
                  {user.isHost && user.email === myInfo.email
                    ? user.name.charAt(0) + "**" + "(나: 방장)"
                    : user.name.charAt(0) + "**"}
                </p>
              </div>
              {user.menulist.map((menu, idx) => (
                <p className="mqp" key={menu.id}>
                  {menu.name} {menu.quantity}개
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
    <div className="bvcontainer">
      <Nav title={title} />

      <div className="bv-header">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <p className="resname">{res.name}</p>
          <p className="bvtext">
            {/* 주문 남은 시간 {hour < 10 ? "0" + hour : hour}:
            {minute < 10 ? "0" + minute : minute}:
            {second < 10 ? "0" + second : second} */}
            주문 남은 시간 : {hour.toString().padStart(2, "0")}:
            {minute.toString().padStart(2, "0")}:
            {second.toString().padStart(2, "0")}
          </p>
          <RefreshIcon
            className="bvicon"
            onClick={() => {
              window.location.reload();
            }}
          />
        </Stack>
      </div>
      <hr className="hr" />

      {userlistitems}

      <div className="bv-footer">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Button variant="contained" className="bv-btt" onClick={order}>
            <p>{buttonText}</p>
            {/* //나의 id랑 userlist의 id랑 같은걸 찾아서 나의 status 나타내기 */}
            {/* 입금전이면 장바구니 음식을 삭제할 수 있게, 입금확인이면 취소불가 */}
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default BasketViewHost;
