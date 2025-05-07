const fs = require('fs');
const path = require('path');

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

function formatViews(views) {
    if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (views >= 1_000_000)     return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (views >= 1_000)         return (views / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return views.toString();
}

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
        fs.readFileSync(path.join(__dirname, '..', 'data', 'subscribers.json'), 'utf-8')
    );

    return [...apiSubscriberList, ...dummySubscribers];  // 합친 리스트
}

module.exports = { getRelativeTime, formatViews, getSubscriberList };
