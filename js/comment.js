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
            <img class="input-img" src="../assets/img/Profile-pic.svg" alt="profile">
            <div class="commnet-body">
                <div class="comment-meta">
                    <span class="comment-body-name">You</span>
                    <span class="comment-body-date">just now</span>
                </div>
                <span class="comment-body-detail">${escapeHtml(text)}</span>
                <div class="comment-actions">
                    <button class="like-btn"><img src="../assets/icons/like.svg" alt="Like"></button>
                    <span class="like-count">0</span>
                    <button class="dislike-btn"><img src="../assets/icons/dislike.svg" alt="Dislike"></button>
                    <span class="dislike-count">0</span>
                    <button>REPLY</button>
                </div>
            </div>
        `;
        commentList.prepend(newComment);
        commentCount++;
        commentNum.textContent = `${commentCount} Comments`;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // 좋아요/싫어요 기능 (토글 + 색상 변경)
    document.addEventListener('click', function (e) {
        const likeBtn = e.target.closest('.like-btn');
        const dislikeBtn = e.target.closest('.dislike-btn');

        if (likeBtn) {
            const commentActions = likeBtn.parentElement;
            const likeCountSpan = likeBtn.nextElementSibling;
            const dislikeBtnElem = commentActions.querySelector('.dislike-btn');
            const dislikeCountSpan = dislikeBtnElem.nextElementSibling;

            if (!likeBtn.classList.contains('active')) {
                likeBtn.classList.add('active');
                likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;

                if (dislikeBtnElem.classList.contains('active')) {
                    dislikeBtnElem.classList.remove('active');
                    dislikeCountSpan.textContent = Math.max(0, parseInt(dislikeCountSpan.textContent) - 1);
                }
            } else {
                likeBtn.classList.remove('active');
                likeCountSpan.textContent = Math.max(0, parseInt(likeCountSpan.textContent) - 1);
            }
        }

        if (dislikeBtn) {
            const commentActions = dislikeBtn.parentElement;
            const dislikeCountSpan = dislikeBtn.nextElementSibling;
            const likeBtnElem = commentActions.querySelector('.like-btn');
            const likeCountSpan = likeBtnElem.nextElementSibling;

            if (!dislikeBtn.classList.contains('active')) {
                dislikeBtn.classList.add('active');
                dislikeCountSpan.textContent = parseInt(dislikeCountSpan.textContent) + 1;

                if (likeBtnElem.classList.contains('active')) {
                    likeBtnElem.classList.remove('active');
                    likeCountSpan.textContent = Math.max(0, parseInt(likeCountSpan.textContent) - 1);
                }
            } else {
                dislikeBtn.classList.remove('active');
                dislikeCountSpan.textContent = Math.max(0, parseInt(dislikeCountSpan.textContent) - 1);
            }
        }
    });
});
