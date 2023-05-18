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
function BasketViewHost() {
  const [title, setTitle] = useState("장바구니 조회");
  // const myInfo = { id: "1" }; //나의 이메일
  const myInfo = { email: "hong@naver.com" }; //나의 이메일
  const [buttonText, setButtonText] = useState("입금 확인 모두 주문하기");
  const [res, setRes] = useState({ name: "구미가당김", id: "1" });
  useEffect(() => {
    //board_no에 따른 레스토랑 정보 조회
    call(`/api/restaurant/get/${res.id}`, "GET", null).then((response) =>
      setRes({
        id: response.data.id,
        name: response.data.name,
        category: response.data.category,
        delivery_tip: response.data.delivery_tip,
        min_order_price: response.data.min_order_price,
      })
    );
  }, []);
  const orderInfo = { id: "1", orderTime: new Date(2023, 4, 4, 18, 0) };
  //6시 35분이면 2 55 분에서 3시 40분이 되어야한다.
  // 18 : 35 - 14 : 55 분에서 분을 뺏을때 음수가 나오면 시간 한시간을 내리고 60분을 더해서 뺄셈을 해야함
  // 17: 95 이런식으로

  const [hour, setHour] = useState(
    orderInfo.orderTime.getHours() - new Date().getHours()
  );
  // 시간을 가져와 시간값을 뺀 시간을 정해주는 state
  const [minute, setMinute] = useState(
    orderInfo.orderTime.getMinutes() - new Date().getMinutes()
  );
  // 분을 가져와 분값을 뺀 분을 정해주는 state
  const [second, setSecond] = useState(59 - new Date().getSeconds());
  // 초를 가져와 초값을 뺀 초를 정해주는 state
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
  //나의 id와 비교하여 나이면 (나) 이표시 필요
  useEffect(() => {
    console.log(orderInfo);
    const id = setInterval(() => {
      var tempMin = orderInfo.orderTime.getMinutes() - new Date().getMinutes();
      if (tempMin < 0) {
        setHour(orderInfo.orderTime.getHours() - 1 - new Date().getHours());
        setMinute(
          orderInfo.orderTime.getMinutes() + 59 - new Date().getMinutes()
        );
        setSecond(59 - new Date().getSeconds());
      } else {
        setHour(orderInfo.orderTime.getHours() - new Date().getHours());
        setMinute(orderInfo.orderTime.getMinutes() - new Date().getMinutes());
        setSecond(59 - new Date().getSeconds());
      }
    }, 1000);
    console.log(orderInfo.orderTime.getHours() - new Date().getHours());
    console.log(hour, minute);
    // 1초마다 실행되는 인터벌을 이용해 1초마다 다시 랜더링 시켜줌
    return () => clearInterval(id);
    // 페이지를 벗어나게되면 반복을 종료해줌
  }, []);
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
                      backgroundColor: "#47647C",
                      color: user.confirmed ? "white" : "#FFFF00",
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
                      backgroundColor: "#47647C",
                      color: user.confirmed ? "#FFFF00" : "white",
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
            주문 남은 시간 {hour < 10 ? "0" + hour : hour}:
            {minute < 10 ? "0" + minute : minute}:
            {second < 10 ? "0" + second : second}
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
