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
  const [title, setTitle] = useState("장바구니 조회 (방장)");
  const [myInfo, setMyInfo] = useState({ email: "" });
  const [buttonText, setButtonText] = useState("입금 확인 모두 주문하기");
  const [res, setRes] = useState({ name: "구미가당김", id: "1" });
  const [orderInfo, setOrderInfo] = useState({});
  // const [userlist, setUserList] = [];
  const [basket, setBasket] = useState([]);
  const board_no = 1;
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const cancleOrder = () => {
    if (window.confirm("해당 사용자의 주문을 취소하시겠습니까?") == true) {
      //true는 확인버튼을 눌렀을 때 코드 작성
      call(`/api/basket/delete/{basket_no}`, "DELETE", null).then((response) =>
        console.log(response)
      );
      alert("주문이 취소되었습니다.");
      //해당 사용자의 음식 공동 장바구니에서 삭제
    }
    // console.log("주문이 취소되었습니다.");
    // //해당 사용자의 음식 공동 장바구니에서 삭제
  };
  const cancleConfirmed = () => {
    var baskets = basket
      .filter((basket) => basket.memberEmail === myInfo.email)
      .map((basket) => basket.basketNo);
    if (window.confirm("해당 사용자의 입금 확인을 취소하시겠습니까?") == true) {
      baskets.forEach((basketNo) => {
        var modifyBasket = { basketNo: basketNo, confirmed: false };
        call("/api/basket/modify", "PUT", modifyBasket)
          .then((response) => {
            console.log(response);
            alert("확인이 취소되었습니다.");
            // 삭제 요청에 대한 응답을 처리하는 로직을 추가하세요.
          })
          .catch((error) => {
            console.error(error);
            // 에러 처리 로직을 추가하세요.
          });
      });
    }

    //     alert("확인이 취소되었습니다.");
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
        const response = await call(`/api/board/get/${board_no}`, "GET", null);
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
  useEffect(() => {
    call(`/api/basket/byBoardId/${board_no}`, "GET", null).then((response) =>
      setBasket(response.data)
    );
  }, []);

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
        });
      }
      existingGroup.totalPrice += item.menuPrice * item.quantity;
    } else {
      acc.push({
        memberEmail: item.memberEmail,
        memberName: item.memberName,
        menulist: [
          {
            menuName: item.menuName,
            quantity: item.quantity,
          },
        ],
        confirmed: item.confirmed,
        totalPrice: item.menuPrice * item.quantity,
      });
    }
    return acc;
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
                  {user.confirmed && (
                    <Typography
                      variant="contained"
                      style={{
                        backgroundColor: "#7ca380",
                        color: "#00FF00",
                        lineHeight: "32px",
                        width: 90,
                        padding: 2,
                        margin: 6,
                        fontWeight: "bold",
                        fontSize: "12px",
                        borderRadius: "25px",
                      }}
                      onClick={cancleConfirmed}
                    >
                      확인 취소
                    </Typography>
                  )}
                </div>
              )
            }
          >
            {/* user정보 */}
            <div className="userinfo">
              <div className="top">
                <AccountCircleIcon className="bvicon" />
                <p className="p">
                  {user.email === orderInfo.hostEmail
                    ? user.memberName.charAt(0) + "**" + "(방장:나)"
                    : user.memberName.charAt(0) + "**"}
                </p>
              </div>
              {user.menulist.map((menu, idx) => (
                <>
                  <p className="mqp" key={menu.id}>
                    {menu.menuName} {menu.quantity}개
                  </p>
                  {/* <p className="pp">총 가격: {menu.menuPrice}원</p> */}
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
