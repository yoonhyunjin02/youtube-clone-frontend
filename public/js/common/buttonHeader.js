document.addEventListener('DOMContentLoaded', function() {
    const creatBtn=document.querySelector('.create-btn');
    const createModal = document.querySelector('.create-modal');
    const noticeBtn=document.querySelector('.notice-btn');
    const noticeModal = document.querySelector('.notice-modal');
    const noticeImg = noticeBtn.querySelector('img');
    const profileBtn=document.querySelector('.profile-btn');
    const profileModal = document.querySelector('.profile-modal');
    const appearanceBtn= document.querySelector('.appearance-btn');
    const appearanceModal = document.querySelector('.appear-modal');
    const backBtn= document.querySelector('.back-btn');
    creatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileModal.style.display = 'none';
        noticeModal.style.display = 'none';
        noticeImg.src='/assets/icons/Notifications.svg';
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
            noticeImg.src='/assets/icons/Notifications.svg';
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
            noticeImg.src='/assets/icons/Notifications.svg';
        }
    });

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        createModal.style.display = 'none';
        noticeModal.style.display = 'none';
        noticeImg.src='/assets/icons/Notifications.svg';
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

    appearanceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileModal.style.display = 'none';
        appearanceModal.style.display = 'flex';
    });

    document.addEventListener('click', (e) => {
        if (appearanceModal.style.display === 'flex') {
            appearanceModal.style.display = 'none';
        }
    });

    backBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        appearanceModal.style.display = 'none';
        profileModal.style.display = 'flex';
    });

    const themeButtons = document.querySelectorAll('.appear-modal-main button');
    const darkThemeBtn = document.querySelector('[data-theme="dark"]');
    const lightThemeBtn = document.querySelector('[data-theme="light"]');

    themeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            themeButtons.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const selectedTheme = e.currentTarget.dataset.theme;
            document.body.classList.toggle('light-theme', selectedTheme === 'light');
        });
    });
    
    darkThemeBtn.classList.add('active');

    
});