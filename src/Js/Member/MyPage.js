import React from "react";
import "../../Css/Member/MyPage.css";

function MyPage() {
  const logout = () => {
    window.location.href = "/";
  };

  const myposts = () => {
    window.location.href = "/myposts";
  };

  return (
    <>
      <div className="header">
        <span class="material-symbols-rounded">chevron_left</span>
        <div className="name">마이페이지</div>
      </div>
      <div className="profile-container">
        {/* <img src="" alt=""></img> */}
        <div className="img"></div>
        <div className="mypage-explain">
          <div className="username">Username</div>
          <div>매너점수 : 70점</div>
          <div>학교 인증 : hehe@kumoh.ac.kr</div>
        </div>
      </div>
      <div className="button-container2">
        <ul>
          <div className="blue-container">
            <li className="mypage-title">계정</li>
            <li className="mypage-content">학교인증</li>
          </div>
          <div className="blue-container">
            <li className="mypage-title">게시물</li>
            <li className="mypage-content" onClick={() => myposts()}>
              내가 쓴 게시물
            </li>
          </div>
          <div className="blue-container">
            <li className="mypage-title">회원</li>
            <li className="mypage-content">회원정보</li>
            <li className="mypage-content">로그아웃</li>
            <li className="mypage-content">회원탈퇴</li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default MyPage;
