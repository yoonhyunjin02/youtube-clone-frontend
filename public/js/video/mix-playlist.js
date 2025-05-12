document.addEventListener('DOMContentLoaded', () => {
    const mixPlaylistEl = document.querySelector('.mix-playlist');
    const mixItems = document.querySelectorAll('.mix-item');
    const urlParams = new URLSearchParams(window.location.search);
    const queue = urlParams.get('queue');


    // 1. URL에서 queue 체크해서 show/hide
    if (queue === 'mix') {
        mixPlaylistEl.style.display = 'block';
        document.body.classList.add('has-mix');  // ← 추가!
    }

    // 2. Mix item 클릭 → 해당 페이지로 이동
    mixItems.forEach(item => {
        item.addEventListener('click', () => {
            const currentParams = new URLSearchParams(window.location.search);
            const channelId = currentParams.get('channelId');
            const playlist = currentParams.get('playlist');
            const dataUrl = new URL(item.dataset.url, window.location.origin);
            const newParams = new URLSearchParams(dataUrl.search);
            if (channelId) newParams.set('channelId', channelId);
            if (playlist) newParams.set('playlist', playlist);
            const newUrl = `${dataUrl.pathname}?${newParams.toString()}`;
            window.location.href = newUrl;
        });
    });
    function syncPlaylistHeight() {
        const videoPlayer = document.querySelector('.video-player');
        const mixPlaylist = document.querySelector('.mix-playlist');

        if (videoPlayer && mixPlaylist) {
            const playerHeight = videoPlayer.offsetHeight;
            mixPlaylist.style.height = playerHeight + 'px';
        }
    }

  // 페이지 로드 시 한 번 실행
    window.addEventListener('load', syncPlaylistHeight);

  // 브라우저 창 크기 변경 시에도 다시 계산
    window.addEventListener('resize', syncPlaylistHeight);
    
    document.addEventListener('DOMContentLoaded', () => {
        const mixPlaylistEl = document.querySelector('.mix-playlist');

        if (!mixPlaylistEl || mixPlaylistEl.style.display === 'none') {
            document.body.classList.add('no-mix-playlist');
        } else {
            document.body.classList.add('has-mix');
        }
    });


    const mixPlaylist = document.querySelector('.mix-playlist');
    const miniPlaylist = document.querySelector('.mini-playlist');
    const closeBtn = document.querySelector('.playlist-close');
    const openBtn = document.querySelector('.playlist-open');
    const recommended = document.querySelector('.recommended-videos');
    closeBtn.addEventListener('click', () => {
        mixPlaylist.style.display = 'none';
        miniPlaylist.style.display = 'flex';
        miniPlaylist.classList.add('active');
        
    });
    openBtn.addEventListener('click', () => {
        mixPlaylist.style.display = 'block';
        miniPlaylist.style.display = 'none';
        miniPlaylist.classList.remove('active');
    });

    

    if (miniPlaylist && miniPlaylist.classList.contains('active') && recommended) {
    const height = miniPlaylist.offsetHeight;
    recommended.style.marginTop = height + 40 + 'px'; // 약간의 여유 포함
    }


    
});
