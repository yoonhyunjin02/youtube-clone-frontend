const express = require('express');
const router = express.Router();

const { getSubscriberList, getRelativeTime, formatViews } = require('../utils/helpers');
const {
    get_channel_getChannelInfo,
    get_video_getVideoList
} = require('../utils/api');

router.get('/', async (req, res) => {
    try {
        const videoList = await get_video_getVideoList();

        const videoListWithChannel = await Promise.all(
            videoList.map(async (video) => {
                try {
                    const channelInfo = await get_channel_getChannelInfo(video.channel_id);
                    return { ...video, channel: channelInfo };
                } catch (channelError) {
                    console.error(`채널 정보 오류 (channel_id: ${video.channel_id}):`, channelError);
                    return { 
                        ...video, 
                        channel: { channel_name: 'Unknown', channel_profile: '/assets/icons/default-profile.svg' }
                    };
                }
            })
        );

        const subscriberList = await getSubscriberList();

        res.render('pages/home', { 
            videoList: videoListWithChannel,
            subscriberList,
            getRelativeTime,
            formatViews
        });
    } catch (error) {
        console.error('홈 페이지 에러:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;