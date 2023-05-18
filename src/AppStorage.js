import M from "./native";
/**
 * 즉시실행함수로 브라우저에서 즉시 해석된다.
 * @type {boolean}
 * @description 현재 사용자가 앱을통해 접속한 경우 true / 일반 브라우저인 경우 false
 */
const isMorpheus = (() => {
  const userAgent = window.navigator.userAgent.toLocaleLowerCase();
  return userAgent.indexOf("morpheus") > -1;
})();

// Morpheus 앱에서는 localStorage를 사용할 수 없다.
export function getItem(key) {
  return isMorpheus ? M.data.storage(key) : localStorage.getItem(key);
}

export function setItem(key, value) {
  return isMorpheus
    ? M.data.storage(key, value)
    : localStorage.setItem(key, value);
}

export function removeItem(key, value) {
  return isMorpheus
    ? M.data.removeStorage(key, value)
    : localStorage.removeItem(key, value);
}
