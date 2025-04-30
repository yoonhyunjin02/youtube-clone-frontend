function updateScrollButtons(wrapper) {
    const scrollList = wrapper.querySelector('.scrollable-list');
    const leftBtn = wrapper.querySelector('.scroll-left');
    const rightBtn = wrapper.querySelector('.scroll-right');

    const scrollLeft = scrollList.scrollLeft;
    const maxScrollLeft = scrollList.scrollWidth - scrollList.clientWidth;

    // 왼쪽 끝이면 left 버튼 숨김
    if (scrollLeft <= 0) {
    leftBtn.style.display = 'none';
    } else {
    leftBtn.style.display = 'flex';
    }

    // 오른쪽 끝이면 right 버튼 숨김
    if (scrollLeft >= maxScrollLeft - 1) {
    rightBtn.style.display = 'none';
    } else {
    rightBtn.style.display = 'flex';
    }
}

document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
    const scrollList = wrapper.querySelector('.scrollable-list');
    const leftBtn = wrapper.querySelector('.scroll-left');
    const rightBtn = wrapper.querySelector('.scroll-right');

    // 버튼 클릭 시 스크롤
    leftBtn.addEventListener('click', () => {
    scrollList.scrollBy({ left: -400, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
    scrollList.scrollBy({ left: 400, behavior: 'smooth' });
    });

    // 스크롤 발생 시 버튼 상태 업데이트
    scrollList.addEventListener('scroll', () => updateScrollButtons(wrapper));

    // 초기 상태 업데이트
    updateScrollButtons(wrapper);
});