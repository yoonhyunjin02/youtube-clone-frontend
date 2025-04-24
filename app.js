const express = require('express');  // Express 불러오기 (서버 기능)
const app = express();               // 서버 만들기
const path = require('path');        // 경로 관리 (폴더 경로 쉽게 연결)

// EJS 설정
// .ejs 파일를 html 파일처럼 사용, 즉 .ejs 확장자 파일을 찾아서 렌더링함
app.set('view engine', 'ejs');  // 템플릿 엔진을 ejs로 사용!
// 그 파일들이 있는 곳이 html이라고 알려주는 코드
app.set('views', path.join(__dirname, 'html'));  // html 폴더를 views 폴더처럼 사용


// 정적 파일 서빙 - 브라우저가 css, assets, js 파일을 찾아서 렌더링함
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// 라우터 - 어떤 주소에 어떤 페이지를 줄 건지
app.get('/', (req, res) => {
    res.render('home');  // html/home.ejs 사용!
});
// localhost:3000/으로 들어오면
// html/home.ejs 파일을 보여줌

// channel 페이지
app.get('/channel', (req, res) => {
    res.render('channel');  // channel.ejs 보여주기
});

// video 페이지
app.get('/video', (req, res) => {
    res.render('video');  // video.ejs 보여주기
});

// 서버 실행
// 3000번 포트, http://localhost:3000로 열림
app.listen(3000, () => {
    console.log('http://localhost:3000 실행 중');
});