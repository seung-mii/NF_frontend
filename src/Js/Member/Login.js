import React, { useState, useEffect } from "react";
import { signin } from "../../Service/ApiService";
import logo from "../../Images/logo2.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../../Css/Member/Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email") + "@kumoh.ac.kr";
    const password = data.get("password");

    console.log(email, password);
    signin({ email: email, password: password })
      .then((response) => {
        console.log("로그인성공");
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <img className="logo" src={logo} alt="Logo"/>
      <div className="LoginMainTitle">로그인</div>
      <form onSubmit={handleSubmit}>
        <div noValidate className="LoginContainer">
          <div className="school_email">
            <input
              className="LoginEmailInput"
              placeholder="학교 이메일을 입력하세요."
              required
              id="email"
              label="학교이메일 주소"
              name="email"
              autoComplete="email"
            />
            <p className="end_email">@kumoh.ac.kr</p>
          </div>
        </div>
        <div noValidate className="LoginContainer">
          <input
            required
            className="LoginPwInput"
            placeholder="비밀번호를 입력하세요."
            id="password"
            label="패스워드"
            name="password"
            autoComplete="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <span onClick={togglePasswordVisibility} className="LoginToggle">
            {passwordVisible ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        <button className="LoginButton" type="submit">
          로그인
        </button>
        <div className="button">
          <a href="/signup" className="no-account">
            회원가입
          </a>
          <span className="material-symbols-rounded">chevron_right</span>
        </div>
      </form>
    </>
  );
}

export default Login;
