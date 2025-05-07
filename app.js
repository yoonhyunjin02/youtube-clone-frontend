const express = require('express');
const app = express();
const path = require('path');

const homeRouter = require('./routes/home');
const channelRouter = require('./routes/channel');
const videoRouter = require('./routes/video');

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 서빙, public/ 폴더를 root로 매핑
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 연결
app.use('/', homeRouter);
app.use('/channel', channelRouter);
app.use('/video', videoRouter);

app.listen(3000, () => {
    console.log('http://localhost:3000 실행 중');
});