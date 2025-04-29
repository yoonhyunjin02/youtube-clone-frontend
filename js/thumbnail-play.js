document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
        if (video) {
        video.currentTime = 0;
        video.play();
        }
    });

    card.addEventListener("mouseleave", () => {
        if (video) {
        video.pause();
        video.currentTime = 0;
        }
    });
});