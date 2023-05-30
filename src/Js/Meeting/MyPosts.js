import React, { useEffect, useState } from "react";
import "../../Css/Meeting/MyPosts.css";
import { call } from "../../Service/ApiService";

function MyPosts() {
  const [member, setMember] = useState([]);
  const [myBoard, setMyBoard] = useState({
    board_no: "",
    title: "",
    restaurant: "",
  });
  const [list, setList] = useState([]);

  const goBack = () => {
    window.location.href = "/mypage";
  };

  const handleCancelParticipation = (board_no) => {
    call(`/api/participation/out/${board_no}`, "GET", null)
      .then((response) => {
        console.log(response.data);
        setList(list.filter((item) => item.board_no !== board_no));
        alert("참여 취소되었습니다.");
      })
      .catch((error) => {
        alert(error.error);
      });
  };

  useEffect(() => {
    call("/api/member/getMember", "GET", null).then((response) => {
      setMember(response.data);
      console.log(response.data);
    });
    call("/api/board/myParticipationBoardList", "GET", null)
      .then((response) => {
        setMyBoard(response.data);
        setList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="postheader">
        <span class="material-symbols-rounded" onClick={goBack}>
          chevron_left
        </span>
        <div className="MyPostsBigName">내가 참여한 게시물</div>
      </div>
      <div className="post_profile-container">
        <div className="img"></div>
        <div className="mypost-explain">
          <div className="MyPostsName">{member.name}</div>
        </div>
      </div>
      {list.length === 0 && (
        <div className="no-posts-alert">참여한 모임이 없습니다.</div>
      )}
      {list.length > 0 &&
        list.map((item) => (
          <div
            className="posts-container"
            id={item.board_no}
            key={item.board_no}
          >
            <div className="post">
              <div className="flex">
                <span class="material-symbols-rounded">list_alt</span>
                <div className="post-title">{item.title}</div>
              </div>
              <div className="flex">
                <span class="material-symbols-rounded">home</span>
                <div className="post-place">{item.restaurant.name}</div>
              </div>
              <div className="MyPostsButton">
                <a href={`/board/${item.board_no}`} className="MyPostsLink">
                  <button className="MyPostsCancel">이동</button>
                </a>

                <button
                  className="MyPostsCancel"
                  onClick={() => handleCancelParticipation(item.board_no)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default MyPosts;
