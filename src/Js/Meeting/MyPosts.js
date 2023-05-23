import React, { useEffect, useState } from "react";
import "../../Css/Meeting/MyPosts.css";
import { call } from "../../Service/ApiService";

function MyPosts() {
  const [member, setMember] = useState({
    name: "",
  });
  const [myBoard, setMyBoard] = useState({
    board_no: "",
    title: "",
    restaurant: "",
  });
  const [list, setList] = useState([]);
  const detail = () => {
    window.location.href = "/postdetail";
  };
  const goBack = () => {
    window.location.href = "/mypage";
  };
  useEffect(() => {
    call("/api/member/getMember", "GET", null).then((response) => {
      setMember({
        name: response.data.name,
      });
    });
    call("/api/board/myBoardList", "GET", null).then((response) => {
      setMyBoard({
        board_no: response.data.board_no,
        title: response.data.title,
        restaurant: response.data.restaurant,
      });
    });
  }, []);

  return (
    <>
      <div className="MyPostsHeader">
        <span class="material-symbols-rounded" onClick={goBack}>
          chevron_left
        </span>
        <div className="mypage_name">내가 쓴 게시물</div>
      </div>
      <div className="profile-container">
        {/* <img src="" alt=""></img> */}
        <div className="img"></div>
        <div className="mypost-explain">
          <div className="MyPostsName">{member.name}</div>
        </div>
      </div>
      {list &&
        list.map((item) => {
          <div
            className="posts-container"
            id={item.board_no}
            key={item.board_no}
          >
            <div className="post">
              <div className="post-title">{item.myBoard.title}</div>
              <div className="post-place">{item.myBoard.restaurant}</div>
            </div>
          </div>;
        })}
      ;
    </>
  );
}

export default MyPosts;
