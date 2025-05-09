document.addEventListener('DOMContentLoaded', () => {
    const playAllButtons = document.querySelectorAll('.play-all');

    playAllButtons.forEach(button => {
        button.addEventListener('click', () => {
            const firstVideoId = button.dataset.firstId;
            const channelId = button.dataset.channelId;

            if (firstVideoId && channelId) {
                const url = `/video?id=${firstVideoId}&queue=mix&channelId=${channelId}`;
                window.location.href = url;
            } else {
                console.warn('Play All: 데이터 누락');
            }
        });
    });
});
