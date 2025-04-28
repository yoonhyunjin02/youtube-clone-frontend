document.addEventListener('DOMContentLoaded', function() {

    const subscribeBtn = document.querySelector('.subscribe-btn');
    const subscriberCountEl = document.querySelector('.channel-subscription');
    let isSubscribed = false;

    subscribeBtn.addEventListener('click', function() {
        let currentSubscribers = parseInt(subscriberCountEl.textContent.replace(/[^0-9]/g, ''));
        
        if (!isSubscribed) {
            // 구독하기
            currentSubscribers += 1;
            subscribeBtn.textContent = 'SUBSCRIBED';
            subscribeBtn.classList.add('subscribed');
            isSubscribed = true;

        } else {
            // 구독취소
            currentSubscribers -= 1;
            subscribeBtn.textContent = 'SUBSCRIBE';
            subscribeBtn.classList.remove('subscribed');
            isSubscribed = false;
        }

        // 천 단위 쉼표(,) 추가해서 업데이트
        subscriberCountEl.textContent = currentSubscribers.toLocaleString() + ' subscribers';
    });

    if (document.body.classList.contains('video-page')){
    const likeBtn = document.querySelectorAll('.action-button')[0];
    const dislikeBtn = document.querySelectorAll('.action-button')[1];
    const likeImg = likeBtn.querySelector('img');
    const dislikeImg = dislikeBtn.querySelector('img');
    const likeCount = likeBtn.querySelector('.action-text');
    const dislikeCount = dislikeBtn.querySelector('.action-text');
    
    let liked = false;
    let disliked = false;

    likeBtn.addEventListener('click', function() {
        let currentLikes = parseInt(likeCount.textContent.replace(/[^0-9]/g, ''));
        if (!liked) {
            currentLikes += 1;
            likeImg.src = '../assets/icons/like-filled.svg'; // 채워진 좋아요 아이콘
            likeCount.textContent = currentLikes;
            liked = true;
            // 만약 싫어요 눌려있으면 원래대로
            if (disliked) {
                let currentDislikes = parseInt(dislikeCount.textContent.replace(/[^0-9]/g, ''));
                currentDislikes -= 1;
                dislikeImg.src = '../assets/icons/dislike2.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = false;
            }
        } else {
            currentLikes -= 1;
            likeImg.src = '../assets/icons/like2.svg'; // 빈 좋아요 아이콘
            likeCount.textContent = currentLikes;
            liked = false;
        }
    });

    dislikeBtn.addEventListener('click', function() {
        let currentDislikes = parseInt(dislikeCount.textContent.replace(/[^0-9]/g, ''));
        if (!disliked) {
            currentDislikes += 1;
            dislikeImg.src = '../assets/icons/dislike-filled.svg'; // 채워진 싫어요 아이콘
            dislikeCount.textContent = currentDislikes;
            disliked = true;
            // 만약 좋아요 눌려있으면 원래대로
            if (liked) {
                let currentLikes = parseInt(likeCount.textContent.replace(/[^0-9]/g, ''));
                currentLikes -= 1;
                likeImg.src = '../assets/icons/like2.svg';
                likeCount.textContent = currentLikes;
                liked = false;
            }
        } else {
            currentDislikes -= 1;
            dislikeImg.src = '../assets/icons/dislike2.svg'; // 빈 싫어요 아이콘
            dislikeCount.textContent = currentDislikes;
            disliked = false;
        }
    });
}
});