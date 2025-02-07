# 🎨 NeighborFood
📱 **공동 주문 배달 앱**  
🔹 **5인(프론트 3인, 백 2인) 프로젝트**  
📅 **개발 기간:** 2023.04.25 ~ 2023.06.02

<br/>

## 💬 Introduce
### 📝 Project
코로나로 인한 배달 어플 사용이 증가하면서 배달비의 상승이 소비자에게 큰 부담이 되고 있습니다. <br />
대학생들은 학교 주변에 밀집하여 거주하므로 음식을 함께 주문하면 가까운 거리에서 배달받고 배달비를 나누어 부담할 수 있습니다.  <br />
외부인과 함께 배달을 받는 경우 안전 문제가 발생할 수 있어 대학교 사람들만 사용할 수 있는 안전한 어플이 필요했습니다. <br />
이러한 배경에서 조금이라도 배달비 부담을 줄이고 안전하게 사용할 수 있는 어플을 제공하고 싶었습니다. <br />


### 👩‍💻 Frontend
|이름|구현 기능|
|---|---|
|백지원|마이페이지, 내가 참여한 게시물 화면|
|신승미|모임 게시물 관리 화면 및 음식점 조회 화면|
|이혜원|로그인, 회원가입, 메뉴 조회 및 공동 장바구니 관리 화면|

<br/>

## 🚀 Getting Started
### 🛠 Requirements  
For building and running the application you need:
- **Node.js** `>= 16.0.0`  
- **Npm** `>= 7.0.0`  
- **React** `^18.2.0`  


### 📦 Installation  
```bash
$ git clone https://github.com/seung-mii/NF_frontend.git
$ cd NF_frontend  
```


### 🖥 Execution
``` bash
$ npm install --legacy-peer-deps
$ npm start
```

<br/>

## 🔧 Tech Stack
### ⚙️ Environment  
<p align="left">
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
</p>


### 🛠️ Development  
<p align="left">
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</p>


### 📚 API  
<p align="left">
  <img src="https://img.shields.io/badge/Morpheus%20API-000000?style=for-the-badge&logo=internetexplorer&logoColor=white">
  <img src="https://img.shields.io/badge/Location%20API-FF5733?style=for-the-badge&logo=googlemaps&logoColor=white">
  <img src="https://img.shields.io/badge/Data%20API-4CAF50?style=for-the-badge&logo=json&logoColor=white">
</p>


### 💬 Communicate
<p align="left">
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
</p>

<br/>

## 📺 Screen
|카테고리별 모임 게시물 조회|모임 게시물 만들기|모임 게시물 만들기 - 위치 선택|
|---|---|---|
|<img src="./구현 결과 화면/모임 게시물 관리 화면/NF 홈 화면.jpg" width="304" height="560"/>|<img src="./구현 결과 화면/모임 게시물 관리 화면/모임 게시물 만들기.jpg" width="304" height="560"/>|<img src="./구현 결과 화면/모임 게시물 관리 화면/모임 게시물 만들기(위치 선택).jpg" width="304" height="560"/>|

|모임 참가 및 댓글 작성|장바구니 조회 - 방장 ver|장바구니 조회 - 참가자 ver|
|---|---|---|
|<img src="./구현 결과 화면/모임 게시물 관리 화면/모임 게시물 참여 & 댓글.jpg" width="304" height="560"/>|<img src="./구현 결과 화면/장바구니 관리 화면/장바구니 조회(방장).jpg" width="304" height="560"/>|<img src="./구현 결과 화면/장바구니 관리 화면/장바구니 조회(일반).jpg" width="304" height="560"/>|

<br/>

## ✨ Key Features
### 💡 회원관리
- 회원가입, 회원탈퇴, 로그인, 로그아웃 기능이 있습니다.
- 자신에 대한 회원 정보를 수정할 수 있습니다.
- 내가 참여한 게시물만 모아서 확인할 수 있습니다.


