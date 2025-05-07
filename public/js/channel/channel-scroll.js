function updateScrollButtons(wrapper) {
    const scrollList = wrapper.querySelector('.scrollable-list');
    const leftBtn = wrapper.querySelector('.scroll-left');
    const rightBtn = wrapper.querySelector('.scroll-right');

    const scrollLeft = scrollList.scrollLeft;
    const maxScrollLeft = Math.max(0, scrollList.scrollWidth - scrollList.clientWidth);

    if (maxScrollLeft <= 1) {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
        return;
    }

    if (scrollLeft <= 0) {
        leftBtn.style.display = 'none';
    } else {
        leftBtn.style.display = 'flex';
    }

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

    leftBtn.addEventListener('click', () => {
        scrollList.scrollBy({ left: -400, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        scrollList.scrollBy({ left: 400, behavior: 'smooth' });
    });

    scrollList.addEventListener('scroll', () => updateScrollButtons(wrapper));
    window.addEventListener('resize', () => updateScrollButtons(wrapper));

    updateScrollButtons(wrapper);
});
