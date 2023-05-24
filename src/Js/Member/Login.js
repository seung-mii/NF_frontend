import React, { useState, useEffect } from "react";
import { signin } from "../../Service/ApiService";
import {
  TextField,
  Grid,
  Container,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../../Css/Member/Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    signin({ email: email, password: password })
      .then((response) => {})
      .catch((error) => {
        alert(error);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <div className="login-main-title">로그인</div>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="학교이메일 주소"
              name="email"
              autoComplete="email"
              style={{ marginLeft: "30px" }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="패스워드"
              name="password"
              autoComplete="password"
              type={passwordVisible ? "text" : "password"}
              style={{ marginLeft: "30px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <button type="submit" color="#E2E9F6" className="login-button">
              로그인
            </button>
          </Grid>
          <div className="button">
            <a href="/signup" className="no-account">
              회원가입
            </a>
            <span className="material-symbols-rounded">chevron_right</span>
          </div>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
