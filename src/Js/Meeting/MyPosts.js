import React from "react";
import "../../Css/Meeting/MyPosts.css";

function MyPosts() {
  const detail = () => {
    window.location.href = "/postdetail";
  };

  return (
    <>
      <div className="header">
        {/* <div className="back-button"><Link to="/">⇦</Link></div> */}
        <div className="name">내가 쓴 게시물</div>
      </div>
      <div className="profile-container">
        {/* <img src="" alt=""></img> */}
        <div className="img"></div>
        <div className="mypost-explain">
          <div>Username</div>
        </div>
      </div>
      <div className="posts-container">
        <div className="post" onClick={() => detail()}>
          <div className="post-title">학생회관으로 떡볶이 같이 시키실 분</div>
          <div className="post-place">🏠 배떡 옥계점</div>
          <button className="btn">선택</button>
        </div>
        <div className="underline"></div>
        <div className="post">
          <div className="post-title">학생회관으로 찜닭 같이 시키실 분</div>
          <div className="post-place">🏠 동궁찜닭 옥계점</div>
        </div>
        <div className="underline"></div>
        <div className="post">
          <div className="post-title">디지로 떡볶이 같이 시키실 분</div>
          <div className="post-place">🏠 엽떡 옥계점</div>
        </div>
        <div className="underline"></div>
        <div className="post">
          <div className="post-title">디관 초밥</div>
          <div className="post-place">🏠 초심 옥계점</div>
        </div>
        <div className="underline"></div>
        <div className="post">
          <div className="post-title">학생회관으로 떡볶이 같이 시키자요</div>
          <div className="post-place">🏠 배떡 옥계점</div>
        </div>
      </div>
    </>
  );
}

export default MyPosts;
