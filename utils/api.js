const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function get_channel_getChannelInfo(channelId) {
    const res = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${channelId}`);
    return res.json();
}

async function get_video_getChannelVideoList(channelId) {
    const res = await fetch(`http://techfree-oreumi-api.kro.kr:5000/video/getChannelVideoList?channel_id=${channelId}`);
    return res.json();
}

async function get_video_getVideoInfo(videoId) {
    const res = await fetch(`http://techfree-oreumi-api.kro.kr:5000/video/getVideoInfo?id=${videoId}`);
    return res.json();
}

async function get_video_getVideoList() {
    const res = await fetch(`http://techfree-oreumi-api.kro.kr:5000/video/getVideoList`);
    return res.json();
}

module.exports = {
    get_channel_getChannelInfo,
    get_video_getChannelVideoList,
    get_video_getVideoInfo,
    get_video_getVideoList
};
