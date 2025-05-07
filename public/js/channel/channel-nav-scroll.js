document.querySelectorAll('.nav-scroll-wrapper').forEach(wrapper => {
    const scrollArea = wrapper.querySelector('.nav-links-scrollable');
    const leftBtn = wrapper.querySelector('.scroll-tab-left');
    const rightBtn = wrapper.querySelector('.scroll-tab-right');

    const updateScrollButtons = () => {
        const scrollLeft = scrollArea.scrollLeft;
        const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;

        leftBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
        rightBtn.style.display = scrollLeft < maxScroll - 1 ? 'flex' : 'none';
    };

    leftBtn.addEventListener('click', () => {
        scrollArea.scrollBy({ left: -200, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        scrollArea.scrollBy({ left: 200, behavior: 'smooth' });
    });

    scrollArea.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    updateScrollButtons(); // 최초 호출
});