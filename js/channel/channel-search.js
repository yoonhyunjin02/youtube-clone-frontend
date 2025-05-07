// channel_search.js
// js 파일이 html파일보다 먼저 실행되는 것을 방지
document.addEventListener("DOMContentLoaded", () => {
  try {
    const searchInput = document.querySelector(".search-form input[type='search']");
    const searchBtn = document.querySelector(".search-form button");

    if (!searchInput || !searchBtn) {
      console.warn("검색 입력창 또는 버튼이 존재하지 않습니다.");
      return;
    }

    // 검색 버튼 클릭 시 실행
    searchBtn.addEventListener("click", (e) => {
      try {
        e.preventDefault();
        const keyword = searchInput.value.trim();
        if (keyword) {
          window.location.href = `/?search=${encodeURIComponent(keyword)}`;
        } else {
          alert("검색어를 입력해주세요.");
        }
      } catch (err) {
        console.error("검색 버튼 클릭 처리 중 오류 발생:", err);
      }
    });

    // 검색창에서 엔터 키 누를 때 실행
    searchInput.addEventListener("keydown", (e) => {
      try {
        if (e.key === "Enter") {
          e.preventDefault();
          const keyword = searchInput.value.trim();
          if (keyword) {
            window.location.href = `/?search=${encodeURIComponent(keyword)}`;
          } else {
            alert("검색어를 입력해주세요.");
          }
        }
      } catch (err) {
        console.error("엔터 키 입력 처리 중 오류 발생:", err);
      }
    });
  } catch (outerErr) {
    console.error("초기화 중 오류 발생:", outerErr);
  }
});
