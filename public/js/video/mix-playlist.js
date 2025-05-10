document.addEventListener('DOMContentLoaded', () => {
    const mixPlaylistEl = document.querySelector('.mix-playlist');
    const playAllBtn = document.getElementById('play-all-btn');
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
            window.location.href = item.dataset.url;
        });
    });

    // 3. Play All 클릭 → 첫 번째 영상으로 이동 (with ?queue=mix)
    playAllBtn.addEventListener('click', () => {
        if (mixItems.length > 0) {
            window.location.href = mixItems[0].dataset.url;
        }
    });
});