### 💡 모임 게시물 관리 [신승미 구현]
- 사람들이 올린 게시물을 카테고리 별로 조회할 수 있으며 각 모임 게시물의 작성자 이름과 작성일자, 제목, 본문 그리고 음식 받을 위치와 음식점을 확인할 수 있습니다.
- 누구나 모임 게시물을 생성할 수 있으며 참여하면 참여중인 사용자의 이름과 인원 수를 확인할 수 있고 댓글을 단 사용자의 이름과 작성 일시를 확인할 수 있습니다.
- 자신이 작성한 게시물만 삭제가 가능합니다.


### 💡 댓글 관리 [신승미 구현]
- 모임 참여한 사용자들은 댓글이 달리면 댓글 작성자의 이름과 내용을 이메일로 받을 수 있습니다.
- 자신이 작성한 댓글만 삭제가 가능합니다.


### 💡 공동 장바구니 관리
- 음식점 이름과 희망 주문 시간까지 남은 시간을 확인할 수 있으며 각 참여자가 선택한 음식과 총 가격, 입금 여부도 볼 수 있습니다.
- 방장인 경우 참여자들의 입금 여부를 버튼으로 설정 및 공지할 수 있습니다.
- 방장이 주문하기 버튼을 누르면 주문했다는 이메일이 모든 참여자에게 전송됩니다.
- 참여자인 경우 각 참여자의 입금 여부를 확인할 수 있고 본인에 한해서 주문 취소가 가능합니다.


### 💡 음식점 관리 [신승미 구현]
- 모임 게시물의 음식점으로 설정할 음식점의 이름과 주문할 수 있는 음식들을 확인할 수 있습니다.
- 카테고리별로 음식점을 조회할 수 있으며 음식점마다 배달비와 최소 주문 금액을 확인할 수 있습니다.

<br/>

## 🏛️ Architecture
### 📂 디렉토리 구조
```bash
├── 최종보고서.pdf
├── README.md
├── package-lock.json
├── package.json
├── 구현 결과 화면
│   └── ...
├── public/
│   ├── index.html
│   ├── layout.tsx
│   ├── js/
│   │   ├── morpheus/
│   │   │   ├── mcore.extends.js
│   │   │   ├── mcore.min.js
│   │   │   └── wnInterface.js
└── src/
    ├── Css/
    │   ├── Home/
    │   │   └── Home.css
    │   ├── Meeting/
    │   │   ├── Board.css
    │   │   ├── Make.css
    │   │   └── MyPosts.css
    │   ├── Member/
    │   │   ├── Login.css
    │   │   ├── MyPage.css
    │   │   ├── SignUp.css
    │   │   └── Update.css
    │   ├── Restaurant/
    │   │   └── Check.css
    │   └── Shoppingbasket/
    │       ├── BasketView.css
    │       ├── MenuDetail.css
    │       ├── MenuView.css
    │       └── Nav.css
    ├── Images/
    │   ├── logo.png
    │   ├── logo2.png
    │   ├── profile.png
    ├── Js/
    │   ├── Home/
    │   │   └── Home.js
    │   ├── Meeting/
    │   │   ├── Board.js
    │   │   ├── Make.js
    │   │   ├── MakeMap.js
    │   │   └── MyPosts.js
    │   ├── Member/
    │   │   ├── Login.js
    │   │   ├── MyPage.js
    │   │   ├── SignUp.js
    │   │   └── Update.js
    │   ├── NotFound/
    │   │   └── NotFound.js
    │   ├── Restaurant/
    │   │   └── Check.js
    │   └── Shoppingbasket/
    │       ├── BascketViewHost.js
    │       ├── Basket.js
    │       ├── BasketView.js
    │       ├── Main.js
    │       ├── MenuDetail.js
    │       └── MenuView.js
    ├── Service/
    │   ├── ApiService.js
    │   ├── app-config.js
    ├── common/
    │   ├── config.js
    │   ├── constants.js
    ├── components/
    │   ├── Nav.js
    └── native/
        ├── index.js
        └── location.js

```

<br/>

<p align="right">
  <a href="https://github.com/seung-mii/NF_frontend/tree/main">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fseung-mii%2FNF_frontend&count_bg=%23748DA6&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false">
  </a>
</p>
