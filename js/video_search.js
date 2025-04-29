// video_search.js
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-form input[type='search']");
  const searchBtn = document.querySelector(".search-form button");

  if (searchInput && searchBtn) {
      searchBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const keyword = searchInput.value.trim();
          if (keyword) {
              window.location.href = `/?search=${encodeURIComponent(keyword)}`;
          }
      });

      searchInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
              e.preventDefault();
              const keyword = searchInput.value.trim();
              if (keyword) {
                  window.location.href = `/?search=${encodeURIComponent(keyword)}`;
              }
          }
      });
  }
});
