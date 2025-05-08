const express = require('express');
const router = express.Router();
const podcastList = require('../data/podcasts.json');

const {
    getSubscriberList,
    getRelativeTime,
    formatViews,
    sortVideosByViews,
    sortVideosByLikes
} = require('../utils/helpers');

const {
    get_channel_getChannelInfo,
    get_video_getChannelVideoList
} = require('../utils/api');

async function loadChannelBase(req, res, next) {
    const channelId = req.params.id;
    try {
        const channelInfo = await get_channel_getChannelInfo(channelId);
        res.locals.channelInfo = channelInfo;
        next();
    } catch (error) {
        console.error('채널 정보 불러오기 실패:', error);
        res.status(500).send('Server Error');
    }
}

// /channel/:id/Home
router.get('/:id/Home', async (req, res) => {
    const channelId = req.params.id;  // <-- 여기 req.query.id → req.params.id 로 변경

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

        // (6) 섹션 제목 배열
        const sectionTitles = ['동영상', '인기동영상', '추천동영상'];

        // (7) 구독자 목록
        const subscriberList = await getSubscriberList();

        // (8) EJS에 넘겨주기
        res.render('pages/channel-home', {   // Home 전용 EJS 템플릿
            channelInfo,
            featuredVideo,
            channelVideoList: videoListWithoutFirst,
            sortedVideos,
            recommendedVideos,
            sectionTitles,
            subscriberList,
            getRelativeTime,
            formatViews,
            activeTab: 'Home',
        });
    } catch (error) {
        console.error('채널 Home 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

// /channel/:id/Videos
router.get('/:id/Videos', async (req, res) => {
    const channelId = req.params.id;

    try {
        const channelInfo = await get_channel_getChannelInfo(channelId);
        let channelVideoList = await get_video_getChannelVideoList(channelId);

        if (!Array.isArray(channelVideoList)) {
            channelVideoList = [];
        }

        // ✅ subscriberList 추가
        const subscriberList = await getSubscriberList();

        res.render('pages/channel-videos', {
            channelInfo,
            channelVideoList,
            subscriberList,
            getRelativeTime,
            formatViews,
            activeTab: 'Videos',
        });
    } catch (error) {
        console.error('채널 Videos 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

// /channel/:id/podcast
router.get('/:id/Podcasts', async (req, res) => {
    const channelId = parseInt(req.params.id);

    try {
        const channelInfo = await get_channel_getChannelInfo(channelId);
        const subscriberList = await getSubscriberList();

        const channelPodcast = podcastList.find(podcast => podcast.id === channelId);

        res.render('pages/channel-podcasts', {
            channelInfo,
            subscriberList,
            podcasts: channelPodcast ? [channelPodcast] : [],
            activeTab: 'Podcasts'
        });
    } catch (error) {
        console.error('채널 Podcasts 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

// /channel/:id/Playlists
router.get('/:id/Playlists', async (req, res) => {
    const channelId = req.params.id;

    try {
        const channelInfo = await get_channel_getChannelInfo(channelId);
        let channelVideoList = await get_video_getChannelVideoList(channelId);
        const subscriberList = await getSubscriberList();

        const sortedVideos = sortVideosByViews(channelVideoList.slice(1));
        const recommendedVideos = sortVideosByLikes(channelVideoList.slice(1));

        const playlists = [
            {
                videos: channelVideoList.slice(0, 5),
                total: channelVideoList.length
            },
            {
                videos: sortedVideos.slice(0, 5),
                total: sortedVideos.length
            },
            {
                videos: recommendedVideos.slice(0, 5),
                total: recommendedVideos.length
            }
        ];

        res.render('pages/channel-playlists', {
            channelInfo,
            playlists,
            subscriberList,
            sectionTitles: ['동영상', '인기동영상', '추천동영상'],
            activeTab: 'Playlists'
        });
    } catch (error) {
        console.error('채널 Playlists 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});




// /channel/:id/Posts
router.get('/:id/Posts', loadChannelBase, async (req, res) => {
    // 여기에 posts 불러오기 API 연결 필요
    const posts = []; // TODO: posts 데이터
    res.render('pages/channel-posts', { posts, activeTab: 'Posts' });
});

module.exports = router;