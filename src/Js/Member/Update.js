import React, { useState, useEffect } from "react";
import "../../Css/Member/Update.css";
import { call } from "../../Service/ApiService";

function Update() {
  const [update, setUpdate] = useState({
    name: "",
    push_email: "",
    password1: "",
    bank: "",
    bank_account_number: "",
  });
  const [Member, setMember] = useState({
    name: "",
    push_email: "",
    bank: "",
    bank_account_number: "",
  });

  const updateSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const username = data.get("username");
    const email = data.get("email");
    const password1 = data.get("password1");
    const password2 = data.get("password2");
    const moneyBank = data.get("money-bank");
    const moneyAccount = data.get("money-account");
    console.log(password1, password2);
    var MemberModifyDTO = {
      name: username,
      push_email: email,
      cur_password: password1,
      new_password: password2,
      bank: moneyBank,
      bank_account_number: moneyAccount,
    };
    console.log(MemberModifyDTO);
    call("/api/member/modify", "POST", MemberModifyDTO)
      .then((response) => {
        console.log(response);
        setUpdate({
          password1: response.data.password1,
          password2: response.data.password2,
          name: response.data.name,
          push_email: response.data.push_email,
          bank: response.data.push_email,
          bank_account_number: response.data.bank_account_number,
        });
      })
      .then((response) => {
        alert("회원정보 수정이 완료되었습니다!");
        window.location.href = "/mypage";
      })
      .catch((error) => {});
  };

  useEffect(() => {
    call("/api/member/getMember", "GET", null).then((response) => {
      setMember({
        name: response.data.name,
        push_email: response.data.push_email,
        bank: response.data.bank,
        bank_account_number: response.data.bank_account_number,
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <span class="material-symbols-rounded">chevron_left</span>

        <div className="name">회원정보수정</div>
      </div>
      <div className="UpdateOriginal">
        <div className="UpdateImg"></div>
      </div>
      <div className="UpdateOriginalName">{Member.name}</div>
      <form noValidate onSubmit={updateSubmit}>
        <div className="UpdateInformationContainer">
          <div className="UpdateInformation">회원 정보</div>
          <div className="UpdateName">사용자 이름</div>
          <input
            type="text"
            className="UpdateInput"
            name="username"
            placeholder={Member.name}
          ></input>
          <div className="UpdateName">이메일</div>
          <input
            type="text"
            className="UpdateInput"
            name="email"
            placeholder={Member.push_email}
          ></input>
          <div className="UpdateName">비밀번호 변경</div>
          <input
            type="text"
            placeholder="기존 비밀번호"
            name="password1"
            className="UpdateInput pw"
          />
          <input
            type="text"
            placeholder="변경 비밀번호"
            name="password2"
            className="UpdateInput pw"
          />
          <div className="UpdateName">계좌번호</div>
          <select name="UpdateSelect" id="money-bank">
            <option value="code000">{Member.bank}</option>
            <option value="code001">국민은행</option>
            <option value="code002">신한은행</option>
            <option value="code003">삼성은행</option>
            <option value="code004">농협은행</option>
            <option value="code005">하나은행</option>
            <option value="code006">우체국은행</option>
            <option value="code007">카카오뱅크</option>
          </select>
          <input
            type="text"
            className="UpdateInput"
            name="bank_account_number"
            placeholder={Member.bank_account_number}
          ></input>
          <div className="UpdateEdit">
            <button type="submit" className="UpdateEditButton">
              회원정보 수정하기
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Update;
