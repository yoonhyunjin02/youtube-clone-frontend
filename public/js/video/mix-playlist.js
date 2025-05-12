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

let wrapper = null;
const mixPlaylist = document.querySelector('.mix-playlist');
const miniPlaylist = document.querySelector('.mini-playlist');
const recommended = document.querySelector('.recommended-videos');
const closeBtn = document.querySelector('.playlist-close');
const openBtn = document.querySelector('.playlist-open');

    function wrapPlaylist() {
        if (wrapper) return; // 이미 wrapper가 있다면 중복 생성 방지

        wrapper = document.createElement('div');
        wrapper.classList.add('playlist-wrapper');
        wrapper.style.gridColumn = '2';
        wrapper.style.gridRow = '1 / 7';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';

        // 기존 위치 기억
        miniPlaylistParent = miniPlaylist.parentNode;
        miniPlaylistNextSibling = miniPlaylist.nextSibling;
        recommendedParent = recommended.parentNode;
        recommendedNextSibling = recommended.nextSibling;

        wrapper.appendChild(miniPlaylist);
        wrapper.appendChild(recommended);
        mixPlaylist.parentNode.insertBefore(wrapper, mixPlaylist); // 같은 위치에 삽입
    }
    function unwrapPlaylist() {
        if (!wrapper) return;

        // 원래 위치로 복원
        if (miniPlaylistNextSibling) {
            miniPlaylistParent.insertBefore(miniPlaylist, miniPlaylistNextSibling);
        } else {
            miniPlaylistParent.appendChild(miniPlaylist);
        }

        if (recommendedNextSibling) {
            recommendedParent.insertBefore(recommended, recommendedNextSibling);
        } else {
            recommendedParent.appendChild(recommended);
        }

        wrapper.remove();
        wrapper = null;
    }
    openBtn.addEventListener('click', () => {
        mixPlaylist.style.display = 'block';
        miniPlaylist.style.display = 'none';
        if (wrapper) {
            unwrapPlaylist();
        }
    });
    closeBtn.addEventListener('click', () => {
        if (!wrapper&&window.innerWidth > 1100) {
            wrapPlaylist();
        }
        mixPlaylist.style.display = 'none';
        miniPlaylist.style.display = 'flex';
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1100 && wrapper) {
            unwrapPlaylist();
        }else if(window.innerWidth > 1100 && !wrapper && miniPlaylist.style.display === 'flex'){
            wrapPlaylist();
        }
    });
});
