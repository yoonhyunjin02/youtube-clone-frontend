document.addEventListener('DOMContentLoaded', () => {
    const playAllButtons = document.querySelectorAll('.play-all');

    playAllButtons.forEach(button => {
        button.addEventListener('click', () => {
            const firstVideoId = button.dataset.firstId;
            const channelId = button.dataset.channelId;
            const playlistName=button.dataset.playlistName;

            if (firstVideoId && channelId) {
                console.log(playlistName);
                const url = `/video?id=${firstVideoId}&queue=mix&channelId=${channelId}&playlist=${playlistName}`;
                window.location.href = url;                
            } else {
                console.warn('Play All: 데이터 누락');
            }
        });
    });
});
