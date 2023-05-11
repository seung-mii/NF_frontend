import React from "react";
import { TextField, Grid, Container } from "@material-ui/core";
// import { signup } from "../../Service/ApiService";
import "../../Css/Member/SignUp.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    // signup({ email: email, username: username, password: password }).then(
    //   (response) => {
    //     window.location.href = "/login";
    //   }
    // );
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <form noValidate onSubmit={this.handleSubmit}>
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
                계정생성
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
}

export default SignUp;
