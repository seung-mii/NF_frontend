import React, { useState, useEffect } from "react";
import { TextField, Grid, Container } from "@material-ui/core";
import { signup } from "../../Service/ApiService";
import "../../Css/Member/SignUp.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import M from "../../native";
function SignUp() {
  const [bank, setBank] = useState("");
  const [text, setText] = useState("계정 생성");
  const handleChange = (event) => {
    setBank(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setText("회원가입 중입니다...");
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email") + "@kumoh.ac.kr";
    const password = data.get("password");
    const moneyBank = data.get("money-bank");
    const moneyAccount = data.get("money-account");
    // console.log(moneyAccount);
    signup({
      name: username,
      email: email,
      password: password,
      bank: moneyBank,
      bank_account_number: moneyAccount,
    })
      .then((response) => {
        // M.sys.mail({
        //   to: [email],
        //   subject: "Neighborfood 인증 메일 (모피어스)",
        //   content: "내용",
        // });
        setText("회원가입이 완료되었습니다!");
        window.location.href = "/";
      })
      .catch((error) => {
        if (error === "email already exist")
          setText("이미 존재하는 이메일 입니다.");
        else setText(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="signup-main-title">회원가입</div>
          </Grid>
          <Grid item xs={10}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="사용자 이름"
              autoFocus
              style={{ marginLeft: "30px" }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              autoFocus
              style={{ marginLeft: "30px" }}
              defaultValue=""
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <input
                      type="text"
                      style={{
                        border: "none",
                        outline: "none",
                        marginRight: "5px",
                        background: "transparent",
                      }}
                      readOnly
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">@kumoh.ac.kr</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              autoComplete="current-password"
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="패스워드"
              autoFocus
              style={{ marginLeft: "30px" }}
            />
          </Grid>
          <Grid item xs={10}>
            <InputLabel style={{ marginLeft: "30px" }}>은행</InputLabel>
            <Select
              autoComplete="money-bank"
              name="money-bank"
              variant="outlined"
              required
              fullWidth
              id="money-bank"
              label="은행"
              autoFocus
              style={{ marginLeft: "30px" }}
              value={bank}
              onChange={handleChange}
            >
              <MenuItem value="국민은행">국민은행</MenuItem>
              <MenuItem value="신한은행">신한은행</MenuItem>
              <MenuItem value="삼성은행">삼성은행</MenuItem>
              <MenuItem value="농협은행">농협은행</MenuItem>
              <MenuItem value="하나은행">하나은행</MenuItem>
              <MenuItem value="우체국은행">우체국은행</MenuItem>
              <MenuItem value="카카오뱅크">카카오뱅크</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={10}>
            <TextField
              autoComplete="money-account"
              name="money-account"
              variant="outlined"
              required
              fullWidth
              id="money-account"
              label="계좌번호"
              autoFocus
              style={{ marginLeft: "30px" }}
            />
          </Grid>

          <Grid item xs={12}>
            <button type="submit" color="#E2E9F6" className="login-button">
              {text}
            </button>
          </Grid>

          <div className="login-btn">
            <a href="/" className="yes-account">
              로그인
            </a>
            <span className="material-symbols-rounded">chevron_right</span>
          </div>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
