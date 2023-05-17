import { APL_BASE_URL } from "./app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
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

// // 로그인을 위한 API 서비스 메소드 signin
// export function login(userDTO) {
//   return call("/api/member/login", "POST", userDTO).then((response) => {
//     if (response.token) {
//       // local 스토리지에 토큰 저장
//       localStorage.setItem("ACCESS_TOKEN", response.token);

//       // token이 존재하는 경우 todo 화면으로 리디렉트
//       window.location.href = "/";
//     }
//   });
// }

//회원가입
export function signup(userDTO) {
  return call("/api/member/join", "POST", userDTO)
    .then((response) => {
      if (response.result === "success") {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log(error.error);
      return Promise.reject(error.error);
    });
}
//로그인
export function signin(userDTO) {
  return call("/api/member/login", "POST", userDTO)
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
        localStorage.setItem("email", response.data.email);
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
  localStorage.setItem("ACCESS_TOKEN", null);
  localStorage.setItem("email", null);
  window.location.href = "/";
}
// 회원탈퇴
export function dropoutUser() {
  return call("/api/member/out", "GET")
    .then((response) => {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.setItem("email", null);
      window.location.href = "/";
      console.log("탈퇴 완료");
    })
    .catch((error) => {
      console.log(error.error);
      return Promise.reject(error.error);
    });
}
