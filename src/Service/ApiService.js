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

      if (error.error == "참여 정보가 없습니다.") {
        alert("참여 후 댓글을 달 수 있습니다.");
        window.location.href = "/home";
      } else if (error.error == "Member is already participating") {
        alert("이미 참여한 모임입니다.");
        window.location.reload();
      } else if (
        error.error == "member does not exist or Member is not logged in" &&
        AppStorage.getItem("email") == "null"
      ) {
        alert("로그인을 하지 않아 참여할 수 없습니다.");
        window.location.href = "/";
      } else if (
        error.error == "member does not exist or Member is not logged in" &&
        AppStorage.getItem("email") != "null"
      ) {
        alert("학교 인증이 되지 않아 참여할 수 없습니다.");
        window.location.href = "/mypage";
      } else if (error.error == "Not an authenticated member") {
        alert("학교 인증이 되지 않아 참여할 수 없습니다.");
        window.location.href = "/mypage";
      } else if (error.error.slice(59, 70) == "MonthOfYear") {
        alert("1월 - 12월 사이를 입력해주세요.");
        window.location.reload();
      } else if (error.error.slice(59, 70) == "DayOfMonth") {
        alert("1일 - 31일 사이를 입력해주세요.");
        window.location.reload();
      } else if (error.error.slice(59, 68) == "HourOfDay") {
        alert("0시 - 23시 사이를 입력해주세요.");
        window.location.reload();
      } else if (error.error.slice(59, 68) == "MinuteOfHour") {
        alert("0분 - 59분 사이를 입력해주세요.");
        window.location.reload();
      } else if (error.error.slice(0, 30) == "The given id must not be null!") {
        alert("음식점 또는 위치를 설정하지 않았습니다.");
        window.location.reload();
      } else if (error.error == "회원을 찾을 수 없습니다.") {
        alert("가입되지 않은 회원정보이거나 아이디가 일치하지 않습니다.");
        window.location.reload();
      } else if (error.error == "패스워드가 틀렸습니다.") {
        alert("비밀번호가 일치하지 않습니다.");
        window.location.reload();
      } else if (
        error.error == "해당 게시글에 장바구니가 들어있어 탈퇴할 수 없습니다."
      ) {
        alert("해당 게시글에 장바구니가 들어있어 탈퇴할 수 없습니다.");
        window.location.reload();
      }

      // if (error.status === 403) {
      //   window.location.href = "/";
      // }
      return Promise.reject(error);
    });
}
export function callIMG(api, method, request) {
  let headers = new Headers({
    "Content-Type": "image/jpeg",
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
    .then((response) => {
      return response;
    })

    .catch((error) => {
      console.log("Oops!");
      console.log(error.error);

      // if (error.status === 403) {
      //   window.location.href = "/";
      // }
      return;
    });
}
//회원가입
export function signup(userDTO) {
  return call("/api/member/join", "POST", userDTO)
    .then((response) => {
      console.log(response);
      if (response.result === "fail") {
        throw new Error("Failed to join");
      }
    })
    .catch((error) => {
      console.log(error);
      return {};
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
        AppStorage.setItem("username", response.data.name);
        window.location.href = "/home";
        console.log("로그인 성공");
      }
    })
    .catch((error) => {
      console.log(error.error);
      return {};
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
