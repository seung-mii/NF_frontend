import { APL_BASE_URL } from "./app-config";
import * as AppStorage from "../AppStorage";
import M from "../native";
import { ContactlessOutlined } from "@mui/icons-material";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = AppStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: APL_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log("Oops!");
      console.log(error.error);

      // if (error.status === 403) {
      //   window.location.href = "/";
      // }
      return Promise.reject(error);
    });
}
//회원가입
export function signup(userDTO) {
  return call("/api/member/join", "POST", userDTO)
    .then((response) => {
      console.log(response);
      if (response.data) {
      }
    })
    .catch((error) => {
      // alert(error.error);
      return Promise.reject(error.error);
    });
}
//로그인
export function signin(userDTO) {
  return call("/api/member/login", "POST", userDTO)
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        AppStorage.setItem("ACCESS_TOKEN", response.data.token);
        AppStorage.setItem("email", response.data.email);
        window.location.href = "/mypage";
        console.log("로그인 성공");
      }
    })
    .catch((error) => {
      console.log(error.error);
      return Promise.reject(error.error);
    });
}
// 로그아웃
export function logout() {
  // local Storage 에 토큰 삭제
  AppStorage.setItem("ACCESS_TOKEN", null);
  AppStorage.setItem("email", null);
  window.location.href = "/";
}
// 회원탈퇴
export function dropoutUser() {
  return call("/api/member/out", "GET")
    .then((response) => {
      AppStorage.setItem("ACCESS_TOKEN", null);
      AppStorage.setItem("email", null);
      window.location.href = "/";
      console.log("탈퇴 완료");
    })
    .catch((error) => {
      console.log(error.error);
      return Promise.reject(error.error);
    });
}
