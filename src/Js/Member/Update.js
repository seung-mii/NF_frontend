import React, { useState, useEffect } from "react";
import "../../Css/Member/Update.css";
import { call } from "../../Service/ApiService";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Update() {
  // 회원정보수정 - post
  const [update, setUpdate] = useState({
    name: "",
    email: "",
    cur_password: "",
    new_password: "",
    bank: "",
    bank_account_number: "",
  });
  // 회원정보 가져오기 - get
  const [Member, setMember] = useState({
    name: "",
    email: "",
    bank: "",
    bank_account_number: "",
  });
  const goBack = () => {
    window.location.href = "/mypage";
  };
  // password type 변경용
  const [curPasswordType, setCurPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const handleCurPasswordType = (e) => {
    setCurPasswordType(() => {
      if (!curPasswordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  const [newPasswordType, setNewPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const handleNewPasswordType = (e) => {
    setNewPasswordType(() => {
      if (!newPasswordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const updateSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const name = data.get("name");
    const email = data.get("email");
    const cur_password = data.get("cur_password");
    const new_password = data.get("new_password");
    const bank = data.get("bank");
    const bank_account_number = data.get("bank_account_number");
    console.log(
      name,
      email,
      bank,
      bank_account_number,
      cur_password,
      new_password
    );

    var MemberModifyDTO = {
      name: name,
      push_email: email,
      cur_password: cur_password,
      new_password: new_password,
      bank: bank,
      bank_account_number: bank_account_number,
    };
    console.log(MemberModifyDTO);

    // 회원정보 수정 요청
    call("/api/member/modify", "POST", MemberModifyDTO)
      .then((response) => {
        console.log(response);
        setUpdate({
          cur_password: response.data.cur_password,
          new_password: response.data.new_password,
          name: response.data.name,
          push_email: response.data.push_email,
          bank: response.data.bank,
          bank_account_number: response.data.bank_account_number,
        });
        setMember((prevState) => ({
          ...prevState,
          email: response.data.email,
          bank: response.data.bank,
        }));
      })

      .then((response) => {
        console.log(response);
        alert("회원정보 수정이 완료되었습니다!");
        window.location.href = "/mypage";
      })
      .catch((error) => {});
  };

  useEffect(() => {
    call("/api/member/getMember", "GET", null)
      .then((response) => {
        setMember({
          name: response.data.name,
          push_email: response.data.push_email,
          bank: response.data.bank,
          bank_account_number: response.data.bank_account_number,
        });
      })
      .then(console.log(Member));
  }, [Member]);

  const handleBankAccountNumberChange = (e) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setUpdate((prevState) => ({
      ...prevState,
      bank_account_number: onlyNumbers,
    }));
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const {
      name,
      email,
      cur_password,
      new_password,
      bank,
      bank_account_number,
    } = update;
    console.log(update);
    setIsFormValid(
      name.trim() !== "" ||
        email.trim() !== "" ||
        cur_password.trim() !== "" ||
        new_password.trim() !== "" ||
        bank.trim() !== "" ||
        bank_account_number.trim() !== ""
    );
  }, [update]);

  return (
    <>
      <div className="uheader">
        <span class="material-symbols-rounded" onClick={goBack}>
          chevron_left
        </span>
        <div className="update_name">회원정보수정</div>
      </div>
      <hr />
      <div className="UpdateOriginal">
        <div className="UpdateImg"></div>
      </div>
      <div className="UpdateOriginalName">{Member.name}</div>
      <form noValidate onSubmit={updateSubmit}>
        <div className="UpdateInformationContainer">
          <div className="flex">
            <div className="UpdateName">사용자 이름</div>
            <input
              type="text"
              className="UpdateInput"
              name="name"
              defaultValue={Member.name}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="flex">
            <div className="UpdateName">이메일</div>
            <input
              type="text"
              className="UpdateInput"
              name="email"
              defaultValue={Member.push_email}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="flex">
            <div className="UpdateName">기존 비밀번호</div>
            <input
              type={curPasswordType.type}
              placeholder="기존 비밀번호를 입력하세요."
              name="cur_password"
              className="UpdateInput pw"
              onChange={handleInputChange}
              required
            />
            <span onClick={handleCurPasswordType} className="UpdateToggle" style={{ position: "absolute", top: "3px", right: "30px"}}>
              {curPasswordType.visible ? (
                <Visibility /> 
              ) : (
                <VisibilityOff />
              )}
            </span>
          </div>
          <div className="flex">
            <div className="UpdateName">변경 비밀번호</div>
            <input
              type={newPasswordType.type}
              placeholder="변경 비밀번호를 입력하세요."
              name="new_password"
              className="UpdateInput pw"
              onChange={handleInputChange}
              required
            />
            <span onClick={handleNewPasswordType} className="UpdateToggle" style={{ position: "absolute", top: "3px", right: "30px"}}>
              {newPasswordType.visible ? (
                <Visibility /> 
              ) : (
                <VisibilityOff />
              )}
            </span>
          </div>
          <div className="flex">
            <div className="UpdateName">계좌번호</div>
            <select
              className="UpdateSelect"
              id="bank"
              name="bank"
              onChange={handleInputChange}
              required
            >
              <option value={Member.bank} defaultValue={Member.bank}>
                {Member.bank}
              </option>
              <option value="국민은행">국민은행</option>
              <option value="신한은행">신한은행</option>
              <option value="삼성은행">삼성은행</option>
              <option value="농협은행">농협은행</option>
              <option value="하나은행">하나은행</option>
              <option value="우체국은행">우체국은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
            </select>
            <input
              type="text"
              className="UpdateInput"
              id="UpdateBankInput"
              name="bank_account_number"
              defaultValue={Member.bank_account_number}
              onKeyPress={(e) => {
                const keyCode = e.keyCode || e.which;
                const keyValue = String.fromCharCode(keyCode);
                const regex = /[0-9]/;
                if (!regex.test(keyValue)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                handleBankAccountNumberChange(e);
                handleInputChange(e);
              }}
              required
            ></input>
          </div>
          <div className="UpdateEdit">
            <button
              type="submit"
              className="UpdateEditButton"
              disabled={!isFormValid}
            >
              회원정보 수정하기
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Update;
