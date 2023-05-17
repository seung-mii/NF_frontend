import { call } from "../../Service/ApiService";
import BasketViewHost from "./BascketViewHost";
import BasketView from "./BasketView";
import { useEffect, useState } from "react";
function Basket() {
  const [user, setUser] = useState({ email: "", name: "" });
  const hostemail = "dmb225@kumoh.ac.kr";
  const [isHost, setIsHost] = useState(false);
  useEffect(() => {
    // call("/api/member/getMember", "GET", null).then((response) =>
    //   setUser({ email: response.data.email, name: response.data.name })
    // );
    var userEmail = localStorage.getItem("email");
    setUser({ email: userEmail });
    if (user.email === hostemail) setIsHost(true);
  }, [user.email, hostemail]);
  const content = isHost ? <BasketViewHost /> : <BasketView />;
  return content;
}
export default Basket;
// localstorage에서 이메일을 가져온다 > 게시물의 방장의 이메일과 비교한다.
// 방장일경우 방장 페이지
// 방장이 아닐경우 기본 페이지
