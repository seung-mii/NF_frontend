let backendHost;

const hostname = window && window.location && window.location.hostname;
//localhost 에서 172.30.196.67로 변경함
console.log("hostname", hostname);
// if (hostname === "localhost") {
//   backendHost = "http://localhost:8080";
// }

//안드로이드 스튜디오 오류나서 추가한 부분
backendHost = "http://192.168.0.6:8080";

console.log("backendHost", backendHost);
export const APL_BASE_URL = `${backendHost}`;
// export const APL_BASE_URL = "/";

/**
 * 즉시실행함수로 브라우저에서 즉시 해석된다.
 * @type {boolean}
 * @description 현재 사용자가 앱을통해 접속한 경우 true / 일반 브라우저인 경우 false
 */
const isMorpheus = (() => {
  const userAgent = window.navigator.userAgent.toLocaleLowerCase();
  return userAgent.indexOf("morpheus") > -1;
})();
