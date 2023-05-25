import React, { useState, useEffect } from "react";
import { signup } from "../../Service/ApiService";
import logo from "../../Images/logo2.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../../Css/Member/SignUp.css";
function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [bank, setBank] = useState("");
  const [text, setText] = useState("계정 생성");

  const handleChange = (event) => {
    setBank(event.target.value);
  };

  const [onlyNumber, setOnlyNumber] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setText("회원가입 중입니다...");
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email") + "@kumoh.ac.kr";
    const push_email = data.get("push_email");
    const password = data.get("password");
    const moneyBank = data.get("money-bank");
    const moneyAccount = data.get("money-account");
    signup({
      name: username,
      email: email,
      push_email: push_email,
      password: password,
      bank: moneyBank,
      bank_account_number: moneyAccount,
    })
      .then((response) => {
        setText("회원가입이 완료되었습니다!");
        window.location.href = "/";
      })
      .catch((error) => {
        if (error === "email already exist")
          setText("이미 존재하는 이메일 입니다.");
        else setText(error);
      });
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleBankAccountNumberChange = (e) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    e.target.value = onlyNumbers;
  };

  return (
    <>
      <img className="logo" src={logo} alt="Logo"/>
      <div className="SignUpMainTitle">회원가입</div>
      <form noValidate onSubmit={handleSubmit}>
        <div className="SignUpContainer">
          <input
            className="SignUpInput"
            placeholder="사용자 이름을 입력하세요."
            name="username"
          />
          <div className="school_email">
            <input
              className="SignUpInput"
              placeholder="학교 이메일을 입력하세요."
              name="email"
            />
            <p className="end_email">@kumoh.ac.kr</p>
          </div>
          <input
            className="SignUpInput"
            placeholder="푸쉬 이메일을 입력하세요."
            name="push_email"
          />
          <div noValidate className="LoginContainer">
            <input
              className="SignUpInput"
              placeholder="비밀번호를 입력하세요."
              type={passwordVisible ? "text" : "password"}
              name="password"
            />
            <span onClick={togglePasswordVisibility} className="LoginToggle">
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>
          <div className="SignUpAccount">
            <select
              className="SignUpSelect"
              id="bank"
              name="money-bank"
              required
            >
              <option value="">은행 선택</option>
              <option value="국민은행">국민은행</option>
              <option value="신한은행">신한은행</option>
              <option value="삼성은행">삼성은행</option>
              <option value="농협은행">농협은행</option>
              <option value="하나은행">하나은행</option>
              <option value="우체국은행">우체국은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
            </select>
            <input
              className="SignUpInputAccount"
              placeholder="계좌번호를 입력하세요."
              onChange={handleBankAccountNumberChange}
              name="money-account"
            />
          </div>
        </div>
        <button className="SignUpButton" type="submit">
          회원가입
        </button>
        <div className="login-btn">
          <a href="/" className="yes-account">
            로그인
          </a>
          <span className="material-symbols-rounded">chevron_right</span>
        </div>
      </form>
    </>
  );
}

export default SignUp;
