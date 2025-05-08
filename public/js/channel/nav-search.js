document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    const searchForm = searchInput.closest('form'); // form 태그 가져오기

    searchIcon.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });

    searchForm.addEventListener('submit', (e) => {
        const query = searchInput.value.trim();
        if (query === '') {
            e.preventDefault(); // form 제출 막기
            alert('검색어를 입력하세요.');
            window.location.href = `/channel/${channelId}/Home`;
        }
    });
});