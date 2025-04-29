const scrollContainer = document.getElementById("scroll-container");
const scrollLeftBtn = document.getElementById("left");
const scrollRightBtn = document.getElementById("right");

function toggleScrollButtons() {
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // 왼쪽 버튼: 스크롤이 왼쪽 끝이 아니면 보여줌
    scrollLeftBtn.style.display = scrollLeft > 0 ? "flex" : "none";

    // 오른쪽 버튼: 스크롤이 오른쪽 끝이 아니면 보여줌
    scrollRightBtn.style.display = scrollLeft < maxScroll - 1 ? "flex" : "none";
}

// 스크롤하거나 창 크기 바뀌면 버튼 상태 업데이트
scrollContainer.addEventListener("scroll", toggleScrollButtons);
window.addEventListener("resize", toggleScrollButtons);
toggleScrollButtons();

// 버튼 누르면 스크롤
scrollRightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
});

scrollLeftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
});


const tabs = document.querySelectorAll(".category-btn");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active")); // 모든 탭에서 active 제거
    tab.classList.add("active"); // 클릭한 탭에만 active 추가
    });
});
