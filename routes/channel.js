const express = require('express');
const router = express.Router();

const {
    getSubscriberList,
    getRelativeTime,
    formatViews,
    sortVideosByViews,
    sortVideosByLikes,
    chunkArray,
} = require('../utils/helpers');

const {
    get_channel_getChannelInfo,
    get_video_getChannelVideoList
} = require('../utils/api');

router.get('/', async (req, res) => {
    const channelId = req.query.id;

    try {
        // (1) 채널 정보
        const channelInfo = await get_channel_getChannelInfo(channelId);

        // (2) 채널 비디오 리스트
        let channelVideoList = await get_video_getChannelVideoList(channelId);

        if (!Array.isArray(channelVideoList)) {
            channelVideoList = [];
        }

        // (3) 대표 영상 (맨 앞 1개) + 나머지 목록
        const featuredVideo = channelVideoList[0];
        const videoListWithoutFirst = channelVideoList.slice(1);

        // (4) 인기 동영상 (조회수 내림차순 정렬)
        const sortedVideos = sortVideosByViews(videoListWithoutFirst);

        // (5) 추천 동영상 (좋아요 내림차순 정렬)
        const recommendedVideos = sortVideosByLikes(videoListWithoutFirst);

        // (6) 섹션 제목 배열 & 청크 크기
        const sectionTitles = ['동영상', '인기동영상', '추천동영상'];
        // const chunkSize = 6;

        // (7) 구독자 목록
        const subscriberList = await getSubscriberList();

        // (8) EJS에 넘겨주기
        res.render('pages/channel', {
            channelInfo,
            featuredVideo,
            channelVideoList: videoListWithoutFirst, // 원본 배열
            sortedVideos,                            // 조회수 정렬 배열
            recommendedVideos,                       // 좋아요 정렬 배열
            sectionTitles,                           // 섹션 이름 배열
            //chunkSize,                               // 청크 크기
            subscriberList,
            getRelativeTime,
            formatViews
        });
    } catch (error) {
        console.error('채널 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;