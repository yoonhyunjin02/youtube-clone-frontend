function bindThumbnailHover() {
    document.querySelectorAll(".video-card").forEach(card => {
        const video = card.querySelector("video");

        card.addEventListener("mouseenter", () => {
            if (video && video.paused) {
                video.currentTime = 0;
                video.play().catch((e) => {
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
}

// 페이지 최초 로드 시 자동 바인딩
document.addEventListener('DOMContentLoaded', () => {
    bindThumbnailHover();
});

// 전역에서 재호출할 수 있도록 등록
window.bindThumbnailHover = bindThumbnailHover;
