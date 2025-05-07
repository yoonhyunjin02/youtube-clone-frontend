document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.querySelector('.input-text');
    const commentList = document.querySelector('.comment');
    const commentNum = document.querySelector('.comments-num');

    let commentCount = document.querySelectorAll('.comment-flex').length;

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = commentInput.value.trim();
            if (text !== '') {
                addComment(text);
                commentInput.value = '';
            }
        }
    });

    function addComment(text) {
        const newComment = document.createElement('div');
        newComment.classList.add('comment-flex');
        newComment.innerHTML = `
            <img class="input-img" src="/assets/profile/Profile-pic.svg" alt="profile">
            <div class="commnet-body">
                <div class="comment-meta">
                    <span class="comment-body-name">You</span>
                    <span class="comment-body-date">just now</span>
                </div>
                <span class="comment-body-detail">${escapeHtml(text)}</span>
                <div class="comment-actions">
                    <button class="like-btn"><img src="/assets/icons/like.svg" alt="Like"></button>
                    <span class="like-count">0</span>
                    <button class="dislike-btn"><img src="/assets/icons/dislike.svg" alt="Dislike"></button>
                    <span class="dislike-count">0</span>
                    <button>REPLY</button>
                </div>
            </div>
        `;
        commentList.prepend(newComment);
        commentCount++;
        commentNum.textContent = `${commentCount} Comments`;

        const likeBtn = newComment.querySelector('.like-btn');
        const dislikeBtn = newComment.querySelector('.dislike-btn');
        const likeImg = likeBtn.querySelector('img');
        const dislikeImg = dislikeBtn.querySelector('img');
        const likeCount = newComment.querySelector('.like-count');
        const dislikeCount = newComment.querySelector('.dislike-count');

        let liked = false;
        let disliked = false;

        likeBtn.addEventListener('click', function () {
            let currentLikes = parseInt(likeCount.textContent);
            if (!liked) {
                currentLikes += 1;
                likeImg.src = '/assets/icons/like-filled.svg';
                likeCount.textContent = currentLikes;
                liked = true;
                likeBtn.classList.add('active'); // 활성화 클래스 추가

                if (disliked) {
                    let currentDislikes = parseInt(dislikeCount.textContent);
                    currentDislikes -= 1;
                    dislikeImg.src = '/assets/icons/dislike.svg';
                    dislikeCount.textContent = currentDislikes;
                    disliked = false;
                    dislikeBtn.classList.remove('active'); // 비활성화
                }
            } else {
                currentLikes -= 1;
                likeImg.src = '/assets/icons/like.svg';
                likeCount.textContent = currentLikes;
                liked = false;
                likeBtn.classList.remove('active'); // 비활성화
            }
        });

        dislikeBtn.addEventListener('click', function () {
            let currentDislikes = parseInt(dislikeCount.textContent);
            if (!disliked) {
                currentDislikes += 1;
                dislikeImg.src = '/assets/icons/dislike-filled.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = true;
                dislikeBtn.classList.add('active'); // 활성화

                if (liked) {
                    let currentLikes = parseInt(likeCount.textContent);
                    currentLikes -= 1;
                    likeImg.src = '/assets/icons/like.svg';
                    likeCount.textContent = currentLikes;
                    liked = false;
                    likeBtn.classList.remove('active'); // 비활성화
                }
            } else {
                currentDislikes -= 1;
                dislikeImg.src = '/assets/icons/dislike.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = false;
                dislikeBtn.classList.remove('active'); // 비활성화
            }
        });
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // 공유 모달
    const shareBtn = document.querySelector('.share-btn');
    const ShareModal = document.querySelector('.share-modal');
    if (shareBtn && ShareModal) {
        shareBtn.addEventListener('click', () => {
            ShareModal.style.display = 'flex';
        });
    }
});
