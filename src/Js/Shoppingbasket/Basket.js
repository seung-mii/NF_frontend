import { call } from "../../Service/ApiService";
import BasketViewHost from "./BascketViewHost";
import BasketView from "./BasketView";
import { useEffect, useState } from "react";
import * as AppStorage from "../../AppStorage";

function Basket() {
  const [user, setUser] = useState({ email: "" });
  const board_no = 1;
  const hostemail = "dmb225@kumoh.ac.kr";
  const [host, setHost] = useState({ email: "" });
  const [isHost, setIsHost] = useState(false);
  useEffect(() => {
    // call(`/api/board/get/${board_no}`, "GET", null).then((response) =>
    //   setHost({
    //     id: response.data.member.email,
    //   })
    // );
    var userEmail = AppStorage.getItem("email");
    setUser({ email: userEmail });
  }, []);

  useEffect(() => {
    if (user.email && user.email === hostemail) {
      setIsHost(true);
    }
  }, [user.email, hostemail]);

  const content = isHost ? <BasketViewHost /> : <BasketView />;
  return content;
}
export default Basket;
// localstorage에서 이메일을 가져온다 > 게시물의 방장의 이메일과 비교한다.
// 방장일경우 방장 페이지
// 방장이 아닐경우 기본 페이지
