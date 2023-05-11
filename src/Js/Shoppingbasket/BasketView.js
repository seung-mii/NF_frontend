import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import "../../Css/Shoppingbasket/BasketView.css";
function BasketView() {
  const [title, setTitle] = useState("장바구니 조회");
  const myInfo = { id: "2" };
  const res = { name: "구미가당김", id: "1" };
  const orderInfo = { id: "1", orderTime: new Date(2023, 4, 6, 20, 10) };
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

  const userlist = [
    {
      name: "홍길동",
      menulist: [{ name: "알리오올리오", quantity: 2, price: 22000 }],
      id: "1",
      totalPrice: 22000,
      confirmed: true,
      isHost: true,
    },

    {
      name: "이순신",
      menulist: [{ name: "명란크림 리조또", quantity: 1, price: 15000 }],
      id: "2",
      totalPrice: 15000,
      confirmed: false,
      isHost: false,
    },
    {
      name: "황진이",
      menulist: [
        { name: "까르보나라", quantity: 1, price: 15000 },
        { name: "우돌돌피자", quantity: 1, price: 15000 },
      ],
      id: "3",
      totalPrice: 30000,
      confirmed: true,
      isHost: false,
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
    <List className="bvlist">
      {userlist.map((user, idx) => (
        <>
          <ListItem
            id={user.id}
            key={user.id}
            alignItems="flex-start"
            secondaryAction={
              user.isHost ? (
                <></>
              ) : (
                <div className="bvlistitem">
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
                  >
                    {user.confirmed ? "입금 확인" : "입금 전"}
                  </Typography>
                </div>
              )
            }
          >
            {/* <AccountCircleIcon className="bvicon" /> */}
            <div className="userinfo">
              {/* <Typography>
                {user.isHost
                  ? user.name.charAt(0) + "**" + "(방장)"
                  : user.id == myInfo.id
                  ? user.name.charAt(0) + "**" + "(나)"
                  : user.name.charAt(0) + "**"}
              </Typography> */}
              <div className="top">
                <AccountCircleIcon
                  className="bvicon"
                  // style={{ fontSize: "50px" }}
                />
                <p
                  className="p"
                  // style={{
                  //   fontSize: "15px",
                  //   fontWeight: "700",
                  //   marginLeft: "6px",
                  // }}
                >
                  {user.isHost
                    ? user.name.charAt(0) + "**" + "(방장)"
                    : user.id == myInfo.id
                    ? user.name.charAt(0) + "**" + "(나)"
                    : user.name.charAt(0) + "**"}
                </p>
              </div>
              {user.menulist.map((menu, idx) => (
                <p className="mqp">
                  {menu.name} {menu.quantity}개
                </p>
              ))}

              <p className="pp">총 가격: {user.totalPrice}원</p>
            </div>
          </ListItem>
          {/* <Divider className="divider" variant="middle" /> */}
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

      {/* <hr /> */}
      <div className="bv-footer">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          {/* <Button
            variant="contained"
            style={{ backgroundColor: "#47647C", width: "85%" }}
          >
            <p style={{ fontWeight: "bold" }}>입금완료(취소불가)</p> */}
          {/* //나의 id랑 userlist의 id랑 같은걸 찾아서 나의 status 나타내기 */}
          {/* 입금전이면 장바구니 음식을 삭제할 수 있게, 입금확인이면 취소불가 */}
          {/* </Button> */}
        </Stack>
      </div>
    </div>
  );
}

export default BasketView;
