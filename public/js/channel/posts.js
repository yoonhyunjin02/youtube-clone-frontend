document.addEventListener('DOMContentLoaded', () => {
    // Read more / Show less 토글
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const textElement = document.getElementById(`post-text-${index}`);
            const fullText = textElement.dataset.fullText;
            const isExpanded = button.textContent === 'Show less';

            if (isExpanded) {
                // 줄이기
                const shortText = fullText.split('\n').slice(0, 3).join('<br>');
                textElement.innerHTML = shortText;
                button.textContent = 'Read more';
            } else {
                // 전체 보기
                textElement.innerHTML = fullText.replace(/\n/g, '<br>');
                button.textContent = 'Show less';
            }
        });
    });

    document.querySelectorAll('.post-card').forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        const dislikeBtn = card.querySelector('.dislike-btn');
        const likeCount = card.querySelector('.like-count');
        const dislikeCount = card.querySelector('.dislike-count');
        const likeImg = card.querySelector('.like-img');
        const dislikeImg = card.querySelector('.dislike-img');
    
        let liked = false;
        let disliked = false;
    
        likeBtn.addEventListener('click', function() {
            let currentLikes = parseInt(likeCount.textContent.replace(/[^0-9]/g, ''));
            if (!liked) {
                currentLikes += 1;
                likeImg.src = '/assets/icons/like-filled.svg';
                likeCount.textContent = currentLikes;
                liked = true;
                if (disliked) {
                    let currentDislikes = parseInt(dislikeCount.textContent.replace(/[^0-9]/g, ''));
                    currentDislikes -= 1;
                    dislikeImg.src = '/assets/icons/dislike2.svg';
                    dislikeCount.textContent = currentDislikes;
                    disliked = false;
                }
            } else {
                currentLikes -= 1;
                likeImg.src = '/assets/icons/like2.svg';
                likeCount.textContent = currentLikes;
                liked = false;
            }
        });
    
        dislikeBtn.addEventListener('click', function() {
            let currentDislikes = parseInt(dislikeCount.textContent.replace(/[^0-9]/g, ''));
            if (!disliked) {
                currentDislikes += 1;
                dislikeImg.src = '/assets/icons/dislike-filled.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = true;
                if (liked) {
                    let currentLikes = parseInt(likeCount.textContent.replace(/[^0-9]/g, ''));
                    currentLikes -= 1;
                    likeImg.src = '/assets/icons/like2.svg';
                    likeCount.textContent = currentLikes;
                    liked = false;
                }
            } else {
                currentDislikes -= 1;
                dislikeImg.src = '/assets/icons/dislike2.svg';
                dislikeCount.textContent = currentDislikes;
                disliked = false;
            }
        });
    });
    
});