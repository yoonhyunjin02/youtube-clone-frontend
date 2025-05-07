const express = require('express');
const router = express.Router();

const { getSubscriberList, getRelativeTime, formatViews } = require('../utils/helpers');
const {
    get_video_getVideoList,
    get_channel_getChannelInfo
} = require('../utils/api');

router.get('/', async (req, res) => {
    const videoId = parseInt(req.query.id);

    try {
        // (1) 전체 비디오 리스트 가져오기
        const videoList = await get_video_getVideoList();

        // (2) 현재 비디오 정보 찾기
        const videoInfo = videoList.find(video => video.id === videoId);
        if (!videoInfo) {
            return res.status(404).send('Video not found');
        }

        // (3) 현재 비디오의 채널 정보 가져오기
        const channelInfo = await get_channel_getChannelInfo(videoInfo.channel_id);

        // (4) 구독자 목록
        const subscriberList = await getSubscriberList();

        // (5) 추천 영상 (현재 영상 제외 + 채널 정보 붙이기)
        const recommendedVideos = await Promise.all(
            videoList
                .filter(video => video.id !== videoId)
                .slice(0, 9)
                .map(async (video) => {
                    try {
                        const recChannelInfo = await get_channel_getChannelInfo(video.channel_id);
                        return { ...video, channel: recChannelInfo };
                    } catch (err) {
                        console.error(`추천 영상 채널 정보 오류 (channel_id: ${video.channel_id}):`, err);
                        return {
                            ...video,
                            channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' }
                        };
                    }
                })
        );

        res.render('pages/video', {
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

module.exports = router;