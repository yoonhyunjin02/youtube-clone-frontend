const express = require('express');
const router = express.Router();

const { getSubscriberList, getRelativeTime, formatViews } = require('../utils/helpers');
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

        const featuredVideo = channelVideoList[0];
        const videoListWithoutFirst = channelVideoList.slice(1);

        // (3) 구독자 목록
        const subscriberList = await getSubscriberList();

        // (4) EJS에 넘겨주기
        res.render('pages/channel', {
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

module.exports = router;