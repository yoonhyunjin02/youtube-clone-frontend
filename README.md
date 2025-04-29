<div align="center">
  <h1><img src="./assets/img/youtubelogo.png" width="120px" style="vertical-align: middle; margin-right: 3px;"> YouTube Clone Frontend</h1>
</div>

---

# 📍 목차

1. [프로젝트 소개](#1)
2. [팀원 소개 및 역할](#2)
3. [주요 기능](#3)
4. [프로젝트 구조](#4)
5. [사용 기술 및 도구](#5)
6. [브랜치 전략 및 커밋 컨벤션](#6)
7. [최종 회고](#7)

---

# 1. 프로젝트 소개

#### [ 오르미 Series A 과정 프론트엔드 팀 프로젝트 ]

> 첫 번째 프론트엔트 협업 프로젝트 - YouTube 클론 페이지 구현

- 기간 : 2024년 4월 21일 ~ 2024년 5월 6일
- 목표 : YouTube 홈, 채널, 비디오, 검색, 구독, 좋아요 기능을 재현하는 풀스택형 웹 애플리케이션 제작

---

# 2. 팀원 소개 및 역할

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/KIMYOUNGLONG" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/206796619?v=4" width="100px" alt="김영롱 프로필"/></a><br/><b>김영롱</b>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/sungyeonkim27" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/192389552?v=4" width="100px" alt="김성연 프로필"/></a><br/><b>김성연</b>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/yoonhyunjin02" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/97629676?v=4" width="100px" alt="윤현진 프로필"/></a><br/><b>윤현진</b>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/jwljwljwl" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/206796485?v=4" width="100px" alt="이재원 프로필"/></a><br/><b>이재원</b>
    </td>
  </tr>
</table>

## 🧩 역할 분담 시각화

<table>
  <tr>
    <td>
      <h3>🧑‍💻 윤현진</h3>
      <ul>
  <li>서버 구조 설계 및 기본 Express 환경 설정</li>
  <li>브랜치 전략 수립 및 git flow 도입</li>
  <li>공통 UI 컴포넌트 모듈화 (`<%- include %>`)</li>
  <li>상단 바, 네비게이션 통합</li>
  <li>디벨롭 브랜치 통합 및 충돌 해결</li>
      </ul>
    </td>
    <td>
      <h3>📝 김영롱</h3>
      <ul>
        <li>README 및 문서화 </li>
        <li>버튼 UI, channel.css 개발</li>
      </ul>
    </td>
    <td>
      <h3>🔍 김성연</h3>
      <ul>
  <li>홈 화면 카드 UI 개발</li>
  <li>검색창 기능 구현 및 이벤트 연결</li>
  <li>필터바 클릭 이벤트 구현</li>
  <li>video.js 기능 개선 (렌더링 최적화 포함)</li>
      </ul>
    </td>
    <td>
      <h3>🎮 이재원</h3>
      <ul>
  <li>사이드바 Toggle 기능 (햄버거 메뉴, 레이아웃 연동)</li>
  <li>좋아요/싫어요/구독 기능 버튼 개발 및 상태 제어</li>
  <li>공유/저장 버튼 설계 및 DOM 조작</li>
  <li>비디오 및 채널 페이지 js 기능 구현</li>
  <li>스크립트 분리 및 js 모듈화</li>
  <li>SVG 아이콘 처리 및 hover 효과 적용</li>
      </ul>
    </td>
  </tr>
</table>

---

# 3. 주요 기능

### ✅ 홈(Home)
- 최신 영상 카드 출력
- 필터 카테고리 클릭 이동
- 검색창 필터링

### ✅ 채널(Channel)
- 채널별 영상 리스트 출력
- 채널 구독 기능
- 구독자 수 상태 관리

### ✅ 비디오(Video)
- 영상 재생 및 상세 페이지 구성
- 댓글 작성/삭제 기능
- 좋아요/싫어요 토글 기능

### ✅ 공통 기능
- 반응형 UI(미디어쿼리 적용)
- 사이드바 토글 및 네비게이션 이동
- 썸네일 hover 미리보기 기능
- 공유 및 저장 기능

---

# 4. 프로젝트 구조 및 기간별 흐름

### 📂 디렉토리 구조

```
youtube-clone-frontend/
├── html/
├── css/
├── js/
├── assets/
├── server.js
├── package.json
└── README.md
```

### 📅 기간별 개발 흐름

| 날짜 | 작업 내용 |
|:----|:----------|
| 4/21 | GitHub, Notion 세팅, 브랜치 전략 수립, 상단바 구성 |
| 4/22 | 홈 카드/버튼 UI 개발, channel.ejs 초안 작성 |
| 4/23 | 기능별 브랜치 작업 분담, 검색 기능 구축 |
| 4/24 | 구독/좋아요 기능, 필터바 기능 강화 |
| 4/25 | 비디오 hover 기능, 상세화면 구성 |
| 4/26~5/6 | 반응형 대응, 정렬 기능, 전체 통합 및 발표 준비 |

---

# 5. 사용 기술 및 도구

### 🔹 협업 및 커뮤니케이션

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>

### 🔹 개발환경

<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>

### 🔹 개발 언어

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

### 🔹 서버 및 템플릿 엔진

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/EJS-8A2BE2?style=for-the-badge&logo=ejs&logoColor=white"/>

---

# 6. 브랜치 전략 및 커밋 컨벤션

### 🔹 브랜치 전략

| 브랜치 이름 | 설명 |
|:------------|:------|
| `main` | 최종 배포 버전 브랜치 |
| `develop` | 통합 및 기능 테스트용 브랜치 |
| `feature/*` | 기능별 개발 브랜치 (ex. feature/search, feature/video) |

### 🔸 커밋 컨벤션

| prefix | 의미 설명 |
|:------|:-----------|
| `feat` | 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 작성 및 수정 |
| `refactor` | 코드 리팩토링 (기능 변화 없음) |
| `style` | 코드 스타일 수정 |
| `chore` | 빌드 및 설정 작업 |

---

# 7. 최종 회고

> 초보탈출 넘버원 팀은 4월 21일부터 5월 6일까지 유튜브 클론 프로젝트를 진행하며,  
> 단순한 화면 복제를 넘어 브랜치 전략 수립, 기능 분업, 통합, 충돌 해결,  
> 그리고 API 연동과 반응형 대응까지 직접 설계하고 구현하는 경험을 쌓았습니다.

> **이번 프로젝트를 통해 협업, 프론트엔드 개발, 코드 구조화에 대한 실전 감각을 높이는 귀중한 경험을 얻었습니다.**
