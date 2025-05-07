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
        const shareBtn = document.querySelectorAll('.action-button')[2];
        const saveBtn = document.querySelectorAll('.action-button')[3];
        const moreBtn = document.querySelectorAll('.action-button')[4];
        const sortbyBtn = document.querySelector('.sortby-btn');
        const likeImg = likeBtn.querySelector('img');
        const dislikeImg = dislikeBtn.querySelector('img');
        const likeCount = likeBtn.querySelector('.action-text');
        const dislikeCount = dislikeBtn.querySelector('.action-text');
        const ShareModal = document.querySelector('.share-modal');
        const closeModal = document.querySelector('.close-modal');
        const moreModal = document.querySelector('.more-modal');
        const saveModal = document.querySelector('.save-modal');
        const sortbyModal = document.querySelector('.sortby-modal');

    
        let liked = false;
        let disliked = false;

        likeBtn.addEventListener('click', function() {
            let currentLikes = parseInt(likeCount.textContent.replace(/[^0-9]/g, ''));
            if (!liked) {
                currentLikes += 1;
                likeImg.src = '/assets/icons/like-filled.svg'; // 채워진 좋아요 아이콘
                likeCount.textContent = currentLikes;
                liked = true;
                // 만약 싫어요 눌려있으면 원래대로
                if (disliked) {
                    let currentDislikes = parseInt(dislikeCount.textContent.replace(/[^0-9]/g, ''));
                    currentDislikes -= 1;
                    dislikeImg.src = '/assets/icons/dislike2.svg';
                    dislikeCount.textContent = currentDislikes;
                    disliked = false;
                }
            } else {
                currentLikes -= 1;
                likeImg.src = '/assets/icons/like2.svg'; // 빈 좋아요 아이콘
                likeCount.textContent = currentLikes;
                liked = false;
            }
        });

        dislikeBtn.addEventListener('click', function() {
            let currentDislikes = parseInt(dislikeCount.textContent.replace(/[^0-9]/g, ''));
            if (!disliked) {
                currentDislikes += 1;
                dislikeImg.src = '/assets/icons/dislike-filled.svg'; // 채워진 싫어요 아이콘
                dislikeCount.textContent = currentDislikes;
                disliked = true;
                // 만약 좋아요 눌려있으면 원래대로
                if (liked) {
                    let currentLikes = parseInt(likeCount.textContent.replace(/[^0-9]/g, ''));
                    currentLikes -= 1;
                    likeImg.src = '/assets/icons/like2.svg';
                    likeCount.textContent = currentLikes;
                    liked = false;
                }
            } else {
                currentDislikes -= 1;
                dislikeImg.src = '/assets/icons/dislike2.svg'; // 빈 싫어요 아이콘
                dislikeCount.textContent = currentDislikes;
                disliked = false;
            }
        }); 
        // share-modal
        shareBtn.addEventListener('click', () => {
            ShareModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            ShareModal.style.display = 'none';
        });

        ShareModal.addEventListener('click', (e) => {
            if (e.target === ShareModal) {
                ShareModal.style.display = 'none';
            }
        });
        const copyBtn = document.querySelector('.copy-btn'); // 복사 버튼 선택자 추가
        if (copyBtn) {
            copyBtn.addEventListener('click', copyLink);
        }
        //share-modal

        //more-modal
        moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (saveModal.style.display === 'flex') {
                saveModal.style.display = 'none';
            }
            if (moreModal.style.display === 'flex') {
                moreModal.style.display = 'none';
            }
            else{
                moreModal.style.display = 'flex';
            }
            
        });

        document.addEventListener('click', (e) => {
            if (moreModal.style.display === 'flex') {
                moreModal.style.display = 'none';
            }
        });

        //save-modal
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (moreModal.style.display === 'flex') {
                moreModal.style.display = 'none';
            }
            if (saveModal.style.display === 'flex') {
                saveModal.style.display = 'none';
            }
            else{
                saveModal.style.display = 'flex';
            }
        });

        document.addEventListener('click', (e) => {
            if (saveModal.style.display === 'flex') {
                saveModal.style.display = 'none';
            }
        });
        
        //sortby-modal
        sortbyBtn.addEventListener('click', (e) => {
            e.stopPropagation(); //
            if (sortbyModal.style.display === 'flex') {
                sortbyModal.style.display = 'none';
            } else {
                sortbyModal.style.display = 'flex';
            }
        });

        document.addEventListener('click', (e) => {
            if (sortbyModal.style.display === 'flex') {
                sortbyModal.style.display = 'none';
            }
        });
        document.querySelector('.sortby-modal-content').addEventListener('click', function(e) {
            if(e.target.closest('.sortby-option-btn')) {
                document.querySelectorAll('.sortby-option-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.closest('.sortby-option-btn').classList.add('active');
            }
        });
        
        document.querySelector('.sortby-option-btn:first-child').classList.add('active');
    }
});
async function copyLink() {
    try {
        const link = document.getElementById('share-link').value;
        console.log(link);
        await navigator.clipboard.writeText(link);
        alert('링크가 복사되었습니다!');
    } catch (err) {
        alert('복사 실패! 수동으로 복사해주세요.');
    }
}