document.addEventListener('DOMContentLoaded', function() {
    const creatBtn=document.querySelector('.create-btn');
    const createModal = document.querySelector('.create-modal');
    const noticeBtn=document.querySelector('.notice-btn');
    const noticeModal = document.querySelector('.notice-modal');
    const noticeImg = noticeBtn.querySelector('img');
    const profileBtn=document.querySelector('.profile-btn');
    const profileModal = document.querySelector('.profile-modal');
    creatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileModal.style.display = 'none';
        noticeModal.style.display = 'none';
        noticeImg.src='/assets/icons/notifications.svg';
        if (createModal.style.display === 'flex') {
            createModal.style.display = 'none';
        }
        else {
            createModal.style.display = 'flex';
        }
        
    });

    document.addEventListener('click', (e) => {
        if (createModal.style.display === 'flex') {
            createModal.style.display = 'none';
        }
    });

    noticeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        createModal.style.display = 'none';
        profileModal.style.display = 'none';
        if (noticeModal.style.display === 'flex') {
            noticeImg.src='/assets/icons/notifications.svg';
            noticeModal.style.display = 'none';
        }
        else {
            noticeImg.src='/assets/icons/notifications-filled.svg';
            noticeModal.style.display = 'flex';
        }
        
    });

    document.addEventListener('click', (e) => {
        if (noticeModal.style.display === 'flex') {
            noticeModal.style.display = 'none';
        }
    });

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        createModal.style.display = 'none';
        noticeModal.style.display = 'none';
        noticeImg.src='/assets/icons/notifications.svg';
        if (profileModal.style.display === 'flex') {
            profileModal.style.display = 'none';
        }
        else {
            profileModal.style.display = 'flex';
        }
        
    });

    document.addEventListener('click', (e) => {
        if (profileModal.style.display === 'flex') {
            profileModal.style.display = 'none';
        }
    });
});