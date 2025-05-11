const express = require('express');
const router = express.Router();

const { getSubscriberList, getRelativeTime, formatViews } = require('../utils/helpers');
const {
    get_video_getVideoList,
    get_channel_getChannelInfo
} = require('../utils/api');

const {
    calculateAverageSimilarity
} = require('../utils/ai');

async function getRecommendedVideos(videoList, videoInfo, sortType) {
    const videoId = videoInfo.id;

    if (sortType === 'recommend') {
        const otherVideos = videoList.filter(video => video.id !== videoId && Array.isArray(video.tags));
        const similarityScoredVideos = await Promise.all(
            otherVideos.map(async (video) => {
                const similarity = await calculateAverageSimilarity(videoInfo.tags.join(' '), [video]);
                return { ...video, averageSimilarity: similarity };
            })
        );

        const topRecommendedVideos = similarityScoredVideos
            .sort((a, b) => b.averageSimilarity - a.averageSimilarity)
            .slice(0, 20);

        return Promise.all(
            topRecommendedVideos.map(async (video) => {
                try {
                    const recChannelInfo = await get_channel_getChannelInfo(video.channel_id);
                    return { ...video, channel: recChannelInfo };
                } catch (err) {
                    return {
                        ...video,
                        channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' }
                    };
                }
            })
        );

    } else if (sortType === 'channel') {
        const sameChannelVideos = videoList.filter(video =>
            video.id !== videoId &&
            video.channel_id === videoInfo.channel_id &&
            Array.isArray(video.tags)
        );

        const similarityScoredVideos = await calculateAverageSimilarity(videoInfo.tags.join(' '), sameChannelVideos);
        const topRecommendedVideos = similarityScoredVideos.slice(0, 20);

        return Promise.all(
            topRecommendedVideos.map(async (video) => {
                try {
                    const recChannelInfo = await get_channel_getChannelInfo(video.channel_id);
                    return { ...video, channel: recChannelInfo };
                } catch (err) {
                    return {
                        ...video,
                        channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' }
                    };
                }
            })
        );

    } else if (sortType === 'all') {
        const allOtherVideos = videoList
            .filter(video => video.id !== videoId)
            .sort((a, b) => a.id - b.id)
            .slice(0, 20);

        return Promise.all(
            allOtherVideos.map(async (video) => {
                try {
                    const recChannelInfo = await get_channel_getChannelInfo(video.channel_id);
                    return { ...video, channel: recChannelInfo };
                } catch (err) {
                    return {
                        ...video,
                        channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' }
                    };
                }
            })
        );
    }

    return [];
}

router.get('/', async (req, res) => {
    const videoId = parseInt(req.query.id);
    const isMixQueue = req.query.queue === 'mix';
    const sortType = req.query.sort || 'all';

    try {
        const videoList = await get_video_getVideoList();
        const videoInfo = videoList.find(video => video.id === videoId);
        if (!videoInfo) return res.status(404).send('Video not found');

        const channelInfo = await get_channel_getChannelInfo(videoInfo.channel_id);
        const subscriberList = await getSubscriberList();
        const recommendedVideos = await getRecommendedVideos(videoList, videoInfo, sortType);

        let playlist = [];
        if (isMixQueue) {
            playlist = videoList
                .filter(video => video.id !== videoId)
                .slice(0, 10)
                .map(video => ({
                    id: video.id,
                    title: video.title,
                    channel_name: channelInfo.channel_name,
                    duration: video.duration || '3:00',
                    thumbnail: video.thumbnail || '/assets/default-thumb.jpg'
                }));
        }

        res.render('pages/video', {
            videoInfo,
            channelInfo,
            subscriberList,
            recommendedVideos,
            playlist,
            getRelativeTime,
            formatViews
        });
    } catch (error) {
        console.error('비디오 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

router.get('/recommend', async (req, res) => {
    const videoId = parseInt(req.query.id);
    const sortType = req.query.sort || 'recommend';

    try {
        const videoList = await get_video_getVideoList();
        const videoInfo = videoList.find(video => video.id === videoId);
        if (!videoInfo) return res.status(404).send('Video not found');

        const recommendedVideos = await getRecommendedVideos(videoList, videoInfo, sortType);

        res.render('partials/recommend-list', {
            recommendedVideos,
            getRelativeTime,
            formatViews
        });
    } catch (err) {
        console.error('추천 영상 AJAX 라우터 에러:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
