const showMoreBtn = document.querySelector(".show-more-btn");
const hiddenItems = document.querySelectorAll(".subscriber-item.hidden");
const showMoreIcon = showMoreBtn.querySelector("img");  // 이미지 태그 가져옴
let isExpanded = false;

showMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    hiddenItems.forEach((item) => {
        item.classList.toggle("hidden");
    });

    isExpanded = !isExpanded;
    
    showMoreBtn.querySelector("span").textContent = isExpanded
        ? "Show Less"
        : `Show ${hiddenItems.length} More`;

    // 아이콘 회전 추가
    if (isExpanded) {
        showMoreIcon.style.transform = "rotate(180deg)";
    } else {
        showMoreIcon.style.transform = "rotate(0deg)";
    }
});