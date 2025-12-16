<div align="center">
  <h1><img src="./public/assets/logos/youtubelogo.png" width="120px" style="vertical-align: middle; margin-right: 3px;"> Clone Frontend</h1>
</div>

<summary><h1>📍 목차</h1></summary>

1. [프로젝트 소개](#1-프로젝트-소개)  
2. [팀원 소개 및 역할](#2-팀원-소개-및-역할)  
3. [프로젝트 요약](#3-프로젝트-요약)  
4. [페이지 주요 기능](#4-페이지-주요-기능)  
5. [AI API 최적화 및 적용한 곳](#5-ai-api-최적화-및-적용한-곳)  
6. [프로젝트 구조](#6-프로젝트-구조)  
7. [브랜치 전략 및 컨벤션](#7-브랜치-전략-및-컨벤션)  
8. [사용 기술 및 도구](#8-사용-기술-및-도구)  
9. [최종 회고](#9-최종-회고)  


## 1. 프로젝트 소개

#### [오르미 11기 백엔드 양성과정 - 프론트엔드 프로젝트]

> 영상 추천 YouTube 클론 페이지 구현 (실제 유튜브의 핵심 기능과 UI/UX를 최대한 유사하게 구현)

- 📅 진행 기간: 2025년 4월 21일 ~ 2025년 5월 12일
- 🎯 주요 목표:
  - Home / Channel / Video 페이지 구현
  - HTML/CSS/JS 기반 프론트엔드 구조 설계 및 컴포넌트 재사용
  - Express 기반 서버와 API 연동
- 🚨 팀명: 초보탈출 넘버원
  - 부트캠프에서 처음으로 진행하는 프로젝트 + 1팀
  - 이번 프로젝트를 통해 초보를 탈출하자는 목표를 담고 있다!
- 📚 [Notion](https://chain-winter-af2.notion.site/1dc2233de693802780c2d36dd66faaa1?pvs=4)
- 📬[배포](https://youtube-clone-frontend-9hhj.onrender.com/)
  - Render에 배포
  - AI APIkey는 보안을 위해 코드에 추가하지 않고 따로 API 키 등록
  <br>
    <img src="https://github.com/user-attachments/assets/088934f1-c9b2-4a7f-9c58-57be67e5d00c" alt="apikey" width="300"/>
- 📺[시연 영상](https://youtu.be/sWw8Yp1vN-E)
- 📢[발표 자료](https://docs.google.com/presentation/d/1Y4zZWE8r1-sE7PlCJraJKmTGHiZ1D-bW/edit?usp=drive_link&ouid=107771278135945552523&rtpof=true&sd=true)
---

## 2. 팀원 소개 및 역할
<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/yoonhyunjin02" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/97629676?v=4"
        alt="윤현진 프로필" /></a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/KIMYOUNGLONG" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/206796619?v=4" alt="김영롱 프로필" /></a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/sungyeonkim27" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/192389552?v=4" alt="김성연 프로필" /></a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/jwljwljwl" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/206796485?v=4"
        alt="이재원 프로필" /></a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/yoonhyunjin02" target="_blank">윤현진(팀장)</a>
    </td>
    <td align="center">
      <a href="https://github.com/KIMYOUNGLONG" target="_blank">김영롱</a>
    </td>
    <td align="center">
      <a href="https://github.com/sungyeonkim27" target="_blank">김성연</a>
    </td>
    <td align="center">
      <a href="https://github.com/jwljwljwl" target="_blank">이재원</a>
    </td>
</table>

### 📆 역할 분담 및 기간별 작업 요약
<img src="https://github.com/user-attachments/assets/d37d357e-cc18-4d0e-be3e-bfb54dca4ef9" alt="timeline" width="700"/>

## 3. 프로젝트 요약
- 구현한 페이지 3개(홈, 채널, 비디오)
    <details>
    <summary>Home</summary>
    <br>
    <img src="https://github.com/user-attachments/assets/1fa9d000-5bbc-41c5-ac83-6ff8a4ab5675" alt="home" width="600"/>
    </details>
    <details>
    <summary>channel</summary>
    <br>
    <img src="https://github.com/user-attachments/assets/bd597fd2-a736-4e51-8c79-c1ad30f9efdd" alt="channel" width="600"/>
    </details>
    <details>
    <summary>video</summary>
    <br>
    <img src="https://github.com/user-attachments/assets/6c1bf31d-07a1-48e5-9743-daae2cc82f15" alt="video" width="600"/>
    </details>

<br>

- 사용한 API: 영상 리스트 API  
    - `/channel/getChannelInfo` : 채널 정보 반환  
    - `/video/getChannelVideoList` : 해당 채널의 영상 목록  
    - `/video/getVideoInfo` : 영상 정보 반환  
    - `/video/getVideoList` : 전체 영상 목록 반환

- 사용한 API: [어휘 간 유사도 분석 API](https://aiopen.etri.re.kr/guide/WordRel)

## 4. 페이지 주요 기능

### 🚩 공통 기능(홈, 채널, 비디오)
- 파비콘
  <br>
  <img src="https://github.com/user-attachments/assets/f1991b11-1440-4603-87b1-fea000f4cbee" alt="파비콘" width="300"/><br>
  - 반응형으로 동작

- 헤더
  <br>
  <img src="https://github.com/user-attachments/assets/ca6b55d4-5e13-4b53-8550-e520119e2eb8" alt="header" width="300"/><br>
  - 햄버거 버튼 토글
  - 로고 누르면 홈 페이지로 이동

- 검색
  <br>
  <img src="https://github.com/user-attachments/assets/cd3073ca-b894-485f-acff-fa8180c62e60" alt="search" width="300"/><br>
  - 검색된 결과가 없을 때 alert창으로 안내
  - 버튼
    - +creat, 알람, 프로필 모달 구현
    - 프로필 모달의 Appearance 버튼을 눌러 테마 토글 가능

- 네비게이션
  <br>
  <img src="https://github.com/user-attachments/assets/000d6e16-66b1-4648-9e57-2197af62d771" alt="nav" width="300"/><br>
  - 햄버거 버튼 토글 → 아이콘만
  - 구독자 목록: 상단 3개(API), 나머지 더미데이터, 버튼 구현
  - 더미 데이터 클릭시 alert창으로 안내

- 비디오 리스트
  <br>
  <img src="https://github.com/user-attachments/assets/a62a2ec4-cea2-4e25-acdc-af1eb4626105" alt="move" width="300"/>
  - 썸네일에 마우스 올리면 재생
  - 썸네일, 영상 제목, 조회수 및 시간 → 비디오 페이지로 이동
  - 프로필, 채널 이름 → 채널 페이지 이동

### 🚩 홈(home)
- topbar
  <br>
  <img src="https://github.com/user-attachments/assets/9428551d-b242-45b5-98a7-6ce7e0b95b2d" alt="topbar" width="200"/>
  <img src="https://github.com/user-attachments/assets/7e700aea-764e-461b-abed-6f4aeba81c63" alt="topbar-search" width="200"/><br>
  - 화면에서 길이 초과시 조건부 버튼 구현
  - 검색 필터를 누르면 제목과 태그 기준으로 검색됨

### 🚩 채널(channel)
- 홈 탭
  <br>
  <img src="https://github.com/user-attachments/assets/c64ab890-3aca-487b-8305-f6ebc08bc147" alt="home-tab" width="300"/>
  - 동영상: 대표 영상 제외 API 순으로 정렬
  - 인기동영상: 대표 영상 제외 조회순으로 정렬
  - 추천동영상: 대표 영상 제외 좋아요순으로 정렬
  - 화면에서 길이 초과시 조건부 버튼 구현
  - play all 버튼 → 비디오 페이지 플레이리스트 화면으로 이동<br>

- 비디오 탭
  <br>
  <img src="https://github.com/user-attachments/assets/d86724d1-a75e-4166-bc56-bd48b203c4c3" alt="video-tab" width="300"/>
  - 해당 채널의 모든 영상 카드형으로 배치<br>

- 팟캐스트 탭
  <br>
  <img src="https://github.com/user-attachments/assets/31dceb82-a929-4da0-a83e-e33938280d79" alt="podcasts-tab" width="300"/>
  - 팟캐스트 더미데이터 생성 후 구현<br>

- 플레이리스트 탭
  <br>
  <img src="https://github.com/user-attachments/assets/6fb44419-8bdd-4888-bafc-acf2b776946f" alt="playlists-tab" width="300"/>
  - 홈 탭에 있는 각각의 리스트들
  - 썸네일 play all 버튼 → 비디오 페이지 플레이리스트 화면으로 이동<br>

- 포스트 탭
  <br>
  <img src="https://github.com/user-attachments/assets/c12e3b47-92bd-4137-aac7-61efceda7ec6" alt="post-tab" width="300"/>
  - 팟캐스트 더미데이터 생성 후 구현
  - 프로필, 채널 이름 클릭 → 채널 페이지 홈 탭으로 이동
  - 좋아요, 싫어요, read more, Show less 버튼 구현<br>

- 서치 탭
  <br>
  - 단어간 유사도 AI API 사용
  - 검색어 입력 시 띄어쓰기 단위로 슬라이스하여, 해당 채널 영상 태그와 유사도 측정
  - 유사도가 높은 것부터 내림차순 정렬<br>
  <img src="https://github.com/user-attachments/assets/e1b1e19a-8317-4d1d-8668-68eeec15d4fc" alt="search-tab" width="300"/><br>
  - 돋보기 클릭 시 입력창 생김
  - 검색어 입력 안하고 검색 시 alert 창

### 🚩 비디오(video)
- 구독, 좋아요, 싫어요, 공유, 저장, 더보기 버튼 모달 구현
  <br>
  <img src="https://github.com/user-attachments/assets/162e5168-588e-4b41-a18a-83763143369d" alt="video-function" width="300"/>
  <img src="https://github.com/user-attachments/assets/38af16b0-ceb1-4122-b131-35b8c9e3b01a" alt="video-function2" width="300"/>

- 플레이리스트
  <br>
  <img src="https://github.com/user-attachments/assets/b949151f-e7ad-42c3-8f39-c85588389b13" alt="playlists" width="300"/><br>
  - 채널 홈 탭과 채널 플레이리스트에서 넘어오는 페이지
  - 재생중인 비디오가 표시됨
  - 한 영상 재생이 끝나면 자동으로 다음 영상이 재생됨

- 댓글
  <br>
  <img src="https://github.com/user-attachments/assets/081a1202-1ef3-4f37-9d87-ab81c92a3e4c" alt="comment" width="300"/>
  - 댓글, 대댓글 입력
  - 좋아요, 싫어요, reply, cancel, Reply 버튼 구현
  - 정렬 기능
      - top comment: 좋아요순
      - Newest first: 최신순<br>

- 영상 리스트
  <br>
  <img src="https://github.com/user-attachments/assets/43158c57-bf21-4095-97d6-e88d8fcdb637" alt="video-ai" width="300"/>
  - 전체: API 영상순
  - 영상 추천: 현재 재생되고 있는 영상의 태그를 기반으로 전체 동영상 유사도 계산 후 내림차순
  - 해당 채널 추천: 현재 재생되고 있는 영상의 태그를 기반으로 해당 채널 동영상 유사도 계산 후 내림차순

## 5. AI API 최적화 및 적용한 곳
- API 호출 최적화
  - 단어쌍 유사도 값 저장해서 호출 전 확인하고 재활용
  - 동일한 단어는 API를 호출하지 않고 1값 주기
  - 상위 2개 태그만 비교

- API 유사도 계산법: 유사도 평균 선정(average similarity)
  - 유사도 합계 / 태그 수 * 검색어 수
  - 태그 수와 검색어 수 차이에 대해 공정하게 비교 가능

- 적용한 곳
  - 🚩 채널 서치 탭
  - 🚩 비디오 리스트 버튼(추천영상, 해당 채널 추전)



## 6. 프로젝트 구조
- 초기에는 언어별(html, css, js)로 구성함
- html 재활용을 위해 Express 서버에서 EJS로 HTML을 템플릿처럼 모듈화함
### 📂 디렉토리 최종 구조

```
/project-root
│
├── app.js                          # Express 앱 설정 (라우터, 미들웨어 연결)
│
├── public/                         # 정적 파일 (css, js, assets)
│    ├── css/                       # css
│    │  ├── common/                 # 공통 적용 css
│    │  └── pages/                  # 페이지별 css
│    │      ├── home.css
│    │      ├── channel.css
│    │      └── video.css
│    ├── js/                        # js
│    │  ├── common/                 # 공통 적용 js
│    │  ├── home/
│    │  ├── channel/
│    │  └── video/
│    └── assets/    
│       ├── icons/                     # 아이콘들
│       ├── img/                       # 배너
│       ├── logos/                     # 로고
│       ├── profile/                   # 프로필
│       └── thumbnails/                # 썸네일
│
├── views/                          # EJS 뷰 템플릿 - html
│   ├── partials/                   # header.ejs, nav.ejs, videoCard
│   └── pages/                      # 페이지별 EJS
│       ├── home.ejs
│       ├── channel.ejs
│       └── video.ejs
│
├── routes/                         # 서버 라우트 모음
│   └── 각 화면 라우터               # 메인 라우터 (페이지별 라우팅)
│
├── utils/                          # 공용 유틸 함수
│   ├── api.js                      # api 호출
│   └── helpers.js                  # 포맷터, 변환등
│
├── data/                           # 구독자 더미 데이터
│   └── subscribers.json
│
├── node_modules/                  # npm이 설치한 라이브러리들의 실제 코드가 모여 있는 폴더
├── .vscode/                       # Visual Studio Code 에디터용 개인 설정 폴더
├── .git/                          # Git이 프로젝트의 버전 기록, 브랜치, 커밋 등을 관리하는 내부 폴더
├── package-lock.json              # package.json에 적힌 대략적인 버전을 보고, npm이 설치한 정확한 버전과 설치 순서를 기록
├── package.json                   # 프로젝트가 어떤 라이브러리를 쓰는지 적어두는 파일
├── README.md                      # 프로젝트 설명
└── .gitignore                     # Git이 버전 관리에서 제외할 파일이나 폴더 목록을 지정하는 설정 파일
```

## 7. 브랜치 전략 및 컨벤션

### 🔹 브랜치 전략
  <img src="https://github.com/user-attachments/assets/ba2db2be-81dc-4c32-9374-3b8bf3391db9" alt="branch" width="400"/>


### 🔸 폴더, 파일 네이밍 컨벤션
  <img src="https://github.com/user-attachments/assets/c3bd5449-c050-41bf-9976-9d81a55da974" alt="name" width="400"/>

### 🔸 커밋 컨벤션
  <img src="https://github.com/user-attachments/assets/2eb3dbac-b165-4ff2-aa6c-5cbffe265b53" alt="comment" width="400"/>

### 🔸 이슈 컨벤션
  <img src="https://github.com/user-attachments/assets/649494e2-4b67-4323-ad9e-050ffeb7822f" alt="issue" width="400"/>

## 8. 사용 기술 및 도구

### 🔹 협업
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <a href="https://github.com/yoonhyunjin02/youtube-clone-frontend" target="_blank">
    <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
  </a>
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
</div>

### 🔹 개발 도구
<img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

### 🔹 커뮤니케이션
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <a href="https://chain-winter-af2.notion.site/1dc2233de693802780c2d36dd66faaa1?pvs=4" target="_blank">
    <img src="https://img.shields.io/badge/notion-FEFEFE?style=for-the-badge&logo=notion&logoColor=black">
  </a>
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</div>


### 🔹 개발 언어
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/ejs-8D0000?style=for-the-badge&logo=javascript&logoColor=white">
</div>


## 9. 최종 회고
- 🟢 윤현진
    - 프로젝트를 진행하면서 html, css의 가벼운 기능부터 Js, html 재활용, API 적용, AI 적용처럼 어려운 기능까지     다루어 볼 수 있어서 실력이 상승된 것을 느꼈다. 또한 팀장으로서 프로젝트를 어떤 방식으로 진행해야 하는지를 더 잘 알게 된 것 같다. 가장 인상깊은 기능은 AI이다. 시간을 많이 사용하기도 했고 생각한대로 구현을 성공하니 기억에 많이 남았다.

- 🟣 김성연
    - 처음 부트캠프 교육을 받기 시작했을 때는 개발자의 일이 어떤 것인지 막연했었는데, 프로젝트를 진행하면서 구체적인 개념을 잡을 수 있었습니다. 
    무엇보다 인상깊었던 순간은 다름아닌 처음 html구조를 만들 때였습니다. 단순히 이론을 듣기만 할 때와 실제 적용이 다르다는 것을 가장 많이 실감한 순간이었습니다. 나중에 css나 js를 적용할 때도 이때만큼 신선하고 충격을 받지 않았던 것 같습니다. 

- 🟠 이재원
    - 프론트 프로젝트 진행해보고 프론트 관련 언어들을 배워보면서 백엔드 개발자로서 프로젝트 할 때 어떤 식으로 상호작용하면서 프로젝트들을 진행해야 할지 감을 잡을 수 있는 시간이었습니다.   
    인상깊은 건 JS를 처음 써봤는데 HTML과 CSS를 활용하면서 여러가지 기능들을 추가하고 동적인 기능들을 추가할 수 있는 것들이 인상깊었습니다.
    
- 🔵 김영롱
    - 특별히 한 역할은 없지만 리드미 구조를 보게 된 것도 즐거웠고, 팀원분들이 너무 뛰어나신 데다 불평이 전혀 없는 게 신기할 정도로 좋은 분들이라 감사했습니다.
    
<br>

---

<div align="center">
  <strong>✨ Team 초보탈출 넘버원 - YouTube Clone 프로젝트 완료! ✨</strong>
</div>
