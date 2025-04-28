const express = require('express');  // Express 불러오기 (서버 기능)
const app = express();               // 서버 만들기
const path = require('path');        // 경로 관리 (폴더 경로 쉽게 연결)
const fs = require('fs');

//최신 방식 fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// EJS 설정
// .ejs 파일를 html 파일처럼 사용, 즉 .ejs 확장자 파일을 찾아서 렌더링함
app.set('view engine', 'ejs');  // 템플릿 엔진을 ejs로 사용!
// 그 파일들이 있는 곳이 html이라고 알려주는 코드
app.set('views', path.join(__dirname, 'html'));  // html 폴더를 views 폴더처럼 사용


// 정적 파일 서빙 - 브라우저가 css, assets, js 파일을 찾아서 렌더링함
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));


// 영상 올린 시간 상대 시간 형식으로 바꾸는 함수
function getRelativeTime(dateString) {
    const uploadDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - uploadDate;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);
    const weeks   = Math.floor(days / 7);
    const months  = Math.floor(days / 30);
    const years   = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `just now`;
}

//구독자 목록 함수(API+더미)
async function getSubscriberList() {
    const subscriberIds = [1, 2, 3];
    const apiSubscriberList = await Promise.all(
        subscriberIds.map(async (id) => {
            try {
                const subRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${id}`);
                return await subRes.json();

            } catch (subError) {
                console.error(`구독자 정보 오류 (id: ${id}):`, subError);
                return { id, channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' };
            }
        })
    );

    // 채널 정보 더미 데이터
    const dummySubscribers = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'html', 'partials', 'dummy_data', 'subscribers.json'), 'utf-8')
    );

    return [...apiSubscriberList, ...dummySubscribers];  // 합친 리스트
}

// 조회수 포맷팅
function formatViews(views) {
    if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (views >= 1_000_000)     return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (views >= 1_000)         return (views / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return views.toString();
}


// 라우터 - 어떤 주소에 어떤 페이지를 줄 건지
// localhost:3000/으로 들어오면 html/home.ejs 파일을 보여줌
// http://localhost:3000
app.get('/', async (req, res) => {
    try { // 예외처리
        // 비디오 리스트 받아오기
        const videoResponse = await fetch('http://techfree-oreumi-api.kro.kr:5000/video/getVideoList');
        const videoList = await videoResponse.json();

        // 채널 정보 추가
        const videoListWithChannel = await Promise.all(
            videoList.map(async (video) => {
                try {
                    const channelRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${video.channel_id}`);
                    const channelInfo = await channelRes.json();
                    return { ...video, channel: channelInfo };
                } 
                catch (channelError) {
                    console.error(`채널 정보 오류 (channel_id: ${video.channel_id}):`, channelError);
                    return { 
                        ...video, 
                        channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' } 
                    };
                }
            })
        );

        // 구독자 리스트 받아오기
        const subscriberList = await getSubscriberList();

        res.render('home', { 
            videoList: videoListWithChannel,           // 비디오 리스트 전달
            subscriberList: subscriberList,            // 구독자
            getRelativeTime: getRelativeTime,           // 상대 시간 함수 전달
            formatViews
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server Error');
    }
});


// http://localhost:3000/channel?id=3
app.get('/channel', async (req, res) => {
    const channelId = req.query.id;  // URL에서 id 받아옴

    try {
        // (1) 채널 정보
        const channelRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${channelId}`);
        const channelInfo = await channelRes.json();

        // (2) 채널 비디오 리스트
        const videoRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/video/getChannelVideoList?channel_id=${channelId}`);
        let channelVideoList = await videoRes.json();

        // 비디오가 배열인지 먼저 체크!
        if (!Array.isArray(channelVideoList)) {
            channelVideoList = [];  // 예외 처리
        }
        
        // 대표 영상은 첫 번째
        const featuredVideo = channelVideoList[0];  // 첫 번째 영상이 대표
        const videoListWithoutFirst = channelVideoList.slice(1); // 첫 번째 제외

        // const videoRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/video/getChannelVideoList?id=${channelId}`);
        // const channelVideoList = await videoRes.json();

        //console.log('channelVideoList:', channelVideoList); //디버깅

        // (3) 구독자 목록
        const subscriberList = await getSubscriberList();

        // (4) EJS에 넘겨주기
        res.render('channel', { 
            channelInfo, 
            featuredVideo,
            channelVideoList: videoListWithoutFirst, 
            subscriberList,
            getRelativeTime,
            formatViews 
        });
    } catch (error) {
        console.error('채널 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});


// http://localhost:3000/video?id=22
app.get('/video', async (req, res) => {
    const videoId = parseInt(req.query.id);  // id가 문자열이라면 숫자로 변환

    try {
        // (1) 전체 비디오 리스트 받아오기
        const videoRes = await fetch('http://techfree-oreumi-api.kro.kr:5000/video/getVideoList');
        const videoList = await videoRes.json();

        // (2) 해당 id와 일치하는 비디오 찾기
        const videoInfo = videoList.find(video => video.id === videoId);
        if (!videoInfo) {
            return res.status(404).send('Video not found');
        }

        // (3) 해당 비디오의 채널 정보 가져오기
        const channelRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${videoInfo.channel_id}`);
        const channelInfo = await channelRes.json();

        // (4) 구독자 목록 (사이드바용)
        const subscriberList = await getSubscriberList();

        // (5) 추천 영상 목록 (현재 영상 제외 + 채널 정보 붙이기)
        const recommendedVideos = await Promise.all(
            videoList
                .filter(video => video.id !== videoId)
                .slice(0, 9)
                .map(async (video) => {
                    try {
                        const channelRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${video.channel_id}`);
                        const channelInfo = await channelRes.json();
                        return { ...video, channel: channelInfo };
                    } catch (err) {
                        console.error(`추천 영상 채널 정보 오류 (channel_id: ${video.channel_id}):`, err);
                        return { 
                            ...video, 
                            channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' }
                        };
                    }
                })
        );

        // (6) EJS 렌더링
        res.render('video', { 
            videoInfo, 
            channelInfo, 
            subscriberList,
            recommendedVideos,
            getRelativeTime,
            formatViews
        });

    } catch (error) {
        console.error('비디오 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

// 서버 실행
// 3000번 포트, http://localhost:3000로 열림
app.listen(3000, () => {
    console.log('http://localhost:3000 실행 중');
});