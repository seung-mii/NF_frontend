import { call } from "../../Service/ApiService";
import BasketViewHost from "./BascketViewHost";
import BasketView from "./BasketView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as AppStorage from "../../AppStorage";
function Basket() {
  const [user, setUser] = useState({ email: "" });
  const board_no = 1;
  const [host, setHost] = useState({ email: "" });
  const [isHost, setIsHost] = useState(false);
  const { boardNo } = useParams();
  useEffect(() => {
    call(`/api/board/get/${boardNo}`, "GET", null).then((response) =>
      setHost({
        email: response.data.member.email,
      })
    );
    var userEmail = AppStorage.getItem("email");
    setUser({ email: userEmail });
  }, []);

  useEffect(() => {
    if (user.email && user.email === host.email) {
      setIsHost(true);
    }
  }, [user.email, host.email]);

  const content = isHost ? (
    <BasketViewHost boardNo={boardNo} />
  ) : (
    <BasketView boardNo={boardNo} />
  );
  return content;
}
export default Basket;
// localstorage에서 이메일을 가져온다 > 게시물의 방장의 이메일과 비교한다.
// 방장일경우 방장 페이지
// 방장이 아닐경우 기본 페이지
