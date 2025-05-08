document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
        if (video && video.paused) {
            video.currentTime = 0;
            video.play().catch((e) => {
                //플레이 요청이 실패할 경우 에러를 무시
                console.debug("Video play interrupted:", e);
            });
        }
    });

    card.addEventListener("mouseleave", () => {
        if (video && !video.paused) {
            video.pause();
            video.currentTime = 0;
        }
    });
});
