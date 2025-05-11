const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function get_channel_getChannelInfo(channelId) {
    const res = await fetch(`https://www.techfree-oreumi-api.ai.kr/channel/getChannelInfo?id=${channelId}`);
    // 데이터 확인용
    // const data = await res.json();
    // console.log('getChannelInfo:', data);
    // return data;
    return res.json();
}

async function get_video_getChannelVideoList(channelId) {
    const res = await fetch(`https://www.techfree-oreumi-api.ai.kr/video/getChannelVideoList?channel_id=${channelId}`);
    // 데이터 확인용
    // const data = await res.json();
    // console.log('getChannelVideoList:', data);
    // return data;
    return res.json();
}

async function get_video_getVideoInfo(videoId) {
    const res = await fetch(`https://www.techfree-oreumi-api.ai.kr/video/getVideoInfo?id=${videoId}`);
    // 데이터 확인용
    // const data = await res.json();
    // console.log('getVideoInfo:', data);
    // return data;
    return res.json();
}

async function get_video_getVideoList() {
    const res = await fetch(`https://www.techfree-oreumi-api.ai.kr/video/getVideoList`);
    // 데이터 확인용
    // const data = await res.json();
    // console.log('getVideoList:', data);
    // return data;
    return res.json();
}

module.exports = {
    get_channel_getChannelInfo,
    get_video_getChannelVideoList,
    get_video_getVideoInfo,
    get_video_getVideoList
};
