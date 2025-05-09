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
        newComment.setAttribute('data-time', Date.now());
        newComment.innerHTML = `
            <img class="input-img" src="/assets/profile/Profile-pic.svg" alt="profile">
            <div class="comment-body">
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
                    <button class="reply-btn">REPLY</button>
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
        //REPLY
        const replyBtn = newComment.querySelector('.reply-btn');
        replyBtn.addEventListener('click', () => {
            toggleReplyInput(newComment);
        });

        function toggleReplyInput(commentElement) {
            const commentBody = commentElement.querySelector('.comment-body');
            let replyInputWrapper = commentBody.querySelector('.reply-input-wrapper');

            if (replyInputWrapper) {
                return;
            }

            replyInputWrapper = document.createElement('div');
            replyInputWrapper.classList.add('reply-input-wrapper');
            replyInputWrapper.innerHTML = `
                <div class="reply-input-text">
                    <img class="input-img" src="/assets/profile/Profile-pic.svg" alt="profile">
                    <input type="text" class="reply-input">
                </div>
                <div class="reply-input-button">
                    <button class="reply-Cancel-button">Cancel</button>
                    <button class="reply-Reply-button">Reply</button>
                </div>
            `;

            const commentActions = commentBody.querySelector('.comment-actions');
            commentBody.insertBefore(replyInputWrapper, commentActions.nextSibling);

            const replyInput = replyInputWrapper.querySelector('.reply-input');
            replyInput.focus();

            replyInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const replyText = replyInput.value.trim();
                    if (replyText !== '') {
                        addReply(commentElement, replyText);
                        replyInputWrapper.remove();
                    }
                }
            });
            const cancelBtn = replyInputWrapper.querySelector('.reply-Cancel-button');
                cancelBtn.addEventListener('click', () => {
                replyInputWrapper.remove();
            });

            const replyBtn = replyInputWrapper.querySelector('.reply-Reply-button');
                replyBtn.addEventListener('click', () => {
                const replyText = replyInput.value.trim();
                if (replyText !== '') {
                    addReply(commentElement, replyText);
                    replyInputWrapper.remove();
                }
            });
        }

// 답글 추가 함수
    function addReply(commentElement, replyText) {
        let commentBody = commentElement.querySelector('.comment-body');
        let repliesContainer = commentElement.querySelector('.replies-container');
        const replyToggle = document.createElement('button');
        replyToggle.classList.add('reply-toggle');
        
        
        if (!repliesContainer) {
            repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies-container');

            replyToggle.innerHTML = `
                <img class="reply-toggle-icon" src="/assets/icons/arrow-up.svg" alt="Toggle Arrow">
                <span class="reply-toggle-text">${repliesContainer.children.length} repl${repliesContainer.children.length > 1 ? 'ies' : 'y'}</span>
            `;

            replyToggle.addEventListener('click', () => {
                const isHidden = repliesContainer.style.display === 'none';
                repliesContainer.style.display = isHidden ? 'block' : 'none';
            
                const icon = replyToggle.querySelector('.reply-toggle-icon');
                const text = replyToggle.querySelector('.reply-toggle-text');
                const count = repliesContainer.children.length;
            
                
                icon.src = isHidden ? '/assets/icons/arrow-up.svg' : '/assets/icons/arrow-down.svg';
                text.textContent = `${count} repl${count > 1 ? 'ies' : 'y'}`;
            });

            commentBody.appendChild(replyToggle);
            commentBody.appendChild(repliesContainer);
        } 

        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        replyElement.innerHTML = `
            <img src="/assets/profile/Profile-pic.svg" alt="profile">
            <div class="reply-body">
                <div class="reply-meta">
                    <span class="reply-author">You</span>
                    <span class="reply-time">just now</span>
                </div>
                <div class="reply-text">${escapeHtml(replyText)}</div>
                <div class="reply-actions">
                    <button class="like-btn"><img src="/assets/icons/like.svg" alt="Like"></button>
                    <span class="like-count">0</span>
                    <button class="dislike-btn"><img src="/assets/icons/dislike.svg" alt="Dislike"></button>
                    <span class="dislike-count">0</span>
                </div>
            </div>
        `;
        repliesContainer.prepend(replyElement);
        if (!replyToggle)   {
            console.log("fuckl");
        }else{
            console.log("aa");
        }
        const text = commentElement.querySelector('.reply-toggle-text');
        const count = repliesContainer.children.length;
        const icon = commentElement.querySelector('reply-toggle-icon');

        //icon.src = repliesContainer.style.display === 'none' ? '/assets/icons/arrow-down.svg' : '/assets/icons/arrow-up.svg';
        text.textContent = `${count} repl${count > 1 ? 'ies' : 'y'}`;

        const likeBtn = replyElement.querySelector('.like-btn');
        const dislikeBtn = replyElement.querySelector('.dislike-btn');
        const likeImg = likeBtn.querySelector('img');
        const dislikeImg = dislikeBtn.querySelector('img');
        const likeCount = replyElement.querySelector('.like-count');
        const dislikeCount = replyElement.querySelector('.dislike-count');

        let liked = false;
        let disliked = false;

        likeBtn.addEventListener('click', () => {
            let currentLikes = parseInt(likeCount.textContent);
            if (!liked) {
                currentLikes++;
                likeImg.src = '/assets/icons/like-filled.svg';
                likeCount.textContent = currentLikes;
                liked = true;
                likeBtn.classList.add('active');

                if (disliked) {
                    let currentDislikes = parseInt(dislikeCount.textContent);
                    currentDislikes--;
                    dislikeImg.src = '/assets/icons/dislike.svg';
                    dislikeCount.textContent = currentDislikes;
                    disliked = false;
                    dislikeBtn.classList.remove('active');
                }
            } else {
                currentLikes--;
                likeImg.src = '/assets/icons/like.svg';
                likeCount.textContent = currentLikes;
                liked = false;
                likeBtn.classList.remove('active');
            }
        });

        dislikeBtn.addEventListener('click', () => {
            let currentDislikes = parseInt(dislikeCount.textContent);
            if (!disliked) {
                currentDislikes++;
                dislikeImg.src = '/assets/icons/dislike-filled.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = true;
                dislikeBtn.classList.add('active');

                if (liked) {
                    let currentLikes = parseInt(likeCount.textContent);
                    currentLikes--;
                    likeImg.src = '/assets/icons/like.svg';
                    likeCount.textContent = currentLikes;
                    liked = false;
                    likeBtn.classList.remove('active');
                }
            } else {
                currentDislikes--;
                dislikeImg.src = '/assets/icons/dislike.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = false;
                dislikeBtn.classList.remove('active');
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

    // 정렬
    const sortButtons = document.querySelectorAll('.sortby-option-btn');

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortText = button.textContent.trim().toLowerCase();

            if (sortText === 'top comments') {
                sortCommentsByLikes();
            } else if (sortText === 'newest first') {
                sortCommentsByRecent();
            }

            // 모달 닫기 (선택사항)
            const sortModal = document.querySelector('.sortby-modal');
            sortModal.style.display = 'none';
        });
    });

    function sortCommentsByLikes() {
        const commentList = document.querySelector('.comment');
        const comments = Array.from(commentList.querySelectorAll('.comment-flex'));

        const sorted = comments.sort((a, b) => {
            const aLikes = parseInt(a.querySelector('.like-count')?.textContent || '0');
            const bLikes = parseInt(b.querySelector('.like-count')?.textContent || '0');
            return bLikes - aLikes;
        });

        sorted.forEach(comment => commentList.appendChild(comment));
    }

    function sortCommentsByRecent() {
        const commentList = document.querySelector('.comment');
        const comments = Array.from(commentList.querySelectorAll('.comment-flex'));
    
        const sorted = comments.sort((a, b) => {
            const timeA = parseInt(a.getAttribute('data-time') || '0');
            const timeB = parseInt(b.getAttribute('data-time') || '0');
            return timeB - timeA; 
        });
    
        sorted.forEach(comment => commentList.appendChild(comment));
    }
    }
});
