import React, { useState, useEffect } from "react";
import { signin } from "../../Service/ApiService";
import { TextField, Grid, Container } from "@material-ui/core";
import "../../Css/Member/Login.css";

function Login() {
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <div className="login-main-title">로그인</div>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
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
              style={{ marginLeft: "30px" }}
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
