// channel_search.js
//js 파일이 html파일보다 먼저 실행되는 것을 방지
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-form input[type='search']");
  const searchBtn = document.querySelector(".search-form button");

  //검색 시 home으로 이동
  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const keyword = searchInput.value.trim();
      if (keyword) {
          window.location.href = `/?search=${encodeURIComponent(keyword)}`;
      }
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const keyword = searchInput.value.trim();
          if (keyword) {
              window.location.href = `/?search=${encodeURIComponent(keyword)}`;
          }
        }
    });
  }

}); //DOMContentLoaded 마지막