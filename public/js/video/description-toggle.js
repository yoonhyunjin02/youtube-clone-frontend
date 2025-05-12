document.addEventListener("DOMContentLoaded", () => {
    const description = document.querySelector(".channel-description-box .channel-description");
    const toggleBtn = document.querySelector(".channel-description-box .show-more");

    if (!description || !toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        description.classList.toggle("expanded");
        toggleBtn.textContent = description.classList.contains("expanded")
            ? "Show less"
            : "...more";
    });
});