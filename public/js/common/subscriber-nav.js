// 더미 데이터 페이지 이동 방지
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.subscriber-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.dummy === 'true') {
                e.preventDefault(); // 링크 이동 막기
                alert('더미 데이터 입니다.');
            }
        });
    });
});
