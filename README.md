<div align="center">
<<<<<<< HEAD
  <h1>
    <img src="./assets/img/youtubelogo.png" width="120px" style="vertical-align: middle; margin-right: 3px;">
    YouTube Clone Frontend
  </h1>
</div>

---

## 📍 목차

1. [프로젝트 소개](#1)
2. [팀원 소개 및 역할](#2)
3. [주요 기능](#3)
4. [프로젝트 구조 및 흐름](#4)
5. [사용 기술 및 도구](#5)
6. [브랜치 전략 및 커밋 컨벤션](#6)
7. [최종 회고](#7)

---

## 1. 프로젝트 소개

#### [오르미 11기 백엔드 양성과정 - 프론트엔드 실전 협업 프로젝트]

> 영상 추천 YouTube 클론 페이지 구현 (실제 유튜브의 핵심 기능과 UI/UX를 최대한 유사하게 구현)

- 📅 진행 기간: 2025년 4월 21일 ~ 2025년 5월 12일
- 🎯 주요 목표:
  - Home / Channel / Video / Search / Subscribe / Like 기능 완전 구현
  - HTML/CSS/JS 기반 프론트엔드 구조 설계 및 컴포넌트 재사용
  - Express 기반 서버와 API 연동 포함한 실전 협업 경험 축적

---

## 2. 팀원 소개 및 역할

<div align="center">

| 이름       | 주요 구현 영역                                                                 |
|------------|----------------------------------------------------------------------------------|
| 윤현진     | 🔧 구조 설계, API 연동, 템플릿 재사용<br>– 공통 UI 템플릿화 및 브랜치 전략 수립<br>– develop 통합 관리, 충돌 해결, 전체 흐름 조율<br>– 필터바 동적 구현, API 데이터 연동, 썸네일 hover 구현 등 고급 기능 구현 |
| 김성연     | 🔍 검색 기능, UI 정리, 반응형<br>– 홈/비디오/채널 페이지 검색 기능 구축<br>– 필터바 클릭 이벤트 및 API 태그 연동<br>– 반응형 레이아웃 구현 및 조회수 포맷 커스터마이징 |
| 이재원     | 🎮 사용자 인터랙션 중심 기능<br>– 사이드바 토글 구현 및 js 모듈화<br>– 구독/좋아요/싫어요 버튼 처리<br>– 공유/저장 기능과 동적 SVG 교체 적용<br>– video 페이지 모달/정렬 기능까지 총괄 |
| 김영롱     | 📚 문서화 및 UI 보완<br>– README 작성 및 정리 총괄<br>– channel.css, 버튼 UI, 필터바 기본 스타일링<br>– hover 효과 및 결과화면 디버깅 보조 |

</div>

---

## 3. 주요 기능

### ✅ 홈(Home)
- 최신 영상 카드 출력 / 검색창 기능 / 필터 카테고리 클릭 이동
- 마우스 hover 시 썸네일 **미리보기 동영상 재생** 기능 구현

### ✅ 채널(Channel)
- 채널 프로필/배너 출력 / 채널별 영상 리스트 동적 렌더링
- 구독 기능, show more 구독자 목록 확장 / 동적 정렬 구현

### ✅ 비디오(Video)
- 영상 재생 및 상세 정보 표시 / 댓글 작성/삭제
- 좋아요/싫어요 토글 기능 / 공유/저장 버튼 / 정렬 모달 구현

### ✅ 공통 기능
- 반응형 UI (미디어쿼리 기반 일부 페이지 적용)
- 상단바/네비바 ejs 템플릿 **재사용 및 모듈화** 구조 적용
- 사이드바 토글 기능 / JS 기능 분리 및 모듈화
- SVG 버튼 상태 변화 및 아이콘 동적 처리 구현
- **videoCard 템플릿 분기 사용으로 모든 페이지에서 공통 카드 컴포넌트 재사용**

---

## 4. 프로젝트 구조 및 흐름

### 📂 디렉토리 구조

```
youtube-clone-frontend/
├── public/
│   └── assets/ (icons, video)
├── views/
│   └── partials/ (header, nav, videoCard 등)
│   └── home.ejs, video.ejs, channel.ejs
├── css/ (home.css, video.css, channel.css 등)
├── js/  (button.js, thumbnail-play.js, search 관련 js 등)
├── server.js
└── README.md
```

### 📅 기간별 주요 흐름 요약

| 날짜 범위        | 주요 진행 사항                                                                                     |
|------------------|----------------------------------------------------------------------------------------------------|
| 4/21 ~ 4/22      | 프로젝트 초기 세팅, 팀 구성, 브랜치 전략 수립, 상단바 및 네비바 기본 구성                         |
| 4/23 ~ 4/24      | 홈 카드 UI / 검색 기능 / 버튼 UI 구성 / 필터바 기능 / 기능별 브랜치 작업 분담                     |
| 4/25 ~ 4/26      | 비디오 페이지 구성, 공유/저장/정렬 기능 구현 / 영상 hover 미리보기 / 반응형 미디어쿼리 적용       |
| 4/27 ~           | API 연동 고도화 / 썸네일-프로필 링크 연결 / 정렬 모달, 채널 구독 기능 등 완성도 향상 작업         |

---

## 5. 사용 기술 및 도구

### 🔹 협업 & 관리

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

### 🔹 개발 언어 & 환경

![HTML5](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![EJS](https://img.shields.io/badge/EJS-8A2BE2?style=for-the-badge&logo=ejs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## 6. 브랜치 전략 및 커밋 컨벤션

### 🔹 브랜치 전략

| 브랜치명       | 용도 설명                                       |
|----------------|--------------------------------------------------|
| `main`         | 최종 배포 브랜치                                 |
| `develop`      | 기능 통합 및 협업용 브랜치                       |
| `feature/*`    | 기능별 개발 브랜치 (예: feature/video, feature/search 등) |

### 🔸 커밋 컨벤션

| Prefix      | 의미                             |
|-------------|----------------------------------|
| `feat`      | 새로운 기능 추가                 |
| `fix`       | 버그 수정                        |
| `docs`      | 문서 작성 또는 수정              |
| `style`     | 코드 포맷팅 (기능 변화 없음)     |
| `refactor`  | 코드 구조 개선                   |
| `chore`     | 기타 작업 (빌드, 설정 등)        |

---

## 7. 최종 회고

> “초보탈출 넘버원” 팀은 단순한 클론이 아니라 실전 개발 프로세스를 전부 경험했습니다.

- 팀원 모두가 실제 유튜브 기능과 UI를 기준 삼아 **기능 우선 중심의 협업**을 진행했고,
- 각자의 역할을 정확히 분배하며 **브랜치 전략, API 연동, 컴포넌트 재사용, 반응형 UI**를 적극 구현했습니다.
- Git 충돌 해결, js 모듈화, 시멘틱 마크업 등 실무에 준하는 과정을 겪으며 **개발자로 성장하는 기반**을 만들었습니다.

> 기능을 구현하는 것에서 끝나지 않고, **협업, 책임감, 소통, 그리고 도전정신**을 함께 체득한 의미 있는 프로젝트였습니다.

---

<div align="center">
  <strong>✨ Team 초보탈출 넘버원 - YouTube Clone 프로젝트 완료! ✨</strong>
</div>
=======
  <h1><img src="./assets/img/youtubelogo.png" width="120px" style="vertical-align: middle; margin-right: 3px;"> clone frontend</h1>
</div>

<h1>📍 목차</h1>

  1. [프로젝트 소개](#1)
  2. [팀원 소개 및 역할](#2)
  3. [주요 기능](#3)
  4. [프로젝트 구조](#4)
  5. [사용 기술 및 도구](#5)
  6. [컨벤션](#6)

# 프로젝트  소개

#### [ 오르미 11기 백엔드 양성 과정 ]

> 첫 번째 프론트엔트 프로젝트 - 영상 추천 Youtube 클론 페이지

- 기간 : 2025년 4월 21일 ~ 2025년 5월 12일

# 팀원 소개 및 역할
<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/KIMYOUNGLONG" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/206796619?v=4" alt="김영롱 프로필" /></a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/sungyeonkim27" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/192389552?v=4" alt="김성연 프로필" /></a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/yoonhyunjin02" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/97629676?v=4"
        alt="윤현진 프로필" /></a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/jwljwljwl" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/206796485?v=4"
        alt="이재원 프로필" /></a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/KIMYOUNGLONG" target="_blank">김영롱</a>
    </td>
    <td align="center">
      <a href="https://github.com/sungyeonkim27" target="_blank">김성연</a>
    </td>
    <td align="center">
      <a href="https://github.com/yoonhyunjin02" target="_blank">윤현진</a>
    </td>
    <td align="center">
      <a href="https://github.com/jwljwljwl" target="_blank">이재원</a>
    </td>
</table>

<!-- 역할분담 추가 -->

# 주요 기능
- 홈 화면
- 재생 화면
- 비디오 화면

<!-- 각 화면 소개 추가 예정 -->
<!-- AI API 뭐 썼는지 -->

# 프로젝트 구조
> 디렉토리 구조 설명
> 브렌치 전략
> 커밋

# 사용 기술 및 도구
개발 도구

- 협업

<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

- 개발 도구

<span style="display: inline-block; background-color:rgb(35, 83, 114); color: white; padding: 4px 10px; font-weight: bold; font-size: 12px;">
  <img src="./assets/img/vscodelogo.png" width="16px" style="vertical-align: middle; margin-right: 6px;" />
  VS Code
</span>

- 커뮤티케이션

<img src="https://img.shields.io/badge/notion-FEFEFE?style=for-the-badge&logo=notion&logoColor=black">
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
<br>
- 개발 언어

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<br><br><br>

# 컨벤션
- 브랜치 전략
- 커밋 컨벤션
>>>>>>> ad28dbf7f5a2f35eff8b7a88d21c5afcd9857fe7
