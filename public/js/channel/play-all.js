document.addEventListener('DOMContentLoaded', () => {
    const playAllButtons = document.querySelectorAll('.play-all, .playlist-card');

    playAllButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            
            const firstVideoId = button.dataset.firstId;
            const channelId = button.dataset.channelId;
            const playlistName = button.dataset.playlistName;

            if (firstVideoId && channelId) {
                const url = `/video?id=${firstVideoId}&queue=mix&channelId=${channelId}&playlist=${encodeURIComponent(playlistName)}`;
                window.location.href = url;
            } else {
                console.warn('데이터 누락:', { firstVideoId, channelId });
            }
        });
    });
});