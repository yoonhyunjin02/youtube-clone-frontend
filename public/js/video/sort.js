document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.recommended-tag .sort-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');
    let sort = urlParams.get('sort');

    // sort 파라미터가 없을 경우 → 기본값 'all'로 URL 업데이트
    if (videoId && !sort) {
        sort = 'all';
        history.replaceState(null, '', `/video?id=${videoId}&sort=${sort}`);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedSort = button.dataset.sort;
            if (!videoId) return;

            // 모든 버튼에서 active 제거하고, 클릭된 버튼에만 active 추가
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 추천 영상 리스트 가져오기
            fetch(`/video/recommend?id=${videoId}&sort=${selectedSort}`)
                .then(res => res.text())
                .then(html => {
                    document.getElementById('recommend-list-container').innerHTML = html;
                    history.replaceState(null, '', `/video?id=${videoId}&sort=${selectedSort}`);

                    // ✅ 썸네일 hover 다시 바인딩
                    if (window.bindThumbnailHover) {
                        window.bindThumbnailHover();
                    }
                })
                .catch(err => console.error('추천 리스트 fetch 실패:', err));
        });
    });
});
