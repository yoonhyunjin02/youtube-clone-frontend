document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const sidebar   = document.querySelector('.sidebar');
    if (document.body.classList.contains('video-page')){
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    // video-page일떄
    else {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    // 나머지 page일때
});