import { React, useState, useEffect } from "react";
import "../../Css/Member/MyPage.css";
import { call, logout, dropoutUser } from "../../Service/ApiService";
import * as AppStorage from "../../AppStorage";
function MyPage() {
  const [user, setUser] = useState({ email: "", name: "", email_auth: false });
  useEffect(() => {
    call("/api/member/getMember", "GET", null).then((response) => {
      const { email, name, email_auth } = response.data;
      setUser({ email, name, email_auth });
    });
    var myemail = AppStorage.getItem("email");
    setUser({ email: myemail });
  }, []);

  const sendEmailVerification = () => {
    call("/api/member/sendEmailAuth", "GET", null)
      .then((response) => {
        console.log("인증 메일이 전송되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.log("인증 메일 전송에 실패했습니다.");
      });
  };

  const home = () => {
    window.location.href = "/home";
  };
  const myposts = () => {
    window.location.href = "/myposts";
  };
  const update = () => {
    window.location.href = "/update";
  };
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleDropoutUser = () => {
    if (window.confirm("회원 탈퇴하시겠습니까?") == true) {
      call("/api/member/out", "GET", null)
        .then((response) => {
          console.log(response);
          AppStorage.setItem("ACCESS_TOKEN", null);
          AppStorage.setItem("email", null);
          alert("회원탈퇴 되었습니다.");
          window.location.href = "/";
          console.log("탈퇴 완료");
        })
        .catch((error) => {
          console.log(error.error);
        });
    }
  };

  return (
    <>
      <div className="myheader">
        <span class="material-symbols-rounded" onClick={() => home()}>
          chevron_left
        </span>
        <div className="mypage_name">마이페이지</div>
      </div>
      <div className="profile-container">
        <div className="imgg"></div>
        <div className="mypage-explain">
          <div className="username">{user.name}</div>

          <div>학교 인증 : {user.email}</div>
        </div>
      </div>
      <div className="button-container2">
        <ul>
          <div className="blue-container">
            <li className="mypage-title">인증</li>
            <li className="mypage-content" onClick={sendEmailVerification}>
              학교 인증
              <span className="MyPageAuthButton">
                {user.email_auth === false ? (
                  <span className="MyPageRed">인증 전</span>
                ) : (
                  <span className="MyPageGreen">인증 완료</span>
                )}
              </span>
            </li>
          </div>
          <div className="blue-container">
            <li className="mypage-title">게시물</li>
            <li className="mypage-content" onClick={() => myposts()}>
              내가 참여한 게시물
            </li>
          </div>
          <div className="blue-container">
            <li className="mypage-title">회원</li>
            <li className="mypage-content" onClick={() => update()}>
              회원정보수정
            </li>
            <li className="mypage-content" onClick={() => handleLogout()}>
              로그아웃
            </li>
            <li className="mypage-content" onClick={() => handleDropoutUser()}>
              회원탈퇴
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default MyPage;
